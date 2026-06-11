"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  BAND_H,
  CENTER_Y,
  UPPER_Y,
  LOWER_Y,
  CONNECTOR_TOP,
  CONNECTOR_BOT,
  buildFlowGeometry,
  type FlowGeometry,
} from "@/lib/flowGeometry";

interface FlowLayerProps {
  /** Column indices (0-based) of SHARED stages with two cards: draw a neutral
      vertical connector tying both cards to the spine so they read as one
      stage, not a fork. */
  pairedIndices?: number[];
}

/**
 * The two-speed flow overlay. Measures its own container width and builds the
 * spine / SMB / Enterprise lane geometry from it, so the flow always fills the
 * canvas and lines up under the stage columns at any width. Draws a shared
 * spine, forks into SMB (upper) and Enterprise (lower) lanes between stage 3
 * and 6, then merges. Two "comet" pulses ride the lanes at literally different
 * speeds. Sits behind the node cards, never intercepts clicks.
 */

const PATHS_DELAY = 0.15;

const layer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: PATHS_DELAY } },
};

const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, ease: "easeInOut" },
      opacity: { duration: 0.25 },
    },
  },
};

const popGlow: Variants = {
  hidden: { scale: 0.4, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "backOut" } },
};

export default function FlowLayer({ pairedIndices = [] }: FlowLayerProps) {
  const reduce = useReducedMotion();
  const cometDelay = 0.8;

  const ref = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<FlowGeometry | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (w > 0) setGeo(buildFlowGeometry(w));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {geo && (
        <motion.svg
          width={geo.width}
          height={BAND_H}
          viewBox={`0 0 ${geo.width} ${BAND_H}`}
          fill="none"
          aria-hidden="true"
          variants={layer}
          initial="hidden"
          animate="show"
        >
          <defs>
            <linearGradient id="grad-spine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0176d3" />
              <stop offset="50%" stopColor="#5867e8" />
              <stop offset="100%" stopColor="#0176d3" />
            </linearGradient>
            <linearGradient id="grad-smb" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0176d3" />
              <stop offset="100%" stopColor="#4aa3ff" />
            </linearGradient>
            <linearGradient id="grad-ent" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5867e8" />
              <stop offset="100%" stopColor="#8a7bff" />
            </linearGradient>
            <filter id="flow-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="halo-orange">
              <stop offset="0%" stopColor="rgba(244,96,12,0.45)" />
              <stop offset="100%" stopColor="rgba(244,96,12,0)" />
            </radialGradient>
            <radialGradient id="halo-blue">
              <stop offset="0%" stopColor="rgba(1,118,211,0.42)" />
              <stop offset="100%" stopColor="rgba(1,118,211,0)" />
            </radialGradient>
          </defs>

          {/* Shared-stage connectors: a neutral vertical tie joining a stage's
              two cards through its spine node. Signals "one shared stage, two
              capabilities" — NOT a fork. Drawn first so the spine sits on top. */}
          {pairedIndices.map((i) => {
            const cx = geo.colCenters[i];
            if (cx == null) return null;
            return (
              <motion.line
                key={`conn-${i}`}
                variants={drawPath}
                x1={cx}
                y1={CONNECTOR_TOP}
                x2={cx}
                y2={CONNECTOR_BOT}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth={2}
                strokeDasharray="3 4"
                strokeLinecap="round"
              />
            );
          })}

          {/* Fork / merge focal halos */}
          <motion.circle variants={popGlow} cx={geo.forkX} cy={CENTER_Y} r={50} fill="url(#halo-orange)" />
          <motion.circle variants={popGlow} cx={geo.mergeX} cy={CENTER_Y} r={50} fill="url(#halo-blue)" />

          {/* Base tracks (faint) */}
          <motion.path variants={drawPath} d={geo.spineD} stroke="url(#grad-spine)" strokeOpacity={0.28} strokeWidth={10} strokeLinecap="round" />
          <motion.path variants={drawPath} d={geo.smbLaneD} stroke="url(#grad-smb)" strokeOpacity={0.32} strokeWidth={8} strokeLinecap="round" />
          <motion.path variants={drawPath} d={geo.entLaneD} stroke="url(#grad-ent)" strokeOpacity={0.32} strokeWidth={8} strokeLinecap="round" />

          {/* Crisp centre lines */}
          <motion.path variants={drawPath} d={geo.spineD} stroke="url(#grad-spine)" strokeWidth={2.5} strokeLinecap="round" />
          <motion.path variants={drawPath} d={geo.smbLaneD} stroke="url(#grad-smb)" strokeWidth={2} strokeLinecap="round" />
          <motion.path variants={drawPath} d={geo.entLaneD} stroke="url(#grad-ent)" strokeWidth={2} strokeLinecap="round" />

          {/* Lane labels — seated just inside each lane within the open channel. */}
          <text x={geo.labelX} y={UPPER_Y - 9} textAnchor="middle" fontSize="10.5" fontWeight="700" letterSpacing="1.6" fill="#7cc0ff" opacity={0.95}>
            SMB · FAST LANE
          </text>
          <text x={geo.labelX} y={LOWER_Y + 18} textAnchor="middle" fontSize="10.5" fontWeight="700" letterSpacing="1.6" fill="#a99bff" opacity={0.95}>
            ENTERPRISE · STRATEGIC LANE
          </text>

          {/* The two speeds: comets riding each lane, SMB faster than Enterprise.
              Animated via CSS stroke-dashoffset (.flow-comet) so they run off the
              main thread. pathLength={1} normalises dash units to 0..1. */}
          {!reduce && (
            <>
              <path className="flow-comet" d={geo.smbLaneD} stroke="#7cc0ff" strokeWidth={4} strokeLinecap="round" filter="url(#flow-glow)" pathLength={1}
                style={{ "--comet-dur": "3.4s", "--comet-delay": `${cometDelay}s` } as React.CSSProperties} />
              <path className="flow-comet" d={geo.entLaneD} stroke="#a99bff" strokeWidth={4} strokeLinecap="round" filter="url(#flow-glow)" pathLength={1}
                style={{ "--comet-dur": "6.5s", "--comet-delay": `${cometDelay}s` } as React.CSSProperties} />
              <path className="flow-comet flow-comet--spine" d={geo.spineD} stroke="#6aa9ff" strokeWidth={4.5} strokeLinecap="round" filter="url(#flow-glow)" pathLength={1}
                style={{ "--comet-dur": "4.6s", "--comet-delay": `${cometDelay}s` } as React.CSSProperties} />
            </>
          )}

          {/* Anchor nodes on the spine at each stage centre */}
          {geo.colCenters.map((cx, i) => (
            <motion.circle key={i} variants={popGlow} cx={cx} cy={CENTER_Y} r={4} fill="#fff" stroke="url(#grad-spine)" strokeWidth={2} />
          ))}
        </motion.svg>
      )}
    </div>
  );
}
