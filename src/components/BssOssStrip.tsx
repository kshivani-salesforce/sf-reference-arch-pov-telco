"use client";

import { BSS_OSS_ITEMS } from "@/data/journey";

/** Credible system names so nothing reads as a placeholder on screen. */
const SYSTEM_NAMES: Record<string, string> = {
  "bss-billing": "Convergent billing engine",
  "bss-charging": "Real-time charging",
  "bss-catalogue": "Enterprise product catalogue",
  "bss-mediation": "Usage mediation",
  "oss-provision": "Service activation",
  "oss-config": "Network inventory",
  "oss-fault": "Assurance & fault",
  "oss-perf": "Performance telemetry",
};

export default function BssOssStrip() {
  const bss = BSS_OSS_ITEMS.filter((i) => i.category === "bss");
  const oss = BSS_OSS_ITEMS.filter((i) => i.category === "oss");

  const column = (
    items: typeof BSS_OSS_ITEMS,
    title: string,
    grad: string,
  ) => (
    <div>
      <div
        className="px-4 py-2.5 flex items-center justify-between"
        style={{ background: grad, borderBottom: "1px solid rgba(255,255,255,0.12)" }}
      >
        <span className="text-xs font-bold uppercase tracking-widest text-white">{title}</span>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
          Integrates with Vocus stack
        </span>
      </div>
      <div className="grid grid-cols-4 divide-x" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        {items.map((item) => (
          <div key={item.id} className="px-3 py-3.5 text-center">
            <div className="text-sm font-semibold text-white">{item.label}</div>
            <div className="text-xs mt-1 leading-snug" style={{ color: "rgba(255,255,255,0.55)" }}>
              {SYSTEM_NAMES[item.id]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className="rounded-xl overflow-hidden relative z-10"
      style={{
        background: "var(--grad-navy)",
        border: "1px solid var(--slds-border)",
        boxShadow: "var(--elev-2)",
      }}
    >
      <div className="grid grid-cols-2 divide-x" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        {column(
          bss,
          "BSS · Business Support Systems",
          "linear-gradient(135deg, rgba(1,118,211,0.55), rgba(1,118,211,0.15))",
        )}
        {column(
          oss,
          "OSS · Operations Support Systems",
          "linear-gradient(135deg, rgba(88,103,232,0.55), rgba(88,103,232,0.15))",
        )}
      </div>
    </div>
  );
}
