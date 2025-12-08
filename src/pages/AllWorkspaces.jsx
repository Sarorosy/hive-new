import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import WorkspaceTypes from "./home/WorkspaceTypes";
import MeetingsEvents from "./home/MeetingsEvents";
import { solutionOfferings } from "../data/workspacesData";

const AllWorkspaces = () => {
  const navigate = useNavigate();
  const { theme } = useOutletContext();

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
              Industrious offers dedicated and shared workspaces for individuals and teams.
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
          py-16 px-4 md:px-8 xl:px-0
          ${theme === "dark" ? "bg-black" : "bg-white"}
        `}
      >
        <div className="max-w-6xl mx-auto space-y-10">

          <div className="space-y-3">
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

          {/* WORKSPACE LIST */}
          <div className="grid gap-6 md:grid-cols-2">
            {solutionOfferings.map((offering) => (
              <article
                key={offering.id}
                className={`
                  rounded-2xl p-6 space-y-5 shadow-sm transition-shadow
                  ${theme === "dark"
                    ? "border border-white/10 bg-white/5 hover:shadow-lg"
                    : "border border-slate-200 bg-white hover:shadow-xl"}
                `}
              >
                <div className="flex items-start gap-4 ">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      ${theme === "dark" ? "bg-white/10" : "bg-slate-100"}
                    `}
                  >
                    <img
                      src={offering.image}
                      alt={offering.title}
                      className="w-6 h-6"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <p
                      className={`
                        text-xs uppercase tracking-[0.3em]
                        ${theme === "dark" ? "text-gray-400" : "text-slate-500"}
                      `}
                    >
                      {offering.subtitle}
                    </p>

                    <h3
                      className={`
                        text-2xl liber
                        ${theme === "dark" ? "text-white" : "text-black"}
                      `}
                    >
                      {offering.title}
                    </h3>
                  </div>
                </div>

                <p
                  className={`
                    leading-relaxed
                    ${theme === "dark" ? "text-gray-300" : "text-slate-600"}
                  `}
                >
                  {offering.description}
                </p>

                <ul className="space-y-2">
                  {offering.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className={`
                        flex items-start gap-2 text-sm
                        ${theme === "dark" ? "text-gray-200" : "text-slate-700"}
                      `}
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#f5c774] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA BUTTONS */}
                <div className="flex flex-wrap gap-3">
                  {offering.items.map((item) => (
                    <button
                      key={item.slug}
                      onClick={() => navigate(`/workspaces/${item.slug}`)}
                      className={`
                        inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs  uppercase tracking-wider transition-colors
                        ${theme === "dark"
                          ? "bg-white/20 text-white hover:bg-white/30"
                          : "bg-[#0e1932] text-white hover:bg-black"}
                      `}
                    >
                      {item.name}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Workspace Types */}
      <div className={theme === "dark" ? "bg-gray-900" : "bg-slate-50"}>
        <WorkspaceTypes />
      </div>

      {/* Meetings and Events */}
      <MeetingsEvents />

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
