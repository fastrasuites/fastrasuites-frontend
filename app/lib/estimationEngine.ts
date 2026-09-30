export type LocationKey =
  | "lagos_island"
  | "lagos_mainland"
  | "abuja"
  | "port_harcourt";

export type TypologyKey =
  | "residential"
  | "commercial"
  | "infrastructure"
  | "institutional"
  | "industrial"
  | "mixed_use"
  | "specialised";

export type FinishKey = "shell" | "standard" | "premium";

export interface LocationRate {
  label: string;
  cementPerBag: number;
  steelPerTon: number;
  sandPerLoad: number;
}

export interface TypologySpec {
  label: string;
  desc: string;
  cementBagsPerM2: number;
  steelTonsPerM2: number;
  sandTonsPerM2: number;
}

export interface FinishSpec {
  label: string;
  multiplier: number;
}

export interface EstimateInputs {
  location: LocationKey;
  typology: TypologyKey;
  gfa: number;
  finish: FinishKey;
}

export interface EstimateResult {
  inputs: {
    location: LocationKey;
    locationLabel: string;
    typology: TypologyKey;
    typologyLabel: string;
    gfa: number;
    finish: FinishKey;
    finishLabel: string;
    finishMultiplier: number;
  };
  rates: LocationRate;
  quantities: {
    cementBags: number;
    cementBagsRaw: number;
    steelTons: number;
    sandTons: number;
    sandLoads: number;
  };
  costs: {
    cement: number;
    steel: number;
    sand: number;
    materialsTotal: number;
    finishUplift: number;
    baseTotal: number;
    rangeLow: number;
    rangeHigh: number;
    costPerM2: number;
    atRisk: number;
  };
  generatedAt: string;
}

export interface LeadData {
  fullName: string;
  company: string;
  whatsapp: string;
  email: string;
}

export interface ValidationErrors {
  fullName?: string;
  company?: string;
  whatsapp?: string;
  email?: string;
}

export interface LeadValidation {
  valid: boolean;
  errors: ValidationErrors;
  clean: LeadData & { emailDomain: string; isFreeEmail: boolean };
}

export const CONFIG = {
  webhookUrl: "",
  webhookTimeoutMs: 8000,
  simulatedLatencyMs: 900,
  signupUrl: "https://app.fastrasuite.com/signup?plan=pro-trial",
  ratesReviewedOn: "2026-09-01",
  rangeMargin: 0.07,
  rangeRoundTo: 10000,
  leakageRate: 0.35,
  sandTonsPerLoad: 20,
  gfaMin: 50,
  gfaMax: 5000,
  gfaDefault: 250,
  source: "nmpe-landing-widget",
} as const;

export const LOCATIONS: Record<LocationKey, LocationRate> = {
  lagos_island: {
    label: "Lagos (Island)",
    cementPerBag: 10000,
    steelPerTon: 820000,
    sandPerLoad: 140000,
  },
  lagos_mainland: {
    label: "Lagos (Mainland)",
    cementPerBag: 9500,
    steelPerTon: 790000,
    sandPerLoad: 110000,
  },
  abuja: {
    label: "Abuja (FCT)",
    cementPerBag: 10500,
    steelPerTon: 840000,
    sandPerLoad: 130000,
  },
  port_harcourt: {
    label: "Port Harcourt",
    cementPerBag: 10200,
    steelPerTon: 810000,
    sandPerLoad: 120000,
  },
};

