import { Link } from "react-router-dom";
import { workspaces } from "../data/workspaceData";
import { citiesData } from "../data/centersData";

const workspaceLinks = workspaces.map((ws) => ({
  label: ws.name,
  to: `/workspaces/${ws.slug}`,
}));

const centerLinks = Object.values(citiesData)
  .flatMap((city) =>
    city.branches.map((branch) => ({
      label: branch.name,
      to: branch.route,
    }))
  )
  .sort((a, b) => a.label.localeCompare(b.label));

const sections = [
  {
    title: "Main",
    description: "Key entry points into The Hive experience.",
    links: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about-us" },
      { label: "Ecosystem", to: "/ecosystem" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Workspaces & Booking",
    description: "Discover workspaces and book your visit.",
    links: [
      { label: "All Locations", to: "/locations" },
      { label: "Landlord Relationships", to: "/landlord-relationships" },
      { label: "Book a Tour", to: "/contact" },
      { label: "Explore by Offerings", to: "/solutions" },
    ],
  },
  {
    title: "Workspace Solutions",
    description: "All workspace offerings available at The Hive.",
    links: workspaceLinks,
  },
  {
    title: "The Hive Office Locations",
    description: "All city and neighborhood locations you can visit.",
    links: centerLinks,
  },
  {
    title: "Content & Support",
    description: "Stories, opportunities and help.",
    links: [
      { label: "Blog Listing", to: "/blog" },
      { label: "Careers", to: "/careers" },
      { label: "FAQs", to: "/support/faq" },
    ],
  },
  {
    title: "Account & Legal",
    description: "Manage your account and review our policies.",
    links: [
      { label: "Login / Create Account", to: "/account/login" },
      { label: "Terms & Conditions", to: "/terms-and-conditions" },
      { label: "Refund Policy", to: "/refund-policy" },
      { label: "Cookie Policy", to: "/cookie-policy" },
    ],
  },
];

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <header className="mb-10">

          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Sitemap
          </h1>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl bg-white shadow-sm border border-gray-200/60 p-5 md:p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {section.title}
              </h2>
              {section.description && (
                <p className="mt-1 text-xs md:text-sm text-gray-600">
                  {section.description}
                </p>
              )}

              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.to || link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="inline-flex items-center text-sm text-[#0d2847] hover:text-orange-600 hover:underline transition-colors"
                      >
                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-orange-500" />
                        {link.label}
                      </Link>
                    ) : (
                      <div className="inline-flex items-center text-sm text-gray-700">
                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-gray-400" />
                        <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                          {link.label}
                        </code>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              {section.note && (
                <p className="mt-3 text-[11px] md:text-xs text-gray-500">
                  {section.note}
                </p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}


