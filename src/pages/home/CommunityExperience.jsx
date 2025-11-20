import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CommunityExperience = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8 xl:px-0">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-0 bg-white  overflow-hidden">
          {/* Image on the left */}
          <div className="relative min-h-[400px] md:min-h-[500px]">
            <img
              src="/community.jpg"
              alt="Modern office workspace"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Text content on the right */}
          <div className="px-8 lg:px-12 flex flex-col justify-start items-start text-left">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#0e1932] leading-tight">
                More Than Just A Flexible Workspace
              </h2>
              
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  At The Hive, we offer more than flexible office space.
                </p>
                
                <p>
                  Hive Members enjoy exclusive access to our dynamic Hive Community™ events, 
                  allowing them to network and meet other like-minded professionals. Our 
                  dedication to our Members' success doesn't stop there.
                </p>
                
                <p>
                  We provide first-class service from start to finish, whether it's from the 
                  guest reception where you first walk in, to the comprehensive IT support 
                  whenever you need it.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-[#0f6ef1] font-medium hover:gap-3 transition-all group"
                >
                  Experience the difference at The Hive today
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

