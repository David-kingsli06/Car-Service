"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENES } from "@/data/scenes";
import { createFrameStore } from "@/lib/frameStore";
import { ChevronRight, Layers, Compass, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = SCENES.reduce((sum, scene) => sum + scene.frameCount, 0);
// Native size of the frame files. A canvas denser than this adds cost, not detail.
const FRAME_WIDTH = 1280;
const FRAME_HEIGHT = 720;
const SCRUB_SECONDS = 0.5;

const getFrameUrl = (folder: string, frameNumber: number) =>
  `/frames/${folder}/frame_${String(frameNumber).padStart(3, "0")}.webp`;

// Which scene a global frame index falls in.
const getSceneIndex = (frame: number) => {
  let remaining = frame;
  for (let i = 0; i < SCENES.length; i++) {
    if (remaining < SCENES[i].frameCount) return i;
    remaining -= SCENES[i].frameCount;
  }
  return SCENES.length - 1;
};

// Decoded frames take about 3.7 MB each, so low-memory and touch devices keep fewer.
const getDecodeWindowSize = () => {
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const constrained =
    (memory !== undefined && memory <= 4) ||
    window.matchMedia("(pointer: coarse)").matches;
  return constrained ? 24 : 48;
};

export function ScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [scrollStarted, setScrollStarted] = useState(false);

  // Frame loading, canvas drawing and the scroll timeline
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!container || !canvas || !ctx) return;

    let targetFrame = 0;
    let drawnBitmap: ImageBitmap | null = null;
    let drawRequest = 0;

    const store = createFrameStore({
      scenes: SCENES,
      getUrl: getFrameUrl,
      windowSize: getDecodeWindowSize(),
      // Decodes finish in bursts, so draw at most once per screen refresh.
      onDecoded: () => {
        if (drawRequest) return;
        drawRequest = requestAnimationFrame(() => {
          drawRequest = 0;
          draw();
        });
      },
      onProgress: (percent, ready) => {
        setLoadProgress(percent);
        if (ready) setIsReady(true);
      },
    });

    // Draws the best available frame, cover-fitted. Skips repeat draws.
    function draw() {
      if (!canvas || !ctx) return;
      const nearest = store.getNearest(targetFrame);
      if (!nearest || nearest.bitmap === drawnBitmap) return;
      const { bitmap } = nearest;
      const ratio = Math.max(canvas.width / bitmap.width, canvas.height / bitmap.height);
      const width = bitmap.width * ratio;
      const height = bitmap.height * ratio;
      ctx.drawImage(
        bitmap,
        (canvas.width - width) / 2,
        (canvas.height - height) / 2,
        width,
        height
      );
      drawnBitmap = bitmap;
    }

    // The CSS size comes from the layout; only the backing store is set here.
    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      if (!clientWidth || !clientHeight) return;
      // Backing pixels per CSS pixel at which a covering frame is drawn 1:1.
      const sourceDensity =
        1 / Math.max(clientWidth / FRAME_WIDTH, clientHeight / FRAME_HEIGHT);
      const density = Math.min(window.devicePixelRatio || 1, sourceDensity);
      const width = Math.round(clientWidth * density);
      const height = Math.round(clientHeight * density);
      if (width === canvas.width && height === canvas.height) return;
      canvas.width = width;
      canvas.height = height;
      drawnBitmap = null; // resizing clears the canvas
      draw();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    store.start();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // `scrub` eases this tween toward the scroll position, so a wheel notch plays
    // through the frames in between. GSAP updates it once per screen refresh.
    const gsapContext = gsap.context(() => {
      const playback = { frame: 0 };
      gsap.to(playback, {
        frame: TOTAL_FRAMES - 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${SCENES.length * 180}%`,
          pin: true,
          scrub: reduceMotion ? true : SCRUB_SECONDS,
          anticipatePin: 1,
        },
        onUpdate: () => {
          const frame = Math.round(playback.frame);
          setScrollStarted(frame > TOTAL_FRAMES * 0.02);
          setActiveSceneIndex(getSceneIndex(frame));
          if (frame !== targetFrame) {
            targetFrame = frame;
            store.setPlayhead(frame);
          }
          draw();
        },
      });
    }, container);

    return () => {
      gsapContext.revert();
      resizeObserver.disconnect();
      cancelAnimationFrame(drawRequest);
      store.destroy();
    };
  }, []);

  const activeScene = SCENES[activeSceneIndex];

  return (
    <div id="story" className="relative w-full bg-[#050608]">
      {/* Pinned Viewport Container - Acts as the immediate Fullscreen Hero */}
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center select-none"
      >
        {/* Cinematic Canvas rendering directly as Hero background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0"
        />

        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/75" />
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-[#050608]/80 via-transparent to-[#050608]/80" />

        {/* Loading Overlay */}
        {!isReady && (
          <div className="absolute inset-0 z-40 bg-[#050608] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full border border-amber-400/30 border-t-amber-400 animate-spin mb-6" />
            <h3 className="text-xl font-bold uppercase tracking-widest text-neutral-200 mb-2">
              APEX ATELIER
            </h3>
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
              Buffering Master Sequence &bull; {loadProgress}%
            </p>
          </div>
        )}

        {/* Initial Hero Title Overlay (fades out gracefully once user starts scrolling) */}
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none transition-[opacity,translate] duration-700 ${
            scrollStarted ? "opacity-0 -translate-y-8" : "opacity-100 translate-y-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-[#050608]/70 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-200">
              The Pinnacle of Surface Restoration
            </span>
          </div>

          <h1 className="max-w-5xl text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[0.95] mb-6">
            <span className="block text-gradient-silver">SURFACE ARTISTRY.</span>
            <span className="block text-gradient-gold">ABSOLUTE DEFENSE.</span>
          </h1>

          <p className="max-w-2xl text-neutral-300 text-sm sm:text-base font-light leading-relaxed mb-8 drop-shadow-lg">
            Scroll to command the transformation: Mud &bull; Touchless Foam &bull; Paint Correction &bull; Studio Inspection &bull; Ceramic Hydrophobic Armor.
          </p>

          <div className="flex flex-col items-center gap-2 text-neutral-400">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-amber-400 animate-pulse">
              Scroll Down to Begin
            </span>
            <div className="w-7 h-11 rounded-full border border-white/20 flex items-start justify-center p-1.5">
              <div className="w-1.5 h-2.5 bg-amber-400 rounded-full animate-bounce" />
            </div>
          </div>
        </div>

        {/* HUD Elements / Stage Telemetry Overlay (fades in as user scrolls) */}
        <div
          className={`relative z-20 w-full max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex flex-col justify-between py-24 sm:py-28 pointer-events-none transition-[opacity,translate] duration-700 ${
            scrollStarted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Top HUD: Stage Navigator */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-amber-300/90 bg-[#050608]/70 px-3 py-1 rounded-full border border-amber-500/20">
                {activeScene.tag}
              </span>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center gap-2">
              {SCENES.map((scene, idx) => (
                <div
                  key={scene.id}
                  className={`h-1 transition-all duration-500 rounded-full ${
                    idx === activeSceneIndex
                      ? "w-8 bg-amber-400"
                      : idx < activeSceneIndex
                      ? "w-3 bg-neutral-400"
                      : "w-3 bg-neutral-800"
                  }`}
                />
              ))}
              <span className="text-[11px] font-mono text-neutral-400 ml-2">
                0{activeSceneIndex + 1}/0{SCENES.length}
              </span>
            </div>
          </div>

          {/* Center-Bottom Dynamic Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pointer-events-auto">
            {/* Left: Titles & Description */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase font-mono tracking-[0.2em] text-neutral-400 block">
                {activeScene.subtitle}
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
                {activeScene.title}
              </h2>
              <p className="max-w-xl text-neutral-300 text-sm sm:text-base font-light leading-relaxed drop-shadow-md">
                {activeScene.description}
              </p>
            </div>

            {/* Right: Technical Telemetry / Specifications */}
            <div className="lg:col-span-5">
              <div className="p-5 sm:p-6 rounded-lg space-y-3.5 bg-[#0a0e14]/80 border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    Telemetric Diagnostics
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    STAGE SPEC
                  </span>
                </div>
                <div className="space-y-2.5">
                  {activeScene.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-neutral-400">{spec.label}</span>
                      <span className="font-mono text-white font-medium">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom HUD: Live Scrub Guide */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[11px] font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>ACTIVE STAGE: {activeScene.folder.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-1 text-neutral-400">
              <span>SCROLL TO ADVANCE</span>
              <ChevronRight className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
