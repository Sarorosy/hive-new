"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FAQS = [
  { q: "Why have co-working spaces become so popular in India?", a: "Co-working spaces offer flexibility, lower overheads, and access to a vibrant community — all of which match modern hybrid and startup ways of working." },
  { q: "How does The Hive compare to traditional office rentals?", a: "The Hive provides plug-and-play infrastructure, shorter commitments, and the ability to scale quickly without the hidden costs of a traditional lease." },
  { q: "What key features make a co-working space truly successful?", a: "Flexible layouts, reliable amenities, a strong community, professional design, and sustainable financial planning are the core ingredients." },
  { q: "Why are co-working spaces a smart choice for startups?", a: "They reduce upfront costs, let startups scale easily, and provide a professional front for meetings and investor pitches." },
  // more FAQs...
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left title */}
        <div>
          <p className="text-sm text-gray-500 mb-2">/ FAQ /</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
            Frequently Asked <br /> Questions.
          </h2>
        </div>

        {/* Right FAQ items */}
        <div className="md:col-span-2 space-y-4">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="bg-white rounded-md shadow-sm overflow-hidden">
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span className="font-medium text-gray-800">{item.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-4 text-gray-600 text-sm">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* View More Button */}
          <div className="text-center pt-6 flex justify-end">
            <button
              onClick={()=>{navigate("/support/faq")}}
              className="flex items-center cursor-pointer bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
            >
              View More <ArrowRight className="ml-2" size={18}/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
