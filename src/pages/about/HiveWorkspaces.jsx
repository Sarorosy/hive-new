import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Target,
  TrendingUp,
  Leaf,
  Users,
  MapPin,
  Sparkles,
  Zap
} from 'lucide-react';
import { useOutletContext } from "react-router-dom";

export default function HiveWorkspaces() {

  const { theme } = useOutletContext();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true }
  };

  const PHASE_LIST = [
    {
      phase: "Phase 1",
      title: "Strengthening the Foundation",
      period: "2025–2026",
      items: [
        "Expansion in Tier-1 micro-markets with enterprise demand",
        "Upgraded premium amenities and service standards",
        "Advanced digital infrastructure for workplace management",
        "Stronger community and networking initiatives"
      ]
    },
    {
      phase: "Phase 2",
      title: "Scale and Diversification",
      period: "2026–2027",
      items: [
        "New centres in fast-growing commercial corridors",
        "Enhanced enterprise workspace offerings",
        "Green-building certifications and sustainability programs",
        "Collaboration with strategic brand partners"
      ]
    },
    {
      phase: "Phase 3",
      title: "The Hive 3.0 Vision",
      period: "2027 onwards",
      items: [
        "AI-driven workspace optimisation",
        "Integrated mixed-use developments combining work and lifestyle",
        "Nationwide member network with unified benefits",
        "Establishing The Hive as India's most premium flexible workspace brand"
      ]
    }
  ];

  return (
    <div className={`${theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"} min-h-screen`}>

      {/* Our Identity */}
      <section className={`py-24 ${theme === "dark" ? "bg-black" : "bg-gradient-to-b from-gray-50 to-white"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp}>
            <div className="text-center mb-16">

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
              >
                <div className={`w-16 h-1 mx-auto rounded-full ${theme === "dark" ? "bg-white/80" : "bg-gray-800"}`}></div>
              </motion.div>

              <h2 className={`text-4xl md:text-5xl font-light mb-6 tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Our Identity
              </h2>
            </div>

            <div className={`
              p-12 rounded-3xl shadow-lg max-w-5xl mx-auto mb-16 relative overflow-hidden
              ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border border-gray-100"}
            `}>
              <div className={`absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 opacity-30 
                ${theme === "dark" ? "bg-white/10" : "bg-gray-50"}
              `}></div>

              <div className="relative z-10">
                <h3 className={`text-3xl font-light mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  A Future-Ready Commercial Real Estate Ecosystem
                </h3>

                <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} leading-relaxed text-lg`}>
                  The Hive is more than a shared office...
                </p>
              </div>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
            >
              {[
                { icon: Building2, text: "Grade-A managed office solutions" },
                { icon: TrendingUp, text: "Flexible leasing and enterprise workspace models" },
                { icon: Zap, text: "Smart, tech-integrated workplace management" },
                { icon: Users, text: "Community-focused environments that drive innovation" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`
                    p-8 rounded-2xl shadow-sm border transition-all duration-300 group
                    ${theme === "dark"
                      ? "bg-white/5 border-white/10 hover:shadow-xl"
                      : "bg-white border-gray-100 hover:shadow-md"}
                  `}
                >
                  <item.icon className={`w-8 h-8 mb-4 transition-transform duration-300 group-hover:scale-110 
                    ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
                  `} />

                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              {...fadeInUp}
              className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} leading-relaxed text-center mt-16 max-w-3xl mx-auto text-lg`}
            >
              Our purpose is simple...
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className={`${theme === "dark" ? "bg-black" : "bg-white"} py-24 relative`}>
        <div className={`absolute inset-0 ${theme === "dark" ? "bg-white/0" : "bg-gradient-to-b from-transparent via-gray-50/30 to-transparent"}`}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div {...fadeInUp}>
            <div className="text-center mb-16">
              <div className={`w-16 h-1 mx-auto rounded-full mb-4 ${theme === "dark" ? "bg-white/80" : "bg-gray-800"}`}></div>
              <h2 className={`text-4xl md:text-5xl font-light mb-6 tracking-tight 
                ${theme === "dark" ? "text-white" : "text-gray-900"}
              `}>
                Our Mission
              </h2>
            </div>

            {/* Mission Card */}
            <div className={`
              p-12 rounded-3xl shadow-xl max-w-5xl mx-auto mb-24 relative overflow-hidden
              ${theme === "dark" ? "bg-white/10" : "bg-gradient-to-br from-gray-900 to-gray-800"}
            `}>
              <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mt-48"></div>

              <div className="relative z-10">
                <p className="text-white text-center text-lg font-light leading-relaxed">
                  To provide premium, flexible workspace solutions...
                </p>
              </div>
            </div>

            {/* Why Choose Hive */}
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-light tracking-tight 
                ${theme === "dark" ? "text-white" : "text-gray-900"}
              `}>
                Why Choose The Hive Workspaces
              </h2>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
            >
              {[
                { icon: Sparkles, title: "Customised Workspace Solutions", text: "Whether you need a private office, dedicated suite, managed corporate floor, or a fully custom build-to-suit workspace — The Hive delivers." },
                { icon: MapPin, title: "Prime and Strategic Locations", text: "Centres placed across high-demand commercial hubs ensure maximum accessibility and business visibility." },
                { icon: Building2, title: "Hospitality-Led Workplace Experience", text: "Seamless facilities management, concierge-level support, and frictionless day-to-day experience." },
                { icon: Users, title: "Thriving Business Community", text: "Curated network of founders, innovators, and professionals with events and workshops." },
                { icon: Leaf, title: "Sustainable & Smart Workspaces", text: "Energy-efficient, eco-friendly, and technology-integrated environment.", span: true }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`
                    p-10 rounded-3xl shadow-sm border transition-all duration-300 group
                    ${item.span ? 'md:col-span-2 lg:col-span-1' : ''}
                    ${theme === "dark"
                      ? "bg-white/5 border-white/10 hover:shadow-xl"
                      : "bg-white border-gray-100 hover:shadow-lg"}
                  `}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300
                    ${theme === "dark" ? "bg-white/5" : "bg-gray-100"}
                  `}>
                    <item.icon className={`w-6 h-6 transition-colors duration-300 
                      ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
                    `} />
                  </div>

                  <h3 className={`text-xl font-medium mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {item.title}
                  </h3>

                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} leading-relaxed`}>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Future Ready */}
      <section className={`py-24 ${theme === "dark" ? "bg-black" : "bg-gradient-to-b from-white to-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp}>
            <div className="text-center mb-16">
              <div className={`w-16 h-1 mx-auto rounded-full mb-4 ${theme === "dark" ? "bg-white/80" : "bg-gray-800"}`}></div>
              <h2 className={`text-4xl md:text-5xl font-light mb-6 tracking-tight 
                ${theme === "dark" ? "text-white" : "text-gray-900"}
              `}>
                A Future-Ready Workspace Platform
              </h2>
            </div>

            <div className={`
              p-12 rounded-3xl shadow-lg max-w-5xl mx-auto mb-16
              ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border border-gray-100"}
            `}>
              <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} leading-relaxed text-center text-lg`}>
                The future of work is dynamic, digital, and hybrid — and The Hive is built for it.
              </p>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
            >
              {[
                "IoT-enabled operations",
                "Smart access and automated systems",
                "High-performance collaboration zones",
                "Flexible expansion options for scaling teams"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`
                    p-8 rounded-2xl shadow-sm relative overflow-hidden transition-all duration-300 group
                    ${theme === "dark"
                      ? "bg-white/5 border-white/10 text-gray-300 hover:shadow-xl"
                      : "bg-white border border-gray-100 text-gray-700 hover:shadow-md"}
                  `}
                >
                  <div className={`absolute top-0 right-0 w-20 h-20 rounded-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150
                    ${theme === "dark" ? "bg-white/10" : "bg-gray-50"}
                  `}></div>

                  <p className="relative z-10 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              {...fadeInUp}
              className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} leading-relaxed text-center max-w-3xl mx-auto text-lg`}
            >
              This ensures your workspace remains relevant, efficient, and competitive.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Growth Roadmap */}
      <section className={`${theme === "dark" ? "bg-black" : "bg-white"} py-24`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp}>

            <div className="text-center mb-20">
              <div className={`w-16 h-1 mx-auto rounded-full mb-4 ${theme === "dark" ? "bg-white/80" : "bg-gray-800"}`}></div>
              <h2 className={`text-4xl md:text-5xl font-light tracking-tight 
                ${theme === "dark" ? "text-white" : "text-gray-900"}
              `}>
                Growth Roadmap of The Hive Workspaces
              </h2>
            </div>

            <motion.div
              className="grid md:grid-cols-3 gap-8 mb-20"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
            >
              {PHASE_LIST.map((phase, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`
                    p-10 rounded-3xl shadow-sm relative overflow-hidden transition-all duration-300 group
                    ${theme === "dark"
                      ? "bg-white/5 border-white/10 hover:shadow-xl"
                      : "bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:shadow-lg"}
                  `}
                >
                  <div className={`absolute top-0 left-0 w-2 h-full transition-all duration-300
                    ${theme === "dark" ? "bg-white/50 group-hover:bg-white" : "bg-gray-900 group-hover:w-3"}
                  `}></div>

                  <div className="pl-4">
                    <div className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-sm font-medium mb-2`}>
                      {phase.phase}
                    </div>

                    <h3 className={`text-2xl font-light mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {phase.title}
                    </h3>

                    <div className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-sm mb-6`}>
                      {phase.period}
                    </div>

                    <ul className="space-y-4">
                      {phase.items.map((item, idx) => (
                        <li key={idx} className={`flex items-start gap-3 leading-relaxed 
                          ${theme === "dark" ? "text-gray-300" : "text-gray-600"}
                        `}>
                          <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0
                            ${theme === "dark" ? "bg-white/70" : "bg-gray-400"}
                          `}></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </motion.div>
              ))}
            </motion.div>

            {/* Conclusion */}
            <motion.div
              {...fadeInUp}
              className={`
                max-w-5xl mx-auto p-12 rounded-3xl shadow-xl relative overflow-hidden
                ${theme === "dark" ? "bg-white/10" : "bg-gradient-to-br from-gray-900 to-gray-800"}
              `}
            >
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mb-48"></div>

              <div className="relative z-10">
                <h3 className="text-3xl font-light mb-6 text-white">Conclusion</h3>

                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  The Hive Workspaces stands at the intersection of modern commercial real estate...
                </p>

                <p className="text-gray-300 leading-relaxed text-lg">
                  With premium amenities and strategic locations, The Hive is shaping the next chapter of work in India.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

    </div>
  );
}
