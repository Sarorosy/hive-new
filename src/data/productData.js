import one from "../assets/featured/1.jpg";
import two from "../assets/featured/2.jpg";
import three from "../assets/featured/3.jpg";
import four from "../assets/featured/4.jpg";
import five from "../assets/featured/5.jpg";
import six from "../assets/featured/6.jpg";

import meetingrooms from "../assets/offerings/meetingsandevents/3.jpg";
import hotdesks from "../assets/offerings/hotdesks/hotdesk-2.jpg";
import privatecabins from "../assets/offerings/privatecabins/2.jpg";
import openspaces from "../assets/raw/chn/YAV00075-min.JPG";
import dedicateddesks from "../assets/offerings/dedicateddesks/2.jpg";

import {
  Monitor,
  Users,
  Gamepad2,
  Printer,
  Headphones,
  Phone,
  Smartphone,
  AppWindow,
  Percent,
  Wifi,
  CalendarDays,
  Utensils,
  Presentation,
} from "lucide-react";

// 🔹 Amenity icons mapping
const amenityIcons = {
  "Designed Workspace": Monitor,
  "Meeting Rooms": Users,
  "Game Lounge": Gamepad2,
  Printing: Printer,
  "Concierge Services": Headphones,
  "Phone Booth": Phone,
  "Community App": Smartphone,
  "Partner Discounts": Percent,
  "High Speed Internet": Wifi,
  "Events & Programming": CalendarDays,
  "Food & Beverages": Utensils,
  "A Close Knit Community": AppWindow,
  "AV Support": Presentation,
};

const makeAmenities = (list) =>
  list.map((caption) => ({
    icon: amenityIcons[caption],
    caption,
  }));

