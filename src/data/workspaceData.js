// workspaceData.js

export const amenities = [
  {
    id: 'designed-workspace',
    name: 'Designed Workspace',
    icon: 'Mask group-1',
    description: 'Thoughtfully designed spaces that inspire productivity and creativity'
  },
  {
    id: 'meeting-rooms',
    name: 'Meeting Rooms',
    icon: 'Mask group-4',
    description: 'Professional meeting spaces equipped with modern technology'
  },
  {
    id: 'game-lounge',
    name: 'Game Lounge',
    icon: 'Mask group-9',
    description: 'Recreational area to unwind and connect with the community'
  },
  {
    id: 'printing',
    name: 'Printing',
    icon: 'Mask group',
    description: 'High-quality printing and scanning facilities'
  },
  {
    id: 'concierge-services',
    name: 'Concierge Services',
    icon: 'Mask group-2',
    description: 'Dedicated support staff to assist with your daily needs'
  },
  {
    id: 'community-app',
    name: 'Community App',
    icon: 'Mask group-8',
    description: 'Connect with fellow members and access exclusive features'
  },
  {
    id: 'partner-discounts',
    name: 'Partner Discounts',
    icon: 'Mask group-7',
    description: 'Exclusive discounts from our network of business partners'
  },
  {
    id: 'high-speed-internet',
    name: 'High Speed Internet',
    icon: 'Mask group-3',
    description: 'Lightning-fast, reliable internet connectivity'
  },
  {
    id: 'events-programming',
    name: 'Events & Programming',
    icon: 'Mask group-10',
    description: 'Regular networking events and professional development programs'
  },
  {
    id: 'phone-booth',
    name: 'Phone Booth',
    icon: 'Mask group-11',
    description: 'Private spaces for confidential calls and focused work'
  },
  {
    id: 'food-beverages',
    name: 'Food & Beverages',
    icon: 'Mask group-5',
    description: 'Premium coffee, snacks, and refreshments throughout the day'
  },
  {
    id: 'close-knit-community',
    name: 'A Close Knit Community',
    icon: 'Mask group-6',
    description: 'Join a vibrant community of like-minded professionals'
  }
];

