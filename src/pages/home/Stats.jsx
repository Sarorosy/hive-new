import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Counter = ({ end, duration = 1000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const frameRate = 30; // updates per second
    const totalFrames = Math.round((duration / 1000) * frameRate);
    const increment = end / totalFrames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count} {end === 99 ? "%" : "+"}</span>;
};



const Stats = () => {
  const outletContext = useOutletContext?.() || {};
  const { setContactFormOpen } = outletContext;
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white py-6 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 rounded-tl-[45px] rounded-br-[45px] shadow-lg max-w-7xl mx-auto mt-4" >
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
            <Counter end={5} />{" "}
          </p>
          <p className="opacity-80">Prime Locations</p>
        </div>
        <div>
          <p className="text-xl md:text-2xl font-bold">
            <Counter end={20000} duration={1} />{" "}
          </p>
          <p className="opacity-80">Workstations</p>
        </div>
        <div>
          <p className="text-xl md:text-2xl font-bold">
            <Counter end={50} />{" "}
          </p>
          <p className="opacity-80">Meeting Rooms</p>
        </div>
        <div>
          <p className="text-xl md:text-2xl font-bold">
            <Counter end={99} />{" "}
          </p>
          <p className="opacity-80">Satisfied Customers</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
