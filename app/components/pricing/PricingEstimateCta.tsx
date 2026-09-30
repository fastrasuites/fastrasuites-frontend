type Props = {
  href?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
};

const points = [
  "Built for Nigerian material and labour costs",
  "No sign-up needed",
  "Takes about 2 minutes",
];

export default function PricingEstimateCta({
  href = "/estimate",
  eyebrow = "Free tool",
  title = "Project cost estimator",
  description = "Get a realistic budget built on current Nigerian material and labour prices, then choose the plan that fits the size of your work.",
  ctaLabel = "Get your estimate",
}: Props) {
  return (
    <section
      aria-labelledby="estimate-cta-title"
      className="bg-white px-6 py-16"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 rounded-2xl bg-[#0b2149] bg-[radial-gradient(circle_at_90%_10%,rgba(59,130,246,0.35),transparent_50%)] p-8 text-white md:flex-row md:items-center md:gap-10 md:p-12">
        <div className="max-w-xl flex-1">
          <span className="mb-4 inline-block rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-300">
            {eyebrow}
          </span>

          <h2
            id="estimate-cta-title"
            className="mb-3 text-2xl font-bold leading-tight sm:text-3xl md:text-[34px]"
          >
            {title}
          </h2>

          <p className="mb-5 text-base leading-relaxed text-slate-300">
            {description}
          </p>

          <ul className="grid gap-2 text-sm text-slate-200">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12l5 5L20 7" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full shrink-0 flex-col items-center gap-2.5 md:w-auto">
          <a
            href={href}
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-[10px] bg-blue-500 px-7 py-3.5 text-base font-semibold text-white transition hover:-translate-y-px hover:bg-blue-600 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-blue-300 md:w-auto"
          >
            {ctaLabel}
            <svg
              className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <span className="text-xs text-slate-400">
            Opens the estimation tool
          </span>
        </div>
      </div>
    </section>
  );
}