export const TYPOLOGIES: Record<TypologyKey, TypologySpec> = {
  residential: {
    label: "Residential Construction",
    desc: "Detached homes, duplexes, terrace houses and multi-storey apartment blocks in private estates and urban housing schemes.",
    cementBagsPerM2: 3.0,
    steelTonsPerM2: 0.04,
    sandTonsPerM2: 0.18,
  },
  commercial: {
    label: "Commercial Construction",
    desc: "Income-generating structures: office buildings, shopping malls, hotels, banking halls and leisure facilities.",
    cementBagsPerM2: 4.2,
    steelTonsPerM2: 0.065,
    sandTonsPerM2: 0.25,
  },
  infrastructure: {
    label: "Infrastructure & Heavy Civil Engineering",
    desc: "Highways, bridges, flyovers, rail, airports, ports, jetties, dams and drainage. Enter deck / pavement / plan area in m².",
    cementBagsPerM2: 5.5,
    steelTonsPerM2: 0.09,
    sandTonsPerM2: 0.35,
  },
  institutional: {
    label: "Institutional & Public Buildings",
    desc: "Universities, secondary schools, teaching hospitals, primary healthcare centres and government secretariats.",
    cementBagsPerM2: 4.0,
    steelTonsPerM2: 0.06,
    sandTonsPerM2: 0.24,
  },
  industrial: {
    label: "Industrial Construction",
    desc: "Factories, refineries, petrochemical plants, power stations and large warehouses (heavy-duty slabs and equipment bases).",
    cementBagsPerM2: 4.8,
    steelTonsPerM2: 0.075,
    sandTonsPerM2: 0.3,
  },
  mixed_use: {
    label: "Mixed-Use Developments",
    desc: "Integrated residential, office and retail space in one property or master-planned precinct.",
    cementBagsPerM2: 4.5,
    steelTonsPerM2: 0.07,
    sandTonsPerM2: 0.27,
  },
  specialised: {
    label: "Specialised & Renovation Works",
    desc: "Rehabilitation and retrofitting, sports stadia, cultural centres and heritage restorations. Scope varies widely; treat as a rough guide.",
    cementBagsPerM2: 3.5,
    steelTonsPerM2: 0.05,
    sandTonsPerM2: 0.2,
  },
};

export const FINISHES: Record<FinishKey, FinishSpec> = {
  shell: { label: "Core Structural Shell Only", multiplier: 1.0 },
  standard: { label: "Standard Finish", multiplier: 1.65 },
  premium: { label: "Premium Finish", multiplier: 2.4 },
};

const numFmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const decFmt = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatNaira(n: number): string {
  return "₦" + numFmt.format(Math.round(n));
}

export function formatNairaCompact(n: number): string {
  if (n >= 1e9) return "₦" + decFmt.format(n / 1e9) + "bn";
  if (n >= 1e6) return "₦" + decFmt.format(n / 1e6) + "m";
  return formatNaira(n);
}

export function formatNumber(n: number): string {
  return numFmt.format(n);
}

export function formatDecimal(n: number): string {
  return decFmt.format(n);
}

export function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function round6(n: number): number {
  return Math.round(n * 1e6) / 1e6;
}
function round3(n: number): number {
  return Math.round(n * 1e3) / 1e3;
}
function round2(n: number): number {
  return Math.round(n * 1e2) / 1e2;
}

