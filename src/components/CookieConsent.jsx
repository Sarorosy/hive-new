import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, ChevronDown, ChevronUp } from "lucide-react";

const CONSENT_KEY = "hive-cookie-consent";
const SIX_MONTHS_IN_SECONDS = 60 * 60 * 24 * 180;
const DELAY_SECONDS = 15;

const defaultPreferences = {
  necessary: true,
  analytics: true,
  personalization: true,
};

const getStoredConsent = () => {
  if (typeof window === "undefined" || typeof document === "undefined") return null;

  const localValue = window.localStorage?.getItem(CONSENT_KEY);
  if (localValue) {
    try {
      return JSON.parse(localValue);
    } catch (_) {
      return null;
    }
  }

  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_KEY}=`))
    ?.split("=")[1];

  if (cookieValue) {
    try {
      return JSON.parse(decodeURIComponent(cookieValue));
    } catch (_) {
      return null;
    }
  }

  return null;
};

const persistConsent = (preferences) => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const payload = JSON.stringify(preferences);
  window.localStorage?.setItem(CONSENT_KEY, payload);
  document.cookie = `${CONSENT_KEY}=${encodeURIComponent(
    payload
  )};path=/;max-age=${SIX_MONTHS_IN_SECONDS};SameSite=Lax`;
};

export default function CookieConsent({ isContactFormOpen = false }) {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: true,
    personalization: true,
  });

  useEffect(() => {
    const existing = getStoredConsent();
    if (existing) {
      setPreferences({
        analytics:
          typeof existing.analytics === "boolean" ? existing.analytics : true,
        personalization:
          typeof existing.personalization === "boolean"
            ? existing.personalization
            : true,
      });
      setVisible(false);
    } else {
      // Show after 15 seconds delay, only if contact form is not open
      if (!isContactFormOpen) {
        const timer = setTimeout(() => {
          setVisible(true);
        }, DELAY_SECONDS * 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [isContactFormOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      if (!isContactFormOpen) {
        setVisible(true);
      }
    };
    window.addEventListener("open-cookie-consent", handler);
    return () => window.removeEventListener("open-cookie-consent", handler);
  }, [isContactFormOpen]);

  // Show cookie consent when contact form closes (if consent hasn't been given)
  useEffect(() => {
    if (!isContactFormOpen) {
      const existing = getStoredConsent();
      if (!existing) {
        // Delay to ensure smooth transition after contact form closes
        const timer = setTimeout(() => {
          setVisible(true);
        }, DELAY_SECONDS * 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [isContactFormOpen]);

  // Don't show cookie consent if contact form is open
  if (!visible || isContactFormOpen) return null;

  const saveConsent = (overrides = {}) => {
    const updatedPrefs = {
      ...defaultPreferences,
      analytics: preferences.analytics,
      personalization: preferences.personalization,
      ...overrides,
      updatedAt: new Date().toISOString(),
    };

    persistConsent(updatedPrefs);
    setVisible(false);
  };

  const togglePreference = (key) =>
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] px-4 pb-4 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white/98 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.15)] transform transition-all duration-300 ease-out translate-y-0 opacity-100">
        <div className="px-4 py-3.5 space-y-3 text-slate-800">
          {/* Compact Header */}
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black text-orange-400">
              <Cookie size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 leading-tight">
                We use cookies to enhance your experience. You can customize your preferences or{" "}
                <Link
                  to="/cookie-policy"
                  className="text-amber-600 font-semibold underline-offset-2 hover:underline"
                  onClick={() => setVisible(false)}
                >
                  learn more
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Expandable Details */}
          {showDetails && (
            <div className="pt-2 border-t border-slate-100 space-y-2.5 transition-all duration-200 opacity-100">
              <label className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2">
                <input
                  type="checkbox"
                  checked
                  readOnly
                  className="mt-0.5 accent-amber-500"
                />
                <span className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Essential:</span> Required for secure logins and site functionality.
                </span>
              </label>
              <label className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-white px-3 py-2">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={() => togglePreference("analytics")}
                  className="mt-0.5 accent-amber-500"
                />
                <span className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Analytics:</span> Anonymous performance data to improve our site.
                </span>
              </label>
              <label className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-white px-3 py-2">
                <input
                  type="checkbox"
                  checked={preferences.personalization}
                  onChange={() => togglePreference("personalization")}
                  className="mt-0.5 accent-amber-500"
                />
                <span className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Personalization:</span> Remembers your preferences for a better experience.
                </span>
              </label>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-slate-500 hover:text-slate-700 font-medium flex items-center gap-1 transition-colors"
            >
              {showDetails ? (
                <>
                  <ChevronUp size={14} /> Hide details
                </>
              ) : (
                <>
                  <ChevronDown size={14} /> Customize
                </>
              )}
            </button>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="btn-cookie-secondary text-xs px-3 py-1.5"
                onClick={() =>
                  saveConsent({ analytics: false, personalization: false })
                }
              >
                Essentials only
              </button>
              {showDetails && (
                <button
                  type="button"
                  className="btn-cookie-secondary text-xs px-3 py-1.5"
                  onClick={() => saveConsent()}
                >
                  Save
                </button>
              )}
              <button
                type="button"
                className="bg-black text-white rounded-2xl hover:bg-gray-900 transition-colors text-xs px-4 py-1.5"
                onClick={() =>
                  saveConsent({ analytics: true, personalization: true })
                }
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

