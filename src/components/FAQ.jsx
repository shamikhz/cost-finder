import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQS } from '../data/faqs';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2 border border-teal-200">
          <HelpCircle className="w-3.5 h-3.5 text-teal-700" />
          <span>Questions & Answers</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Clear, honest answers about calculation methodologies, assumptions, privacy, and realistic financial management.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-slate-50/60 hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-slate-900 text-sm sm:text-base pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-teal-700' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-4 sm:p-5 pt-2 sm:pt-2 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 whitespace-pre-line">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
