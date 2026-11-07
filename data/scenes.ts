export interface SceneInfo {
  id: string;
  folder: string;
  frameCount: number;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  specs: { label: string; value: string }[];
}

export const SCENES: SceneInfo[] = [
  {
    id: "rolling",
    folder: "rolling",
    frameCount: 190,
    tag: "STAGE 01 — THE ARRIVAL",
    title: "MUD & HIGHWAY CONTAMINATION",
    subtitle: "Heavy Road Grime Influx",
    description: "The vehicle arrives coated in road film, grit, iron fallout, and mud after prolonged exposure to the elements.",
    specs: [
      { label: "Surface Contamination", value: "Class 4 Heavy Grime" },
      { label: "Visual Condition", value: "Swirls & Road Dirt" },
      { label: "Recommended Protocol", value: "Multi-Stage Decontam" }
    ]
  },
  {
    id: "foam",
    folder: "foam",
    frameCount: 190,
    tag: "STAGE 02 — ACTIVE SNOW FOAM",
    title: "TOUCHLESS DECONTAMINATION",
    subtitle: "pH-Neutral Clinging Foam",
    description: "High-density active foam encapsulates and safely dissolves embedded road contaminants without touching or scratching the clear coat.",
    specs: [
      { label: "Foam Density", value: "High-cling 4000 RPM Aeration" },
      { label: "Chemistry", value: "pH 7.2 Neutral Surfactant" },
      { label: "Dwell Time", value: "8-10 Minutes Touchless" }
    ]
  },
  {
    id: "bonnet",
    folder: "bonnet",
    frameCount: 190,
    tag: "STAGE 03 — PAINT CORRECTION",
    title: "SUB-MICRON PRECISION",
    subtitle: "Rotary & DA Polishing",
    description: "Microscopic leveling of the clear coat to eliminate swirl marks, scratches, and oxidation, restoring optical reflection.",
    specs: [
      { label: "Abrasive Tech", value: "Diminishing Micro-Alumina" },
      { label: "Paint Removal", value: "< 2.5 Microns" },
      { label: "Swirl Elimination", value: "99% Defect Removal" }
    ]
  },
  {
    id: "mercedes",
    folder: "mercedes",
    frameCount: 190,
    tag: "STAGE 04 — STUDIO INSPECTION",
    title: "MIRROR-GLASS REVELATION",
    subtitle: "CRI-98 Studio Lighting",
    description: "The vehicle is inspected under 360-degree high-definition studio lighting bays to verify complete optical depth and finish.",
    specs: [
      { label: "Surface Clarity", value: "Showroom Mirror Reflection" },
      { label: "Gloss Reading", value: "> 98.8 GU (Gloss Units)" },
      { label: "Inspection Angle", value: "Multi-Axis Stroboscopic" }
    ]
  },
  {
    id: "droplets",
    folder: "droplets",
    frameCount: 190,
    tag: "STAGE 05 — CERAMIC ARMOR",
    title: "HYDROPHOBIC DEFENSE",
    subtitle: "SiO2 + Graphene Matrix",
    description: "Permanent cross-linked molecular shield that violently repels water, mud, UV rays, and road fallout with tight droplet contact angles.",
    specs: [
      { label: "Contact Angle", value: "118° Extreme Beading" },
      { label: "Hardness Rating", value: "10H Diamond-Ceramic" },
      { label: "Protection Term", value: "5-Year Guarantee" }
    ]
  }
];

export interface DetailingPackage {
  id: string;
  name: string;
  category: string;
  tagline: string;
  price: string;
  turnaround: string;
  recommended: boolean;
  features: string[];
}

export const DETAILING_PACKAGES: DetailingPackage[] = [
  {
    id: "bespoke-enhancement",
    name: "Preservation Wash & Gloss",
    category: "Maintenance",
    tagline: "For meticulously kept vehicles requiring routine studio-grade care.",
    price: "$180",
    turnaround: "3 - 4 Hours",
    recommended: false,
    features: [
      "Contactless high-density active foam soak",
      "Two-bucket grit-guard micro-wash method",
      "Iron fallout & wheel well deep decontamination",
      "Short-term SiO2 hydrophobic spray sealant (3 months)",
      "Interior compressed air blowout & surface conditioning"
    ]
  },
  {
    id: "ceramic-signature",
    name: "Signature 2-Stage & Ceramic 10H",
    category: "Most Popular",
    tagline: "Complete swirl removal paired with diamond-grade ceramic armor.",
    price: "$850",
    turnaround: "1 - 2 Days",
    recommended: true,
    features: [
      "Complete multi-stage paint decontam & clay bar",
      "2-Stage compounding & jewel finishing polish (90-95% defect removal)",
      "5-Year 10H Graphene-infused Ceramic Coating",
      "Wheel faces & calipers ceramic treated",
      "Windscreen hydrophobic rain-clear coating",
      "Deep leather steam cleansing & matte protection"
    ]
  },
  {
    id: "stealth-ppf",
    name: "Ultimate PPF Armor & Studio Suite",
    category: "Full Protection",
    tagline: "The pinnacle of vehicle defense against rock chips and road hazards.",
    price: "$2,400+",
    turnaround: "3 - 4 Days",
    recommended: false,
    features: [
      "Full front clip or full body self-healing PPF (8.5 mil TPU)",
      "Paint correction prior to film installation",
      "Ceramic coating over entire film surface",
      "Engine bay detail & satin UV dressing",
      "Infrared curing with digital inspection log",
      "Transferable 10-Year manufacturer warranty"
    ]
  }
];
