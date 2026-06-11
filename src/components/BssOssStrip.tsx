"use client";

import { BSS_OSS_ITEMS } from "@/data/journey";

export default function BssOssStrip() {
  const bss = BSS_OSS_ITEMS.filter((i) => i.category === "bss");
  const oss = BSS_OSS_ITEMS.filter((i) => i.category === "oss");

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: "1px solid var(--slds-border)", boxShadow: "var(--slds-shadow-sm)" }}
    >
      <div className="grid grid-cols-2 divide-x" style={{ borderColor: "var(--slds-border)" }}>
        {/* BSS */}
        <div>
          <div
            className="px-4 py-2 flex items-center justify-between"
            style={{ background: "var(--smb-bg)", borderBottom: "1px solid var(--slds-border)" }}
          >
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--smb-color)" }}>
              BSS · Business Support Systems
            </span>
            <span className="text-xs" style={{ color: "var(--slds-text-muted)" }}>
              Replace with Vocus stack
            </span>
          </div>
          <div
            className="grid grid-cols-4 divide-x"
            style={{ borderColor: "var(--slds-border)", background: "var(--slds-card-bg)" }}
          >
            {bss.map((item) => (
              <div key={item.id} className="px-3 py-3 text-center">
                <div className="text-sm font-semibold" style={{ color: "var(--slds-text-default)" }}>
                  {item.label}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--slds-text-muted)" }}>
                  Placeholder
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OSS */}
        <div>
          <div
            className="px-4 py-2 flex items-center justify-between"
            style={{ background: "var(--ent-bg)", borderBottom: "1px solid var(--slds-border)" }}
          >
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ent-color)" }}>
              OSS · Operations Support Systems
            </span>
            <span className="text-xs" style={{ color: "var(--slds-text-muted)" }}>
              Replace with Vocus stack
            </span>
          </div>
          <div
            className="grid grid-cols-4 divide-x"
            style={{ borderColor: "var(--slds-border)", background: "var(--slds-card-bg)" }}
          >
            {oss.map((item) => (
              <div key={item.id} className="px-3 py-3 text-center">
                <div className="text-sm font-semibold" style={{ color: "var(--slds-text-default)" }}>
                  {item.label}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--slds-text-muted)" }}>
                  Placeholder
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
