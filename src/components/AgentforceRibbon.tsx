"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AGENTFORCE_RIBBON } from "@/data/journey";

export default function AgentforceRibbon() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-xl overflow-hidden relative z-10"
      style={{
        background: "linear-gradient(160deg, rgba(27,150,255,0.16), rgba(13,27,46,0.6))",
        backdropFilter: "blur(8px)",
        border: "1px solid var(--agent-border)",
        boxShadow: "var(--glow-blue)",
      }}
    >
      <button
        className="w-full flex items-center justify-between px-5 py-3.5 text-left"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Agentforce-Flat-3D-Product-Icon-Right-RGB.png"
            alt="Agentforce"
            className="w-9 h-9 object-contain flex-shrink-0"
          />
          <div>
            <div className="text-sm font-bold" style={{ color: "var(--slds-text-title)" }}>
              Agentforce · AI Agent Layer
            </div>
            <div className="text-xs mt-0.5" style={{ color: "var(--agent-color)" }}>
              Active across all 8 journey stages
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full text-white"
            style={{ background: "var(--grad-platform)", boxShadow: "0 2px 10px -2px rgba(1,118,211,0.6)" }}
          >
            16 agents
          </span>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm"
            style={{ color: "var(--slds-text-weak)" }}
          >
            ▾
          </motion.span>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-4 pt-3 grid grid-cols-8 gap-2"
              style={{ borderTop: "1px solid var(--slds-border)", background: "rgba(0,0,0,0.18)" }}
            >
              {AGENTFORCE_RIBBON.map((item, idx) => (
                <motion.div
                  key={item.stage}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.04, ease: [0.23, 1, 0.32, 1] }}
                  className="rounded-lg p-2.5"
                  style={{
                    background: "var(--surface-lift)",
                    border: "1px solid var(--slds-border)",
                    boxShadow: "var(--elev-1)",
                  }}
                >
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-1.5"
                    style={{ color: "var(--agent-color)" }}
                  >
                    Stage {item.stage}
                  </div>
                  {item.agents.map((a, i) => (
                    <div
                      key={i}
                      className="text-xs leading-snug mb-1"
                      style={{ color: "var(--slds-text-weak)" }}
                    >
                      · {a}
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
