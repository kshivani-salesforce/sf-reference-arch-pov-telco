export type Track = "shared" | "smb" | "enterprise";
export type CloudKey =
  | "marketing-cloud"
  | "sales-cloud"
  | "comms-cloud"
  | "data-cloud"
  | "service-cloud"
  | "field-service"
  | "mulesoft"
  | "agentforce"
  | "slack"
  | "experience-cloud";

export interface CloudMeta {
  key: CloudKey;
  name: string;
  shortName: string;
  color: string;
  seRole: string;
  icon?: string;
}

export interface Capability {
  title: string;
  detail: string;
}

export interface JourneyNode {
  id: string;
  stage: number;
  track: Track;
  label: string;
  cloud: CloudKey;
  capabilities: Capability[];
  agentforceTouch?: string;
  isForkPoint?: boolean;
  isMergePoint?: boolean;
}

export interface BssOssItem {
  id: string;
  label: string;
  category: "bss" | "oss";
}

export interface AgentforceRibbonItem {
  stage: number;
  agents: string[];
}

// ── Cloud registry ────────────────────────────────────────────────────────────

export const CLOUDS: Record<CloudKey, CloudMeta> = {
  "marketing-cloud": {
    key: "marketing-cloud",
    name: "Marketing Cloud",
    shortName: "Marketing",
    color: "#FF6B35",
    seRole: "Marketing Cloud SE",
    icon: "/Marketing-3D-Product-Icon-Left-RGB.png",
  },
  "sales-cloud": {
    key: "sales-cloud",
    name: "Sales Cloud",
    shortName: "Sales",
    color: "#0EA58A",
    seRole: "Sales Cloud SE",
    icon: "/Sales-3D-Product-Icon-Right-RGB.png",
  },
  "comms-cloud": {
    key: "comms-cloud",
    name: "Communications Cloud",
    shortName: "Comms Cloud",
    color: "#1B5DB5",
    seRole: "Communications Cloud SE",
    icon: "/Communications-3D-Product-Icon-Right-RGB.png",
  },
  "data-cloud": {
    key: "data-cloud",
    name: "Data Cloud",
    shortName: "Data Cloud",
    color: "#06AED4",
    seRole: "Data Cloud SE",
    icon: "/Data-360-3D-Product-Icon-Right-RGB.png",
  },
  "service-cloud": {
    key: "service-cloud",
    name: "Service Cloud",
    shortName: "Service",
    color: "#E3066A",
    seRole: "Service Cloud SE",
    icon: "/Service-3D-Product-Icon-Straight-RGB.png",
  },
  "field-service": {
    key: "field-service",
    name: "Field Service",
    shortName: "Field Service",
    color: "#3BA755",
    seRole: "Field Service SE",
    icon: "/Service-3D-Product-Icon-Straight-RGB.png",
  },
  mulesoft: {
    key: "mulesoft",
    name: "MuleSoft",
    shortName: "MuleSoft",
    color: "#00A1E0",
    seRole: "MuleSoft Integration SE",
    icon: "/Mulesoft-3D-Product-Icon-Right-RGB.png",
  },
  agentforce: {
    key: "agentforce",
    name: "Agentforce",
    shortName: "Agentforce",
    color: "#0176D3",
    seRole: "Agentforce / AI SE",
    icon: "/Agentforce-Flat-3D-Product-Icon-Right-RGB.png",
  },
  slack: {
    key: "slack",
    name: "Slack",
    shortName: "Slack",
    color: "#4A154B",
    seRole: "Slack / Collaboration SE",
    icon: "/Slack-3D-Product-Icon-Straight-RGB.png",
  },
  "experience-cloud": {
    key: "experience-cloud",
    name: "Experience Cloud",
    shortName: "Experience",
    color: "#E07400",
    seRole: "Experience Cloud SE",
    icon: "/IT-3D-Product-Icon-Right-RGB.png",
  },
};

