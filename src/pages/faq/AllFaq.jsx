import { useState } from "react";

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

const QUICK_LINKS = [
  {
    title: "Join the Community",
    desc: "Post in our vibrant forum for quick help, or share your workspace story!",
  },
  {
    title: "Read Documentation & Guides",
    desc: "Learn more about our amenities, membership plans, and policies.",
  },
  {
    title: "Hire an Expert",
    desc: "Need help setting up your office? Certified experts & agencies are ready.",
  },
];

export default function AllFaq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-50 py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-6">Get Help</h1>
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search FAQs, guides, and resources"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* FAQ Section */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-6">General</h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="border-b pb-4 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-medium flex justify-between items-center">
                  {faq.q}
                  <span className="ml-2 text-gray-500">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </h3>
                {openIndex === index && (
                  <p className="mt-2 text-gray-600">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Quick Links</h2>
          <div className="space-y-4">
            {QUICK_LINKS.map((link, idx) => (
              <div
                key={idx}
                className="bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition"
              >
                <h3 className="font-medium">{link.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{link.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
