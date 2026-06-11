"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { JOURNEY_NODES, STAGES, CLOUDS, type JourneyNode } from "@/data/journey";
import NodeCard from "./NodeCard";
import DetailPanel from "./DetailPanel";
import AgentforceRibbon from "./AgentforceRibbon";
import BssOssStrip from "./BssOssStrip";

export default function JourneyMap() {
  const [selected, setSelected] = useState<JourneyNode | null>(null);

  const handleSelect = (node: JourneyNode) =>
    setSelected((prev) => (prev?.id === node.id ? null : node));

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--slds-page-bg)" }}>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header
        className="px-6 py-3 flex items-center justify-between gap-4 flex-wrap"
        style={{
          background: "var(--slds-card-bg)",
          borderBottom: "1px solid var(--slds-border)",
          boxShadow: "var(--slds-shadow-sm)",
        }}
      >
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Salesforce-Corporate-Logo-Cloud-RBG.svg" alt="Salesforce" className="h-8 w-auto" />
          <div
            className="w-px h-8"
            style={{ background: "var(--slds-border)" }}
          />
          <div>
            <div
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--slds-text-weak)" }}
            >
              Salesforce for Vocus
            </div>
            <h1
              className="text-xl font-bold leading-tight"
              style={{ color: "var(--slds-text-title)" }}
            >
              End-to-End Customer Journey
            </h1>
          </div>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{
              background: "var(--vocus-orange-light)",
              color: "var(--vocus-orange)",
              border: "1px solid #f4600c55",
            }}
          >
            SMB Fibre · v0.1
          </span>
        </div>

        {/* Track legend */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: "var(--smb-color)" }} />
            <span className="text-sm font-semibold" style={{ color: "var(--smb-color)" }}>SMB track</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: "var(--ent-color)" }} />
            <span className="text-sm font-semibold" style={{ color: "var(--ent-color)" }}>Enterprise track</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: "var(--slds-border)" }}
            />
            <span className="text-sm" style={{ color: "var(--slds-text-weak)" }}>Shared</span>
          </div>
        </div>
      </header>

      {/* ── Cloud legend bar ────────────────────────────────────────────────── */}
      <div
        className="px-6 py-2 flex items-center gap-3 flex-wrap"
        style={{
          background: "var(--slds-card-bg)",
          borderBottom: "1px solid var(--slds-border)",
        }}
      >
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

      {/* ── Main canvas ──────────────────────────────────────────────────────── */}
      <div className="flex-1 px-5 py-5 overflow-x-auto">
        <div
          className="rounded-xl min-w-[1120px]"
          style={{
            background: "var(--slds-card-bg)",
            border: "1px solid var(--slds-border)",
            boxShadow: "var(--slds-shadow-md)",
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
                ? "var(--vocus-orange)"
                : isMerge
                ? "var(--slds-blue)"
                : "var(--vocus-navy)";

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

          {/* Node columns */}
          <div className="grid grid-cols-8 gap-3 mt-1">
            {STAGES.map((stage, si) => {
              const nodes = JOURNEY_NODES.filter((n) => n.stage === stage.num);
              const hasFork = nodes.some((n) => n.track !== "shared");

              return (
                <div key={stage.num} className="flex flex-col gap-2 relative">
                  {hasFork && (
                    <div
                      className="absolute -inset-1 rounded-xl pointer-events-none"
                      style={{
                        border: "1px dashed var(--slds-border)",
                        background: "var(--slds-page-bg)",
                      }}
                    />
                  )}
                  {nodes.map((node, ni) => (
                    <NodeCard
                      key={node.id}
                      node={node}
                      isSelected={selected?.id === node.id}
                      onClick={handleSelect}
                      delay={si * 0.04 + ni * 0.03}
                    />
                  ))}
                </div>
              );
            })}
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
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 rounded-lg px-5 py-4"
            style={{
              background: "var(--slds-card-bg)",
              border: "1px solid var(--slds-border)",
              boxShadow: "var(--slds-shadow-sm)",
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
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 rounded-lg px-5 py-4"
            style={{
              background: "var(--slds-card-bg)",
              border: "1px solid var(--slds-border)",
              boxShadow: "var(--slds-shadow-sm)",
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
