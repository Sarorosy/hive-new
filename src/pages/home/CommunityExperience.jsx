import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { assetPath } from "../../utils/assetPath";
import { useOutletContext } from "react-router-dom";

const CommunityExperience = () => {
  const { theme } = useOutletContext();

  return (
    <section
      className={`
        py-16 px-4 md:px-4 xl:px-0
        ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}
      `}
    >
      <div className="max-w-[90%] mx-auto">
        <div
          className={`
            grid md:grid-cols-2 gap-0 overflow-hidden
            ${theme === "dark" ? "bg-black" : "bg-white"}
          `}
        >
          {/* Image on the left */}
          <div className="relative min-h-[400px] md:min-h-[500px]">
            <img
              src={assetPath("community.jpg")}
              alt="Modern office workspace"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Text content on the right */}
          <div className="px-8 lg:px-12 flex flex-col justify-start items-start text-left">
            <div className="space-y-6">
              <h2
                className={`
                  text-3xl md:text-4xl liber font-semibold leading-tight
                  ${theme === "dark" ? "text-white" : "text-black"}
                `}
              >
                More Than Just A Flexible Workspace
              </h2>

              <div
                className={`
                  space-y-4 leading-relaxed
                  ${theme === "dark" ? "text-slate-300" : "text-slate-700"}
                `}
              >
                <p>At The Hive, we offer more than flexible office space.</p>

                <p>
                  Hive Members enjoy exclusive access to our dynamic Hive
                  Community™ events, allowing them to network and meet other
                  like-minded professionals. Our dedication to our Members'
                  success doesn't stop there.
                </p>

                <p>
                  We provide first-class service from start to finish, whether
                  it's from the guest reception where you first walk in, to the
                  comprehensive IT support whenever you need it.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  to="/contact"
                  className={`
                    inline-flex items-center gap-2 font-medium transition-all group
                    ${theme === "dark" ? "text-orange-400" : "text-orange-500"}
                  `}
                >
                  Experience the difference at The Hive today
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityExperience;