export function calculateEstimate(inputs: EstimateInputs): EstimateResult {
  const loc = LOCATIONS[inputs.location];
  const typ = TYPOLOGIES[inputs.typology];
  const fin = FINISHES[inputs.finish];
  if (!loc || !typ || !fin) {
    throw new Error("Invalid estimation inputs");
  }
  if (
    !Number.isFinite(inputs.gfa) ||
    inputs.gfa < CONFIG.gfaMin ||
    inputs.gfa > CONFIG.gfaMax
  ) {
    throw new Error("GFA out of range");
  }

  const gfa = inputs.gfa;

  const cementBagsRaw = gfa * typ.cementBagsPerM2;
  const steelTons = gfa * typ.steelTonsPerM2;
  const sandTons = gfa * typ.sandTonsPerM2;

  const cementBags = Math.ceil(round6(cementBagsRaw));
  const sandLoads = Math.ceil(round6(sandTons / CONFIG.sandTonsPerLoad));

  const cementCost = cementBags * loc.cementPerBag;
  const steelCost = steelTons * loc.steelPerTon;
  const sandCost = sandLoads * loc.sandPerLoad;

  const materialsTotal = cementCost + steelCost + sandCost;
  const baseTotal = materialsTotal * fin.multiplier;
  const finishUplift = baseTotal - materialsTotal;

  const step = CONFIG.rangeRoundTo;
  const low =
    Math.floor((baseTotal * (1 - CONFIG.rangeMargin)) / step) * step;
  const high =
    Math.ceil((baseTotal * (1 + CONFIG.rangeMargin)) / step) * step;

  return {
    inputs: {
      location: inputs.location,
      locationLabel: loc.label,
      typology: inputs.typology,
      typologyLabel: typ.label,
      gfa,
      finish: inputs.finish,
      finishLabel: fin.label,
      finishMultiplier: fin.multiplier,
    },
    rates: { ...loc },
    quantities: {
      cementBags,
      cementBagsRaw: round2(cementBagsRaw),
      steelTons: round3(steelTons),
      sandTons: round2(sandTons),
      sandLoads,
    },
    costs: {
      cement: Math.round(cementCost),
      steel: Math.round(steelCost),
      sand: Math.round(sandCost),
      materialsTotal: Math.round(materialsTotal),
      finishUplift: Math.round(finishUplift),
      baseTotal: Math.round(baseTotal),
      rangeLow: low,
      rangeHigh: high,
      costPerM2: Math.round(baseTotal / gfa),
      atRisk: Math.round(baseTotal * CONFIG.leakageRate),
    },
    generatedAt: new Date().toISOString(),
  };
}

export function normaliseNigerianMobile(input: string): string | null {
  const digits = String(input).replace(/[\s\-().]/g, "");
  const m = digits.match(/^(?:\+?234|0)?([789][01]\d{8})$/);
  return m ? "+234" + m[1] : null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "aol.com",
  "ymail.com",
  "proton.me",
  "protonmail.com",
];

export function validateLead(raw: {
  fullName: string;
  company: string;
  whatsapp: string;
  email: string;
}): LeadValidation {
  const errors: ValidationErrors = {};

  const name = raw.fullName.trim().replace(/\s+/g, " ");
  if (name.length < 3 || !/[a-zA-Z\u00C0-\u024F]/.test(name)) {
    errors.fullName = "Please enter your full name.";
  } else if (name.split(" ").length < 2) {
    errors.fullName = "Please enter both first and last name.";
  }

  const company = raw.company.trim();
  if (company.length < 2) {
    errors.company = "Please enter your company name.";
  }

  if (!raw.whatsapp.trim()) {
    errors.whatsapp = "WhatsApp number is required.";
  } else if (!normaliseNigerianMobile(raw.whatsapp)) {
    errors.whatsapp = "Enter a valid Nigerian mobile number, e.g. 0803 123 4567.";
  }

  const email = raw.email.trim().toLowerCase();
  if (!email) {
    errors.email = "Business email is required.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const domain = email.split("@")[1] || "";

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    clean: {
      fullName: name,
      company,
      whatsapp: normaliseNigerianMobile(raw.whatsapp) ?? "",
      email,
      emailDomain: domain,
      isFreeEmail: FREE_EMAIL_DOMAINS.includes(domain),
    },
  };
}

export function buildLeadPayload(
  lead: LeadData & { emailDomain: string; isFreeEmail: boolean },
  estimate: EstimateResult
): unknown {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const utm: Record<string, string> = {};
  [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
  ].forEach((k) => {
    if (params.get(k)) utm[k] = params.get(k) as string;
  });

  const [firstname, ...rest] = lead.fullName.split(" ");

  return {
    event: "estimate_lead_captured",
    source: CONFIG.source,
    submittedAt: new Date().toISOString(),
    contact: {
      firstname,
      lastname: rest.join(" "),
      fullName: lead.fullName,
      company: lead.company,
      whatsapp: lead.whatsapp,
      email: lead.email,
      emailDomain: lead.emailDomain,
      isFreeEmail: lead.isFreeEmail,
    },
    project: {
      location: estimate.inputs.locationLabel,
      typology: estimate.inputs.typologyLabel,
      gfaM2: estimate.inputs.gfa,
      finishStandard: estimate.inputs.finishLabel,
    },
    estimate: {
      baseTotalNGN: estimate.costs.baseTotal,
      rangeLowNGN: estimate.costs.rangeLow,
      rangeHighNGN: estimate.costs.rangeHigh,
      costPerM2NGN: estimate.costs.costPerM2,
      cementBags: estimate.quantities.cementBags,
      steelTons: estimate.quantities.steelTons,
      sandTipperLoads: estimate.quantities.sandLoads,
    },
    attribution: {
      pageUrl: typeof window !== "undefined" ? window.location.href : null,
      referrer: typeof document !== "undefined"
        ? document.referrer || null
        : null,
      ...utm,
    },
    client: {
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      language: typeof navigator !== "undefined" ? navigator.language : null,
      timezone:
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : null,
    },
  };
}

