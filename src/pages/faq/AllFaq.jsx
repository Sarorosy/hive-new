import { useState } from "react";
import { Link } from "react-router-dom";

const FAQS = [
  { 
    q: "Why have co-working spaces become so popular in India?", 
    a: "Co-working spaces offer flexibility, lower overheads, and access to a vibrant community — all of which match modern hybrid and startup ways of working." 
  },
  { 
    q: "How does The Hive compare to traditional office rentals?", 
    a: "The Hive provides plug-and-play infrastructure, shorter commitments, and the ability to scale quickly without the hidden costs of a traditional lease." 
  },
  { 
    q: "What key features make a co-working space truly successful?", 
    a: "Flexible layouts, reliable amenities, a strong community, professional design, and sustainable financial planning are the core ingredients." 
  },
  { 
    q: "Why are co-working spaces a smart choice for startups?", 
    a: "They reduce upfront costs, let startups scale easily, and provide a professional front for meetings and investor pitches." 
  },
  { 
    q: "Are co-working spaces actually helpful for new businesses?", 
    a: "Yes — they let founders focus on product-market fit while the workspace handles operations like IT, cleaning, and reception." 
  },
  { 
    q: "What features should I look for in a fantastic co-working space?", 
    a: "Location, premium design, fast internet, meeting rooms, wellness zones, and events that foster networking are must-haves." 
  },
  { 
    q: "How does co-working benefit entrepreneurs?", 
    a: "Entrepreneurs get flexibility, credibility, access to mentors and peers, and an ecosystem that helps with hiring and partnerships." 
  },
  { 
    q: "Can co-working spaces help businesses scale quickly?", 
    a: "Absolutely — modular seating, shared services, and multi-location consistency make expansion smooth and cost-effective." 
  },
  { 
    q: "What role does location play in choosing the right co-working space?", 
    a: "Proximity to clients, talent pools, and transport hubs reduces friction, improves attendance, and raises brand credibility." 
  },
  { 
    q: "How does The Hive build community and networking opportunities for members?", 
    a: "Through curated events, community managers, workshops, and informal spaces that encourage cross-industry conversations." 
  },
];

export default function AllFaq() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredFaqs = FAQS.map((faq, index) => ({ ...faq, index })).filter(({ q, a }) => {
    if (!normalizedSearch) return true;
    return (
      q.toLowerCase().includes(normalizedSearch) ||
      a.toLowerCase().includes(normalizedSearch)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      {/* Header */}
      <div className="bg-blue-50 py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-6">Get Help</h1>
        <div className="max-w-2xl mx-auto">
          <label className="sr-only" htmlFor="faq-search">
            Search FAQs
          </label>
          <input
            id="faq-search"
            type="text"
            placeholder="Search FAQs, guides, and resources"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* FAQ Section */}
        <div className="md:col-span-2 mx-auto">
          <h2 className="text-xl font-semibold mb-6">General</h2>
          <div className="space-y-4">
            {filteredFaqs.length ? (
              filteredFaqs.map(({ q, a, index }) => (
                <button
                  key={index}
                  type="button"
                  className="w-full text-left border-b pb-4 focus-visible:ring-2 focus-visible:ring-blue-400 rounded outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-medium flex justify-between items-center">
                    {q}
                    <span className="ml-2 text-gray-500">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </h3>
                  {openIndex === index && (
                    <p className="mt-2 text-gray-600">{a}</p>
                  )}
                </button>
              ))
            ) : (
              <p className="text-gray-500">
                No FAQs matched your search. Try different keywords.
              </p>
            )}
          </div>
        </div>

        
      </div>
    </div>
  );
}
