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
  Zap,
  ChevronRight,
  Circle,
  Hexagon,
  Diamond,
  Infinity,
  Rocket,
  Globe,
  Cpu,
  Shield,
  Award,
  Target as TargetIcon
} from 'lucide-react';
import { useOutletContext } from "react-router-dom";

export default function HiveWorkspaces() {
  const { theme } = useOutletContext();
  const isDark = theme === "dark";

  // Floating geometric shapes for background
  const FloatingShape = ({ icon: Icon, x, y, delay, size = 20 }) => (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <Icon
        className={`w-${size} h-${size} ${isDark ? "text-slate-800/50" : "text-gray-200"}`}
        strokeWidth={0.5}
      />
    </motion.div>
  );

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
      ],
      icon: <Circle className="w-4 h-4" />
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
      ],
      icon: <Hexagon className="w-4 h-4" />
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
      ],
      icon: <Diamond className="w-4 h-4" />
    }
  ];

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        isDark ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Animated geometric background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingShape
            key={i}
            icon={[Circle, Hexagon, Diamond][i % 3]}
            x={Math.random() * 100}
            y={Math.random() * 100}
            delay={Math.random() * 2}
            size={Math.random() * 20 + 10}
          />
        ))}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            isDark ? "from-black via-slate-900 to-black" : "from-white via-gray-50 to-white"
          }`}
        ></div>
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05)_0%,transparent_50%)]"
              : "bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.03)_0%,transparent_50%)]"
          }`}
        ></div>
      </div>

      {/* Hero Identity Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Subtle header */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className={`w-16 h-px ${isDark ? "bg-slate-600" : "bg-gray-300"}`}></div>
              <span
                className={`text-sm font-medium  uppercase ${
                  isDark ? "text-slate-300" : "text-gray-500"
                }`}
              >
                Our Identity
              </span>
              <div className={`w-16 h-px ${isDark ? "bg-slate-600" : "bg-gray-300"}`}></div>
            </div>

            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 liber ">
                <span className={`block ${isDark ? "text-white" : "text-gray-900"}`}>
                  Future-Ready
                </span>
                <span className={`block ${isDark ? "text-slate-400" : "text-gray-400"}`}>
                  Commercial Ecosystem
                </span>
              </h1>
            </motion.div>

            {/* Main statement card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative mb-16"
            >
              <div
                className={`absolute -inset-0.5 rounded-3xl blur opacity-20 bg-gradient-to-r ${
                  isDark ? "from-white/60 to-slate-500/60" : "from-black to-gray-800"
                }`}
              ></div>
              <div
                className={`relative rounded-3xl p-12 border ${
                  isDark ? "bg-black/70 border-slate-800" : "bg-white border-gray-100"
                }`}
              >
                <div className="max-w-3xl mx-auto text-center">
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
                      isDark ? "bg-white text-black" : "bg-black text-white"
                    }`}
                  >
                    <Rocket className="w-4 h-4" />
                    <span className="text-sm font-medium">BEYOND OFFICE SPACES</span>
                  </div>
                  <p
                    className={`text-2xl md:text-3xl leading-relaxed ${
                      isDark ? "text-slate-200" : "text-gray-700"
                    }`}
                  >
                    The Hive is more than a shared office... it's a{" "}
                    <span className={`font-bold ${isDark ? "text-white" : "text-black"}`}>
                      future-ready commercial real estate ecosystem
                    </span>{" "}
                    designed to empower businesses in the new era of work.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Core pillars grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { 
                  icon: Building2, 
                  title: "Managed Solutions",
                  description: "Grade-A managed office solutions",
                  color: isDark ? "bg-white/10" : "bg-blue-50"
                },
                { 
                  icon: TrendingUp, 
                  title: "Flexible Models",
                  description: "Flexible leasing and enterprise workspace models",
                  color: isDark ? "bg-white/10" : "bg-green-50"
                },
                { 
                  icon: Zap, 
                  title: "Smart Management",
                  description: "Smart, tech-integrated workplace management",
                  color: isDark ? "bg-white/10" : "bg-purple-50"
                },
                { 
                  icon: Users, 
                  title: "Community Driven",
                  description: "Community-focused environments that drive innovation",
                  color: isDark ? "bg-white/10" : "bg-orange-50"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative"
                >
                  <div
                    className={`absolute inset-0 rounded-2xl border transition-all duration-300 bg-gradient-to-br ${
                      isDark
                        ? "from-black/60 to-slate-900/60 border-slate-800 group-hover:border-white/40"
                        : "from-white to-gray-50 border-gray-100 group-hover:border-gray-300"
                    }`}
                  ></div>
                  <div className="relative p-8">
                    <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`w-6 h-6 ${isDark ? "text-white" : "text-gray-800"}`} />
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>{item.title}</h3>
                    <p className={`${isDark ? "text-slate-300" : "text-gray-600"} leading-relaxed`}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Purpose statement */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6 ${
                  isDark ? "bg-white/10" : "bg-gray-50"
                }`}
              >
                <TargetIcon className={`w-4 h-4 ${isDark ? "text-white" : "text-gray-600"}`} />
                <span className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-700"}`}>
                  Our Purpose
                </span>
              </div>
              <p
                className={`text-xl leading-relaxed ${
                  isDark ? "text-slate-300" : "text-gray-600"
                }`}
              >
                Our purpose is simple: to help businesses grow better by providing them with spaces that are not just functional, but transformational.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Why Choose Section */}
      <section
        className={`py-24 bg-gradient-to-b ${
          isDark ? "from-black via-slate-900 to-black" : "from-white to-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="sticky top-24">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-12 h-0.5 ${isDark ? "bg-white" : "bg-black"}`}></div>
                  <span
                    className={`text-sm font-medium  uppercase ${
                      isDark ? "text-slate-300" : "text-gray-500"
                    }`}
                  >
                    Our Mission
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 liber">
                  Driving Business<br />
                  <span className={isDark ? "text-slate-400" : "text-gray-400"}>
                    Excellence Forward
                  </span>
                </h2>
                
                <div className="relative mb-12">
                  <div
                    className={`absolute -inset-4 rounded-2xl blur-xl ${
                      isDark
                        ? "bg-gradient-to-r from-white/5 to-transparent"
                        : "bg-gradient-to-r from-black/5 to-transparent"
                    }`}
                  ></div>
                  <div
                    className={`relative p-10 rounded-2xl bg-gradient-to-br ${
                      isDark ? "from-white/10 to-slate-800" : "from-black to-gray-800"
                    } text-white`}
                  >
                    <div className="text-5xl font-bold mb-2">"</div>
                    <p className="text-xl leading-relaxed mb-6">
                      To provide premium, flexible workspace solutions that empower businesses to scale, innovate, and thrive in a dynamic market environment.
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-0.5 bg-white/50"></div>
                      <span className="text-sm font-medium">The Hive Promise</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-12 h-0.5 ${isDark ? "bg-white" : "bg-black"}`}></div>
                  <span
                    className={`text-sm font-medium tracking-widest uppercase ${
                      isDark ? "text-slate-300" : "text-gray-500"
                    }`}
                  >
                    Why Choose Us
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold mb-10 liber">
                  The Hive<br />
                  <span className={isDark ? "text-slate-400" : "text-gray-400"}>Advantage</span>
                </h3>

                {[
                  {
                    icon: Sparkles,
                    title: "Customised Workspace Solutions",
                    description: "Whether you need a private office, dedicated suite, managed corporate floor, or a fully custom build-to-suit workspace — The Hive delivers."
                  },
                  {
                    icon: MapPin,
                    title: "Prime Strategic Locations",
                    description: "Centres placed across high-demand commercial hubs ensure maximum accessibility and business visibility."
                  },
                  {
                    icon: Building2,
                    title: "Hospitality-Led Experience",
                    description: "Seamless facilities management, concierge-level support, and frictionless day-to-day experience."
                  },
                  {
                    icon: Users,
                    title: "Thriving Business Community",
                    description: "Curated network of founders, innovators, and professionals with events and workshops."
                  },
                  {
                    icon: Leaf,
                    title: "Sustainable & Smart",
                    description: "Energy-efficient, eco-friendly, and technology-integrated environment."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div
                      className={`flex gap-6 p-6 rounded-2xl transition-all duration-300 ${
                        isDark
                          ? "hover:bg-white/10 hover:shadow-lg"
                          : "hover:bg-white hover:shadow-lg"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                            isDark
                              ? "bg-white/10 group-hover:bg-white/20 group-hover:text-white"
                              : "bg-gray-100 group-hover:bg-black group-hover:text-white"
                          }`}
                        >
                          <item.icon className={`w-5 h-5 ${isDark ? "text-white" : ""}`} />
                        </div>
                      </div>
                      <div>
                        <h4 className={`text-lg font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                          {item.title}
                        </h4>
                        <p className={`${isDark ? "text-slate-300" : "text-gray-600"} leading-relaxed`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Future Ready Platform */}
      <section className={`py-24 ${isDark ? "bg-black" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6 ${
                isDark ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span className="text-sm font-medium">TECHNOLOGY INTEGRATION</span>
            </div>
            <h2 className="text-3xl md:text-4xl mb-6 liber">
              Future-Ready<br />
              <span className={isDark ? "text-slate-400" : "text-gray-400"}>Platform</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? "text-slate-300" : "text-gray-600"}`}>
              The future of work is dynamic, digital, and hybrid — and The Hive is built for it.
            </p>
          </motion.div>

          {/* Tech Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Shield, title: "IoT Operations", desc: "IoT-enabled operations" },
              { icon: Zap, title: "Smart Access", desc: "Smart access and automated systems" },
              { icon: Users, title: "Collaboration Zones", desc: "High-performance collaboration zones" },
              { icon: TrendingUp, title: "Flexible Scaling", desc: "Flexible expansion options for scaling teams" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8"
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-sm bg-gradient-to-br ${
                    isDark ? "from-white/10 to-slate-800/50" : "from-gray-100 to-white"
                  }`}
                >
                  <item.icon className={`w-7 h-7 ${isDark ? "text-white" : "text-gray-800"}`} />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {item.title}
                </h3>
                <p className={isDark ? "text-slate-300" : "text-gray-600"}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className={`text-xl leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"}`}>
              This ensures your workspace remains relevant, efficient, and competitive in an ever-evolving business landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Growth Roadmap */}
      <section
        className={`py-24 bg-gradient-to-b ${
          isDark ? "from-black via-slate-900 to-black" : "from-white to-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className={`w-12 h-0.5 ${isDark ? "bg-white" : "bg-black"}`}></div>
              <span
                className={`text-sm font-medium  uppercase ${
                  isDark ? "text-slate-300" : "text-gray-500"
                }`}
              >
                Growth Journey
              </span>
              <div className={`w-12 h-0.5 ${isDark ? "bg-white" : "bg-black"}`}></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 liber">
              Strategic<br />
              <span className={isDark ? "text-slate-400" : "text-gray-400"}>Roadmap</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b ${
                isDark ? "from-transparent via-slate-700 to-transparent" : "from-transparent via-gray-300 to-transparent"
              }`}
            ></div>
            
            {/* Phase cards */}
            <div className="space-y-12">
              {PHASE_LIST.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 shadow-lg z-10 ${
                      isDark ? "bg-white border-black" : "bg-black border-white"
                    }`}
                  ></div>
                  
                  {/* Content card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-16' : 'pl-16'}`}>
                    <div
                      className={`rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border ${
                        isDark ? "bg-black/60 border-slate-800" : "bg-white border-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isDark ? "bg-white/10" : "bg-gray-100"
                          }`}
                        >
                          {phase.icon}
                        </div>
                        <div>
                          <div className={`text-sm font-medium ${isDark ? "text-slate-300" : "text-gray-500"}`}>
                            {phase.phase}
                          </div>
                          <div className={`text-xs ${isDark ? "text-slate-400" : "text-gray-400"}`}>
                            {phase.period}
                          </div>
                        </div>
                      </div>
                      <h3 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                        {phase.title}
                      </h3>
                      <ul className="space-y-3">
                        {phase.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <ChevronRight
                              className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? "text-slate-400" : "text-gray-400"}`}
                            />
                            <span className={isDark ? "text-slate-300" : "text-gray-600"}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-24 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">CONCLUSION</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 liber ">
              Shaping the Future<br />
              <span className="text-gray-300">of Work in India</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                The Hive Workspaces stands at the intersection of modern commercial real estate and flexible, hospitality-driven workplace experiences.
              </p>
              <p>
                By combining premium Grade-A infrastructure with scalable, technology-enabled solutions, The Hive delivers value that goes beyond traditional office spaces.
              </p>
              <p className="font-medium text-white">
                With premium amenities, strategic locations, and a forward-thinking roadmap, The Hive is actively shaping the next chapter of work in India.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      
      
    </div>
  );
}