"use client";

import { motion } from "framer-motion";
import { CLOUDS, type JourneyNode } from "@/data/journey";

interface Props {
  node: JourneyNode;
  isSelected: boolean;
  onClick: (node: JourneyNode) => void;
  delay?: number;
}

export default function NodeCard({ node, isSelected, onClick, delay = 0 }: Props) {
  const cloud = CLOUDS[node.cloud];
  const trackColor =
    node.track === "smb" ? "var(--smb-color)"
    : node.track === "enterprise" ? "var(--ent-color)"
    : cloud.color;
  const trackBg =
    node.track === "smb" ? "var(--smb-bg)"
    : node.track === "enterprise" ? "var(--ent-bg)"
    : "var(--slds-blue-light)";
  const accentGrad =
    node.track === "smb" ? "var(--grad-smb)"
    : node.track === "enterprise" ? "var(--grad-ent)"
    : `linear-gradient(160deg, ${cloud.color}, ${cloud.color}aa)`;

  return (
    <motion.button
      onClick={() => onClick(node)}
      whileHover={{ y: -3, boxShadow: "var(--elev-3)" }}
      whileTap={{ scale: 0.985 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.34, delay, ease: "easeOut" }}
      className="group relative flex flex-col gap-2 p-3 pl-4 rounded-xl text-left w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        background: isSelected
          ? `linear-gradient(180deg, ${trackBg}, #ffffff)`
          : "rgba(255,255,255,0.96)",
        border: `1px solid ${isSelected ? trackColor : "var(--slds-border)"}`,
        boxShadow: isSelected
          ? `0 0 0 2px ${trackColor}40, var(--elev-2)`
          : "var(--elev-1)",
      } as React.CSSProperties}
    >
      {/* Left accent bar (gradient) */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5"
        style={{ background: accentGrad }}
      />

      {/* Cloud icon + name row */}
      <div className="flex items-center gap-2 pl-1">
        {cloud.icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cloud.icon}
            alt={cloud.name}
            className="w-7 h-7 object-contain flex-shrink-0"
          />
        ) : (
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
            style={{ background: `${cloud.color}18`, color: cloud.color }}
          >
            {cloud.shortName.slice(0, 2).toUpperCase()}
          </span>
        )}
        <span
          className="text-xs font-bold truncate"
          style={{ color: isSelected ? trackColor : cloud.color }}
        >
          {cloud.shortName}
        </span>
        {node.agentforceTouch && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/agentforce.png"
            alt="Agentforce"
            title="Powered by Agentforce"
            className="w-4 h-4 object-contain ml-auto flex-shrink-0 opacity-80"
          />
        )}
      </div>

      {/* Label */}
      <p
        className="text-sm font-semibold leading-snug pl-1"
        style={{ color: "var(--slds-text-title)" }}
      >
        {node.label}
      </p>

      {/* Track pill for fork/merge nodes */}
      {node.track !== "shared" && (
        <span
          className="text-xs font-bold px-2.5 py-0.5 rounded-full w-fit text-white"
          style={{ background: accentGrad, boxShadow: `0 2px 8px -2px ${trackColor}88` }}
        >
          {node.track === "smb" ? "SMB" : "Enterprise"}
        </span>
      )}
    </motion.button>
  );
}
