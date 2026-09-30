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
      <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden">
        <Header />
        <main className="flex-1 bg-white">
          <NigerianEstimationEngine />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
