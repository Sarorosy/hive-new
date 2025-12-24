import React from "react";
import {
  IndianRupee,
  MapPin,
  Headset,
  Users,
  Leaf,
  ArrowRight,
  Building2,
} from "lucide-react";

const WhyChooseHive = ({cityDisplayName}) => {
  return (
    <section className="bg-gray-100 text-gray-900">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Heading */}
        <div className="max-w-3xl mb-10">
          <h2 className="text-3xl font-semibold mb-3">
            Why choose The Hive Workspaces?
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            We design and manage workspaces that adapt to your business needs.
            With deep market understanding and hospitality-led operations, The
            Hive ensures a seamless office experience from day one.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-6xl">
          {/* Item */}
          <div className="flex gap-4">
            <IndianRupee className="w-7 h-7 text-gray-900 shrink-0" />
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Customised Workspace Solutions
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Private offices, corporate suites, managed floors, or fully
                build-to-suit workspaces designed around your team.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <MapPin className="w-7 h-7 text-gray-900 shrink-0" />
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Prime Strategic Locations
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Centres located across high-demand commercial hubs for excellent
                connectivity and accessibility.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Headset className="w-7 h-7 text-gray-900 shrink-0" />
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Hospitality-Led Experience
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Concierge-level support, seamless facilities management, and
                frictionless daily operations.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Users className="w-7 h-7 text-gray-900 shrink-0" />
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Thriving Business Community
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                A curated network of founders, innovators, and professionals with
                regular events and workshops.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Leaf className="w-7 h-7 text-gray-900 shrink-0" />
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Sustainable & Smart
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Eco-friendly, energy-efficient, and technology-integrated
                workspaces built for the future.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="inline-block"><Building2 size={18} /></span>
            Looking for office space in {cityDisplayName}? Connect with our experts now
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm font-semibold text-orange-500 hover:underline"
          >
            Request Callback
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseHive;
