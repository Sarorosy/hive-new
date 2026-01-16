import { useEffect, useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { workspaceTabs } from "../../data/workspacesData";
import { workspaces } from "../../data/workspaceData";
import ManagedOffices from "../../assets/raw/all/DSC07782-min.JPG";
import EnterPriseSol from "../../assets/raw/chn/YAV00102-min.JPG";
import privateCabins2 from "../../assets/offerings/privatecabins/2.jpg";
import dedicatedDesks from "../../assets/raw/chn/skcl/dedicated.jpg";
import hotdesks from "../../assets/offerings/hotdesks/hotdesk-2.jpg";
import meetings3 from "../../assets/raw/blr/THEHIVEVR16.jpg";
import virtual from "../../assets/virtual-offices3.png";

const workspaceImageMap = {
  "managed-offices": ManagedOffices,
  "enterprise-solutions": EnterPriseSol,
  "private-cabins": privateCabins2,
  "dedicated-desks": dedicatedDesks,
  "hot-desks": hotdesks,
  "meetings-and-event-spaces": meetings3,
  "virtual-office": virtual,
};

const WorkspaceTypes = () => {
  const [activeTab, setActiveTab] = useState(workspaceTabs[0].id);
  const { theme } = useOutletContext();

  const activeWorkspace = useMemo(
    () => workspaceTabs.find((tab) => tab.id === activeTab),
    [activeTab]
  );

  const imageList = useMemo(() => {
    const images = [];

    if (activeWorkspace?.items) {
      activeWorkspace.items.forEach((item) => {
        const img = workspaceImageMap[item.slug];
        if (img) images.push(img);
      });
    }

    // Fallback if tab has no items (like older structure)
    if (images.length === 0 && activeWorkspace?.image) {
      images.push(activeWorkspace.image);
    }

    return images;
  }, [activeWorkspace]);


  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (imageList.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imageList.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [imageList]);



  return (
    <section
      className={`
        py-8 px-4 xl:px-0
        ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}
      `}
    >
      <div className="max-w-[90%] mx-auto space-y-5">
        <div className="space-y-3">
          <h2
            className={`text-3xl md:text-4xl liber ${theme === "dark" ? "text-white" : "text-black"
              }`}
          >
            Workspaces for Every Type of Professional
          </h2>

          <p
            className={`max-w-3xl ${theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}
          >
            Tap into a network of premium locations, full-service amenities, and
            hospitality-led teams that make your workday effortless.
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mt-8">
          {workspaceTabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full px-6 py-3 border transition-all text-sm font-medium
                  ${isActive
                    ? theme === "dark"
                      ? "bg-white text-black border-white shadow-lg shadow-white/20"
                      : "bg-black text-white border-black shadow-lg shadow-black/30"
                    : theme === "dark"
                      ? "bg-black text-white border-slate-700 hover:border-white/50"
                      : "bg-white text-black border-slate-200 hover:border-black/50"
                  }
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div
          className={`
            rounded-sm shadow-xl rounded-tl-[70px]  border overflow-hidden
            ${theme === "dark"
              ? "bg-black border-slate-800"
              : "bg-white border-slate-100"
            }
          `}
        >
          <div className="grid md:grid-cols-2 min-h-[520px]">
            {/* Left - Image */}
            {/* Left - Image Carousel */}
            <div className="relative h-[280px] md:h-[520px]  overflow-hidden">

              <img
                key={imageList[currentSlide]}
                src={imageList[currentSlide]}
                alt={activeWorkspace.label}
                className={`absolute ${activeWorkspace.label === "Additional Solutions" ? "object-left" : "object-center"} rounded-tl-[70px] rounded-br-[70px] inset-0 w-full h-full object-cover  transition-opacity duration-500`}
              />

              {/* Optional gradient overlay */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/20 pointer-events-none" /> */}

              {/* DOTS */}
              <div
                className={`
      absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1 rounded-full backdrop-blur-sm
      ${theme === "dark" ? "bg-black/40" : "bg-black/20"}
    `}
              >
                {imageList.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(i);
                    }}
                    className={`w-1.5 h-1.5 rounded-full ${i === currentSlide ? "bg-white" : "bg-white/50"
                      }`}
                  />
                ))}
              </div>
            </div>


            {/* Right - Content */}
            <div className="p-8 lg:p-10 flex flex-col gap-6 h-full">
              <div className="space-y-6 flex-1">
                <div className="space-y-3">
                  <p
                    className={`text-sm uppercase tracking-[0.25em] ${theme === "dark" ? "text-slate-400" : "text-slate-500"
                      }`}
                  >
                    {activeWorkspace.label}
                  </p>

                  <h3
                    className={`text-2xl font-semibold liber ${theme === "dark" ? "text-white" : "text-black"
                      }`}
                  >
                    {activeWorkspace.title}
                  </h3>

                  <p
                    className={`leading-relaxed ${theme === "dark" ? "text-slate-300" : "text-slate-600"
                      }`}
                  >
                    {activeWorkspace.description}
                  </p>
                </div>

                {/* Highlights */}
                <ul className="space-y-4">
                  {activeWorkspace.highlights.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-3 ${theme === "dark" ? "text-slate-200" : "text-slate-700"
                        }`}
                    >
                      <span className="mt-1 text-[#f5c774]">
                        <CheckCircle2 className="w-5 h-5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={"/solutions"}
                className="inline-flex items-center gap-2 text-orange-500 font-medium hover:gap-3 transition-all"
              >
                {activeWorkspace.linkLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkspaceTypes;