// ── Journey nodes ─────────────────────────────────────────────────────────────
// Stages 1-8. Track forks at stage 3 (Quoting/CPQ) and merges back at stage 6 (Service).
// Communications Cloud owns both SMB and Enterprise quoting via the Enterprise Product Catalogue (EPC).
// Billing at stage 7 is where Revenue Cloud can optionally layer on top.

export const JOURNEY_NODES: JourneyNode[] = [
  // STAGE 1: Marketing and Demand Gen
  {
    id: "s1-demand-gen",
    stage: 1,
    track: "shared",
    label: "Demand Gen and Segmentation",
    cloud: "marketing-cloud",
    capabilities: [
      { title: "Audience segmentation", detail: "Segment SMB prospects by industry, size, and location using unified Data Cloud profiles." },
      { title: "Multi-channel campaigns", detail: "Email, SMS, and paid media campaigns targeting SMB fibre acquisition." },
      { title: "Lead scoring", detail: "AI-powered scoring ranks inbound leads before they reach sales." },
      { title: "Journey automation", detail: "Automated nurture sequences keep prospects warm from first touch to qualified lead." },
    ],
    agentforceTouch: "Campaign Optimisation Agent monitors performance and suggests budget reallocation in real time.",
  },
  {
    id: "s1-data-foundation",
    stage: 1,
    track: "shared",
    label: "Unified Customer Profile",
    cloud: "data-cloud",
    capabilities: [
      { title: "Identity resolution", detail: "Unifies prospect data across web, CRM, and partner channels into a single profile." },
      { title: "Real-time data activation", detail: "Activates segments instantly into Marketing Cloud and Sales Cloud." },
      { title: "Predictive propensity", detail: "Churn prediction and upsell propensity models fed by historical telco data." },
      { title: "Consent management", detail: "Centralised consent and preference data ensures compliant outreach." },
    ],
    agentforceTouch: "Data Cloud feeds the Agentforce reasoning layer with live customer context at every stage.",
  },

  // STAGE 2: Digital Acquisition and Lead
  {
    id: "s2-digital-acquisition",
    stage: 2,
    track: "shared",
    label: "Digital Self-Serve Portal",
    cloud: "experience-cloud",
    capabilities: [
      { title: "SMB self-serve portal", detail: "Branded portal for SMBs to browse fibre plans, check availability, and initiate orders without a sales call." },
      { title: "Partner and reseller portal", detail: "Dedicated portal for Vocus partners to quote, order, and manage customer accounts." },
      { title: "Knowledge base", detail: "Self-service FAQs and troubleshooting content reduces inbound call volume." },
      { title: "Community forums", detail: "Peer-to-peer support community for SMB customers." },
    ],
    agentforceTouch: "Embedded AI assistant guides SMB customers through plan selection and checks fibre service availability.",
  },
  {
    id: "s2-lead-opportunity",
    stage: 2,
    track: "shared",
    label: "Lead and Opportunity Management",
    cloud: "sales-cloud",
    capabilities: [
      { title: "Lead capture and routing", detail: "Web-to-lead captures inbound interest and routes to the right rep or digital flow." },
      { title: "Account and contact 360", detail: "Full account history, contacts, and interactions in a single view." },
      { title: "Opportunity pipeline", detail: "Tracks deals through stages with forecast roll-up for management visibility." },
      { title: "Activity timeline", detail: "Calls, emails, and meetings are all logged and surfaced in context for every rep." },
    ],
    agentforceTouch: "Sales Development Agent auto-researches new leads, drafts outreach emails, and updates opportunity stages.",
  },

  // STAGE 3: Quoting and CPQ (fork point)
  // Both tracks use Communications Cloud EPC. SMB uses the guided catalogue; Enterprise uses full CPQ configuration.
  {
    id: "s3-smb-quote",
    stage: 3,
    track: "smb",
    label: "Guided Product Catalogue",
    cloud: "comms-cloud",
    isForkPoint: true,
    capabilities: [
      { title: "Commercial product catalogue", detail: "Pre-configured fibre plans, bundles, and add-ons ready to select via the Communications Cloud EPC." },
      { title: "Availability check", detail: "Real-time fibre coverage check integrated into the quoting flow." },
      { title: "Instant quoting", detail: "Guided quote in a few clicks covering plan, term, and optional extras." },
      { title: "Digital contract", detail: "E-signature via integrated contract generation, no paper required." },
    ],
    agentforceTouch: "Plan Recommendation Agent suggests the right product bundle based on business size, usage patterns, and location.",
  },
  {
    id: "s3-enterprise-quote",
    stage: 3,
    track: "enterprise",
    label: "Configure, Price, Quote",
    cloud: "comms-cloud",
    isForkPoint: true,
    capabilities: [
      { title: "Enterprise Product Catalogue (EPC)", detail: "Multi-site, multi-product enterprise deals configured using the Communications Cloud EPC with full dependency management." },
      { title: "Approval workflows", detail: "Discount approvals, legal sign-off, and commercial desk routing built into the quoting flow." },
      { title: "Contract lifecycle management", detail: "Automated contract generation, redlines, and e-signature for enterprise terms." },
      { title: "Complex bundling", detail: "Fibre, voice, managed services, and SD-WAN bundled into a single commercial offer." },
    ],
    agentforceTouch: "Deal Desk Agent flags non-standard terms, suggests precedent clauses, and escalates to Slack for human approval.",
  },

  // STAGE 4: Order Management
  {
    id: "s4-order-mgmt",
    stage: 4,
    track: "shared",
    label: "Order Management",
    cloud: "comms-cloud",
    capabilities: [
      { title: "Order decomposition", detail: "Customer order is broken into technical order items and sent to the right fulfilment workstreams." },
      { title: "Order orchestration", detail: "Manages order lifecycle across multiple back-end systems with visibility at each step." },
      { title: "Fallout management", detail: "Automated fallout detection with retry logic and human escalation when needed." },
      { title: "Order status portal", detail: "Customer and partner-facing order status visible in real time via the Experience Cloud portal." },
    ],
    agentforceTouch: "Order Tracking Agent proactively notifies customers of milestone updates and predicted delays.",
  },
  {
    id: "s4-integration",
    stage: 4,
    track: "shared",
    label: "Integration and OSS Handoff",
    cloud: "mulesoft",
    capabilities: [
      { title: "OSS/BSS connectivity", detail: "MuleSoft API layer connects Salesforce order management to Vocus BSS/OSS for billing, provisioning, and network." },
      { title: "Real-time event streaming", detail: "Network provisioning events flow back into Salesforce to update order and case records." },
      { title: "Partner system integration", detail: "NBN Co and carrier partner APIs integrated for availability checks and wholesale ordering." },
      { title: "API-led connectivity", detail: "Experience, Process, and System APIs enable reuse across all Salesforce clouds." },
    ],
    agentforceTouch: "Integration Monitor Agent alerts the operations team to API degradation before customers are impacted.",
  },

  // STAGE 5: Provisioning and Installation
  {
    id: "s5-field-service",
    stage: 5,
    track: "shared",
    label: "Field Service and Installation",
    cloud: "field-service",
    capabilities: [
      { title: "Intelligent scheduling", detail: "AI-optimised technician dispatch based on skills, location, and availability." },
      { title: "Mobile technician app", detail: "Field technicians get job details, customer history, and step-by-step work instructions on mobile." },
      { title: "Asset management", detail: "Customer Premises Equipment tracked from warehouse to installation to retirement." },
      { title: "Job completion and handoff", detail: "Digital job completion triggers automated provisioning confirmation back to the customer." },
    ],
    agentforceTouch: "Scheduling Agent dynamically re-routes field technicians in response to cancellations or traffic, with no dispatcher required.",
  },
  {
    id: "s5-slack-ops",
    stage: 5,
    track: "shared",
    label: "Ops Collaboration",
    cloud: "slack",
    capabilities: [
      { title: "Deal and order rooms", detail: "Auto-created Slack channels for complex orders bring together SE, ops, and delivery teams in context." },
      { title: "Salesforce in Slack", detail: "CRM records, order status, and case details surface directly inside Slack conversations." },
      { title: "Approval flows", detail: "Discount approvals, exception handling, and escalations resolved inside Slack with a full audit trail." },
      { title: "Incident war rooms", detail: "Network incidents trigger Slack channels with the right people and runbook links attached." },
    ],
    agentforceTouch: "Agentforce agents post proactive updates into Slack channels so no human needs to pull status.",
  },

  // STAGE 6: Service and Support (merge point)
  {
    id: "s6-smb-service",
    stage: 6,
    track: "smb",
    label: "AI-Assisted Self-Service",
    cloud: "service-cloud",
    isMergePoint: true,
    capabilities: [
      { title: "AI case deflection", detail: "Agentforce handles the majority of SMB service requests including billing queries, fault triage, and plan changes without a human agent." },
      { title: "Omnichannel routing", detail: "Chat, email, phone, and social all route to the right queue with full context." },
      { title: "Knowledge-powered resolution", detail: "AI surfaces the right knowledge article to agents and customers simultaneously." },
      { title: "Automated escalation", detail: "Sentiment detection escalates frustrated customers to a human agent before they churn." },
    ],
    agentforceTouch: "Service Agent resolves around 60% of SMB contacts autonomously, escalating with full context when a human is needed.",
  },
  {
    id: "s6-enterprise-service",
    stage: 6,
    track: "enterprise",
    label: "Dedicated CSM and SLA Management",
    cloud: "service-cloud",
    isMergePoint: true,
    capabilities: [
      { title: "Named CSM assignment", detail: "Enterprise accounts have a dedicated Customer Success Manager with a shared Salesforce workspace." },
      { title: "SLA tracking", detail: "Real-time SLA compliance dashboard for each enterprise customer covering downtime, MTTR, and NPS." },
      { title: "Proactive health scoring", detail: "Account health score surfaces at-risk enterprise accounts before renewal conversations begin." },
      { title: "Executive business reviews", detail: "Automated EBR packs generated from Salesforce data and delivered via Slack or email." },
    ],
    agentforceTouch: "CSM Assist Agent prepares EBR briefs, surfaces open issues, and drafts renewal talking points ahead of customer meetings.",
  },

  // STAGE 7: Billing and Collections
  {
    id: "s7-billing",
    stage: 7,
    track: "shared",
    label: "Billing and Collections",
    cloud: "comms-cloud",
    capabilities: [
      { title: "Convergent billing", detail: "Single bill for all Vocus products including fibre, voice, and managed services with full itemisation." },
      { title: "Self-serve billing portal", detail: "Customers view invoices, download statements, and update payment methods in the Experience Cloud portal." },
      { title: "Usage-based charging", detail: "Real-time usage data from OSS drives accurate billing for burstable and metered services." },
      { title: "Collections workflow", detail: "Automated dunning sequences with escalation to human collections agents for at-risk accounts." },
    ],
    agentforceTouch: "Collections Agent handles payment plan requests and disputes autonomously, escalating edge cases to staff.",
  },
  {
    id: "s7-rating",
    stage: 7,
    track: "shared",
    label: "Usage Rating and Charging",
    cloud: "mulesoft",
    capabilities: [
      { title: "Real-time mediation", detail: "MuleSoft mediates raw network usage events from the OSS into rateable records, ready for the billing engine." },
      { title: "Convergent rating", detail: "Fibre, voice, and managed-service usage rated against catalogue pricing so every product lands on one convergent bill." },
      { title: "Burstable and metered charging", detail: "Supports usage-based and burstable plans with accurate, near-real-time charge calculation for SMB and Enterprise alike." },
      { title: "Revenue assurance", detail: "Reconciliation between mediated usage, rated charges, and the BSS billing engine catches leakage before it reaches the invoice." },
    ],
    agentforceTouch: "Integration Monitor Agent watches the usage-to-bill pipeline and flags rating anomalies or feed failures before they affect a bill run.",
  },

  // STAGE 8: Retention and Growth
  {
    id: "s8-retention",
    stage: 8,
    track: "shared",
    label: "Retention and Churn Prevention",
    cloud: "data-cloud",
    capabilities: [
      { title: "Churn propensity model", detail: "ML model scores every customer monthly on likelihood to churn and triggers proactive save campaigns." },
      { title: "Next best action", detail: "Data Cloud surfaces the right retention offer or upsell at the right moment for each customer." },
      { title: "Renewal triggers", detail: "Automated alerts to CSMs and AEs when contracts are 90, 60, or 30 days from expiry." },
      { title: "Lifecycle analytics", detail: "Full customer lifetime value, product adoption, and satisfaction trends in a single dashboard." },
    ],
    agentforceTouch: "Retention Agent proactively reaches out to at-risk SMBs with personalised offers before they call to cancel.",
  },
  {
    id: "s8-upsell",
    stage: 8,
    track: "shared",
    label: "Upsell and Cross-sell",
    cloud: "sales-cloud",
    capabilities: [
      { title: "Whitespace analysis", detail: "Identifies products the customer does not yet have based on their profile and peer benchmarks." },
      { title: "Cross-cloud upsell motions", detail: "Coordinated plays between Sales, Marketing, and CSM triggered by Data Cloud signals." },
      { title: "Partner referral tracking", detail: "Partner-sourced upsell opportunities tracked and compensated through the partner portal." },
      { title: "Territory and quota management", detail: "Sales territory planning ensures the right AE owns the right renewal and expansion conversations." },
    ],
    agentforceTouch: "Sales Coach Agent briefs AEs on expansion opportunities before each customer call.",
  },
];

