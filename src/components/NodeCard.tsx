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

  return (
    <motion.button
      onClick={() => onClick(node)}
      whileHover={{ y: -2, boxShadow: "0 6px 16px 0 rgba(0,0,0,0.14)" }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay }}
      className="relative flex flex-col gap-2 p-3 rounded-lg text-left w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        background: isSelected ? trackBg : "var(--slds-card-bg)",
        border: `1px solid ${isSelected ? trackColor : "var(--slds-border)"}`,
        boxShadow: isSelected
          ? `0 0 0 2px ${trackColor}40, var(--slds-shadow-md)`
          : "var(--slds-shadow-sm)",
      } as React.CSSProperties}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
        style={{ background: trackColor }}
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
          className="text-xs font-bold px-2 py-0.5 rounded-full w-fit pl-1"
          style={{
            background: trackBg,
            color: trackColor,
            border: `1px solid ${trackColor}55`,
          }}
        >
          {node.track === "smb" ? "SMB" : "Enterprise"}
        </span>
      )}
    </motion.button>
  );
}
