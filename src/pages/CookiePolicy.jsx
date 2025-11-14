export default function CookiePolicy() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-slate-800 space-y-10">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Cookie Policy</h1>
      </div>

      {/* Consent */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Consent</h2>
        <p>
          We may store cookies on your device when they are strictly necessary for
          the operation of this website. For all other types of cookies, your
          permission is required. Necessary cookies are processed under GDPR Art.
          6 (1)(f), while analytics, preference, and marketing cookies require your
          consent under GDPR Art. 6 (1)(a).
        </p>
        <p className="mt-2">
          You may change or withdraw your cookie consent at any time on our website.
        </p>
      </div>

      {/* Choices */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Choices Regarding Cookies</h2>
        <p>
          You can avoid cookies by disabling them in your browser settings, then
          deleting any stored cookies. If you block cookies, some website features
          may not work properly.
        </p>
        <p className="mt-2">
          For instructions on deleting or blocking cookies, refer to your browser’s
          help pages.
        </p>
      </div>

      {/* Control Permissions */}
      <div>
        <h2 className="text-xl font-semibold mb-2">What If I Want To Control My Cookie Permissions?</h2>
        <p>
          You can configure your browser to alert you when cookies are sent, block
          them entirely, or remove existing cookies. Some functionality may be
          affected if cookies are disabled.
        </p>

        <button
          onClick={() => window.dispatchEvent(new Event("open-cookie-consent"))}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded"
        >
          Renew or change your cookie consent
        </button>
      </div>

      {/* About Policy */}
      <div>
        <h2 className="text-xl font-semibold mb-2">About Cookies Policy</h2>
        <p>Our Cookies Policy was last updated on 24 July 2024.</p>
        <p className="mt-2">
          This website uses cookies to enhance your browsing experience. Cookies
          help recognize your device and remember your preferences.
        </p>
        <p className="mt-2">
          Cookies do not store personal or sensitive information like passwords or
          payment details. For more information on how we protect your data,
          please refer to our Privacy Policy.
        </p>
      </div>

      {/* Definitions */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Interpretation and Definitions</h2>

        <p className="mt-2">
          <strong>“Company”</strong> refers to us (“the Company”, “We”, “Us”, or
          “Our”).
        </p>
        <p className="mt-2">
          <strong>“Cookies”</strong> means small files stored on your device by a
          website.
        </p>
        <p className="mt-2">
          <strong>“Website”</strong> refers to our site and related services.
        </p>
        <p className="mt-2">
          <strong>“You”</strong> means any individual or entity using the Website.
        </p>
      </div>

      {/* How we use cookies */}
      <div>
        <h2 className="text-xl font-semibold mb-2">How We Use Cookies</h2>
        <p>
          We use cookies to analyze website usage, improve your browsing experience,
          and deliver relevant content or ads when applicable.
        </p>
        <p className="mt-2">
          All cookies we use are anonymous and help optimize performance or show
          relevant promotions based on your visits.
        </p>
      </div>

      {/* Contact */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p>
          If you have questions about this Cookies Policy, you can contact us
          through our support or contact page.
        </p>
      </div>

      {/* Types of cookies */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Type of Cookies We Use</h2>

        <div className="space-y-4 mt-4">
          <div>
            <h3 className="font-semibold">Necessary cookies</h3>
            <p>Enable basic functionality and secure access.</p>
          </div>

          <div>
            <h3 className="font-semibold">Preferences cookies</h3>
            <p>Remember settings such as language and region.</p>
          </div>

          <div>
            <h3 className="font-semibold">Statistics cookies</h3>
            <p>Help us understand how visitors interact with the site.</p>
          </div>

          <div>
            <h3 className="font-semibold">Marketing cookies</h3>
            <p>Used to deliver relevant ads.</p>
          </div>

          <div>
            <h3 className="font-semibold">Unclassified cookies</h3>
            <p>Cookies that are still being analyzed and categorized.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
