import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import WorkspaceTypes from "./home/WorkspaceTypes";
import MeetingsEvents from "./home/MeetingsEvents";
import { solutionOfferings } from "../data/workspacesData";
import { workspaces } from "../data/workspaceData";

// IMAGES
import ManagedOffices from "../assets/raw/all/DSC07782-min.JPG";

import EnterPriseSol from "../assets/raw/chn/YAV00102-min.JPG";

import privateCabins2 from "../assets/offerings/privatecabins/2.jpg";

import dedicatedDesks from "../assets/raw/chn/skcl/dedicated.jpg";

import hotdesks from "../assets/offerings/hotdesks/hotdesk-2.jpg";
import meetings3 from "../assets/raw/blr/THEHIVEVR16.jpg";
import virtual from "../assets/virtual-offices2.jpg";


const AllWorkspaces = () => {
  const navigate = useNavigate();
  const { theme } = useOutletContext();

  const getWorkspaceImage = (slug) => {
    const map = {
      "managed-offices": ManagedOffices,
      "enterprise-solutions": EnterPriseSol,
      "private-cabins": privateCabins2,
      "dedicated-desks": dedicatedDesks,
      "hot-desks": hotdesks,
      "meetings-and-event-spaces": meetings3,
      "virtual-office": virtual,
    };
    return map[slug] || ManagedOffices;
  };

  return (
    <main
      className={`
        min-h-screen pt-24
        ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}
      `}
    >

      {/* HERO SECTION */}
      <section
        className={`
          relative overflow-hidden
          ${theme === "dark" ? "bg-gray-900" : "bg-[#f9f7f2]"}
        `}
      >
        <div className="mx-auto grid md:grid-cols-2 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-3 z-10 pl-5">
            <h1
              className={`
                text-4xl md:text-5xl font-medium leading-tight liber
                ${theme === "dark" ? "text-white" : "text-black"}
              `}
            >
              Flexible workspace solutions
            </h1>

            <p
              className={`
                text-lg max-w-lg
                ${theme === "dark" ? "text-gray-300" : "text-black/70"}
              `}
            >
              The Hive offers dedicated and shared workspaces for individuals and teams.
            </p>
          </div>

          {/* RIGHT IMAGE BLOB */}
          <div className="relative w-full aspect-[6/4] md:aspect-[8/3] md:ml-auto md:mr-[-2rem] lg:mr-[-4rem]">
            <div className="absolute inset-0 rounded-bl-full overflow-hidden">
              <img
                src="/imagecompressor/14.jpg"
                className="h-full w-full object-cover"
                alt="workspace"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </section>

      {/* WORKSPACE CATALOG */}
      <section
        className={`
          py-16 px-4 md:px-8 
          ${theme === "dark" ? "bg-black" : "bg-white"}
        `}
      >
        <div className="max-w-7xl mx-auto space-y-10">

          <div className="space-y-3 max-w-lg">
            <p
              className={`
                text-sm uppercase tracking-[0.3em]
                ${theme === "dark" ? "text-gray-400" : "text-slate-500"}
              `}
            >
              Workspace catalog
            </p>

            <h2
              className={`
                text-3xl md:text-4xl liber 
                ${theme === "dark" ? "text-white" : "text-black"}
              `}
            >
              Pick the format that fits your team best
            </h2>

            <p
              className={`
                max-w-3xl
                ${theme === "dark" ? "text-gray-300" : "text-slate-600"}
              `}
            >
              Every solution comes fully serviced with ergonomic furniture,
              enterprise security, high-speed connectivity, and a dedicated
              community team to keep operations seamless.
            </p>
          </div>

          {/* WORKSPACE SECTIONS (left heading + right tiles) */}
          <div className="space-y-12">
            {solutionOfferings.map((offering) => (
              <section
                key={offering.id}
                className="flex flex-col md:flex-row items-start gap-6 md:gap-12"
              >
                {/* Left: icon + title + description */}
                <div className="md:w-[280px] flex-shrink-0 flex items-start gap-4">

                  <div>
                    <h3
                      className={`text-3xl liber ${theme === "dark" ? "text-white" : "text-black"
                        }`}
                    >
                      {offering.title}
                    </h3>
                    <div
                      className={`w-20 h-0.5 my-2 ${theme == "dark" ? "bg-slate-600" : "bg-gray-300"
                        }`}
                    ></div>

                    <p
                      className={`mt-2 max-w-md ${theme === "dark" ? "text-gray-300" : "text-slate-600"
                        }`}
                    >
                      {offering.description}
                    </p>
                  </div>
                </div>

                {/* Right: item tiles */}
                <div className="flex-1 grid gap-6 md:grid-cols-3">
                  {offering.items.map((item) => (
                    <div
                      key={item.slug}
                      onClick={() => {
                        if (item.slug == "virtual-office") {
                          navigate(`/${item.slug}`)
                        } else {
                          navigate(`/workspaces/${item.slug}`)
                        }
                      }}
                      className={`rounded-2xl cursor-pointer p-3 shadow-sm transition-shadow ${theme === "dark"
                          ? "border border-white/10 bg-white/5 hover:shadow-lg"
                          : "border border-slate-200 bg-white hover:border-slate-400"
                        }`}
                    >
                      <div className="h-36 mb-4 overflow-hidden  rounded-lg bg-slate-50">
                        <img
                          src={getWorkspaceImage(item.slug)}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <h4
                        className={`text-lg liber ${theme === "dark" ? "text-white" : "text-black"
                          }`}
                      >
                        {item.name}
                      </h4>

                      {item.description && (
                        <p
                          className={`mt-2 text-sm ${theme === "dark" ? "text-gray-300" : "text-slate-600"
                            }`}
                        >
                          {item.description}
                        </p>
                      )}


                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* Workspace Types */}
      <div className={theme === "dark" ? "bg-gray-900" : "bg-slate-50"}>
        {/* <WorkspaceTypes /> */}
      </div>

      {/* Meetings and Events */}
      {/* <MeetingsEvents /> */}

      {/* CTA SECTION */}
      <section
        className={`
          py-16 px-4 md:px-8 xl:px-0
          ${theme === "dark" ? "bg-[#0e1932]/90" : "bg-[#0e1932]"}
          text-white
        `}
      >
        <div className="max-w-6xl mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div className="space-y-3 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">
              Let&apos;s plan your workspace
            </p>

            <h3 className="text-3xl liber">
              Need help shortlisting the right solution?
            </h3>

            <p className="text-white/80">
              Share your headcount, preferred city, or move-in timeline and
              we&apos;ll curate a solution kit with layouts, commercials, and a
              handpicked list of centres.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/landlord-relationships")}
              className="rounded-full border border-white/30 px-6 py-3 text-sm  hover:bg-white/10 transition-all"
            >
              Partner with The Hive
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="rounded-full bg-white text-black px-6 py-3 text-sm  hover:translate-y-0.5 transition-all"
            >
              Start a conversation
            </button>
          </div>

        </div>
      </section>

    </main>
  );
};

export default AllWorkspaces;
