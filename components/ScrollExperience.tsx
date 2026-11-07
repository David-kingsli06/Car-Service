"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENES } from "@/data/scenes";
import { ChevronRight, Layers, Compass, Sparkles, ChevronDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES_PER_SCENE = 190;

export function ScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [scrollStarted, setScrollStarted] = useState(false);

  // Cached image maps: folder -> HTMLImageElement[]
  const imageCacheRef = useRef<Map<string, HTMLImageElement[]>>(new Map());
  const currentSceneRef = useRef(0);
  const currentFrameRef = useRef(1);

  // Helper to format frame path: frame_001.webp ... frame_190.webp
  const getFrameUrl = useCallback((folder: string, frameNumber: number) => {
    const pad = String(frameNumber).padStart(3, "0");
    return `/frames/${folder}/frame_${pad}.webp`;
  }, []);

  // Draw current frame on canvas keeping aspect-ratio cover
  const drawFrame = useCallback((folder: string, frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sceneImages = imageCacheRef.current.get(folder);
    const img = sceneImages?.[frameIndex - 1];

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cWidth = canvas.width;
    const cHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // Cover calculation
    const hRatio = cWidth / imgWidth;
    const vRatio = cHeight / imgHeight;
    const ratio = Math.max(hRatio, vRatio);

    const centerShiftX = (cWidth - imgWidth * ratio) / 2;
    const centerShiftY = (cHeight - imgHeight * ratio) / 2;

    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.drawImage(
      img,
      0,
      0,
      imgWidth,
      imgHeight,
      centerShiftX,
      centerShiftY,
      imgWidth * ratio,
      imgHeight * ratio
    );
  }, []);

  // Canvas resize handler (high DPI support)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }

      const activeScene = SCENES[currentSceneRef.current];
      if (activeScene) {
        drawFrame(activeScene.folder, currentFrameRef.current);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Preload frames strategy: First load crucial frames of rolling (Scene 1)
  useEffect(() => {
    let isCancelled = false;

    SCENES.forEach((scene) => {
      if (!imageCacheRef.current.has(scene.folder)) {
        imageCacheRef.current.set(scene.folder, new Array(scene.frameCount));
      }
    });

    const loadImage = (folder: string, index: number): Promise<void> => {
      return new Promise((resolve) => {
        const cached = imageCacheRef.current.get(folder)?.[index - 1];
        if (cached && cached.complete) {
          resolve();
          return;
        }

        const img = new Image();
        img.src = getFrameUrl(folder, index);
        img.onload = () => {
          if (!isCancelled) {
            const arr = imageCacheRef.current.get(folder);
            if (arr) arr[index - 1] = img;
          }
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });
    };

    const preloadAll = async () => {
      // Step 1: Preload initial 25 frames of Scene 0 (rolling) for immediate hero display
      const initialPromises: Promise<void>[] = [];
      for (let i = 1; i <= Math.min(25, SCENES[0].frameCount); i++) {
        initialPromises.push(loadImage(SCENES[0].folder, i));
      }
      await Promise.all(initialPromises);

      if (isCancelled) return;
      setIsReady(true);
      setLoadProgress(30);

      // Immediately render frame 1 of rolling on the hero
      drawFrame(SCENES[0].folder, 1);

      // Step 2: Background preload all scene frame 1s
      for (const scene of SCENES) {
        await loadImage(scene.folder, 1);
      }

      // Step 3: Progressively stream the rest
      let loadedCount = 25;
      const totalEstimated = SCENES.length * TOTAL_FRAMES_PER_SCENE;

      for (let s = 0; s < SCENES.length; s++) {
        const scene = SCENES[s];
        const startFrame = s === 0 ? 26 : 2;
        const batchSize = 10;

        for (let f = startFrame; f <= scene.frameCount; f += batchSize) {
          if (isCancelled) return;
          const batch: Promise<void>[] = [];
          for (let b = 0; b < batchSize && f + b <= scene.frameCount; b++) {
            batch.push(loadImage(scene.folder, f + b));
          }
          await Promise.all(batch);
          loadedCount += batch.length;
          setLoadProgress(Math.min(100, Math.round((loadedCount / totalEstimated) * 100)));
        }
      }
    };

    preloadAll();

    return () => {
      isCancelled = true;
    };
  }, [drawFrame, getFrameUrl]);

  // GSAP ScrollTrigger timeline configuration
  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const totalScenes = SCENES.length;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalScenes * 180}%`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1
          setScrollStarted(progress > 0.02);

          const totalProgress = progress * totalScenes;
          let sceneIdx = Math.floor(totalProgress);
          if (sceneIdx >= totalScenes) sceneIdx = totalScenes - 1;

          const sceneFraction = totalProgress - sceneIdx;
          const frameIndex = Math.min(
            TOTAL_FRAMES_PER_SCENE,
            Math.max(1, Math.floor(sceneFraction * TOTAL_FRAMES_PER_SCENE) + 1)
          );

          currentSceneRef.current = sceneIdx;
          currentFrameRef.current = frameIndex;

          const currentScene = SCENES[sceneIdx];
          if (currentScene) {
            drawFrame(currentScene.folder, frameIndex);
          }

          setActiveSceneIndex(sceneIdx);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isReady, drawFrame]);

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
          className="absolute inset-0 w-full h-full object-cover z-0"
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
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none transition-all duration-700 ${
            scrollStarted ? "opacity-0 -translate-y-8" : "opacity-100 translate-y-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md mb-6">
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
          className={`relative z-20 w-full max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex flex-col justify-between py-24 sm:py-28 pointer-events-none transition-all duration-700 ${
            scrollStarted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Top HUD: Stage Navigator */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-amber-300/90 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 backdrop-blur-md">
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
              <div className="glass-panel p-5 sm:p-6 rounded-lg space-y-3.5 backdrop-blur-xl bg-black/40 border border-white/10 shadow-2xl">
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
