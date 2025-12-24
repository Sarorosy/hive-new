import React from "react";
import {
  ClipboardList,
  Headset,
  Search,
  ArrowRightLeft,
  Armchair,
  ArrowRight,
} from "lucide-react";

import howitworks from "../../assets/desks.jpg";

const steps = [
  {
    icon: ClipboardList,
    title: "Share your requirements",
    description:
      "Tell us your team size, preferred location, and required workspace amenities.",
  },
  {
    icon: Headset,
    title: "Get personalized consultancy",
    description:
      "Your account manager curates coworking options tailored for flexibility.",
  },
  {
    icon: Search,
    title: "Visit & evaluate with our team",
    description:
      "Tour shortlisted spaces with expert support to find the right fit.",
  },
  {
    icon: ArrowRightLeft,
    title: "Finalize terms & close negotiations",
    description:
      "We assist in pricing discussions and agreement finalization.",
  },
  {
    icon: Armchair,
    title: "Immediate setup & move-in",
    description:
      "Move in quickly and start working from fully equipped spaces.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* Image */}
          <div className="relative  rounded-xl overflow-hidden border border-gray-200">
            <img
              src={howitworks}
              alt="Modern office space"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              How it works
            </h2>

            <div className="space-y-5">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex gap-3 items-start">
                    <Icon
                      className="w-5 h-5 text-gray-900 mt-0.5"
                      strokeWidth={1.5}
                    />
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href="#"
                className="inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-700 transition"
              >
                Connect with us for end-to-end support
                <ArrowRight className="ml-1.5 w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
