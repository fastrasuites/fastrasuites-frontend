import React from "react";
import SmoothScrollProvider from "../components/motion/SmoothScrollProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductHero from "../components/ProductHero";
import ProductScenarioSection from "../components/ProductScenarioSection";
import ProductCTA from "../components/ProductCTA";
import WorkTheWay from "../components/WorkTheWay";

export const metadata = {
  title: "Product - FastraSuite",
  description: "The tools behind your projects, connected.",
};

export default function ProductPage() {
  return (
    <SmoothScrollProvider>
      <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden">
        {/* Navigation Header */}
        <Header />

        {/* Main Sections */}
        <main className="flex-1">
          {/* Hero Section */}
          <ProductHero />

          {/* Scenarios */}
          <div className="flex flex-col gap-0 pb-10">
            {/* 1. Purchase Requests */}
            <ProductScenarioSection
              activeCategory="Purchase Requests"
              theme="blue"
              title={
                <>
                  The moment a request <span className="text-blue-600">stops waiting</span> for someone at a desk
                </>
              }
              description="A site supervisor needs 40 bags of cement before tomorrow's pour. She opens FastraSuite on her phone, submits the request, and sees the available budget before she even finishes typing. It's approved before she's left the site, and the budget line is updated instantly."
              benefits={[
                "No manual data entry or copying from WhatsApp to Excel",
                "Approved against live budgets, not yesterday's spreadsheet",
                "Mobile-first design built for the field, not just the office",
                "Automated routing to the right approver based on value"
              ]}
              imageSrc="/product/scenario-1.jpg" // Placeholder
              imageAlt="Purchase Request on Mobile"
            />

            {/* 2. Project Tracking */}
            <ProductScenarioSection
              activeCategory="Project Tracking"
              theme="green"
              title={
                <>
                  The budget line that <span className="text-green-600">tells you it&apos;s in trouble</span> before you have to ask
                </>
              }
              description="Instead of waiting for the end of the month to see where the project stands, FastraSuite updates the budget in real time. The moment a purchase order is approved, the committed cost is updated. You know exactly what you have left to spend."
              benefits={[
                "Instantly identify budget overruns before they hit the bank",
                "Real-time visual dashboards showing actuals vs. budget",
                "Track committed costs automatically, no manual entry",
                "Always know your profit margin before the project finishes"
              ]}
              imageSrc="/product/scenario-2.jpg" // Placeholder
              imageAlt="Project Tracking Dashboard"
            />

            {/* 3. Finance */}
            <ProductScenarioSection
              activeCategory="Finance"
              theme="yellow"
              title={
                <>
                  The mismatch that <span className="text-amber-500">used to slip through</span>, now flagged before it&apos;s paid
                </>
              }
              description="When the invoice arrives, FastraSuite automatically compares it against the original purchase order and the delivery receipt. If the price changed or the quantity is different, it's flagged immediately. No more paying for things you didn't receive."
              benefits={[
                "Automated three-way matching (PO, Receipt, Invoice)",
                "Catch price variances and quantity differences automatically",
                "Streamlined payment queue sorted by what's actually due",
                "No more paying duplicates or invoices for variations"
              ]}
              imageSrc="/product/scenario-3.jpg" // Placeholder
              imageAlt="Finance matching process"
            />

            {/* 4. Executives */}
            <ProductScenarioSection
              activeCategory="Executives"
              theme="purple"
              title={
                <>
                  The delivery that <span className="text-purple-600">arrives short</span>, without becoming a lost email
                </>
              }
              description="Keep the entire company aligned without needing a weekly update meeting. Executives get a high-level view of every project's health, cash flow, and risk factors in one place. No digging through folders or waiting for reports."
              benefits={[
                "Company-wide visibility into project health and cash flow",
                "Standardized reporting across all active projects",
                "Identify systemic issues before they impact the bottom line",
                "Make data-driven decisions based on real-time information"
              ]}
              imageSrc="/product/scenario-4.jpg" // Placeholder
              imageAlt="Executive reporting view"
            />
          </div>

          {/* CTA Section */}
          <ProductCTA />

          {/* Trust/Features */}
          <WorkTheWay />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
