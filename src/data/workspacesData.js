import virtualOfficeImage from "../assets/offerings/privatecabins/3.jpg";

export const workspaceTabs = [
  {
    id: "private",
    label: "Private Offices",
    image: "/spacetypes/privatecabin.jpg",
    title: "Your Complete Workspace Ready From Day One",
    description:
      "At The Hive, you get a complete move-in-ready office designed for comfort, focus, and productivity. Every workspace matches your team's style, size, and workflow, making it easy to settle in and start working right away.",
    highlights: [
      "Dedicated cabins designed for individuals or growing teams",
      "Premium facilities available in a top-tier business location",
      "Round-the-clock access with exclusive member perks and benefits",
    ],
    linkLabel: "Learn more about our Private Offices",
    link: "/workspaces/private-cabins",
  },
  {
    id: "coworking",
    label: "Coworking Spaces",
    image: "/spacetypes/hotdesk.jpg",
    title: "Work Comfortably From Any Hive Location Today",
    description:
      "At The Hive, you can sit and get things done at any of our centres while enjoying all the facilities, support, and community advantages.",
    highlights: [
      "Open Seating: Choose any spot and begin your day at convenience",
      "Personal Station: A permanent place that's always reserved for you",
      "Short-Stay Room: A private cabin available for days or weeks",
    ],
    linkLabel: "Explore coworking options",
    link: "/workspaces/hot-desks",
  },
  {
    id: "virtual",
    label: "Virtual Offices",
    image: virtualOfficeImage,
    title: "A Strong Business Identity With Trusted Address",
    description:
      "Create a solid presence for your brand using The Hive's virtual office solutions. Get a recognised address, organised call support, and managed mail services, perfect for individuals.",
    highlights: [
      "Registered Location: Use our centre's address to present your company",
      "Phone Assistance: Receive a local number with organised call responses",
      "Dual Plan: Get both options together plus complimentary workspace access",
    ],
    linkLabel: "See virtual office plans",
    link: "/",
  },
  {
    id: "enterprise",
    label: "Managed Enterprise Solutions",
    image: "/spacetypes/4.jpg",
    title: "Custom Design Office Space That Fits Your Business",
    description:
      "A customised office solution for companies of all sizes. We'll take care of location, branding, IT and more. All you'll have to do is move in and start working in your perfectly designed space right away.",
    highlights: [
      "Build your custom office space without upfront capital expenditures required",
      "Workspace designed for productivity and collaboration with your team members",
    ],
    linkLabel: "Talk to our enterprise team",
    link: "/workspaces/enterprise-solutions",
  },
];

export const meetingsEventsData = [
  {
    id: "meeting-rooms",
    title: "Meeting Rooms",
    description: "Private, well-equipped rooms for meetings.",
    image: "/meeting-room.jpg",
    link: "/workspaces/meetings-and-event-spaces",
    linkLabel: "Explore meeting rooms",
  },
  {
    id: "event-spaces",
    title: "Event Spaces",
    description: "Flexible indoor and outdoor venues for events of any size.",
    image: "/eventspace.jpg",
    link: "/workspaces/meetings-and-event-spaces",
    linkLabel: "View event spaces",
  },
];

export const solutionOfferings = [
  {
    id: "office-spaces",
    icon: "/icons/office.svg",
    title: "Office Spaces",
    subtitle: "Ready-to-move-in or customisable private offices",
    description:
      "Create a branded headquarters with private floors, executive cabins, and enterprise-grade infrastructure managed entirely by us.",
    image: "/spacetypes/privatecabin-2.jpg",
    highlights: [
      "End-to-end project delivery with branding, IT, and facility management",
      "Agile floor plans that scale with every team milestone",
      "Enterprise security, visitor management, and dedicated community teams",
    ],
    items: [
      {
        name: "Managed Offices",
        slug: "managed-offices",
        description: "Fully managed floors built for mid to large teams.",
      },
      {
        name: "Enterprise Solutions",
        slug: "enterprise-solutions",
        description: "Custom campuses with bespoke branding and security.",
      },
      {
        name: "Private Cabins",
        slug: "private-cabins",
        description: "Premium cabins that are ready from day one.",
      },
    ],
    linkLabel: "Explore office solutions",
  },
  {
    id: "coworking",
    icon: "/icons/coworking.svg",
    title: "Coworking Spaces",
    subtitle: "Coworking spaces for the hour, day, or month",
    description:
      "Choose how you work each day—drop in for a few hours, secure a dedicated desk, or switch between locations seamlessly.",
    image: "/spacetypes/hotdesk.jpg",
    highlights: [
      "Flexible passes and memberships for individuals and distributed teams",
      "Access to premium amenities, programs, and concierge support",
      "Transparent pricing with unified billing across all Hive centres",
    ],
    items: [
      {
        name: "Dedicated Desks",
        slug: "dedicated-desks",
        description: "A permanent workstation that is always yours.",
      },
      {
        name: "Hot Desks",
        slug: "hot-desks",
        description: "Any seat, any time across multiple centres.",
      },
    ],
    linkLabel: "See coworking memberships",
  },
  {
    id: "additional",
    icon: "/icons/additional.svg",
    title: "Additional Solutions",
    subtitle: "Solutions that go beyond workspaces",
    description:
      "Activate premium venues, boardrooms, and community programs tailored for important meetings and milestone events.",
    image: "/meeting-room.jpg",
    highlights: [
      "Hospitality-led teams to support every meeting, training, or launch",
      "Spaces that adapt to workshops, town halls, and private gatherings",
      "Add-on services for catering, production, and concierge support",
    ],
    items: [
      {
        name: "Meetings & Event Spaces",
        slug: "meetings-and-event-spaces",
        description: "Premium rooms and venues for every occasion.",
      },
    ],
    linkLabel: "Plan meetings & events",
  },
];


