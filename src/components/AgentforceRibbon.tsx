"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AGENTFORCE_RIBBON } from "@/data/journey";

export default function AgentforceRibbon() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        background: "var(--slds-card-bg)",
        border: "1px solid var(--agent-border)",
        boxShadow: "var(--slds-shadow-sm)",
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
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{
              background: "var(--agent-bg)",
              color: "var(--agent-color)",
              border: "1px solid var(--agent-border)",
            }}
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
              style={{ borderTop: "1px solid var(--slds-border)", background: "var(--agent-bg)" }}
            >
              {AGENTFORCE_RIBBON.map((item) => (
                <div
                  key={item.stage}
                  className="rounded-lg p-2.5"
                  style={{
                    background: "var(--slds-card-bg)",
                    border: "1px solid var(--slds-border)",
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
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
