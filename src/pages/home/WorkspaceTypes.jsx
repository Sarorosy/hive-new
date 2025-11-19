import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const workspaceTabs = [
  {
    id: "private",
    label: "Private Offices",
    image: "/spacetypes/privatecabin.jpg",
    title: "Furnished Office Space To Call Home",
    description:
      "The Executive Centre offers fully-furnished offices for teams of all sizes and requirements. With flexible terms, professional support and tailor-made office layouts, it's an all-in-one office solution that's as good as it sounds.",
    highlights: [
      "Private office space for 1-200 people",
      "High-quality amenities and prime location",
      "Enjoy 24/7 access and Member Benefits"
    ],
    linkLabel: "Learn more about our Private Offices",
    link: "/workspaces/private-cabins"
  },
  {
    id: "coworking",
    label: "Coworking Spaces",
    image: "/spacetypes/hotdesk.jpg",
    title: "Dynamic Environments For Modern Teams",
    description:
      "Choose from hot desks or fixed seats inside vibrant community floors. Enjoy structured routines, daily flexibility, and every amenity you need to stay productive and connected.",
    highlights: [
      "Book by the day, week, or month",
      "Networking-friendly community lounges",
      "Concierge, printing and high-speed Wi-Fi"
    ],
    linkLabel: "Explore coworking options",
    link: "/workspaces/hot-desks"
  },
  {
    id: "virtual",
    label: "Virtual Offices",
    image: "/spacetypes/6.jpg",
    title: "Business Presence Without The Overheads",
    description:
      "Register your company with a prestigious address, access meeting rooms on-demand, and let our concierge handle calls and mail while you work from anywhere.",
    highlights: [
      "Professional address & mail handling",
      "On-demand meeting rooms across cities",
      "Dedicated concierge & call answering"
    ],
    linkLabel: "See virtual office plans",
    link: "/"
  },
  {
    id: "enterprise",
    label: "Managed Enterprise Solutions",
    image: "/spacetypes/4.jpg",
    title: "Scale Confidently With Customised Campuses",
    description:
      "From multi-floor hubs to multi-city delivery, TEC partners with enterprise teams to design, build, and run fully managed offices that reflect your brand DNA.",
    highlights: [
      "Dedicated account & facility management",
      "Integrated IT, security and compliance",
      "Single partner for design, build & operate"
    ],
    linkLabel: "Talk to our enterprise team",
    link: "/workspaces/enterprise-solutions"
  }
];

const customOfficeHighlights = [
  "Build your custom office space without the upfront capital expenditures",
  "Workspace designed for productivity and collaboration",
  "TEC acts as single point of contact and office space delivery partner"
];

const WorkspaceTypes = () => {
  const [activeTab, setActiveTab] = useState(workspaceTabs[0].id);
  const activeWorkspace = useMemo(
    () => workspaceTabs.find((tab) => tab.id === activeTab),
    [activeTab]
  );

  return (
    <section className="bg-[#f8f8fb] py-8 px-4 md:px-8 xl:px-0">
      <div className="max-w-6xl mx-auto space-y-5">
        <div className=" space-y-3">
          
          <h2 className="text-3xl md:text-4xl font-semibold text-[#0e1932]">
            Workspaces for Every Type of Professional
          </h2>
          <p className="text-slate-600 max-w-3xl ">
            Tap into a network of premium locations, full-service amenities, and
            hospitality-led teams that make your workday effortless.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {workspaceTabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 border transition-all text-sm font-medium ${
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
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[260px] md:min-h-[480px]">
              <img
                src={activeWorkspace.image}
                alt={activeWorkspace.label}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/20 pointer-events-none" />
            </div>
            <div className="p-8 lg:p-10 flex flex-col gap-6">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                  {activeWorkspace.label}
                </p>
                <h3 className="text-2xl font-semibold text-[#0e1932]">
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
              <Link
                to={activeWorkspace.link}
                className="inline-flex items-center gap-2 text-[#0f6ef1] font-medium hover:gap-3 transition-all"
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

