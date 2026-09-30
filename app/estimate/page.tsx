import Header from "../components/Header";
import Footer from "../components/Footer";
import SmoothScrollProvider from "../components/motion/SmoothScrollProvider";
import NigerianEstimationEngine from "./NigerianEstimationEngine";

export const metadata = {
  title: "Nigerian Construction Cost Estimator | FastraSuite",
  description:
    "Estimate Nigerian construction material quantities and project costs with 2026 location-based pricing benchmarks.",
};

export default function EstimatePage() {
  return (
    <SmoothScrollProvider>
      <Header />
      <main className="min-h-screen bg-slate-100">
        <NigerianEstimationEngine />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
