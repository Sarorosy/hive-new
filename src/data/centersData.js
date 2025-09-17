// src/data/centersData.js
import chennai from '../assets/chennai.png';
import bangalore from '../assets/bangalore.png';
import hyderabad from '../assets/hyderabad.png';
import pune from '../assets/pune.png';

import one from '../assets/featured/1.jpg';
import two from '../assets/featured/2.jpg';
import three from '../assets/featured/3.jpg';
import four from '../assets/featured/4.jpg';
import five from '../assets/featured/5.jpg';
import six from '../assets/featured/6.jpg';

export const centersData = {
  chennai: {
    name: "Chennai",
    description: "Find flexible coworking spaces in Chennai with ready-to-move and customizable options. Located in prime areas, built for teams of any size.",
    image: chennai,
    breadcrumb: [
      { label: "Home", path: "/" },
      { label: "Coworking Spaces in Chennai" }
    ],
    branches: {
      "anna-nagar": {
        name: "The Hive at Anna Nagar, Chennai",
        breadcrumb: [
          { label: "Home", path: "/" },
          { label: "Coworking Spaces in Chennai", path: "/chennai" },
          { label: "Anna Nagar" },
        ],
        details: "Located in the heart of Anna Nagar, this coworking space offers modern amenities, high-speed internet, meeting rooms, and vibrant interiors.",
        images: [
          one,
          two,
          three,
          four,
          five,
          six
        ],
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.2932777426718!2d80.19485637512473!3d13.080590287244858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265b5d8e2606b%3A0x648fcc48a540559f!2sThe%20Hive!5e0!3m2!1sen!2sin!4v1755267396136!5m2!1sen!2sin",
        lat:"13.080893350150644",
        lng:"80.19744202450015"
      },
      "omr": {
        name: "The Hive at OMR, Chennai",
        breadcrumb: [
          { label: "Home", path: "/" },
          { label: "Coworking Spaces in Chennai", path: "/chennai" },
          { label: "OMR" },
        ],
        details: "A premium coworking space situated on Old Mahabalipuram Road, ideal for tech startups and corporates alike.",
        images: [
          one,
          two,
          three,
          four,
          five,
          six
        ],
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9123547422114!2d80.24918017512297!3d12.977457387338474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525dfe5e034cf9%3A0x1e1d1f590d1c1f4a!2sThe%20Hive%20-%20Flexible%20Workspaces%2C%20OMR%20Chennai%20(Pre-toll)!5e0!3m2!1sen!2sin!4v1755267801817!5m2!1sen!2sin",
        lat:"12.977739666919542",
        lng: "80.25175509566282"
      },
      "skcl-guindy": {
        name: "The Hive at SKCL Guindy, Chennai",
        breadcrumb: [
          { label: "Home", path: "/" },
          { label: "Coworking Spaces in Chennai", path: "/chennai" },
          { label: "SKCL Guindy" }
        ],
        details: "Located near Guindy, this space offers excellent connectivity, collaborative environments, and top-notch facilities.",
        images: [
          one,
          two,
          three,
          four,
          five,
          six
        ],
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.362000448057!2d80.20681027512359!3d13.012604287306493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267583ea87459%3A0xe203dc67d754aab6!2sThe%20Hive%20-%20Flexible%20Workspace%2CSKCL%20Guindy%2C%20Chennai!5e0!3m2!1sen!2sin!4v1755267876394!5m2!1sen!2sin",
        lat:"13.012813353724379",
        lng:"80.20940665333461"
      }
    }
  },
  bangalore: {
    name: "Bangalore",
    description: "Discover coworking spaces in Bangalore’s top hubs. From startups to enterprises, our offices offer flexibility, premium amenities, and great connectivity.",
    image: bangalore,
    breadcrumb: [
      { label: "Home", path: "/" },
      { label: "Coworking Spaces in Bangalore" }
    ],
    branches: {
      "whitefield": {
        name: "The Hive at Whitefield, Bangalore",
        breadcrumb: [
          { label: "Home", path: "/" },
          { label: "Coworking Spaces in Bangalore", path: "/bangalore" },
          { label: "Whitefield" }
        ],
        details: "A dynamic coworking hub in the bustling Whitefield tech district.",
        images: [
          one,
          two,
          three,
          four,
          five,
          six
        ],
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.614679956308!2d77.69306677512326!3d12.99647918732121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae110b3c1ae257%3A0x338aab3b907ba3d6!2sThe%20Hive%20-%20Flexible%20Workspaces%2C%20VR%20Bengaluru!5e0!3m2!1sen!2sin!4v1755268041583!5m2!1sen!2sin",
        lat : "12.997064975550622",
        lng: "77.69565291534232"
      },
      "ptp": {
        name: "The Hive at PTP, Bengaluru",
        breadcrumb: [
          { label: "Home", path: "/" },
          { label: "Coworking Spaces in Bangalore", path: "/bangalore" },
          { label: "PTP" }
        ],
        details: "Perfect for professionals and creatives, located at Prestige Tech Park.",
        images: [
          one,
          two,
          three,
          four,
          five,
          six
        ],
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8177.653847263165!2d77.68972939874689!3d12.944424787895871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13b26af6ecc7%3A0x8e8d6f4f7363dfb7!2sPrestige%20Tech%20Platina!5e0!3m2!1sen!2sin!4v1755268196685!5m2!1sen!2sin",
        lat:"12.944307674401166",
        lng:"77.695802846027"
      }
    }
  },
  hyderabad: {
    name: "Hyderabad",
    description: "Set up at our coworking space in Gachibowli, Hyderabad. With modern infrastructure and scalable offices, we support businesses of all sizes.",
    image: hyderabad,
    breadcrumb: [
      { label: "Home", path: "/" },
      { label: "Coworking Spaces in Hyderabad" }
    ],
    branches: {
      "gachibowli": {
        name: "The Hive at Gachibowli, Hyderabad",
        breadcrumb: [
          { label: "Home", path: "/" },
          { label: "Coworking Spaces in Hyderabad", path: "/hyderabad" },
          { label: "Gachibowli" }
        ],
        details: "Located in the IT hub of Gachibowli, ideal for startups and enterprises.",
        images: [
          one,
          two,
          three,
          four,
          five,
          six
        ],
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.7801531452105!2d78.33395617521116!3d17.422335083470823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93455c8cb175%3A0xc500bc3048009943!2sThe%20Hive%20-%20Flexible%20Workspaces%2C%20Gachibowli%20Hyderabad!5e0!3m2!1sen!2sin!4v1755268250690!5m2!1sen!2sin",
        lat:"17.422550052708335",
        lng: "78.33648818040867"
      }
    }
  },
  pune: {
    name: "Pune",
    description: "Work smarter at our coworking space in The Mills, Pune. Flexible offices, premium amenities, and a collaborative environment for growing teams.",
    image: pune,
    breadcrumb: [
      { label: "Home", path: "/" },
      { label: "Coworking Spaces in Pune" }
    ],
    branches: {
      "mills": {
        name: "The Hive at Mills, Pune",
        breadcrumb: [
          { label: "Home", path: "/" },
          { label: "Coworking Spaces in Pune", path: "/pune" },
          { label: "Mills" }
        ],
        details: "Set in the vibrant cultural heart of Pune, combining heritage and modern workspaces.",
        images: [
          one,
          two,
          three,
          four,
          five,
          six
        ],
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.9180653057538!2d73.8685052752371!3d18.532604382563267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c107842d09cd%3A0x27f3b911ea375cb4!2sThe%20Hive%20-%20Flexible%20Workspaces%2C%20The%20Mills!5e0!3m2!1sen!2sin!4v1755268291348!5m2!1sen!2sin",
        lat:"18.532807831841136",
        lng : "73.87109092461252"
      }
    }
  }
};


export const citiesData = {
  Chennai: {
    image: chennai,
    branches: [
      {
        name: "The Hive at Anna Nagar, Chennai",
        route: "/chennai/anna-nagar",
      },
      {
        name: "The Hive at OMR, Chennai",
        route: "/chennai/omr",
      },
      {
        name: "The Hive at SKCL Guindy, Chennai",
        route: "/chennai/skcl-guindy",
      },
    ],
  },
  Bangalore: {
    image: bangalore,
    branches: [
      {
        name: "The Hive at Whitefield, Bangalore",
        route: "/bangalore/whitefield",
      },
      {
        name: "The Hive at PTP, Bengaluru",
        route: "/bangalore/ptp",
      },
    ],
  },
  Hyderabad: {
    image: hyderabad,
    branches: [
      {
        name: "The Hive at Gachibowli, Hyderabad",
        route: "/hyderabad/gachibowli",
      },
    ],
  },
  Pune: {
    image: pune,
    branches: [
      {
        name: "The Hive at Mills, Pune",
        route: "/pune/mills",
      },
    ],
  },
};