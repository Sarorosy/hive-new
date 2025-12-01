import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { workspaceTabs } from "../../data/workspacesData";

const WorkspaceTypes = () => {
  const [activeTab, setActiveTab] = useState(workspaceTabs[0].id);
  const activeWorkspace = useMemo(
    () => workspaceTabs.find((tab) => tab.id === activeTab),
    [activeTab]
  );

  return (
    <section className="bg-white py-8 px-4 md:px-8 xl:px-0">
      <div className="max-w-6xl mx-auto space-y-5">
        <div className=" space-y-3">
          
          <h2 className="text-3xl md:text-4xl  text-[#0e1932] liber">
            Workspaces for Every Type of Professional
          </h2>
          <p className="text-slate-600 max-w-3xl ">
            Tap into a network of premium locations, full-service amenities, and
            hospitality-led teams that make your workday effortless.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {workspaceTabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full px-6 py-3 border transition-all text-sm font-medium ${
                  isActive
                    ? "bg-black text-white border-black shadow-lg shadow-black/30"
                    : "bg-white text-black border-slate-200 hover:border-black/50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-sm shadow-xl border border-slate-100 overflow-hidden">
          <div className="grid md:grid-cols-2 min-h-[520px]">
            <div className="relative h-[280px] md:h-[520px] overflow-hidden">
              <img
                src={activeWorkspace.image}
                alt={activeWorkspace.label}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/20 pointer-events-none" />
            </div>
            <div className="p-8 lg:p-10 flex flex-col gap-6 h-full">
              <div className="space-y-6 flex-1">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                    {activeWorkspace.label}
                  </p>
                  <h3 className="text-2xl font-semibold liber text-[#0e1932]">
                    {activeWorkspace.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {activeWorkspace.description}
                  </p>
                </div>
                <ul className="space-y-4">
                  {activeWorkspace.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-700">
                      <span className="mt-1 text-[#f5c774]">
                        <CheckCircle2 className="w-5 h-5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to={activeWorkspace.link}
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

