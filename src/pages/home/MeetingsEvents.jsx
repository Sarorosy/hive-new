import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const meetingsEvents = [
  {
    id: "meeting-rooms",
    title: "Meeting Rooms",
    description: "Private, well-equipped rooms for meetings—bookable by the hour.",
    image: "/meeting-room.jpg",
    link: "/workspaces/meetings-and-event-spaces",
    linkLabel: "Explore meeting rooms"
  },
  {
    id: "event-spaces",
    title: "Event Spaces",
    description: "Flexible indoor and outdoor venues for events of any size.",
    image: "/eventspace.jpg",
    link: "/workspaces/meetings-and-event-spaces",
    linkLabel: "View event spaces"
  }
  
];

const MeetingsEvents = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8 xl:px-0">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-3 ">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#0e1932]">
            Meetings & Events
          </h2>
          <p className="text-slate-600 ">
            Professional spaces designed for collaboration, presentations, and memorable gatherings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {meetingsEvents.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-sm shadow-xl border border-slate-100 overflow-hidden group hover:shadow-2xl transition-shadow"
            >
              <div className="relative min-h-[300px] md:min-h-[400px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:px-8">
                  <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed ">
                    {item.description}
                  </p>
                  {/* <Link
                    to={item.link}
                    className="inline-flex items-center gap-2 text-white font-medium hover:gap-3 transition-all group/link"
                  >
                    {item.linkLabel}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetingsEvents;

