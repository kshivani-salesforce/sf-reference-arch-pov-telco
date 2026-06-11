"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  CANVAS_W,
  BAND_H,
  CENTER_Y,
  SPINE_D,
  SMB_LANE_D,
  ENT_LANE_D,
  FORK_X,
  MERGE_X,
  UPPER_Y,
  LOWER_Y,
  COL_CENTERS,
} from "@/lib/flowGeometry";

/**
 * The two-speed flow overlay. Deterministic fixed-geometry SVG that draws a
 * shared spine, forks into SMB (upper) and Enterprise (lower) lanes between
 * stage 3 and 6, then merges. Two "comet" pulses ride the lanes at literally
 * different speeds. Sits behind the node cards, never intercepts clicks.
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

export default function FlowLayer() {
  const reduce = useReducedMotion();
  // Comets begin once the lanes have drawn in (faster settle than before).
  const cometDelay = 0.8;

  return (
    <motion.svg
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      width={CANVAS_W}
      height={BAND_H}
      viewBox={`0 0 ${CANVAS_W} ${BAND_H}`}
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

      {/* Fork / merge focal halos */}
      <motion.circle variants={popGlow} cx={FORK_X} cy={CENTER_Y} r={54} fill="url(#halo-orange)" />
      <motion.circle variants={popGlow} cx={MERGE_X} cy={CENTER_Y} r={54} fill="url(#halo-blue)" />

      {/* Base tracks (faint, full width) */}
      <motion.path
        variants={drawPath}
        d={SPINE_D}
        stroke="url(#grad-spine)"
        strokeOpacity={0.28}
        strokeWidth={10}
        strokeLinecap="round"
      />
      <motion.path
        variants={drawPath}
        d={SMB_LANE_D}
        stroke="url(#grad-smb)"
        strokeOpacity={0.32}
        strokeWidth={8}
        strokeLinecap="round"
      />
      <motion.path
        variants={drawPath}
        d={ENT_LANE_D}
        stroke="url(#grad-ent)"
        strokeOpacity={0.32}
        strokeWidth={8}
        strokeLinecap="round"
      />

      {/* Crisp centre lines on top of the soft base */}
      <motion.path variants={drawPath} d={SPINE_D} stroke="url(#grad-spine)" strokeWidth={2.5} strokeLinecap="round" />
      <motion.path variants={drawPath} d={SMB_LANE_D} stroke="url(#grad-smb)" strokeWidth={2} strokeLinecap="round" />
      <motion.path variants={drawPath} d={ENT_LANE_D} stroke="url(#grad-ent)" strokeWidth={2} strokeLinecap="round" />

      {/* Lane labels — seated just inside each lane within the open channel. */}
      <text
        x={(FORK_X + MERGE_X) / 2}
        y={UPPER_Y - 9}
        textAnchor="middle"
        fontSize="10.5"
        fontWeight="700"
        letterSpacing="1.6"
        fill="#7cc0ff"
        opacity={0.95}
      >
        SMB · FAST LANE
      </text>
      <text
        x={(FORK_X + MERGE_X) / 2}
        y={LOWER_Y + 18}
        textAnchor="middle"
        fontSize="10.5"
        fontWeight="700"
        letterSpacing="1.6"
        fill="#a99bff"
        opacity={0.95}
      >
        ENTERPRISE · STRATEGIC LANE
      </text>

      {/* The two speeds: comets riding each lane, SMB faster than Enterprise.
          Animated via CSS stroke-dashoffset (.flow-comet) so they run off the
          main thread and stay smooth while the page loads or is recorded.
          pathLength={1} normalises dash units to 0..1 for the keyframe. */}
      {!reduce && (
        <>
          <path
            className="flow-comet"
            d={SMB_LANE_D}
            stroke="#7cc0ff"
            strokeWidth={4}
            strokeLinecap="round"
            filter="url(#flow-glow)"
            pathLength={1}
            style={{ "--comet-dur": "3.4s", "--comet-delay": `${cometDelay}s` } as React.CSSProperties}
          />
          <path
            className="flow-comet"
            d={ENT_LANE_D}
            stroke="#a99bff"
            strokeWidth={4}
            strokeLinecap="round"
            filter="url(#flow-glow)"
            pathLength={1}
            style={{ "--comet-dur": "6.5s", "--comet-delay": `${cometDelay}s` } as React.CSSProperties}
          />
          {/* Spine pulse feeding the fork */}
          <path
            className="flow-comet flow-comet--spine"
            d={SPINE_D}
            stroke="#6aa9ff"
            strokeWidth={4.5}
            strokeLinecap="round"
            filter="url(#flow-glow)"
            pathLength={1}
            style={{ "--comet-dur": "4.6s", "--comet-delay": `${cometDelay}s` } as React.CSSProperties}
          />
        </>
      )}

      {/* Anchor nodes on the spine at shared stages */}
      {COL_CENTERS.map((cx, i) => (
        <motion.circle
          key={i}
          variants={popGlow}
          cx={cx}
          cy={CENTER_Y}
          r={4}
          fill="#fff"
          stroke="url(#grad-spine)"
          strokeWidth={2}
        />
      ))}
    </motion.svg>
  );
}
