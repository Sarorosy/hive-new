import { Outlet, useNavigate } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import CookieConsent from "../components/CookieConsent";
import { useEffect, useState } from "react";
import LandingHeader from "../components/landing/LandingHeader";
import LandingFooter from "../components/landing/LandingFooter";

export default function LandingLayout() {
  const navigate = useNavigate();
  const [contactFormOpen, setContactFormOpen] = useState(false);

  // Theme state (light / dark) persisted in localStorage
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem("theme");
    return stored === "light" ? "light" : "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setContactFormOpen(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-full cs">
      <LandingHeader
        onBookTourClick={() => setContactFormOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="flex-grow w-full" id="scroll-container">
        <div className="container m-0 max-w-[100%]">
          <Outlet context={{ setContactFormOpen, theme }} />
        </div>
      </main>
      <LandingFooter theme={theme} />

      {contactFormOpen && (
        <ContactForm
          type="modal"
          onClose={() => {
            setContactFormOpen(false);
          }}
          theme={theme}
        />
      )}
      <CookieConsent isContactFormOpen={contactFormOpen} />
    </div>
  );
}
