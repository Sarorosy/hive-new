import { useEffect, useRef, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Counter = ({ end, duration = 0, shouldAnimate = false }) => {
  const [count, setCount] = useState(0);

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
      if (value >= 10000) return 500;
      if (value >= 5000) return 250;
      if (value >= 1000) return 100;
      if (value >= 500) return 50;
      if (value >= 100) return 10;
      if (value >= 50) return 5;
      return 1;
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
    <span>
      {count} {end === 99 ? "%" : "+"}
    </span>
  );
};



const Stats = () => {
  const outletContext = useOutletContext?.() || {};
  const { setContactFormOpen } = outletContext;
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

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div
      ref={statsRef}
      className="bg-black text-white py-6 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 rounded-tl-[45px] rounded-br-[45px] shadow-lg max-w-6xl mx-auto mt-4"
    >
      {/* Left CTA */}
      <button
        type="button"
        onClick={() => navigate("/about-us")}
        className="bg-gradient-to-br from-goldt via-gold to-goldt border border-white/20 rounded-tl-[25px] rounded-br-[25px] px-6 py-3 flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer"
      >
        <span className="text-sm opacity-90 flex items-center gap-1">
          <span className="bg-black text-white font-semibold px-4 py-2 rounded-tl-[15px] rounded-br-[15px] text-sm">
            Know More
          </span>
          <ArrowUpRight className="w-4 h-4 text-black" />
        </span>
      </button>

      {/* Right Stats */}
      <div className="flex flex-wrap justify-center gap-6 text-center text-sm md:text-base">
        <div>
          <p className="text-xl md:text-2xl font-bold">
            <Counter end={5} shouldAnimate={isVisible} />{" "}
          </p>
          <p className="opacity-80">Prime Locations</p>
        </div>
        <div>
          <p className="text-xl md:text-2xl font-bold">
            <Counter end={20000} duration={1} shouldAnimate={isVisible} />{" "}
          </p>
          <p className="opacity-80">Workstations</p>
        </div>
        <div>
          <p className="text-xl md:text-2xl font-bold">
            <Counter end={50} shouldAnimate={isVisible} />{" "}
          </p>
          <p className="opacity-80">Meeting Rooms</p>
        </div>
        <div>
          <p className="text-xl md:text-2xl font-bold">
            <Counter end={99} shouldAnimate={isVisible} />{" "}
          </p>
          <p className="opacity-80">Satisfied Customers</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
