import { useEffect, useRef, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Counter = ({ end, duration = 0, shouldAnimate = false }) => {
  const [count, setCount] = useState(0);
  const { theme } = useOutletContext();

  useEffect(() => {
    if (!end || end <= 0) {
      setCount(0);
      return;
    }

    if (!shouldAnimate) {
      setCount(0);
      return;
    }

    const getStep = (value) => {
      if (value >= 10000) return 80;
      if (value >= 5000) return 50;
      if (value >= 1000) return 50;
      if (value >= 500) return 50;
      if (value >= 100) return 10;
      if (value >= 50) return 3;
      return 0.5;
    };

    const getInterval = (value) => {
      if (duration) return Math.max(10, duration);
      if (value >= 10000) return 20;
      if (value >= 1000) return 25;
      if (value >= 500) return 30;
      if (value >= 100) return 35;
      return 50;
    };

    const step = getStep(end);
    const interval = getInterval(end);

    let current = 0;
    const timer = setInterval(() => {
      current += step;

      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount((prev) => Math.min(end, prev + step));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [end, duration, shouldAnimate]);

  return (
    <span className={theme != "dark" ? "text-white" : "text-black"}>
      {count} {end == 0.7 ? "Million" : "+"}
    </span>
  );
};

const Stats = () => {
  const outletContext = useOutletContext?.() || {};
  const { setContactFormOpen, theme } = outletContext;

  const navigate = useNavigate();
  const statsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div
      ref={statsRef}
      className={`
    py-6 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 
    rounded-tl-[45px] rounded-br-[45px] shadow-lg max-w-6xl mx-auto my-2
    ${theme != "dark"
          ? "bg-black text-white border border-slate-800"
          : "bg-white text-black border border-slate-200"
        }
  `}
    >
      {/* LEFT CTA */}
      <button
        type="button"
        onClick={() => navigate("/about-us")}
        className={`
      bg-gradient-to-br from-goldt via-gold to-goldt border rounded-tl-[25px] rounded-br-[25px] 
      px-6 py-3 flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer
      ${theme != "dark" ? "border-white/20" : "border-black/20"}
    `}
      >
        <span className="text-sm opacity-90 flex items-center gap-1">
          <span
            className={`
          font-semibold px-4 py-2 rounded-tl-[15px] rounded-br-[15px] text-sm
          ${theme != "dark" ? "bg-white text-black" : "bg-black text-white"}
        `}
          >
            Know More
          </span>
          <ArrowUpRight
            className={`w-4 h-4 ${theme != "dark" ? "text-white" : "text-black"
              }`}
          />
        </span>
      </button>

      {/* RIGHT STATS - ASCENDING ORDER */}
      <div
        className={`
      flex flex-wrap justify-center gap-32 text-center text-sm md:text-base
      ${theme != "dark" ? "text-white" : "text-black"}
    `}
      >
        {/* 6+ Cities */}
        <div>
          <p className="text-xl md:text-3xl ">
            <Counter end={6} shouldAnimate={isVisible} />{" "}
          </p>
          <p className={`${theme != "dark" ? "opacity-70" : "opacity-80"}`}>
            Cities
          </p>
        </div>

        {/* 14+ Centers */}
        <div>
          <p className="text-xl md:text-3xl ">
            <Counter end={14} shouldAnimate={isVisible} />
          </p>
          <p className={`${theme != "dark" ? "opacity-70" : "opacity-80"}`}>
            Centers
          </p>
        </div>

        {/* 10,000+ Seats */}
        <div>
          <p className="text-xl md:text-3xl ">
            <Counter end={10000} shouldAnimate={isVisible} />{" "}
          </p>
          <p className={`${theme != "dark" ? "opacity-70" : "opacity-80"}`}>
            Seats
          </p>
        </div>

        {/* 0.7M Sq.ft Area */}
        <div>
          <p className="text-xl md:text-3xl">
            <Counter end={0.7} shouldAnimate={isVisible} /> 
          </p>
          <p className={`${theme != "dark" ? "opacity-70" : "opacity-80"}`}>
            Sq.ft Area
          </p>
        </div>
      </div>
    </div>

  );
};

export default Stats;
