import React from "react";

const testimonials = [
  {
    quote:
      "The Hive transformed how our team works and collaborates. Impeccable service and space.",
    name: "Juliana",
    role: "Technology Startup CEO",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    class: "bg-[#dae2e5]"
  },
  {
    quote:
      "There’s a rare balance of privacy, energy, and luxury – absolutely unmatched.",
    name: "Bastian",
    role: "Senior Marketing Director",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    class: "bg-[#ede6e7]"
  },
  {
    quote:
      "Onboarding and bookings made effortless for our team through The Hive app",
    name: "Sarah Doe",
    role: "Operations Lead, Consulting Firm",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    class: "bg-[#92031f] text-white"
  },
  {
    quote:
      "As a startup founder, having a cost-effective yet professional environment for my team has been game-changing.",
    name: "Albert",
    role: "Startup Founder",
    image: "https://randomuser.me/api/portraits/men/48.jpg",
    class: "bg-[#544c41] text-white "
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
          <div>
            <p className="text-gray-500 text-sm mb-2 ">/ Testimonials /</p>
            <h2 className="text-4xl font-bold leading-snug mb-4 font-serif">
              Voices of Our Community
            </h2>
          </div>
          <p className="text-gray-500 max-w-md">
            Integer tincidunt cras dapibus vivamus elementum semper nisi. Aenean
            vulputate eleifend tellus.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 flex flex-col justify-between shadow-sm"
            >
              <p className="text-black text-3xl mb-4">❝</p>
              <p className="text-gray-600 mb-6">{t.quote}</p>
              <div className="flex items-center gap-4 mt-auto">
                
                {/* <div className={`w-10 h-10 rounded-full object-cover font-serif flex items-center justify-center ${t.class}`}>
                {t.name.charAt(0)}
                </div> */}
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}
