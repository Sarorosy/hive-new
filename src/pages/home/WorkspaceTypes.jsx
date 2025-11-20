import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import four from "../../assets/offerings/privatecabins/3.jpg";
const workspaceTabs = [
  {
    id: "private",
    label: "Private Offices",
    image: "/spacetypes/privatecabin.jpg",
    title: "Your Workspace, Ready From Day One",
    description:
      "At The Hive, you get a complete, move-in-ready office designed for comfort, focus, and productivity. Every workspace is set up to match your team's style, size, and workflow-making it easy to settle in and start working right away.",
    highlights: [
      "Dedicated cabins for individuals or growing teams",
      "Premium facilities in a top-tier business location",
      "Round-the-clock access with exclusive member perks"
    ],
    linkLabel: "Learn more about our Private Offices",
    link: "/workspaces/private-cabins"
  },
  {
    id: "coworking",
    label: "Coworking Spaces",
    image: "/spacetypes/hotdesk.jpg",
    title: "Work Comfortably From Any Hive Location",
    description:
      "At The Hive, you can sit and get things done at any of our centres while enjoying all the facilities, support, and community advantages. Select the workspace style that suits your routine.",
    highlights: [
      "Open Seating: Choose any spot and begin your day at your convenience",
      "Personal Station: A permanent place that's always reserved for you",
      "Short-Stay Room: A private cabin available for a few days or a monthly stretch",
      "Community Connect: Join a network of members with special access and privileges"
    ],
    linkLabel: "Explore coworking options",
    link: "/workspaces/hot-desks"
  },
  {
    id: "virtual",
    label: "Virtual Offices",
    image: four,
    title: "A Strong Business Identity With A Trusted Address",
    description:
      "Create a solid presence for your brand using The Hive's virtual office solutions. Get a recognised address, organised call support, and managed mail services — perfect for individuals or companies wanting a professional image without a physical setup.",
    highlights: [
      "Registered Location: Use our centre's address to present your company in a reputable spot",
      "Phone Assistance: Receive a local number along with organised call responses",
      "Dual Plan: Get both options together plus complimentary access to our workspace every month"
    ],
    linkLabel: "See virtual office plans",
    link: "/"
  },
  {
    id: "enterprise",
    label: "Managed Enterprise Solutions",
    image: "/spacetypes/4.jpg",
    title: "Custom Design An Office Space That Fits Your Business",
    description:
      "A customised office solution for companies of all sizes. We'll take care of location, branding, IT and more. All you'll have to do is move in.",
    highlights: [
      "Build your custom office space without the upfront capital expenditures",
      "Workspace designed for productivity and collaboration",
      "TEC acts as single point of contact and office space delivery partner"
    ],
    linkLabel: "Talk to our enterprise team",
    link: "/workspaces/enterprise-solutions"
  }
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