// ── Agentforce ribbon ─────────────────────────────────────────────────────────

export const AGENTFORCE_RIBBON: AgentforceRibbonItem[] = [
  { stage: 1, agents: ["Campaign Optimisation Agent", "Audience Insights Agent"] },
  { stage: 2, agents: ["Sales Development Agent", "Digital Assist Agent"] },
  { stage: 3, agents: ["Plan Recommendation Agent", "Deal Desk Agent"] },
  { stage: 4, agents: ["Order Tracking Agent", "Integration Monitor Agent"] },
  { stage: 5, agents: ["Scheduling Agent", "Ops Coordination Agent"] },
  { stage: 6, agents: ["Service Agent (SMB)", "CSM Assist Agent (Enterprise)"] },
  { stage: 7, agents: ["Collections Agent", "Billing Query Agent"] },
  { stage: 8, agents: ["Retention Agent", "Sales Coach Agent"] },
];

// ── BSS / OSS foundation strip ────────────────────────────────────────────────

export const BSS_OSS_ITEMS: BssOssItem[] = [
  { id: "bss-billing",   label: "Billing",          category: "bss" },
  { id: "bss-charging",  label: "Charging",         category: "bss" },
  { id: "bss-catalogue", label: "Product Catalogue", category: "bss" },
  { id: "bss-mediation", label: "Mediation",        category: "bss" },
  { id: "oss-provision", label: "Provisioning",     category: "oss" },
  { id: "oss-config",    label: "Network Config",   category: "oss" },
  { id: "oss-fault",     label: "Fault Management", category: "oss" },
  { id: "oss-perf",      label: "Performance",      category: "oss" },
];

// ── Stage metadata ────────────────────────────────────────────────────────────

export const STAGES = [
  { num: 1, label: "Marketing",     sublabel: "and Demand Gen" },
  { num: 2, label: "Acquisition",   sublabel: "and Lead" },
  { num: 3, label: "Quoting",       sublabel: "and CPQ",        forks: true },
  { num: 4, label: "Order",         sublabel: "Management" },
  { num: 5, label: "Provisioning",  sublabel: "and Installation" },
  { num: 6, label: "Service",       sublabel: "and Support",    merges: true },
  { num: 7, label: "Billing",       sublabel: "and Collections" },
  { num: 8, label: "Retention",     sublabel: "and Growth" },
];