export function buildCsv(est: EstimateResult): string {
  const q = (v: unknown): string =>
    '"' + String(v).replace(/"/g, '""') + '"';
  const rows: unknown[][] = [];
  rows.push(["Dynamic Material Price & Project Estimation Engine"]);
  rows.push(["Generated", new Date(est.generatedAt).toLocaleString("en-NG")]);
  rows.push(["Rates reviewed", CONFIG.ratesReviewedOn]);
  rows.push([]);
  rows.push(["PROJECT"]);
  rows.push(["Location", est.inputs.locationLabel]);
  rows.push(["Typology", est.inputs.typologyLabel]);
  rows.push(["Gross Floor Area (m2)", est.inputs.gfa]);
  rows.push([
    "Finish Standard",
    est.inputs.finishLabel + " (x" + est.inputs.finishMultiplier.toFixed(2) + ")",
  ]);
  rows.push([]);
  rows.push(["MATERIAL BREAKDOWN", "Quantity", "Unit", "Unit Rate (NGN)", "Cost (NGN)"]);
  rows.push(["Cement", est.quantities.cementBags, "bags", est.rates.cementPerBag, est.costs.cement]);
  rows.push(["Reinforcement Steel (TMT)", est.quantities.steelTons, "tons", est.rates.steelPerTon, est.costs.steel]);
  rows.push(["Sharp Sand", est.quantities.sandLoads, "20-ton tipper loads", est.rates.sandPerLoad, est.costs.sand]);
  rows.push(["Core materials subtotal", "", "", "", est.costs.materialsTotal]);
  rows.push(["Finish standard uplift", "", "", "", est.costs.finishUplift]);
  rows.push(["BASE ESTIMATE", "", "", "", est.costs.baseTotal]);
  rows.push(["Range low (-7%)", "", "", "", est.costs.rangeLow]);
  rows.push(["Range high (+7%)", "", "", "", est.costs.rangeHigh]);
  rows.push(["Cost per m2", "", "", "", est.costs.costPerM2]);
  rows.push([]);
  rows.push(["2026 PRICING MATRIX (ALL LOCATIONS)", "Cement (NGN/bag)", "Steel TMT (NGN/ton)", "Sharp Sand (NGN/20-ton load)"]);
  Object.values(LOCATIONS).forEach((l) =>
    rows.push([l.label, l.cementPerBag, l.steelPerTon, l.sandPerLoad])
  );
  rows.push([]);
  rows.push(["QUANTITY MULTIPLIERS (per m2 GFA)", "Cement (bags)", "Steel (tons)", "Sharp Sand (tons)"]);
  Object.values(TYPOLOGIES).forEach((t) =>
    rows.push([t.label, t.cementBagsPerM2, t.steelTonsPerM2, t.sandTonsPerM2])
  );
  rows.push([]);
  rows.push([
    "Indicative benchmark only. Excludes land, approvals, professional fees, VAT and site-specific ground conditions.",
  ]);
  return "\uFEFF" + rows.map((r) => r.map(q).join(",")).join("\r\n");
}

export function downloadCsv(est: EstimateResult): void {
  const csv = buildCsv(est);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `pricing-matrix_${est.inputs.location}_${est.inputs.gfa}m2_${est.generatedAt.slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function formatRatesReviewed(date: string): string {
  return new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
