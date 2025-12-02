import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Clock,
  ArrowRight,
  Sparkles,
  Palette,
  Feather,
  Mail,
  Phone,
  ChevronRight,
} from "lucide-react";
import Breadcrumb from "../components/BreadCrumb";
import { useOutletContext } from "react-router-dom";
import EcoHero from "./EcoHero";

const heroHighlights = [
  { label: "Open Galleries", value: "08" },
  { label: "Curated Artists", value: "120+" },
  { label: "Masterpieces", value: "350+" },
];

const storyGallery = [
  {
    id: 1,
    image: "/ecosystem/vr/THEHIVEVR35.jpg",
    title: "Textured Memories",
    location: "Hall Of Frame",
  },
  {
    id: 2,
    image: "/ecosystem/blr/HiveBlr_Meeting-Room_5.jpg",
    title: "Quiet Reverie",
    location: "Main Atrium",
    featured: true,
  },
  {
    id: 3,
    image: "/ecosystem/pune/IMG_4385.jpg",
    title: "Black & White Study",
    location: "Studio B",
  },
  {
    id: 4,
    image: "/ecosystem/omr/THEHIVE91.jpg",
    title: "Hall Of Frame",
    location: "Gallery South",
  },
  {
    id: 5,
    image: "/ecosystem/vr/THEHIVEVR25.jpg",
    title: "Abstract Vision",
    location: "Gallery North",
  },
  {
    id: 6,
    image: "/ecosystem/blr/Common-Areas_3.jpg",
    title: "Modern Spaces",
    location: "Main Hall",
  },
  {
    id: 7,
    image: "/ecosystem/pune/HivePune_Cafe.jpg",
    title: "Cafe Culture",
    location: "Lounge Area",
  },
  {
    id: 8,
    image: "/ecosystem/omr/Hive_Enterprise_OMR.jpg",
    title: "Enterprise Hub",
    location: "Business Center",
  },
];

const featuredExhibits = [
  {
    id: "abstract",
    title: "Wing Abstract Art",
    category: "Abstract Art",
    description:
      "Bold movements that capture the rhythm of modern life. A celebration of form and fearless color.",
    image: "/ecosystem/vr/THEHIVEVR25.jpg",
    date: "March 15, 2024",
  },
  {
    id: "animal",
    title: "Elephant Abstract Artwork",
    category: "Animal Art",
    description:
      "Playful palettes give new energy to wildlife storytelling through immersive textures.",
    image: "/ecosystem/pune/HivePune_Amphitheater.jpg",
    date: "April 22, 2024",
  },
  {
    id: "geometric",
    title: "Mountain Abstract Artwork",
    category: "Geometric Art",
    description:
      "Layered gradients and architectural lines craft dreamlike landscapes that bend reality.",
    image: "/ecosystem/blr/HiveBlr_Meeting-Room_2.jpg",
    date: "May 10, 2024",
  },
];

const artistProfiles = [
  {
    id: "leslie",
    name: "Leslie Alexander",
    tag: "11 Years Old Painter | Based in Moscow",
    bio: "Leslie’s work is a tribute to emotion and movement. Her canvases blend youthful wonder with museum-grade craftsmanship.",
  },
  {
    id: "kristin",
    name: "Kristin Watson",
    tag: "Graffiti Artist | De Tiras",
    bio: "Kristin rewrites urban walls with tactile gradients and immersive typography crafted on site.",
  },
  {
    id: "floyd",
    name: "Floyd Miles",
    tag: "Russian Artist | Art Influencer",
    bio: "Floyd’s avant-garde storytelling marries digital motion with classic oil techniques.",
  },
  {
    id: "savannah",
    name: "Savannah Nguyen",
    tag: "International Contemporary Pop-Artist",
    bio: "Savannah delivers vibrant portraits that nod to fashion photography and visual poetry.",
  },
  {
    id: "ali",
    name: "Ali Abdaal",
    tag: "Samarkand Russian Artist",
    bio: "Ali experiments with light and shadow to reimagine architectural interiors as living sculptures.",
  },
];

const newsletterImages = [
  "/ecosystem/vr/THEHIVEVR18.jpg",
  "/ecosystem/blr/Common-Areas_3.jpg",
  "/ecosystem/pune/HivePune_Cafe.jpg",
  "/ecosystem/omr/Hive_Enterprise_OMR.jpg",
];

