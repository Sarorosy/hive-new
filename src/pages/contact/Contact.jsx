import React from "react";
import ContactForm from "../../components/ContactForm";
import { useOutletContext } from "react-router-dom";

export default function Contact() {
  const { theme } = useOutletContext();

  return (
    <div
      className={`
        min-h-screen py-16
        ${theme === "dark"
          ? "bg-gradient-to-b from-black to-gray-900 text-white"
          : "bg-gradient-to-b from-white to-gray-50 text-gray-900"}
      `}
    >
      <section className="px-4 md:px-12">

        <div
          className={`
            w-full p-6 md:p-10
            ${theme === "dark"
              ? "bg-[#111] text-white border border-gray-800"
              : "bg-white text-gray-900"}
          `}
        >

          <div className="mb-8 text-center">
            <p
              className={`
                text-xs font-semibold uppercase tracking-[0.4em]
                ${theme === "dark" ? "text-orange-400" : "text-orange-500"}
              `}
            >
              Book a visit
            </p>

            <h1
              className={`
                mt-3 text-3xl font-semibold liber
                ${theme === "dark" ? "text-white" : "text-gray-900"}
              `}
            >
              Tell us about your workspace requirement
            </h1>

            <p
              className={`
                mt-3 text-base
                ${theme === "dark" ? "text-gray-300" : "text-gray-600"}
              `}
            >
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
