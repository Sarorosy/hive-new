import { ArrowRight } from "lucide-react";
import one from "../../assets/managedoffices.jpg";
import two from "../../assets/meeting.jpg";
import three from "../../assets/privatecabin.jpg";
import four from "../../assets/offerings/enterprisesolutions/3.jpg";
import five from "../../assets/offerings/managedoffices/1.jpg";
import Slide from "./Slide";

const SmallAbout = () => {
    return (
        <section className="bg-gray-50 py-12 px-4 md:px-8">
            {/* Top text */}
            <div className="max-w-7xl mx-auto">
                <p className="text-sm text-gray-500 mb-2">/ About /</p>
                <div className="flex items-center">
                    <h2 className="text-4xl font-serif font-bold max-w-2xl mb-4">
                    Redefining the Future of Workspaces.
                </h2>
                <p className="text-gray-500 max-w-md">
                    Integer tincidunt cras dapibus. Vivamus elementum semper nisi, aenean
                    vulputate eleifend tellus.
                </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Large image */}
                <div className="md:col-span-2 overflow-hidden rounded-xl h-[520px]">
                    <Slide />
                </div>

                {/* Right side */}
                <div className="md:col-span-2 flex flex-col h-[520px]">
                    {/* Top two images filling height */}
                    <div className="flex flex-1 gap-6">
                        <div className="w-1/2 overflow-hidden rounded-xl">
                            <img
                                src={four}
                                alt="Meeting room"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="w-1/2 overflow-hidden rounded-xl">
                            <img
                                src={five}
                                alt="Cafe workspace"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Text and button */}
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-gray-500 text-md mb-4 w-3/4">
                            Duis leo sed fringilla mauris sit amet nibh donec sodales sagittis
                            magna. Sed consequat, leo eget bibendum sodales augue velit cursus
                            nunc.
                        </p>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-md">
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default SmallAbout;
