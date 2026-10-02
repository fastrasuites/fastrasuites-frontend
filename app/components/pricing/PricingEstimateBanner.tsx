export default function PricingEstimateBanner({
  href = "/estimate",
}: {
  href?: string;
}) {
  return (
    <div className="px-6">
      <div className="mx-auto mb-6 flex max-w-5xl flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3.5 text-[15px] text-[#0b2149]">
        <span>
          <strong>Not sure what to pick?</strong> Estimate your project cost
          first.
        </span>
        <a
          href={href}
          className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
        >
          Try the estimator →
        </a>
      </div>
    </div>
  );
}
