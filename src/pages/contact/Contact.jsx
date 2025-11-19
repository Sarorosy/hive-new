import React from "react";
import ContactForm from "../../components/ContactForm";

export default function Contact() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-16 text-gray-900">
      <section className="px-4 md:px-12">
        <div className="w-full bg-white p-6 md:p-10">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-orange-500">
              Book a visit
            </p>
            <h1 className="mt-3 text-3xl font-semibold font-serif">
              Tell us about your workspace requirement
            </h1>
            <p className="mt-3 text-base text-gray-600">
              Share your team size, preferred city, and timeline—we will get in touch within 24
              hours.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