export const allSpaces = [
  // 🔹 Original Products
  {
    img: hotdesks, //one
    title: "Hot Desks",
    desc: "Designed for professionals who need flexibility and collaboration in a vibrant atmosphere.",
    desk: "1 Desk",
    price: "₹ 7000",
    unit: "/ Per Month",
    category: "Hot Desks",
    route: "product/hot-desks",
    amenities: makeAmenities([
      "Designed Workspace",
      "High Speed Internet",
      "Food & Beverages",
      "Events & Programming",
      "A Close Knit Community",
    ]),
  },
  {
    img: three,
    title: "Flexi Passes - Chennai",
    desc: "Day-based passes for maximum flexibility across Chennai workspaces.",
    desk: "1 Desk",
    price: "₹ 6500",
    unit: "/ Per Month",
    category: "Flexi Passes",
    location: "Chennai",
    route: "product/flexi-passes-chennai",
    amenities: makeAmenities([
      "Meeting Rooms",
      "Designed Workspace",
      "A Close Knit Community",
      "Events & Programming",
      "Food & Beverages",
    ]),
  },
  {
    img: dedicateddesks, //two
    title: "Dedicated Desk",
    desc: "Your personal desk in a shared space — consistency with community vibes.",
    desk: "1 Desk",
    price: "$50",
    unit: "/ Per Day",
    category: "Dedicated Desk",
    route: "",
    amenities: makeAmenities([
      "Full AC", // ❌ No lucide mapping provided → will be `undefined`
      "Phone Booth",
      "Concierge Services",
      "Community App",
      "Printing",
    ]),
  },
  {
    img: openspaces, //four
    title: "Open Spaces",
    desc: "Collaborative workspaces designed for dynamic teams and energetic discussions.",
    desk: "4 Desk",
    price: "$35",
    unit: "/ Per Day",
    category: "Open Spaces",
    route: "",
    amenities: makeAmenities([
      "Meeting Rooms",
      "Game Lounge",
      "High Speed Internet",
      "Events & Programming",
      "Food & Beverages",
    ]),
  },
  {
    img: privatecabins, //five
    title: "Private Office",
    desc: "A secure, private cabin tailored for small teams seeking productivity and privacy.",
    desk: "10 Desk",
    price: "$1,500",
    unit: "/ Per Month",
    category: "Private Office",
    route: "",
    amenities: makeAmenities([
      "Phone Booth",
      "Concierge Services",
      "High Speed Internet",
      "Partner Discounts",
      "Designed Workspace",
    ]),
  },
  {
    img: meetingrooms, //six
    title: "Meeting Room",
    desc: "Premium meeting room setup with privacy, AV support, and a professional vibe.",
    desk: "6 Desk",
    price: "$100",
    unit: "/ Per Day",
    category: "Meeting Room",
    route: "",
    amenities: makeAmenities([
      "High Speed Internet",
      "Events & Programming",
      "Printing",
      "Concierge Services",
      "Food & Beverages",
    ]),
  },

  // 🔹 Appended Location-Specific Products
  // Pune
  {
    img: hotdesks, //one
    title: "Hot Desks - Pune",
    desc: "Vibrant, flexible seating in the heart of Pune for individuals and creatives.",
    desk: "1 Desk",
    price: "₹ 7000",
    unit: "/ Per Month",
    category: "Hot Desks",
    location: "Pune",
    route: "product/hot-desks-pune",
    amenities: makeAmenities([
      "Designed Workspace",
      "Events & Programming",
      "Community App",
      "Partner Discounts",
      "High Speed Internet",
    ]),
  },
  {
    img: three,
    title: "Flexi Passes - Pune",
    desc: "Work anywhere, anytime — convenient passes for Pune professionals.",
    desk: "1 Desk",
    price: "₹ 7000",
    unit: "/ Per Month",
    category: "Flexi Passes",
    location: "Pune",
    route: "product/flexi-passes-pune",
    amenities: makeAmenities([
      "Meeting Rooms",
      "Phone Booth",
      "Game Lounge",
      "Food & Beverages",
      "Community App",
    ]),
  },
  {
    img: six,
    title: "Conference Room - 16 Seater - Mill Pune",
    desc: "Spacious conference setup with AV support, perfect for presentations & client meetings.",
    desk: "16 Seater",
    price: "₹ 3000",
    unit: "/ Per Hour",
    category: "Conference Room",
    location: "Pune",
    route: "product/conference-room-pune",
    amenities: makeAmenities([
      "AV Support",
      "High Speed Internet",
      "Concierge Services",
      "Events & Programming",
      "Food & Beverages",
    ]),
  },

  // Hyderabad
  {
    img: two,
    title: "Flexi Passes - Hyderabad",
    desc: "Affordable and adaptable day passes for flexible work in Hyderabad.",
    desk: "1 Desk",
    price: "₹ 6000",
    unit: "/ Per Month",
    category: "Flexi Passes",
    location: "Hyderabad",
    route: "product/flexi-passes-hyderabad",
    amenities: makeAmenities([
      "Community App",
      "Game Lounge",
      "Events & Programming",
      "Printing",
      "Partner Discounts",
    ]),
  },

  // Chennai - VR & OMR
  {
    img: hotdesks, //one
    title: "Hot Desks - VR Chennai",
    desc: "Dynamic hot desk access in the vibrant VR Chennai workspace.",
    desk: "1 Desk",
    price: "₹ 7500",
    unit: "/ Per Month",
    category: "Hot Desks",
    location: "VR Chennai",
    route: "product/hot-desks-vr-chennai",
    amenities: makeAmenities([
      "Designed Workspace",
      "Phone Booth",
      "Concierge Services",
      "Food & Beverages",
      "Events & Programming",
    ]),
  },
  {
    img: hotdesks, //one
    title: "Hot Desks - OMR Chennai",
    desc: "Open seating with high-speed internet, perfect for individuals on OMR stretch.",
    desk: "1 Desk",
    price: "₹ 7200",
    unit: "/ Per Month",
    category: "Hot Desks",
    location: "OMR Chennai",
    route: "product/hot-desks-omr-chennai",
    amenities: makeAmenities([
      "High Speed Internet",
      "Game Lounge",
      "Printing",
      "Community App",
      "Partner Discounts",
    ]),
  },
  
];
