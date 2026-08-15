"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, Check, DollarSign, Link2, Box, Sparkles, FileText, ClipboardCheck } from "lucide-react";

export default function StatsFAQ() {
  // Question state for the free tool
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);

  const whyChooseFastra = [
    { text: "Built specifically for project-based work, not adapted from generic accounting software." },
    { text: "Mobile-first request management, designed for low-end Android phones and unreliable site connectivity." },
    { text: "Budget checks happen before approval, not after — overspending gets caught at the request, not the reconciliation." },
    { text: "Project-first architecture. Every number traces back to a specific project and activity." },
    { text: "Import your project budget directly from Excel. No manual re-entry of a structure you've already built." },
    { text: "A single trail from request to payment. Nothing to reconcile across five different tools at month-end." }
  ];

  const comparisons = [
    {
      old: "Approvals happen over WhatsApp",
      new: "Structured approval queue, checked against budget automatically"
    },
    {
      old: "Budgets live in someone's Excel file, updated whenever someone remembers",
      new: "Live budget, updated in real time as requests, purchases, and payments happen"
    },
    {
      old: "Receipts sit in a truck dashboard until someone remembers to submit them",
      new: "Digital record, attached and tracked from the moment a request is raised"
    },
    {
      old: "Stock levels are a guess until someone does a physical count",
      new: "Real-time inventory, updated on every delivery and every consumption"
    },
    {
      old: "Vendor payments tracked across spreadsheets and memory",
      new: "One Payment Queue, sorted by what's actually due"
    }
  ];

  const whatItDoes = [
    {
      title: "Control every naira spent on site.",
      desc: "Live Budget vs Actual, budget check on every request before approval.",
      icon: DollarSign,
      iconBg: "bg-yellow-50 text-yellow-600",
      color: "border-yellow-100"
    },
    {
      title: "Keep every request connected to the right project activity.",
      desc: "WBS-tagged requests, mobile-first submission from any phone.",
      icon: Link2,
      iconBg: "bg-gray-100 text-gray-600",
      color: "border-gray-100"
    },
    {
      title: "Know what's on site before ordering more.",
      desc: "Real-time stock levels, low stock alerts, delivery confirmations.",
      icon: Box,
      iconBg: "bg-orange-50 text-orange-500",
      color: "border-orange-100"
    },
    {
      title: "Approve faster without losing control.",
      desc: "Budget-checked approval queue, over-budget flagging before it's too late.",
      icon: Check,
      iconBg: "bg-green-50 text-green-500",
      color: "border-green-100"
    },
    {
      title: "Reduce paperwork between the field and finance.",
      desc: "Purchase Orders, Vendor Bills, Payment Queue, tracked start to finish.",
      icon: FileText,
      iconBg: "bg-blue-50 text-blue-500",
      color: "border-blue-100"
    }
  ];

  const questions = [
    {
      id: 1,
      q: "How are purchase requests approved on your site today?",
      options: [
        "WhatsApp or phone call",
        "Paper form or email",
        "Spreadsheet-based system",
        "A dedicated software tool"
      ]
    },
    {
      id: 2,
      q: "Where do your active project budgets live?",
      options: [
        "In the project manager's head",
        "Excel files updated occasionally",
        "Shared online spreadsheets",
        "A dedicated live database"
      ]
    },
    {
      id: 3,
      q: "How are receipts and delivery notes tracked?",
      options: [
        "Kept in a vehicle dashboard or box",
        "Submitted weekly/monthly to office",
        "Emailed or messaged as photos",
        "Logged digitally at the site instantly"
      ]
    },
    {
      id: 4,
      q: "How does finance verify invoice payments?",
      options: [
        "Word of mouth / verbal approval",
        "Manual matching against paper bills",
        "Excel sheet checkoffs",
        "Automated 3-way matching queue"
      ]
    }
  ];

  const handleSelectOption = (option: string) => {
    setAnswers({ ...answers, [currentQuestion]: option });
    if (currentQuestion < 4) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setAssessmentCompleted(true);
      }, 400);
    }
  };

  const resetAssessment = () => {
    setAnswers({});
    setCurrentQuestion(1);
    setAssessmentCompleted(false);
  };

  return (
    <section className="flex flex-col bg-white">
      {/* Interactive Assessment Tool (Free Tool) */}
      <div className="py-24 px-6 md:px-12 bg-blue-50/40 border-t border-gray-100 w-full flex flex-col items-center">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-4 mb-10">
          <div className="inline-block bg-[#dbeafe] text-[#3b82f6] text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Free tool
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            How exposed is your current project to unbudgeted spending?
          </h3>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl">
            A short, honest self-assessment — four questions about how your team currently handles requests, budgets, and payments. Get a personalized readiness band and a practical checklist.
          </p>
          {!assessmentCompleted && (
            <button 
              onClick={() => { resetAssessment(); }}
              className="text-[#3b82f6] text-sm font-extrabold flex items-center gap-1.5 hover:underline mt-2"
            >
              Take the Free 2-Minute Assessment
            </button>
          )}
        </div>

        {/* Assessment Questionnaire Box */}
        <div className="w-full max-w-xl bg-white rounded-3xl border border-gray-100 shadow-xl p-8 min-h-[380px] flex flex-col justify-between">
          {!assessmentCompleted ? (
            <>
              {/* Progress Tracker */}
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step} 
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        step <= currentQuestion ? "bg-blue-500" : "bg-gray-100"
                      }`}
                    ></div>
                  ))}
                </div>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  Question {currentQuestion} of 4
                </span>
              </div>

              {/* Question Text */}
              <div className="flex-1 flex flex-col justify-center my-6">
                <h4 className="text-lg font-black text-gray-900 leading-snug tracking-tight mb-6">
                  {questions[currentQuestion - 1].q}
                </h4>

                {/* Options List */}
                <div className="flex flex-col gap-3">
                  {questions[currentQuestion - 1].options.map((option, idx) => {
                    const isSelected = answers[currentQuestion] === option;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(option)}
                        className={`w-full text-left px-5 py-4 rounded-xl border text-xs md:text-sm font-semibold transition-all ${
                          isSelected 
                            ? "border-blue-500 bg-blue-50/30 text-blue-700 shadow-sm" 
                            : "border-gray-150 hover:border-gray-300 bg-white text-gray-700 hover:bg-gray-50/50"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* Results Screen */
            <div className="flex flex-col items-center text-center py-6 gap-6 justify-center flex-1">
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-sm">
                <ClipboardCheck className="w-7 h-7" />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-black text-gray-950">Assessment Complete!</h4>
                <p className="text-gray-500 text-xs md:text-sm max-w-sm">
                  You are exposed to a <strong>Medium Risk</strong> of unbudgeted spending. Most field requests are approved manually without live validation.
                </p>
              </div>
              
              <div className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl p-4 text-left flex flex-col gap-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Your Checklist</span>
                <ul className="text-xs text-gray-600 flex flex-col gap-1.5">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    Enforce budget checks before approval.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    Digitize your field-to-office requests.
                  </li>
                </ul>
              </div>

              <button
                onClick={resetAssessment}
                className="bg-[#3b82f6] text-white text-xs md:text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-600 transition-colors mt-2"
              >
                Retake Assessment
              </button>
            </div>
          )}
        </div>
      </div>

    </section>
  );
}
