import React, { useState } from "react";
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
];

const featuredExhibits = [
  {
    id: "abstract",
    title: "Wing Abstract Art",
    category: "Abstract Art",
    description:
      "Bold movements that capture the rhythm of modern life. A celebration of form and fearless color.",
    image: "/ecosystem/vr/THEHIVEVR25.jpg",
  },
  {
    id: "animal",
    title: "Elephant Abstract Artwork",
    category: "Animal Art",
    description:
      "Playful palettes give new energy to wildlife storytelling through immersive textures.",
    image: "/ecosystem/pune/HivePune_Amphitheater.jpg",
  },
  {
    id: "geometric",
    title: "Mountain Abstract Artwork",
    category: "Geometric Art",
    description:
      "Layered gradients and architectural lines craft dreamlike landscapes that bend reality.",
    image: "/ecosystem/blr/HiveBlr_Meeting-Room_2.jpg",
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
  const { setContactFormOpen } = useOutletContext();
  const [activeArtist, setActiveArtist] = useState(artistProfiles[0].id);

  const activeBio = artistProfiles.find((artist) => artist.id === activeArtist);

  return (
    <div className="min-h-screen bg-[#f5f4f2]">
      <section className="border-b border-black/10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Breadcrumb
            items={[
              { label: "Home", path: "/" },
              { label: "Ecosystem" },
            ]}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-6">
                Gallery Artisan
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold tracking-tight text-gray-900 leading-tight mb-6">
                Begin an exploration through a gallery showcasing artisan
                creativity.
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mb-10">
                Step into a realm of artistic expression, where our gallery
                showcases the extraordinary works of talented artists from across
                the world. Every corridor is curated to inspire.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={() => setContactFormOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm font-semibold hover:translate-y-[-1px] transition-transform"
                >
                  Plan A Visit
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="inline-flex items-center gap-2 px-6 py-3 border border-black rounded-full text-sm font-semibold hover:bg-black hover:text-white transition-colors">
                  Discover Story
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-6">
                {heroHighlights.map((highlight) => (
                  <div
                    key={highlight.label}
                    className="flex flex-col bg-gray-50 rounded-2xl px-6 py-4 min-w-[150px]"
                  >
                    <span className="text-3xl font-semibold text-gray-900">
                      {highlight.value}
                    </span>
                    <span className="text-xs uppercase tracking-[0.25em] text-gray-500">
                      {highlight.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-[32px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.2)]">
                <img
                  src="/ecosystem/vr/THEHIVEVR23.jpg"
                  alt="Gallery hall"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 left-6 bg-white/90 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-black/5">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-1">
                  Location
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  Dostoevsky St. 1, Moscow
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-black/10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
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
            <div className="grid sm:grid-cols-2 gap-6">
              {storyGallery.map((item) => (
                <div
                  key={item.id}
                  className={`relative rounded-3xl overflow-hidden shadow-xl ${
                    item.featured ? "sm:col-span-2" : ""
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[220px] sm:h-[260px] object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-white">
                    <p className="text-sm uppercase tracking-[0.25em] text-white/70 mb-1">
                      {item.location}
                    </p>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-black via-[#2d1c30] to-[#6c1f6b] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 text-xs uppercase tracking-[0.4em]">
              New Artwork
            </p>
            <h2 className="mt-6 text-3xl sm:text-4xl font-semibold">
              Unveiling Our Exclusive Artwork
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/80 max-w-3xl mx-auto">
              Explore the dynamic world of contemporary art through our current
              exhibits. Each exhibition is a testament to the limitless
              possibility of expression.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {featuredExhibits.map((exhibit) => (
              <div
                key={exhibit.id}
                className="bg-white/5 rounded-[28px] border border-white/10 overflow-hidden hover:-translate-y-2 transition-transform"
              >
                <div className="h-60 overflow-hidden">
                  <img
                    src={exhibit.image}
                    alt={exhibit.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70 mb-3">
                    {exhibit.category}
                  </p>
                  <h3 className="text-xl font-semibold mb-3">
                    {exhibit.title}
                  </h3>
                  <p className="text-sm text-white/80 mb-6">
                    {exhibit.description}
                  </p>
                  <button className="inline-flex items-center gap-2 text-sm font-semibold">
                    Detail Artwork
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
              Artist Profiles
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">
              Meet The Visionaries
            </h2>
            <p className="text-gray-600 mb-10">
              Delve into the minds of our extraordinary artists. Each profile is
              a glimpse into the passion and talent that defines their work.
            </p>
            <div className="space-y-3">
              {artistProfiles.map((artist) => (
                <button
                  key={artist.id}
                  onClick={() => setActiveArtist(artist.id)}
                  className={`w-full text-left border rounded-2xl px-5 py-4 flex items-center justify-between transition-colors ${
                    activeArtist === artist.id
                      ? "border-black bg-black text-white"
                      : "border-black/10 hover:border-black"
                  }`}
                >
                  <div>
                    <p className="font-semibold">{artist.name}</p>
                    <p
                      className={`text-sm ${
                        activeArtist === artist.id
                          ? "text-white/70"
                          : "text-gray-500"
                      }`}
                    >
                      {artist.tag}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[36px] overflow-hidden shadow-[0_30px_90px_rgba(15,15,15,0.25)]">
              <img
                src="/ecosystem/pune/HivePune_CommonAr.jpg"
                alt="Artist at work"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 left-10 right-10 bg-white rounded-3xl shadow-xl border border-black/5 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">
                Artist Insight
              </p>
              <p className="text-gray-700">{activeBio?.bio}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-white/70 mb-4">
              Newsletter
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
              Sign Up For Gallery Artisan&apos;s Newsletter
            </h2>
            <p className="text-white/70 mb-8">
              Stay informed about Gallery Artisan&apos;s latest dates,
              exhibitions, and most exciting projects. Become part of a vibrant
              community that celebrates art, creativity, and inspiration.
            </p>
            <form
              className="space-y-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full rounded-full px-5 py-3 bg-white/10 border border-white/20 placeholder:text-white/60 focus:outline-none focus:border-white"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full rounded-full px-5 py-3 bg-white/10 border border-white/20 placeholder:text-white/60 focus:outline-none focus:border-white"
                />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full px-5 py-3 bg-white/10 border border-white/20 placeholder:text-white/60 focus:outline-none focus:border-white"
              />
              <label className="flex items-center gap-3 text-sm text-white/70">
                <input type="checkbox" className="rounded border-white/50" />
                I confirm the privacy policy
              </label>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-semibold"
              >
                Submit
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
          <div className="bg-white/5 rounded-[36px] border border-white/10 p-6">
            <div className="grid grid-cols-2 gap-4">
              {newsletterImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="rounded-3xl overflow-hidden"
                >
                  <img
                    src={image}
                    alt="Gallery collection"
                    className="w-full h-40 object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                1901 Thameinitz Cir, Shiloh, Hawaii 8103
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +1 (808) 555 0190
              </span>
              <span className="inline-flex items-center gap-2">
                <Mail className="w-4 h-4" />
                curator@thehive.art
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EcosystemPage;