export const workspaces = [
  {
    id: 'managed-offices',
    slug: 'managed-offices',
    name: 'Managed Offices',
    title: 'The Hive Managed Offices',
    description:
      'Fully-equipped, ready-to-move-in private office spaces with comprehensive management services for teams of every scale, industry, and stage.',
    image: '/managedoffices.jpg',
    image2: '/offerings/managedoffices/1.jpg',
    features: [
      {
        title: 'Private, lockable with 24/7 access',
        description: 'Secure, dedicated office space with round-the-clock access for your team'
      },
      {
        title: 'Flexible commitment terms',
        description: 'Monthly or annual payment options that adapt to your business needs'
      },
      {
        title: 'Ready to move in or customisable',
        description: 'Spaces ready for immediate occupancy or fully customisable for teams of 1–2000+'
      },
      {
        title: 'Access to meeting rooms and conferencing facilities',
        description: 'Professional meeting spaces equipped with state-of-the-art technology'
      },
      {
        title: 'On-ground support and community events',
        description: 'Dedicated support team and regular networking opportunities'
      },
      {
        title: 'Complete amenities package',
        description: 'High-speed wifi, printing, office supplies, and premium facilities'
      }
    ],
    benefits: [
      'Flexibility - Adaptable spaces that align with your hybrid work strategy and growth plans',
      'Customisation - Tailored solutions to match your brand and workflow requirements',
      'End-to-end support - Comprehensive facility management and operational support',
      'Employee engagement - Foster collaboration and productivity in designed environments',
      'Intentional design - Thoughtfully crafted spaces that inspire and motivate',
      'Adaptability - Scalable solutions that grow with your business'
    ],
    targetAudience:
      'Growing companies and established enterprises seeking comprehensive office solutions',
    capacity: '1-2000+ employees',
    pricing: {
      from: 25000,
      period: 'month'
    }
  },
  {
    id: 'enterprise-solutions',
    slug: 'enterprise-solutions',
    name: 'Enterprise Solutions',
    title: 'The Hive Enterprise Solutions',
    image: '/enterprisesol2.jpg',
    image2: '/offerings/enterprisesolutions/3.jpg',
    description:
      'Bespoke workspace solutions designed for large organizations with complex requirements and multi-location needs.',
    features: [
      {
        title: 'Custom-built environments',
        description: 'Fully customised office spaces designed to reflect your corporate identity'
      },
      {
        title: 'Multi-location management',
        description: 'Seamless coordination across multiple office locations'
      },
      {
        title: 'Dedicated account management',
        description: 'Personal account managers to oversee all aspects of your workspace needs'
      },
      {
        title: 'Enterprise-grade security',
        description: 'Advanced security systems and protocols for sensitive business operations'
      },
      {
        title: 'Scalable infrastructure',
        description: 'Technology and space solutions that scale with your organization'
      },
      {
        title: 'White-glove service',
        description: 'Premium concierge services and facility management'
      }
    ],
    benefits: [
      'Strategic workspace planning aligned with business objectives',
      'Cost optimization through efficient space utilization',
      'Enhanced employee experience and productivity',
      'Seamless integration with existing corporate systems',
      'Flexible expansion and contraction capabilities',
      'Comprehensive reporting and analytics'
    ],
    targetAudience: 'Large corporations and multinational companies',
    capacity: '500+ employees',
    pricing: {
      from: 100000,
      period: 'month'
    }
  },
  {
    id: 'private-cabins',
    slug: 'private-cabins',
    name: 'Private Cabins',
    title: 'The Hive Private Cabins',
    image: '/privatecabin.jpg',
    image2: '/offerings/privatecabins/2.jpg',
    description:
      'Individual private workspaces offering the perfect balance of privacy and community access for entrepreneurs and small teams.',
    features: [
      {
        title: 'Fully enclosed private space',
        description: 'Your own lockable cabin with complete privacy and personalization options'
      },
      {
        title: 'Flexible lease terms',
        description: 'Monthly, quarterly, or annual commitments to suit your business cycle'
      },
      {
        title: 'Premium furnishing',
        description: 'High-quality furniture and ergonomic workstations'
      },
      {
        title: 'Storage solutions',
        description: 'Built-in storage for your files, equipment, and personal items'
      },
      {
        title: 'Community access',
        description: 'Full access to all shared amenities and community spaces'
      },
      {
        title: 'Professional address',
        description: 'Use our prestigious business address for your company registration'
      }
    ],
    benefits: [
      'Complete privacy while maintaining community connections',
      'Professional environment that enhances your business image',
      'Flexibility to customize your space according to your needs',
      'Access to networking opportunities and community events',
      'Cost-effective alternative to traditional office leases',
      'No overhead costs for utilities, maintenance, or cleaning'
    ],
    targetAudience: 'Entrepreneurs, consultants, and small teams (1-4 people)',
    capacity: '1-4 people',
    pricing: {
      from: 15000,
      period: 'month'
    }
  },
  {
    id: 'dedicated-desks',
    slug: 'dedicated-desks',
    name: 'Dedicated Desks',
    title: 'The Hive Dedicated Desks',
    image: '/dedidesk.jpg',
    image2: '/offerings/dedicateddesks/1.jpg',
    description:
      "Your own permanent desk in a shared workspace environment, combining the benefits of a private workspace with community interaction.",
    features: [
      {
        title: 'Reserved workspace',
        description: "Your own designated desk that's always available when you need it"
      },
      {
        title: '24/7 access',
        description: 'Work on your schedule with round-the-clock access to your workspace'
      },
      {
        title: 'Personal storage',
        description: 'Secure storage space for your belongings and work materials'
      },
      {
        title: 'Ergonomic setup',
        description: 'Height-adjustable desks and premium office chairs for comfort'
      },
      {
        title: 'High-speed connectivity',
        description: 'Dedicated ethernet connection and premium Wi-Fi access'
      },
      {
        title: 'Community integration',
        description: 'Be part of a vibrant professional community'
      }
    ],
    benefits: [
      'Consistency and routine with your own designated space',
      'Cost-effective solution compared to private offices',
      'Networking opportunities with diverse professionals',
      'Professional environment that boosts productivity',
      'Flexibility without long-term real estate commitments',
      'Access to premium amenities and services'
    ],
    targetAudience: 'Freelancers, remote workers, and small business owners',
    capacity: '1-2 people',
    pricing: {
      from: 8000,
      period: 'month'
    }
  },
  {
    id: 'hot-desks',
    slug: 'hot-desks',
    name: 'Hot Desks',
    title: 'The Hive Hot Desks',
    image: '/hotdesk-2.jpg',
    image2: '/offerings/hotdesks/hotdesk-2.jpg',
    description:
      'Flexible workspace solution that allows you to work from any available desk, perfect for those who value variety and spontaneity.',
    features: [
      {
        title: 'Work from anywhere',
        description: 'Choose from any available desk across our workspace floors'
      },
      {
        title: 'Daily flexibility',
        description: 'Different desk, different view, different inspiration every day'
      },
      {
        title: 'No commitment required',
        description: 'Pay-as-you-go or monthly plans with ultimate flexibility'
      },
      {
        title: 'Mobile locker access',
        description: 'Secure your belongings in available lockers throughout the day'
      },
      {
        title: 'Digital booking system',
        description: 'Reserve your preferred spot through our mobile app'
      },
      {
        title: 'Community networking',
        description: 'Meet new professionals and expand your network daily'
      }
    ],
    benefits: [
      'Ultimate flexibility in where and when you work',
      'Most cost-effective workspace solution',
      'Constant networking opportunities',
      'No long-term commitments or contracts',
      'Experience different work environments',
      'Perfect for occasional or project-based work'
    ],
    targetAudience: 'Digital nomads, occasional workers, and project-based professionals',
    capacity: '1 person',
    pricing: {
      from: 500,
      period: 'day'
    }
  },
  {
    id: 'meetings-event-spaces',
    slug: 'meetings-and-event-spaces',
    name: 'Meetings & Event Spaces',
    title: 'The Hive Meetings & Event Spaces',
    image: '/meeting.jpg',
    image2: '/offerings/meetingsandevents/1.jpg',
    description:
      'Professional meeting rooms and event venues equipped with cutting-edge technology for presentations, conferences, and corporate events.',
    features: [
      {
        title: 'Multiple room configurations',
        description: 'From intimate meeting rooms to large conference halls and event spaces'
      },
      {
        title: 'State-of-the-art AV equipment',
        description: 'High-definition displays, sound systems, and video conferencing technology'
      },
      {
        title: 'Flexible hourly booking',
        description: 'Book spaces by the hour, half-day, or full day as needed'
      },
      {
        title: 'Catering services',
        description: 'Professional catering options for meetings and events'
      },
      {
        title: 'Event support staff',
        description: 'Dedicated team to help set up and manage your events'
      },
      {
        title: 'High-speed internet',
        description: 'Reliable connectivity for virtual meetings and live streaming'
      }
    ],
    benefits: [
      'Professional venue without the overhead costs',
      'Impress clients and partners with premium facilities',
      'Technical support for seamless presentations',
      'Flexible booking options for various event types',
      'Central locations with easy accessibility',
      'Comprehensive event management services'
    ],
    targetAudience: 'Businesses of all sizes hosting meetings, training, and events',
    capacity: '2-200 people',
    pricing: {
      from: 3500,
      period: 'hour'
    }
  }
];

