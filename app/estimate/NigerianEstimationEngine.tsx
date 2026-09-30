"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  CONFIG,
  LOCATIONS,
  TYPOLOGIES,
  FINISHES,
  calculateEstimate,
  validateLead,
  buildLeadPayload,
  downloadCsv,
  formatRatesReviewed,
  formatNaira,
  formatNairaCompact,
  formatNumber,
  formatDecimal,
  clamp,
  normaliseNigerianMobile,
  type LocationKey,
  type TypologyKey,
  type FinishKey,
  type EstimateResult,
  type ValidationErrors,
} from "../lib/estimationEngine";

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M5.2 7.2a1 1 0 011.4 0L10 10.6l3.4-3.4a1 1 0 111.4 1.4l-4.1 4.1a1 1 0 01-1.4 0L5.2 8.6a1 1 0 010-1.4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CalculatorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      {...props}
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 10h2M12 10h2M16 10h0M8 14h2M12 14h2M8 18h2M12 18h4" />
    </svg>
  );
}

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
    </svg>
  );
}

function EditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 20h4L19 9l-4-4L4 16v4z" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M4.3 4.3a1 1 0 011.4 0L10 8.6l4.3-4.3a1 1 0 011.4 1.4L11.4 10l4.3 4.3a1 1 0 01-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 01-1.4-1.4L8.6 10 4.3 5.7a1 1 0 010-1.4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M10.3 3.3a1 1 0 011.4 0l6 6a1 1 0 010 1.4l-6 6a1 1 0 01-1.4-1.4l4.3-4.3H3a1 1 0 110-2h11.6l-4.3-4.3a1 1 0 010-1.4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      {...props}
    >
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 118 0v4" />
    </svg>
  );
}

type LeadFormData = {
  fullName: string;
  company: string;
  whatsapp: string;
  email: string;
};

const finishNotes: Record<FinishKey, string> = {
  shell: "Structural elements, blockwork, no finishes",
  standard: "Local tiles, standard plumbing/electrical, emulsion paint",
  premium: "Imported finishes, POP ceilings, smart automation",
};

