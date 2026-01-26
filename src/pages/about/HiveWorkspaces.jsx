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
      className={`min-h-screen relative overflow-hidden ${isDark ? "bg-black text-white" : "bg-white text-gray-900"
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
          className={`absolute inset-0 bg-gradient-to-br ${isDark ? "from-black via-slate-900 to-black" : "from-white via-gray-50 to-white"
            }`}
        ></div>
        <div
          className={`absolute inset-0 ${isDark
              ? "bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05)_0%,transparent_50%)]"
              : "bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.03)_0%,transparent_50%)]"
            }`}
        ></div>
      </div>

      {/* Hero Identity Section */}
      <section className="py-8 relative">
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
                className={`text-sm font-medium  uppercase ${isDark ? "text-slate-300" : "text-gray-500"
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
              <h1 className="text-3xl md:text-5xl  mb-6 liber ">
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
                className={`absolute -inset-0.5 rounded-3xl blur opacity-20 bg-gradient-to-r ${isDark ? "from-white/60 to-slate-500/60" : "from-black to-gray-800"
                  }`}
              ></div>
              <div
                className={`relative rounded-3xl p-12 border ${isDark ? "bg-black/70 border-slate-800" : "bg-white border-gray-100"
                  }`}
              >
                <div className="max-w-3xl mx-auto text-center">

                  <p
                    className={`text-xl md:text-2xl leading-relaxed ${isDark ? "text-slate-200" : "text-gray-700"
                      }`}
                  >
                    The Hive is more than a shared office... it's a{" "}
                    <span className={` ${isDark ? "text-white" : "text-black"}`}>
                      future-ready commercial real estate ecosystem designed to empower businesses in the new era of work.</span>{" "}
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
                  color: isDark ? "bg-white/10" : "bg-orange-50"
                },
                {
                  icon: TrendingUp,
                  title: "Flexible Models",
                  description: "Flexible leasing and enterprise workspace models",
                  color: isDark ? "bg-white/10" : "bg-orange-50"
                },
                {
                  icon: Zap,
                  title: "Smart Management",
                  description: "Smart, tech-integrated workplace management",
                  color: isDark ? "bg-white/10" : "bg-orange-50"
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
                    className={`absolute inset-0 rounded-2xl border transition-all duration-300 bg-gradient-to-br ${isDark
                        ? "from-black/60 to-slate-900/60 border-slate-800 group-hover:border-white/40"
                        : "from-white to-gray-50 border-gray-100 group-hover:border-gray-300"
                      }`}
                  ></div>
                  <div className="relative p-8">
                    <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`w-6 h-6 ${isDark ? "text-white" : "text-gray-800"}`} />
                    </div>
                    <h3 className={`text-xl  mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>{item.title}</h3>
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
              <p
                className={`text-xl leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"
                  }`}
              >
                Our purpose is simple: to help businesses grow better by providing them with spaces that are not just functional, but transformational.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* Future Ready Platform */}
      <section className={`py-8 ${isDark ? "bg-black" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >

            <h2 className="text-3xl md:text-4xl mb-6 liber">
              Future-Ready<br />
              <span className={isDark ? "text-slate-400" : "text-gray-400"}>Platform</span>
            </h2>
            <p className={`text-xl max-w-4xl mx-auto ${isDark ? "text-slate-300" : "text-gray-600"}`}>
              The future of work is dynamic, digital and hybrid.<br />&<br /> The Hive is built for it.
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
                  className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-sm bg-gradient-to-br ${isDark ? "from-white/10 to-slate-800/50" : "from-gray-100 to-white"
                    }`}
                >
                  <item.icon className={`w-7 h-7 ${isDark ? "text-white" : "text-gray-800"}`} />
                </div>
                <h3 className={`text-lg  mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
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


      {/* Conclusion */}
      <section className="pt-3 pb-10 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            
            <h2 className="text-4xl md:text-5xl  mb-8 liber ">
              Shaping the Future<br />
              <span className="text-gray-300">of Work in India</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                The Hive Workspaces stands at the intersection of modern commercial real estate and flexible, hospitality-driven workplace experiences.
                By combining premium Grade-A infrastructure with scalable, technology-enabled solutions, The Hive delivers value that goes beyond traditional office spaces.
                With premium amenities, strategic locations, and a forward-thinking roadmap, The Hive is actively shaping the next chapter of work in India.
              </p>

            </div>
          </motion.div>
        </div>
      </section>



    </div>
  );
}