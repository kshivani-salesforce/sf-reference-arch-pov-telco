"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CLOUDS, STAGES, type JourneyNode } from "@/data/journey";

interface Props {
  node: JourneyNode | null;
  onClose: () => void;
}

export default function DetailPanel({ node, onClose }: Props) {
  const cloud = node ? CLOUDS[node.cloud] : null;
  const stage = node ? STAGES.find((s) => s.num === node.stage) : null;
  const trackColor =
    node?.track === "smb" ? "var(--smb-color)"
    : node?.track === "enterprise" ? "var(--ent-color)"
    : cloud?.color ?? "var(--slds-blue)";
  const trackBg =
    node?.track === "smb" ? "var(--smb-bg)"
    : node?.track === "enterprise" ? "var(--ent-bg)"
    : "var(--slds-blue-light)";
  const trackGrad =
    node?.track === "smb" ? "var(--grad-smb)"
    : node?.track === "enterprise" ? "var(--grad-ent)"
    : `linear-gradient(135deg, ${cloud?.color ?? "#0176d3"}, ${cloud?.color ?? "#0176d3"}bb)`;

  return (
    <AnimatePresence>
      {node && cloud && stage && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.3)" }}
          />
          <motion.aside
            key={node.id}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
            className="fixed top-0 right-0 h-full w-[440px] z-50 flex flex-col"
            style={{
              background: "var(--slds-card-bg)",
              boxShadow: "var(--elev-3)",
            }}
          >
            {/* Header — gradient band in the track colour */}
            <div className="relative px-6 pt-5 pb-5 overflow-hidden" style={{ background: trackGrad }}>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(360px 180px at 90% -30%, rgba(255,255,255,0.30), transparent 60%)",
                }}
              />
              <div className="relative flex items-start justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.85)" }}>
                  Stage {node.stage} · {stage.label} {stage.sublabel}
                </span>
                <button
                  onClick={onClose}
                  className="text-xl leading-none text-white hover:opacity-70 transition-opacity"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="relative flex items-center gap-3">
                {cloud.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cloud.icon}
                    alt={cloud.name}
                    className="w-12 h-12 object-contain flex-shrink-0 rounded-xl p-1"
                    style={{ background: "rgba(255,255,255,0.92)" }}
                  />
                ) : (
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-black flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.92)", color: cloud.color }}
                  >
                    {cloud.shortName.slice(0, 2)}
                  </span>
                )}
                <div>
                  <h2 className="font-display text-xl font-bold leading-tight text-white">
                    {node.label}
                  </h2>
                  <div className="text-sm font-semibold mt-0.5" style={{ color: "rgba(255,255,255,0.88)" }}>
                    {cloud.name}
                  </div>
                  {node.track !== "shared" && (
                    <span
                      className="inline-block mt-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.92)", color: trackColor }}
                    >
                      {node.track === "smb" ? "SMB Track" : "Enterprise Track"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Body */}
            <div
              className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
              style={{
                backgroundImage:
                  "radial-gradient(520px 280px at 110% -5%, rgba(88,103,232,0.05), transparent 60%)",
              }}
            >
              {/* Capabilities */}
              <section>
                <h3
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: "var(--slds-text-weak)" }}
                >
                  Key Capabilities
                </h3>
                <ul className="space-y-3">
                  {node.capabilities.map((cap, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-0.5 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: trackGrad, boxShadow: `0 2px 8px -2px ${trackColor}88` }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: "var(--slds-text-title)" }}>
                          {cap.title}
                        </div>
                        <div className="text-sm mt-0.5 leading-relaxed" style={{ color: "var(--slds-text-weak)" }}>
                          {cap.detail}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Agentforce */}
              {node.agentforceTouch && (
                <section
                  className="rounded-xl p-4"
                  style={{
                    background: "linear-gradient(160deg, #f0f8ff, #ffffff)",
                    border: "1px solid var(--agent-border)",
                    boxShadow: "var(--glow-blue)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/Agentforce-Flat-3D-Product-Icon-Right-RGB.png"
                      alt="Agentforce"
                      className="w-7 h-7 object-contain"
                    />
                    <h3
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: "var(--agent-color)" }}
                    >
                      Agentforce at this stage
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--slds-text-default)" }}>
                    {node.agentforceTouch}
                  </p>
                </section>
              )}

              {/* SE Ownership */}
              <section
                className="rounded-lg p-4"
                style={{
                  background: `${cloud.color}0d`,
                  border: `1px solid ${cloud.color}40`,
                }}
              >
                <h3
                  className="text-xs font-bold uppercase tracking-widest mb-1.5"
                  style={{ color: cloud.color }}
                >
                  SE Domain
                </h3>
                <p className="text-sm font-semibold" style={{ color: "var(--slds-text-title)" }}>
                  {cloud.seRole}
                </p>
              </section>
            </div>

            {/* Footer */}
            <div
              className="px-6 py-3 flex items-center gap-3"
              style={{ borderTop: "1px solid var(--slds-border)", background: "var(--slds-page-bg)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Salesforce-Corporate-Logo-Cloud-RBG.svg" alt="Salesforce" className="h-5 w-auto opacity-60" />
              <span className="text-xs" style={{ color: "var(--slds-text-muted)" }}>
                Vocus Reference Architecture · Internal
              </span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
