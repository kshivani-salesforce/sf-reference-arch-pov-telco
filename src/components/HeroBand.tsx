"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const rise: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

const STATS = [
  { value: "8", label: "journey stages" },
  { value: "10", label: "Salesforce clouds" },
  { value: "16", label: "Agentforce agents" },
  { value: "2", label: "speeds, one platform" },
];

export default function HeroBand() {
  return (
    <motion.header
      variants={container}
      initial="hidden"
      animate="show"
      className="relative overflow-hidden"
      style={{
        /* No solid fill or hard shadow ledge — the hero flows into the dark
           canvas. A faint top sheen + glows give it presence without a seam. */
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 40%)",
        borderBottom: "1px solid var(--slds-border)",
      }}
    >
      {/* Atmospheric glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(620px 320px at 88% -20%, rgba(255,138,76,0.22), transparent 60%), radial-gradient(560px 300px at 10% 130%, rgba(138,123,255,0.24), transparent 60%)",
        }}
      />

      <div className="relative px-8 py-7 flex items-end justify-between gap-8 flex-wrap">
        <div className="flex flex-col gap-3">
          {/* Lockup */}
          <motion.div variants={rise} className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Salesforce-Corporate-Logo-Cloud-RBG.svg"
              alt="Salesforce"
              className="h-7 w-auto brightness-0 invert"
            />
            <span className="text-white/40 text-lg font-light">/</span>
            <span
              className="text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: "#ff8a4c" }}
            >
              Vocus
            </span>
            <span
              className="ml-2 text-[10px] font-semibold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
              style={{ color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.22)" }}
            >
              Reference Architecture
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={rise}
            className="font-display text-white leading-[0.98] tracking-tight"
            style={{ fontSize: "44px", fontWeight: 800 }}
          >
            One platform.{" "}
            <span
              style={{
                background: "linear-gradient(100deg, #ff8a4c 0%, #4aa3ff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Two speeds.
            </span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="text-sm max-w-[640px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.74)" }}
          >
            The full Salesforce platform across the Vocus fibre customer journey: high-volume
            self-serve SMB and relationship-led Enterprise, running on the same foundation,
            orchestrated end to end by Agentforce.
          </motion.p>
        </div>

        {/* Stat chips */}
        <motion.div variants={rise} className="flex items-stretch gap-2.5">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-xl px-4 py-3 text-center min-w-[92px]"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.14)",
                backdropFilter: "blur(6px)",
              }}
            >
              <div
                className="font-display leading-none"
                style={{ fontSize: "28px", fontWeight: 800, color: "#fff" }}
              >
                {s.value}
              </div>
              <div
                className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider leading-tight"
                style={{ color: "rgba(255,255,255,0.62)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.header>
  );
}
