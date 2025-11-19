import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  MessageCircle,
  Headphones,
} from "lucide-react";
import ContactForm from "../../components/ContactForm";
import heroImage from "../../assets/hero2.jpg";
import { centersData } from "../../data/centersData";

const contactChannels = [
  {
    label: "Talk to Sales",
    value: "+91-70222 74000",
    href: "tel:+917022274000",
    icon: Phone,
    description: "Available 9 AM – 8 PM IST on all business days.",
  },
  {
    label: "Email Us",
    value: "hello@hiveworkspaces.com",
    href: "mailto:hello@hiveworkspaces.com",
    icon: Mail,
    description: "We reply within one business day.",
  },
  {
    label: "Visit Us",
    value: "The Hive, VR Chennai",
    href: "https://maps.app.goo.gl/iJKt5EqtDUC5DBfs7",
    icon: MapPin,
    description: "Schedule a tour at any of our flagship centers.",
  },
];

const serviceHighlights = [
  "Enterprise-ready managed offices with custom branding",
  "Move-in ready coworking seats for agile teams",
  "Meeting rooms and day passes that scale on demand",
  "Dedicated account managers for every enterprise partner",
  "Pan-India presence with expansion-ready campuses",
];

const cityHighlights = Object.entries(centersData).map(([slug, city]) => ({
  slug,
  name: city.name,
  description: city.description,
  branches: Object.keys(city.branches || {}).length,
  image: city.centerImages?.[0] || city.image,
}));

const primaryOffice = {
  title: "Experience Center",
  addressLine1: "The Hive, VR Chennai, Jawaharlal Nehru Road",
  addressLine2: "Anna Nagar, Chennai – 600040, India",
  timings: "Mon – Sat · 9:00 AM to 8:00 PM IST",
};

export default function Contact() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 pb-16 text-gray-900">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-black text-white">
        <img
          src={heroImage}
          alt="The Hive coworking community"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:flex-row md:items-center">
          <div className="md:w-2/3">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-300">
              Contact The Hive
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl font-serif">
              Let's craft a workspace that grows with your ambition.
            </h1>
            <p className="mt-6 text-lg text-gray-200">
              Share your requirements and our workspace consultants will help
              you shortlist the right Hive center, book a tour, and move in
              without friction.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="tel:+917022274000"
                className="rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:opacity-90"
              >
                Call Sales
              </a>
              <a
                href="#Form"
                className="rounded-full border border-white/60 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                Book a Tour
              </a>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-200">
                Why Teams Choose The Hive
              </p>
              <ul className="mt-5 space-y-3 text-sm text-gray-100">
                {serviceHighlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-orange-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-3">
        {contactChannels.map(({ label, value, description, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-black/60 hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-black p-3 text-white">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold uppercase text-gray-500">
                {label}
              </p>
            </div>
            <p className="mt-4 text-lg font-semibold text-gray-900">{value}</p>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          </a>
        ))}
      </section>

      {/* Contact form */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="rounded-3xl bg-white p-4 shadow-xl ring-1 ring-gray-100 md:p-8">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-orange-500">
              Book a visit
            </p>
            <h2 className="mt-3 text-3xl font-semibold font-serif">
              Tell us about your workspace requirement
            </h2>
            <p className="mt-3 text-base text-gray-600">
              Share your team size, preferred city, and timeline—we will get in
              touch within 24 hours.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* City highlights */}
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-orange-500">
            National footprint
          </p>
          <h2 className="text-3xl font-semibold font-serif">
            Visit a Hive near you
          </h2>
          <p className="text-base text-gray-600">
            Four cities, dozens of premium centers, and a single point of contact.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cityHighlights.map(({ slug, name, branches, image, description }) => (
            <div
              key={slug}
              className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={image}
                  alt={`${name} center`}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800">
                  {branches} {branches === 1 ? "center" : "centers"}
                </span>
              </div>
              <div className="space-y-4 px-6 py-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
                    {name}
                  </p>
                  <p className="mt-2 text-base text-gray-600 line-clamp-3">
                    {description}
                  </p>
                </div>
                <Link
                  to={`/${slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:gap-3"
                >
                  Explore centers
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support & hours */}
      <section className="mx-auto mt-16 max-w-6xl grid gap-8 px-6 md:grid-cols-2">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-orange-500">
            Visit us
          </p>
          <h3 className="mt-3 text-2xl font-semibold">{primaryOffice.title}</h3>
          <p className="mt-4 text-gray-700">{primaryOffice.addressLine1}</p>
          <p className="text-gray-700">{primaryOffice.addressLine2}</p>
          <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            {primaryOffice.timings}
          </div>
          <iframe
            title="The Hive VR Chennai"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.2932777426718!2d80.19485637512473!3d13.080590287244858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265b5d8e2606b%3A0x648fcc48a540559f!2sThe%20Hive!5e0!3m2!1sen!2sin!4v1755267396136!5m2!1sen!2sin"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="mt-6 h-64 w-full rounded-2xl border border-gray-100"
            allowFullScreen
          />
        </div>
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-orange-500">
            Dedicated support
          </p>
          <h3 className="mt-3 text-2xl font-semibold">Always-on assistance</h3>
          <p className="mt-4 text-gray-600">
            From enterprise workspace strategy to day-pass queries, our team is a
            call or message away.
          </p>
          <div className="mt-8 space-y-4">
            {[
              {
                title: "Enterprise Solutions Desk",
                icon: Users,
                detail: "Scaling beyond 200 seats or multiple cities.",
              },
              {
                title: "Member Happiness Team",
                icon: Headphones,
                detail: "Operational support for existing members.",
              },
              {
                title: "Quick Response WhatsApp",
                icon: MessageCircle,
                detail: "+91-70222 74000 (message support).",
              },
            ].map(({ title, icon: Icon, detail }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-2xl bg-gray-50 p-4"
              >
                <div className="rounded-2xl bg-black p-3 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
                    {title}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

