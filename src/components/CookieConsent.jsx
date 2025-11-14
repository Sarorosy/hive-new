import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";

const CONSENT_KEY = "hive-cookie-consent";
const SIX_MONTHS_IN_SECONDS = 60 * 60 * 24 * 180;

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

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
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
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => setVisible(true);
    window.addEventListener("open-cookie-consent", handler);
    return () => window.removeEventListener("open-cookie-consent", handler);
  }, []);

  if (!visible) return null;

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
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-6 sm:pb-8 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-4xl rounded-[1.75rem] border border-slate-100 bg-white/95 backdrop-blur-2xl shadow-[0_40px_120px_rgba(15,23,42,0.18)]">
        <div className="px-6 py-6 sm:px-10 sm:py-8 space-y-5 text-slate-800">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
            <div className="flex-shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <Cookie />
            </div>
            <div className="space-y-2 text-left">
              <h2 className="text-2xl font-semibold text-slate-900">
                Your consent keeps Hive fast, secure & transparent
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                In line with global privacy standards, we only store cookies that are strictly
                necessary to operate this site without your permission. For everything else—such as
                preference, statistics, or marketing signals—we’ll wait for your go-ahead. You can
                adjust or withdraw that consent anytime.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3">
              <input
                type="checkbox"
                checked
                readOnly
                className="mt-1 accent-amber-500"
              />
              <span>
                <span className="block text-sm font-semibold text-slate-800">
                  Essential (always on)
                </span>
                <span className="text-sm text-slate-600">
                  Required for secure logins, booking flows, and fraud prevention—mandated legitimate
                  interest under GDPR Art. 6(1)(f).
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={() => togglePreference("analytics")}
                className="mt-1 accent-amber-500"
              />
              <span>
                <span className="block text-sm font-semibold text-slate-800">
                  Performance & statistics
                </span>
                <span className="text-sm text-slate-600">
                  Anonymous signals about load speed, scroll depth, and engagement so we can fine-tune
                  pages without slowing you down.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:col-span-2">
              <input
                type="checkbox"
                checked={preferences.personalization}
                onChange={() => togglePreference("personalization")}
                className="mt-1 accent-amber-500"
              />
              <span>
                <span className="block text-sm font-semibold text-slate-800">
                  Preference & personalization
                </span>
                <span className="text-sm text-slate-600">
                  Remembers your preferred city, workspace filters, and chat history so the experience
                  feels lighter every time you return.
                </span>
              </span>
            </label>
          </div>

          <div className="flex flex-wrap gap-3 justify-between items-center">
            <div className="text-xs sm:text-sm text-slate-500">
              Review the{" "}
              <Link
                to="/cookie-policy"
                className="text-amber-600 font-semibold underline-offset-2 hover:underline"
                onClick={() => setVisible(false)}
              >
                cookie policy
              </Link>{" "}
              for full details—including how to clear cookies from your browser if you want a fresh
              start.
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-cookie-secondary text-sm"
                onClick={() =>
                  saveConsent({ analytics: false, personalization: false })
                }
              >
                Essentials only
              </button>
              <button
                type="button"
                className="btn-cookie-secondary text-sm"
                onClick={() => saveConsent()}
              >
                Save preferences
              </button>
              <button
                type="button"
                className="btn-cookie-primary text-sm"
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