export const companyInfo = {
  name: 'The Hive',
  tagline: 'Where Innovation Meets Collaboration',
  description:
    'The Hive is a premium workspace provider offering flexible office solutions designed to inspire productivity, foster innovation, and build meaningful professional communities.',
  locations: {
    centres: 68,
    cities: 8,
    description: '68 centres across 8 cities for your business to call home'
  },
  journey: {
    steps: [
      {
        title: 'Take a tour',
        description:
          'Schedule a tour and speak with our representative at one of The Hive centres in your city',
        icon: 'tour'
      },
      {
        title: 'Choose an office',
        description: 'No matter the size of your team, choose an office that suits your needs',
        icon: 'choose'
      },
      {
        title: 'Move-in',
        description:
          "Make yourself at home. We'll make sure your office is fully operational so you can get straight to work from day one",
        icon: 'move-in'
      }
    ]
  }
};

export const benefits = [
  {
    title: "Seamless Scalability",
    description:
      "Expand or downsize without disruption — our spaces evolve with your business growth."
  },
  {
    title: "All-Inclusive Amenities",
    description:
      "From high-speed internet to concierge services, everything you need is bundled in one place."
  },
  {
    title: "Strategic Locations",
    description:
      "Be where your clients and talent are — our prime city locations give you the edge."
  },
  {
    title: "Productivity-First Design",
    description:
      "Our environments are optimized with natural light, acoustics, and layouts that boost focus."
  },
  {
    title: "Community & Networking",
    description:
      "Connect with like-minded professionals and businesses through curated events and lounges."
  },
  {
    title: "Tech-Enabled Workspaces",
    description:
      "Smart meeting rooms, booking systems, and integrated tools keep your team connected and efficient."
  }
];
