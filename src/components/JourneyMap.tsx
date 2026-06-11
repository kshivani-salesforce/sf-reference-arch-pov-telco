"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { JOURNEY_NODES, STAGES, CLOUDS, type JourneyNode } from "@/data/journey";
import NodeCard from "./NodeCard";
import DetailPanel from "./DetailPanel";
import AgentforceRibbon from "./AgentforceRibbon";
import BssOssStrip from "./BssOssStrip";
import HeroBand from "./HeroBand";
import FlowLayer from "./FlowLayer";

export default function JourneyMap() {
  const [selected, setSelected] = useState<JourneyNode | null>(null);

  const handleSelect = (node: JourneyNode) =>
    setSelected((prev) => (prev?.id === node.id ? null : node));

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <HeroBand />

      {/* ── Legend toolbar ──────────────────────────────────────────────────── */}
      <div
        className="px-8 py-2.5 flex items-center justify-between gap-4 flex-wrap"
        style={{
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--slds-border)",
        }}
      >
        {/* Track legend */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: "var(--grad-smb)" }} />
            <span className="text-sm font-semibold" style={{ color: "var(--smb-color)" }}>SMB track</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: "var(--grad-ent)" }} />
            <span className="text-sm font-semibold" style={{ color: "var(--ent-color)" }}>Enterprise track</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: "var(--slds-border)" }} />
            <span className="text-sm" style={{ color: "var(--slds-text-weak)" }}>Shared</span>
          </div>
        </div>

        {/* Cloud legend */}
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="text-xs font-bold uppercase tracking-widest mr-1"
            style={{ color: "var(--slds-text-muted)" }}
          >
            Platform
          </span>
          {Object.values(CLOUDS).map((cloud) => (
            <div key={cloud.key} className="flex items-center gap-1.5">
              {cloud.icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cloud.icon} alt={cloud.name} className="w-5 h-5 object-contain" />
              ) : (
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: cloud.color }} />
              )}
              <span className="text-xs font-medium" style={{ color: "var(--slds-text-weak)" }}>
                {cloud.shortName}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main canvas ──────────────────────────────────────────────────────── */}
      <div className="flex-1 px-8 py-7 overflow-x-auto">
        <div
          className="rounded-2xl min-w-[1120px]"
          style={{
            background: "rgba(255,255,255,0.92)",
            border: "1px solid var(--slds-border)",
            boxShadow: "var(--elev-3)",
            padding: "20px",
          }}
        >
          {/* Chevron stage strip */}
          <div className="flex mb-4 -mx-1">
            {STAGES.map((stage, i) => {
              const isFirst = i === 0;
              const isLast = i === STAGES.length - 1;
              const isFork = !!stage.forks;
              const isMerge = !!stage.merges;
              const bg = isFork
                ? "var(--grad-vocus)"
                : isMerge
                ? "var(--grad-platform)"
                : "var(--grad-navy)";

              return (
                <div
                  key={stage.num}
                  className="relative flex-1 flex items-center justify-center py-2.5 px-3 min-w-0"
                  style={{
                    background: bg,
                    /* right-pointing chevron via clip-path on all but last */
                    clipPath: isLast
                      ? "polygon(12px 0%, 100% 0%, 100% 100%, 12px 100%, 0% 50%)"
                      : isFirst
                      ? "polygon(0% 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 0% 100%)"
                      : "polygon(0% 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 0% 100%, 12px 50%)",
                    marginLeft: isFirst ? 0 : "-1px",
                    zIndex: STAGES.length - i,
                  }}
                >
                  <div className="text-center">
                    <div
                      className="text-xs font-bold leading-tight"
                      style={{ color: "#fff" }}
                    >
                      {stage.num}. {stage.label}
                    </div>
                    <div
                      className="text-xs leading-tight mt-0.5"
                      style={{ color: "rgba(255,255,255,0.72)" }}
                    >
                      {stage.sublabel}
                    </div>
                    {isFork && (
                      <div className="text-xs font-bold mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>
                        ⑂ Splits
                      </div>
                    )}
                    {isMerge && (
                      <div className="text-xs font-bold mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>
                        ⑁ Merges
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Node columns over the two-speed flow layer */}
          <div className="relative" style={{ minHeight: 240 }}>
            <FlowLayer />
            <div className="grid grid-cols-8 gap-3 mt-1 relative z-10">
              {STAGES.map((stage, si) => {
                const nodes = JOURNEY_NODES.filter((n) => n.stage === stage.num);
                const hasFork = nodes.some((n) => n.track !== "shared");

                return (
                  <div key={stage.num} className="flex flex-col gap-2 relative">
                    {hasFork && (
                      <div
                        className="absolute -inset-1 rounded-xl pointer-events-none"
                        style={{
                          border: "1px dashed rgba(13,27,46,0.18)",
                          background: "rgba(255,255,255,0.55)",
                          backdropFilter: "blur(1px)",
                        }}
                      />
                    )}
                    {nodes.map((node, ni) => (
                      <NodeCard
                        key={node.id}
                        node={node}
                        isSelected={selected?.id === node.id}
                        onClick={handleSelect}
                        delay={0.45 + si * 0.07 + ni * 0.05}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ── Agentforce ribbon ───────────────────────────────────────────────── */}
        <div className="mt-4 min-w-[1120px]">
          <AgentforceRibbon />
        </div>

        {/* ── Slack + MuleSoft row ─────────────────────────────────────────────── */}
        <div className="mt-3 grid grid-cols-2 gap-3 min-w-[1120px]">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex items-center gap-4 rounded-xl px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid var(--slds-border)",
              boxShadow: "var(--elev-2)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Slack-3D-Product-Icon-Straight-RGB.png"
              alt="Slack"
              className="w-12 h-12 object-contain flex-shrink-0"
            />
            <div>
              <div className="text-sm font-bold" style={{ color: "var(--slds-text-title)" }}>
                Slack · Collaboration Layer
              </div>
              <div className="text-sm mt-0.5 leading-relaxed" style={{ color: "var(--slds-text-weak)" }}>
                Auto-created deal rooms, Salesforce records in Slack, approval flows, and incident war rooms spanning every stage for every team member.
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.08 }}
            className="flex items-center gap-4 rounded-xl px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid var(--slds-border)",
              boxShadow: "var(--elev-2)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Mulesoft-3D-Product-Icon-Right-RGB.png"
              alt="MuleSoft"
              className="w-12 h-12 object-contain flex-shrink-0"
            />
            <div>
              <div className="text-sm font-bold" style={{ color: "var(--slds-text-title)" }}>
                MuleSoft · Integration Fabric
              </div>
              <div className="text-sm mt-0.5 leading-relaxed" style={{ color: "var(--slds-text-weak)" }}>
                API-led connectivity between Salesforce, Vocus BSS/OSS, NBN Co, and carrier partners. Real-time events flow in both directions.
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── BSS / OSS foundation ──────────────────────────────────────────────── */}
        <div className="mt-3 min-w-[1120px]">
          <div
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "var(--slds-text-weak)" }}
          >
            Foundation · BSS / OSS
          </div>
          <BssOssStrip />
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer
        className="px-6 py-3 flex items-center justify-between"
        style={{
          background: "var(--slds-card-bg)",
          borderTop: "1px solid var(--slds-border)",
        }}
      >
        <span className="text-xs" style={{ color: "var(--slds-text-muted)" }}>
          sfraVocus · Salesforce Reference Architecture · Internal use only
        </span>
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Salesforce-Corporate-Logo-Cloud-RBG.svg" alt="Salesforce" className="h-5 w-auto opacity-50" />
          <span className="text-xs" style={{ color: "var(--slds-text-muted)" }}>
            Built on Salesforce Platform
          </span>
        </div>
      </footer>

      {/* ── Detail panel ──────────────────────────────────────────────────────── */}
      <DetailPanel node={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