const EcosystemPage = () => {
  const { setContactFormOpen, theme } = useOutletContext();
  const [activeArtist, setActiveArtist] = useState(artistProfiles[0].id);
  const carouselRef = useRef(null);
  const animationRef = useRef(null);

  const activeBio = artistProfiles.find((artist) => artist.id === activeArtist);

  // Generate columns with alternating pattern: double, full, double, full...
  const generateColumns = (galleryArray, setIndex = 0) => {
    const columns = [];
    let imgIndex = 0;
    let colIndex = 0;
    let fullColumnIndex = 0; // Track full column index

    while (imgIndex < galleryArray.length) {
      if (colIndex % 2 === 0) {
        // Double images column
        if (imgIndex + 1 < galleryArray.length) {
          const item1 = galleryArray[imgIndex];
          const item2 = galleryArray[imgIndex + 1];
          columns.push({ type: 'double', items: [item1, item2], key: `double-${setIndex}-${colIndex}` });
          imgIndex += 2;
        } else {
          // If odd number of items left, show single
          columns.push({ type: 'full', items: [galleryArray[imgIndex]], key: `full-${setIndex}-${colIndex}`, fullIndex: fullColumnIndex++ });
          imgIndex += 1;
        }
      } else {
        // Full height single image column
        columns.push({ type: 'full', items: [galleryArray[imgIndex]], key: `full-${setIndex}-${colIndex}`, fullIndex: fullColumnIndex++ });
        imgIndex += 1;
      }
      colIndex += 1;
    }
    return columns;
  };

  // Infinite scroll animation
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      if (carousel) {
        scrollPosition += scrollSpeed;
        const maxScroll = carousel.scrollWidth / 2; // Since we duplicate content
        
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }
        
        carousel.scrollLeft = scrollPosition;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen mt-12 bg-[#f5f4f2]">
      <section className=" bg-white">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Breadcrumb
            items={[{ label: "Home", path: "/" }, { label: "Ecosystem" }]}
            theme={theme}
          />
          <div className="mt-10 ">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-6">
                Gallery Artisan
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold tracking-tight text-gray-900 leading-tight mb-6">
                Begin an exploration through a gallery showcasing artisan
                creativity.
              </h1>
            </div>
          </div>
        </div>
      </section>
      
      <EcoHero />
      
      <section className="border-b border-black/10 bg-white">
        <div className="max-w-[90%] mx-auto px-4 sm:px-4 lg:px-4 py-12 md:py-16">
          <div className="mt-10">
            <div>
              <p className="text-lg text-gray-600 max-w-2xl mb-10">
                Step into a realm of artistic expression, where our gallery
                showcases the extraordinary works of talented artists from
                across the world. Every corridor is curated to inspire.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={() => setContactFormOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm font-semibold hover:translate-y-[-1px] transition-transform"
                >
                  Plan A Visit
                  <ArrowRight className="w-4 h-4" />
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-black/10 bg-white">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-4">
          <div className="">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">
                A Blend Of Talented Genius In Art
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">
                Step into a realm of artistic expression
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Welcome to Gallery Artisan, an avant-garde space dedicated to
                pushing the boundaries of creative expression. Nestled in the
                cultural heart of Moscow, our gallery is a testament to the
                belief that art has no age limit.
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 border border-black rounded-full text-sm font-semibold hover:bg-black hover:text-white transition-colors">
                More About Us
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="relative mt-12 overflow-hidden">
              {/* Infinite Carousel with Alternating Column Pattern */}
              <div
                ref={carouselRef}
                className="flex gap-4 sm:gap-6 overflow-x-hidden scrollbar-hide"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {/* Duplicate content 3 times for seamless infinite scroll */}
                {[0, 1, 2].map((setIndex) => {
                  const columns = generateColumns(storyGallery, setIndex);
                  return columns.map((column) => {
                    if (column.type === 'double') {
                      const [item1, item2] = column.items;
                      return (
                        <div
                          key={column.key}
                          className="flex flex-col gap-4 sm:gap-6 flex-shrink-0"
                          style={{ width: '280px' }}
                        >
                          {/* Top image */}
                          <div className="relative bg-white rounded overflow-hidden shadow-xl h-[300px] sm:h-[350px]">
                            <div className="absolute inset-0 border-4 border-white rounded pointer-events-none z-10" />
                            <img
                              src={item1.image}
                              alt={item1.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-white">
                              <p className="text-xs uppercase tracking-[0.25em] text-white/70 mb-1">
                                {item1.location}
                              </p>
                              <h3 className="text-lg font-semibold">{item1.title}</h3>
                            </div>
                          </div>
                          {/* Bottom image */}
                          <div className="relative bg-white rounded overflow-hidden shadow-xl h-[300px] sm:h-[350px]">
                            <div className="absolute inset-0 border-4 border-white rounded pointer-events-none z-10" />
                            <img
                              src={item2.image}
                              alt={item2.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-white">
                              <p className="text-xs uppercase tracking-[0.25em] text-white/70 mb-1">
                                {item2.location}
                              </p>
                              <h3 className="text-lg font-semibold">{item2.title}</h3>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      const [item] = column.items;
                      
                      // Double column height: 300px + 350px + 16px gap = 666px (mobile)
                      // Double column height: 350px + 350px + 24px gap = 724px (desktop)
                      // All full columns are 2/3 height and vertically centered
                      
                      return (
                        <div
                          key={column.key}
                          className="flex-shrink-0 flex items-center h-[666px] sm:h-[724px]"
                          style={{ width: '280px' }}
                        >
                          <div className="relative bg-white rounded overflow-hidden shadow-xl h-[444px] sm:h-[483px] w-full">
                            <div className="absolute inset-0 border-4 border-white rounded pointer-events-none z-10" />
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/80 mb-2 font-medium">
                                {item.location}
                              </p>
                              <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                                {item.title}
                              </h3>
                              <p className="text-sm sm:text-base text-white/90 max-w-md leading-relaxed">
                                A place where you can see and feel true art with a warm feeling. Made by professional artists in their fields.
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  });
                })}
              </div>
              
              {/* Hide scrollbar */}
              <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-4 md:px-8 xl:px-0">
        <div className="max-w-[90%] mx-auto space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-semibold text-black">
              Unveiling Our Exclusive Artwork
            </h2>
            <p className="text-slate-600">
              Explore the dynamic world of contemporary art through our current
              exhibits. Each exhibition is a testament to the limitless
              possibility of expression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredExhibits.map((exhibit) => (
              <div
                key={exhibit.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 p-1 hover:shadow-xl transition-shadow"
              >
                <img
                  src={exhibit.image}
                  alt={exhibit.title}
                  className="w-full h-48 object-cover rounded-xl"
                  loading="lazy"
                />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                    {exhibit.category}
                  </p>
                  <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2">
                    {exhibit.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {exhibit.description}
                  </p>
                  
                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-5">
                    <Calendar className="w-4 h-4" />
                    <span>{exhibit.date}</span>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => {}}
                    className="w-full bg-white text-black border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-colors font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default EcosystemPage;