export default function EstimatePage() {
  const [location, setLocation] = useState<LocationKey>("lagos_mainland");
  const [typology, setTypology] = useState<TypologyKey>("residential");
  const [gfa, setGfa] = useState<number>(CONFIG.gfaDefault);
  const [gfaInput, setGfaInput] = useState<string>(String(CONFIG.gfaDefault));
  const [finish, setFinish] = useState<FinishKey>("shell");
  const [gfaError, setGfaError] = useState<string>("");

  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [lead, setLead] = useState<LeadFormData>({
    fullName: "",
    company: "",
    whatsapp: "",
    email: "",
  });
  const [leadErrors, setLeadErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const lastFocusRef = useRef<HTMLElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const loc = LOCATIONS[location];
  const typ = TYPOLOGIES[typology];
  const gfaPct = ((gfa - CONFIG.gfaMin) / (CONFIG.gfaMax - CONFIG.gfaMin)) * 100;

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showModal]);

  useEffect(() => {
    if (showModal && nameInputRef.current) {
      const timer = setTimeout(() => nameInputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  useEffect(() => {
    if (showResults && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => resultsRef.current?.focus({ preventScroll: true }), 300);
    }
  }, [showResults]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (showModal && e.key === "Escape" && !isSubmitting) {
        setShowModal(false);
        setTimeout(() => lastFocusRef.current?.focus(), 0);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showModal, isSubmitting]);

  function validateGfa(): boolean {
    const raw = gfaInput.trim();
    const v = Number(raw);
    if (raw === "" || !Number.isFinite(v)) {
      setGfaError("Enter a floor area in square metres.");
      return false;
    }
    if (v < CONFIG.gfaMin || v > CONFIG.gfaMax) {
      setGfaError(
        `GFA must be between ${formatNumber(CONFIG.gfaMin)} and ${formatNumber(CONFIG.gfaMax)} m².`
      );
      return false;
    }
    setGfaError("");
    setGfa(v);
    return true;
  }

  function handleCalculate(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateGfa()) return;
    try {
      const result = calculateEstimate({ location, typology, gfa, finish });
      setEstimate(result);
      console.log("[NMPE] Estimate calculated:", result);
      lastFocusRef.current = document.activeElement as HTMLElement;
      setShowModal(true);
    } catch (err) {
      console.error("[NMPE]", err);
      setGfaError("Could not calculate. Please check your inputs.");
    }
  }

  function handleGfaRangeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = Number(e.target.value);
    setGfa(v);
    setGfaInput(String(v));
    setGfaError("");
  }

  function handleGfaInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setGfaInput(raw);
    const v = Number(raw);
    if (raw !== "" && Number.isFinite(v)) {
      setGfa(clamp(v, CONFIG.gfaMin, CONFIG.gfaMax));
    }
    if (gfaError) validateGfa();
  }

  function handleGfaBlur() {
    const v = Number(gfaInput);
    if (gfaInput.trim() !== "" && Number.isFinite(v)) {
      const c = Math.round(clamp(v, CONFIG.gfaMin, CONFIG.gfaMax));
      setGfa(c);
      setGfaInput(String(c));
    }
    validateGfa();
  }

  function handleLocationChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLocation(e.target.value as LocationKey);
  }

  function handleTypologyChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setTypology(e.target.value as TypologyKey);
  }

  function handleLeadChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
    if (leadErrors[name as keyof ValidationErrors]) {
      setLeadErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleWhatsAppBlur(e: React.ChangeEvent<HTMLInputElement>) {
    const normalized = normaliseNigerianMobile(e.target.value);
    if (normalized) {
      const formatted = normalized
        .slice(4)
        .replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
      e.target.value = formatted;
      setLead((prev) => ({ ...prev, whatsapp: formatted }));
    }
  }

  async function handleLeadSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    const { valid, errors, clean } = validateLead(lead);
    setLeadErrors(errors);
    if (!valid) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, CONFIG.simulatedLatencyMs));

    console.log("[NMPE] Lead form data:", lead);
    if (estimate) {
      const payload = buildLeadPayload(clean, estimate);
      console.log("[NMPE] Lead payload:", payload);
      console.log("[NMPE] Estimate result:", estimate);
    }

    setIsSubmitting(false);
    setShowModal(false);
    setShowResults(true);
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setShowModal(false);
      setTimeout(() => lastFocusRef.current?.focus(), 0);
    }
  }

  function handleDownloadCsv() {
    if (estimate) downloadCsv(estimate);
  }

  function handleEdit() {
    setShowResults(false);
    setTimeout(() => document.getElementById("nmpe-calc-btn")?.focus(), 300);
  }

  function handleCtaClick() {
    console.info("[NMPE] CTA clicked", {
      event: "cta_protect_margins_click",
      estimate: estimate?.costs.baseTotal,
      email: lead.email,
    });
  }

  const finishOptions = Object.entries(FINISHES) as [FinishKey, typeof FINISHES[FinishKey]][];

  const rateItems = [
    { name: "Cement", unit: "per 50kg bag", val: loc.cementPerBag, icon: "🧱" },
    { name: "Steel TMT Rebars", unit: "per ton", val: loc.steelPerTon, icon: "🔩" },
    { name: "Sharp Sand", unit: "per 20-ton tipper", val: loc.sandPerLoad, icon: "🚚" },
  ];

  return (
    <>
      {/* Full-width dark navy hero strip — extends behind the fixed Header */}
      {!showResults && (
        <div
          className="relative w-full bg-[#0c1524] pt-[80px] sm:pt-[96px]"
          style={{
            backgroundImage: `linear-gradient(to right, #0c1524 35%, rgba(12, 21, 36, 0.6) 65%, rgba(12, 21, 36, 0.25) 90%), url('/hero_bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "right top",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c1524]/85 via-[#0c1524]/80 to-[#0c1524] pointer-events-none z-0" />
          <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-[#0c1524] to-transparent pointer-events-none z-0" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#3b82f6 0 12px,transparent 12px 24px)",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-9 text-white">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />{" "}
                  2026 Nigerian Market Benchmarks
                </span>
                <h1
                  id="nmpe-title"
                  className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl"
                >
                  Dynamic Material Price &amp; Project Estimation Engine
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
                  Location-adjusted cement, steel and sand quantities with
                  a finish-level cost range for your next build.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2 text-xs text-slate-400">
                <CheckIcon className="h-4 w-4 text-emerald-400" />
                <span>
                  Rates last reviewed:{" "}
                  <strong className="text-slate-200">
                    {formatRatesReviewed(CONFIG.ratesReviewedOn)}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <section
        className="mx-auto w-full max-w-7xl px-4 py-8 sm:py-12"
        aria-labelledby="nmpe-title"
      >
          {!showResults && (
            <>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                <form
                  noValidate
                  onSubmit={handleCalculate}
                  className="rounded-2xl bg-white p-5 shadow-card sm:p-7 lg:col-span-3"
                >
                  <h2 className="text-lg font-bold">Project configuration</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Four inputs. Your estimate updates against live location
                    rates.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="nmpe-location"
                        className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-700"
                      >
                        <span className="grid h-5 w-5 place-items-center rounded bg-[#0c1524] text-[11px] font-bold text-white">
                          1
                        </span>{" "}
                        Project location
                      </label>
                      <div className="relative">
                        <select
                          id="nmpe-location"
                          value={location}
                          onChange={handleLocationChange}
                          className="appearance-none w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 pr-10 text-[15px] font-medium shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                        >
                          {Object.entries(LOCATIONS).map(([key, l]) => (
                            <option key={key} value={key}>
                              {l.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="nmpe-typology"
                        className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-700"
                      >
                        <span className="grid h-5 w-5 place-items-center rounded bg-[#0c1524] text-[11px] font-bold text-white">
                          2
                        </span>{" "}
                        Project typology
                      </label>
                      <div className="relative">
                        <select
                          id="nmpe-typology"
                          value={typology}
                          onChange={handleTypologyChange}
                          className="appearance-none w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 pr-10 text-[15px] font-medium shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                        >
                          {Object.entries(TYPOLOGIES).map(([key, t]) => (
                            <option key={key} value={key}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      </div>
                      <p
                        id="nmpe-typology-desc"
                        className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-500"
                        aria-live="polite"
                      >
                        {typ.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                      <label
                        htmlFor="nmpe-gfa"
                        className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                      >
                        <span className="grid h-5 w-5 place-items-center rounded bg-[#0c1524] text-[11px] font-bold text-white">
                          3
                        </span>{" "}
                        Gross floor area (GFA)
                      </label>
                      <div className="flex items-center rounded-lg border border-slate-300 shadow-sm transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20">
                        <input
                          id="nmpe-gfa"
                          type="number"
                          inputMode="numeric"
                          min={CONFIG.gfaMin}
                          max={CONFIG.gfaMax}
                          step={1}
                          value={gfaInput}
                          onChange={handleGfaInputChange}
                          onBlur={handleGfaBlur}
                          className="w-24 rounded-l-lg bg-transparent px-3 py-2 text-right text-[15px] font-bold focus:outline-none"
                          aria-describedby="nmpe-gfa-help nmpe-gfa-error"
                          aria-invalid={!!gfaError}
                        />
                        <span className="rounded-r-lg border-l border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-500">
                          m²
                        </span>
                      </div>
                    </div>
                    <input
                      id="nmpe-gfa-range"
                      type="range"
                      min={CONFIG.gfaMin}
                      max={CONFIG.gfaMax}
                      step={10}
                      value={gfa}
                      onChange={handleGfaRangeChange}
                      className="nmpe-range mt-3 w-full"
                      aria-label="Gross floor area slider"
                      style={
                        {
                          "--fill": `${clamp(gfaPct, 0, 100)}%`,
                        } as React.CSSProperties
                      }
                    />
                    <div className="mt-1.5 flex justify-between text-xs text-slate-400">
                      <span>{formatNumber(CONFIG.gfaMin)} m²</span>
                      <span id="nmpe-gfa-help">Drag or type an exact value</span>
                      <span>{formatNumber(CONFIG.gfaMax)} m²</span>
                    </div>
                    {gfaError && (
                      <p
                        id="nmpe-gfa-error"
                        className="mt-1 text-sm font-medium text-red-600"
                        role="alert"
                      >
                        {gfaError}
                      </p>
                    )}
                  </div>

                  <fieldset className="mt-6">
                    <legend className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <span className="grid h-5 w-5 place-items-center rounded bg-[#0c1524] text-[11px] font-bold text-white">
                        4
                      </span>{" "}
                      Target finish standard
                    </legend>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {finishOptions.map(([key, f]) => {
                        const isActive = finish === key;
                        return (
                          <label
                            key={key}
                            className={`nmpe-finish relative flex cursor-pointer flex-col rounded-xl border-2 p-4 transition hover:border-slate-300 focus-within:ring-4 focus-within:ring-blue-500/20 ${
                              isActive
                                ? "border-blue-500 bg-blue-50"
                                : "border-slate-200"
                            }`}
                          >
                            <input
                              type="radio"
                              name="finish"
                              value={key}
                              checked={isActive}
                              onChange={() => setFinish(key)}
                              className="sr-only"
                              tabIndex={-1}
                              aria-hidden="true"
                            />
                            <span className="text-sm font-bold">{f.label}</span>
                            <span className="mt-1 text-xs leading-relaxed text-slate-500">
                              {finishNotes[key]}
                            </span>
                            <span className="mt-3 inline-flex w-fit rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                              ×{f.multiplier.toFixed(2)}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <button
                    id="nmpe-calc-btn"
                    type="submit"
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40 active:scale-[.99]"
                  >
                    <CalculatorIcon className="h-5 w-5" />
                    Calculate Estimate
                  </button>
                  <p className="mt-3 text-center text-xs text-slate-400">
                    Free. No credit card. Takes under 30 seconds.
                  </p>
                </form>

                <aside
                  className="flex flex-col gap-6 lg:col-span-2"
                  aria-label="Live material rates"
                >
                  <div className="rounded-2xl bg-white p-5 shadow-card sm:p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                        Live unit rates
                      </h2>
                      <span className="rounded-md bg-[#0c1524] px-2 py-1 text-xs font-semibold text-white">
                        {loc.label}
                      </span>
                    </div>
                    <ul className="mt-4 divide-y divide-slate-100">
                      {rateItems.map((item) => (
                        <li
                          key={item.name}
                          className="flex items-center justify-between py-3"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-base"
                              aria-hidden="true"
                            >
                              {item.icon}
                            </span>
                            <div>
                              <p className="text-sm font-semibold">
                                {item.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                {item.unit}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm font-bold tabular-nums">
                            {formatNaira(item.val)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-card sm:p-6">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      Your estimate preview
                    </h2>
                    <div
                      className="mt-4 select-none space-y-3 blur-[6px]"
                      aria-hidden="true"
                    >
                      <div className="text-2xl font-extrabold">
                        ₦00,000,000 – ₦00,000,000
                      </div>
                      <div className="h-3 w-3/4 rounded bg-slate-200" />
                      <div className="h-3 w-1/2 rounded bg-slate-200" />
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        <div className="h-12 rounded bg-slate-100" />
                        <div className="h-12 rounded bg-slate-100" />
                        <div className="h-12 rounded bg-slate-100" />
                      </div>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 p-6 text-center">
                      <BuildingIcon className="h-7 w-7 text-charcoal-800" />
                      <p className="mt-2 text-sm font-semibold text-charcoal-800">
                        Full breakdown unlocks after you calculate
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        <span>{formatNumber(gfa)}</span> m² ·{" "}
                        <span>{typ.label}</span>
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </>
          )}

          {/* ===== CTA banner (shown after calculation, before results) ===== */}
          {!showResults && estimate && (
            <div
              className="nmpe-fade-in mt-6 overflow-hidden rounded-2xl bg-[#0c1524] shadow-card"
              style={{ animationDelay: ".1s" }}
            >
              <div
                className="h-1.5 w-full"
                style={{
                  background:
                    "repeating-linear-gradient(45deg,#3b82f6 0 14px,#111827 14px 28px)",
                }}
              />
              <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-base leading-relaxed text-slate-200 sm:text-lg">
                    <span className="font-extrabold text-blue-400">
                      ⚠️ Warning:
                    </span>{" "}
                    Market inflation and site material theft can erode up to{" "}
                    <strong className="text-white">
                      {Math.round(CONFIG.leakageRate * 100)}% of your profit
                      margin
                    </strong>
                    . Stop tracking via manual spreadsheets. Click below to
                    activate your{" "}
                    <strong className="text-white">
                      14-Day Free Pro Account
                    </strong>{" "}
                    and track site inventory in real-time.
                  </p>
                  <p className="mt-3 text-sm text-slate-400">
                    On this estimate,{" "}
                    {Math.round(CONFIG.leakageRate * 100)}% leakage is roughly{" "}
                    <strong className="text-blue-400">
                      {formatNaira(estimate.costs.atRisk)}
                    </strong>{" "}
                    at risk.
                  </p>
                </div>
                <a
                  href={CONFIG.signupUrl}
                  onClick={handleCtaClick}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-500 px-7 py-4 text-base font-extrabold text-white shadow-lg shadow-blue-500/40 transition hover:bg-blue-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/50 active:scale-[.99]"
                >
                  Protect My Project Margins Now
                  <ArrowRightIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          )}

          {/* ===== Results Section ===== */}
          {showResults && estimate && (
            <div
              ref={resultsRef}
              className="nmpe-fade-in rounded-2xl bg-white p-5 shadow-card sm:p-8"
              aria-live="polite"
              tabIndex={-1}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    Estimated total project cost
                  </p>
                  <p
                    id="nmpe-range"
                    className="mt-2 text-3xl font-extrabold tracking-tight text-charcoal-900 sm:text-4xl lg:text-5xl"
                  >
                    {formatNaira(estimate.costs.rangeLow)} –{" "}
                    {formatNaira(estimate.costs.rangeHigh)}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Base estimate{" "}
                    <strong id="nmpe-base" className="text-slate-700">
                      {formatNaira(estimate.costs.baseTotal)}
                    </strong>{" "}
                    with a ±{Math.round(CONFIG.rangeMargin * 100)}%
                    market-volatility band.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button
                    id="nmpe-download"
                    type="button"
                    onClick={handleDownloadCsv}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    Download pricing matrix
                  </button>
                  <button
                    id="nmpe-edit"
                    type="button"
                    onClick={handleEdit}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0c1524] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-charcoal-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-400/40"
                  >
                    <EditIcon className="h-4 w-4" />
                    Adjust inputs
                  </button>
                </div>
              </div>

              <dl
                id="nmpe-summary"
                className="mt-6 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-4"
              >
                {[
                  ["Location", estimate.inputs.locationLabel],
                  ["Typology", estimate.inputs.typologyLabel],
                  ["Floor area", `${formatNumber(estimate.inputs.gfa)} m²`],
                  [
                    "Finish",
                    `${estimate.inputs.finishLabel} (×${estimate.inputs.finishMultiplier.toFixed(2)})`,
                  ],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs font-medium text-slate-500">{k}</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">{v}</dd>
                  </div>
                ))}
              </dl>

              <h3 className="mt-8 text-lg font-bold">Core material breakdown</h3>
              <p className="mt-1 text-sm text-slate-500">
                Quantities rounded up to purchasable units (whole bags, whole
                tipper loads).
              </p>

              <div
                id="nmpe-cards"
                className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3"
              >
                {[
                  {
                    title: "Cement",
                    icon: "🧱",
                    qty: formatNumber(estimate.quantities.cementBags),
                    unit: "bags (50kg)",
                    rate: `${formatNaira(estimate.rates.cementPerBag)} / bag`,
                    cost: estimate.costs.cement,
                    note: `${TYPOLOGIES[estimate.inputs.typology].cementBagsPerM2} bags/m² × ${formatNumber(estimate.inputs.gfa)} m²`,
                  },
                  {
                    title: "Reinforcement Steel",
                    icon: "🔩",
                    qty: formatDecimal(estimate.quantities.steelTons),
                    unit: "tons (TMT)",
                    rate: `${formatNaira(estimate.rates.steelPerTon)} / ton`,
                    cost: estimate.costs.steel,
                    note: `${TYPOLOGIES[estimate.inputs.typology].steelTonsPerM2} t/m² × ${formatNumber(estimate.inputs.gfa)} m²`,
                  },
                  {
                    title: "Sharp Sand",
                    icon: "🚚",
                    qty: formatNumber(estimate.quantities.sandLoads),
                    unit:
                      estimate.quantities.sandLoads === 1
                        ? "tipper load (20t)"
                        : "tipper loads (20t)",
                    rate: `${formatNaira(estimate.rates.sandPerLoad)} / load`,
                    cost: estimate.costs.sand,
                    note: `${formatDecimal(estimate.quantities.sandTons)} tons ÷ ${CONFIG.sandTonsPerLoad}t per load`,
                  },
                ].map((card) => {
                  const share = estimate.costs.materialsTotal
                    ? Math.round((card.cost / estimate.costs.materialsTotal) * 100)
                    : 0;
                  return (
                    <article
                      key={card.title}
                      className="rounded-xl border border-slate-200 p-5 transition hover:border-slate-300 hover:shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-lg"
                            aria-hidden="true"
                          >
                            {card.icon}
                          </span>
                          <h4 className="font-bold">{card.title}</h4>
                        </div>
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                          {share}%
                        </span>
                      </div>
                      <p className="mt-4 text-3xl font-extrabold tabular-nums tracking-tight">
                        {card.qty}
                      </p>
                      <p className="text-sm text-slate-500">{card.unit}</p>
                      <div className="mt-4 border-t border-slate-100 pt-3">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-xs text-slate-500">
                            {card.rate}
                          </span>
                          <span className="text-lg font-bold tabular-nums text-charcoal-900">
                            {formatNaira(card.cost)}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-400">{card.note}</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-700">
                      Cost build-up
                    </p>
                    <p
                      id="nmpe-buildup-note"
                      className="text-xs text-slate-500"
                    >
                      {estimate.inputs.finish === "shell"
                        ? "Shell-only: estimate equals core structural materials (×1.00)."
                        : `Core materials × ${estimate.inputs.finishMultiplier.toFixed(2)} to allow for ${
                            estimate.inputs.finish === "premium"
                              ? "imported finishes, POP ceilings and automation"
                              : "tiling, plumbing, electrical and painting"
                          }.`}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-right text-sm sm:gap-6">
                    <div>
                      <p className="text-xs text-slate-500">
                        Core materials
                      </p>
                      <p className="font-bold" id="nmpe-materials-total">
                        {formatNairaCompact(estimate.costs.materialsTotal)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Finish uplift</p>
                      <p className="font-bold" id="nmpe-finish-uplift">
                        {estimate.costs.finishUplift > 0
                          ? "+" + formatNairaCompact(estimate.costs.finishUplift)
                          : "₦0"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Base total</p>
                      <p
                        className="font-bold text-blue-600"
                        id="nmpe-base-2"
                      >
                        {formatNairaCompact(estimate.costs.baseTotal)}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  id="nmpe-bar"
                  className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-slate-100"
                  aria-hidden="true"
                >
                  {(() => {
                    const total = estimate.costs.baseTotal || 1;
                    return (
                      <>
                        <div
                          style={{
                            width: `${(estimate.costs.cement / total) * 100}%`,
                            backgroundColor: "#3b82f6",
                          }}
                          title="Cement"
                        />
                        <div
                          style={{
                            width: `${(estimate.costs.steel / total) * 100}%`,
                            backgroundColor: "#1F2937",
                          }}
                          title="Steel"
                        />
                        <div
                          style={{
                            width: `${(estimate.costs.sand / total) * 100}%`,
                            backgroundColor: "#64748B",
                          }}
                          title="Sand"
                        />
                        {estimate.costs.finishUplift > 0 && (
                          <div
                            style={{
                              width: `${
                                (estimate.costs.finishUplift / total) * 100
                              }%`,
                              backgroundColor: "#93c5fd",
                            }}
                            title="Finish uplift"
                          />
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-400">
                Indicative benchmark only. Excludes land, approvals,
                professional fees, VAT and site-specific ground conditions.
                Obtain a priced Bill of Quantities from a registered QS before
                committing funds.
              </p>

              <div
                className="nmpe-fade-in mt-6 overflow-hidden rounded-2xl bg-[#0c1524] shadow-card"
                style={{ animationDelay: ".1s" }}
              >
                <div
                  className="h-1.5 w-full"
                  style={{
                    background:
                      "repeating-linear-gradient(45deg,#3b82f6 0 14px,#111827 14px 28px)",
                  }}
                />
                <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-base leading-relaxed text-slate-200 sm:text-lg">
                      <span className="font-extrabold text-blue-400">
                        ⚠️ Warning:
                      </span>{" "}
                      Market inflation and site material theft can erode up to{" "}
                      <strong className="text-white">
                        {Math.round(CONFIG.leakageRate * 100)}% of your profit
                        margin
                      </strong>
                      . Stop tracking via manual spreadsheets. Click below to
                      activate your{" "}
                      <strong className="text-white">
                        14-Day Free Pro Account
                      </strong>{" "}
                      and track site inventory in real-time.
                    </p>
                    <p className="mt-3 text-sm text-slate-400">
                      On this estimate,{" "}
                      {Math.round(CONFIG.leakageRate * 100)}% leakage is
                      roughly{" "}
                      <strong className="text-blue-400">
                        {formatNaira(estimate.costs.atRisk)}
                      </strong>{" "}
                      at risk.
                    </p>
                  </div>
                  <a
                    href={CONFIG.signupUrl}
                    onClick={handleCtaClick}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-500 px-7 py-4 text-base font-extrabold text-white shadow-lg shadow-blue-500/40 transition hover:bg-blue-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/50 active:scale-[.99]"
                  >
                    Protect My Project Margins Now
                    <ArrowRightIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ===== Lead Capture Modal ===== */}
          {showModal && (
            <div
              id="nmpe-modal"
              className="fixed inset-0 z-50"
              role="dialog"
              aria-modal="true"
              aria-labelledby="nmpe-modal-title"
              aria-describedby="nmpe-modal-desc"
            >
              <div
                className="absolute inset-0 bg-charcoal-950/70 backdrop-blur-sm"
                onClick={handleBackdropClick}
              />
              <div className="relative flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
                <div className="nmpe-fade-in relative max-h-[100dvh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-w-lg sm:rounded-2xl">
                  <div className="h-1.5 w-full bg-blue-500" />
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setTimeout(() => lastFocusRef.current?.focus(), 0);
                    }}
                    aria-label="Close"
                    className="absolute right-3 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                  <div className="p-6 sm:p-8">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{" "}
                      Your estimate is ready
                    </div>
                    <h2
                      id="nmpe-modal-title"
                      className="pr-8 text-xl font-extrabold leading-snug sm:text-2xl"
                    >
                      Unlock your cost breakdown
                    </h2>
                    <p
                      id="nmpe-modal-desc"
                      className="mt-2 text-sm text-slate-600"
                    >
                      Enter your details to generate your detailed cost
                      breakdown and download the real-time pricing matrix.
                    </p>

                    <form
                      id="nmpe-lead-form"
                      className="mt-6 space-y-4"
                      noValidate
                      onSubmit={handleLeadSubmit}
                    >
                      <div>
                        <label
                          htmlFor="nmpe-name"
                          className="mb-1 block text-sm font-semibold text-slate-700"
                        >
                          Full name
                        </label>
                        <input
                          id="nmpe-name"
                          ref={nameInputRef}
                          name="fullName"
                          type="text"
                          autoComplete="name"
                          placeholder="e.g. Adaeze Okafor"
                          required
                          value={lead.fullName}
                          onChange={handleLeadChange}
                          className={`w-full rounded-lg border px-3.5 py-3 text-[15px] shadow-sm transition focus:outline-none ${
                            leadErrors.fullName
                              ? "border-red-500 ring-red-500/15 focus:ring-4"
                              : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                          }`}
                          aria-describedby="nmpe-name-err"
                          aria-invalid={!!leadErrors.fullName}
                        />
                        {leadErrors.fullName && (
                          <p
                            id="nmpe-name-err"
                            className="mt-1 text-sm font-medium text-red-600"
                          >
                            {leadErrors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="nmpe-company"
                          className="mb-1 block text-sm font-semibold text-slate-700"
                        >
                          Company name
                        </label>
                        <input
                          id="nmpe-company"
                          name="company"
                          type="text"
                          autoComplete="organization"
                          placeholder="e.g. Okafor Builders Ltd"
                          required
                          value={lead.company}
                          onChange={handleLeadChange}
                          className={`w-full rounded-lg border px-3.5 py-3 text-[15px] shadow-sm transition focus:outline-none ${
                            leadErrors.company
                              ? "border-red-500 ring-red-500/15 focus:ring-4"
                              : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                          }`}
                          aria-describedby="nmpe-company-err"
                          aria-invalid={!!leadErrors.company}
                        />
                        {leadErrors.company && (
                          <p
                            id="nmpe-company-err"
                            className="mt-1 text-sm font-medium text-red-600"
                          >
                            {leadErrors.company}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="nmpe-whatsapp"
                          className="mb-1 block text-sm font-semibold text-slate-700"
                        >
                          Active WhatsApp number
                        </label>
                        <div
                          className={`flex rounded-lg border shadow-sm transition ${
                            leadErrors.whatsapp
                              ? "border-red-500 ring-red-500/15 focus-within:ring-4"
                              : "border-slate-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20"
                          }`}
                        >
                          <span className="flex items-center gap-1.5 rounded-l-lg border-r border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600">
                            🇳🇬 +234
                          </span>
                          <input
                            id="nmpe-whatsapp"
                            name="whatsapp"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel-national"
                            placeholder="803 123 4567"
                            required
                            value={lead.whatsapp}
                            onChange={handleLeadChange}
                            onBlur={handleWhatsAppBlur}
                            className="w-full rounded-r-lg bg-transparent px-3.5 py-3 text-[15px] focus:outline-none"
                            aria-describedby="nmpe-whatsapp-err nmpe-whatsapp-help"
                            aria-invalid={!!leadErrors.whatsapp}
                          />
                        </div>
                        <p
                          id="nmpe-whatsapp-help"
                          className="mt-1 text-xs text-slate-400"
                        >
                          Accepts 0803…, 803… or +234 803… formats.
                        </p>
                        {leadErrors.whatsapp && (
                          <p
                            id="nmpe-whatsapp-err"
                            className="mt-1 text-sm font-medium text-red-600"
                          >
                            {leadErrors.whatsapp}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="nmpe-email"
                          className="mb-1 block text-sm font-semibold text-slate-700"
                        >
                          Business email address
                        </label>
                        <input
                          id="nmpe-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@company.com.ng"
                          required
                          value={lead.email}
                          onChange={handleLeadChange}
                          className={`w-full rounded-lg border px-3.5 py-3 text-[15px] shadow-sm transition focus:outline-none ${
                            leadErrors.email
                              ? "border-red-500 ring-red-500/15 focus:ring-4"
                              : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                          }`}
                          aria-describedby="nmpe-email-err"
                          aria-invalid={!!leadErrors.email}
                        />
                        {leadErrors.email && (
                          <p
                            id="nmpe-email-err"
                            className="mt-1 text-sm font-medium text-red-600"
                          >
                            {leadErrors.email}
                          </p>
                        )}
                      </div>

                      <div
                        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                        aria-hidden="true"
                      >
                        <label htmlFor="nmpe-website">Website</label>
                        <input
                          id="nmpe-website"
                          name="website"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value=""
                          onChange={() => {}}
                        />
                      </div>

                      <button
                        id="nmpe-lead-submit"
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="nmpe-spinner h-5 w-5"
                              aria-hidden="true"
                            />
                            <span>Generating breakdown…</span>
                          </>
                        ) : (
                          <span>Generate My Breakdown</span>
                        )}
                      </button>
                      <p className="text-center text-xs text-slate-400">
                        We&apos;ll send your pricing matrix on WhatsApp and
                        email. No spam. Unsubscribe anytime.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </>
    );
}
