import {
  CompassIcon,
  HeadphonesIcon,
  MapIcon,
  MountainSnowIcon,
  UsersIcon,
  HeartIcon,
  ActivityIcon,
  CalendarIcon,
  BarChart3Icon,
  MapPinIcon,
  MessageSquareIcon,
  BellIcon,
} from "lucide-react";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "App",
  description: "The ultimate all-in-one winter sports navigation & community app.",
  cta: "Download Now",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: [
    "Ski Navigation",
    "Snowboard App",
    "Winter Sports",
    "Mountain Navigation",
    "Ski Tracking",
    "Snow Community",
  ],
  links: {
    email: "support@App.com",
    twitter: "https://twitter.com/App",
    discord: "https://discord.gg/App",
    github: "https://github.com/App",
    instagram: "https://instagram.com/App",
  },
  features: [
    {
      name: "Smart Routing",
      description:
        "Find the quickest, safest routes from A to B based on your skill level and preferences.",
      icon: <CompassIcon className="h-6 w-6" />,
    },
    {
      name: "Live Audio Navigation",
      description:
        "Receive real-time audio instructions without stopping to check your map.",
      icon: <HeadphonesIcon className="h-6 w-6" />,
    },
    {
      name: "Interactive 3D Maps",
      description:
        "Explore resorts with detailed 2D and 3D maps showing trails, lifts, and facilities.",
      icon: <MapIcon className="h-6 w-6" />,
    },
    {
      name: "Performance Tracking",
      description:
        "Track detailed stats on speed, vertical, run times, and fitness metrics.",
      icon: <ActivityIcon className="h-6 w-6" />,
    },
    {
      name: "Group Features",
      description:
        "Share locations, plan meetups, and navigate together with friends.",
      icon: <UsersIcon className="h-6 w-6" />,
    },
    {
      name: "Community Connection",
      description:
        "Connect with local riders, join events, and expand your winter sports network.",
      icon: <HeartIcon className="h-6 w-6" />,
    },
  ],
  featureHighlight: [
    {
      title: "Live Audio Navigation",
      description:
        "Enjoy uninterrupted flow with in-ear audio instructions at every turn. No more stopping to look at maps - just pure skiing pleasure. Works offline, so no internet connection required.",
      imageSrc: "/Device-2.png",
      direction: "rtl" as const,
    },
    {
      title: "Interactive 3D Resort Maps",
      description:
        "Explore over 2,000 resorts with stunning interactive maps. View real-time lift and trail status, locate facilities, and navigate with ease whether in 2D or 3D view.",
      imageSrc: "/Device-3.png",
      direction: "ltr" as const,
    },
    {
      title: "Performance Analytics",
      description:
        "Track detailed stats about your day on the mountain. Analyze speed, vertical, run times, and fitness metrics to improve your skills and challenge yourself season after season.",
      imageSrc: "/Device-4.png",
      direction: "rtl" as const,
    },
  ],
  bento: [
    {
      title: "Smart Routing & Navigation",
      content:
        "Set your start point and destination to instantly get the best route tailored to your skill level. Dynamic re-routing keeps you on track even if you make a wrong turn or encounter a closed lift.",
      imageSrc: "/Device-1.png",
      imageAlt: "Ski routing illustration",
      fullWidth: true,
    },
    {
      title: "Live Audio Instructions",
      content:
        "Enjoy hands-free, in-ear audio navigation that keeps your eyes on the mountain and your focus on skiing. Never stop to check maps again.",
      imageSrc: "/Device-2.png",
      imageAlt: "Audio navigation illustration",
      fullWidth: false,
    },
    {
      title: "Group Ski Features",
      content:
        "Share locations, coordinate meet-ups, and navigate together with friends. Never lose your group on the mountain again.",
      imageSrc: "/Device-3.png",
      imageAlt: "Group ski illustration",
      fullWidth: false,
    },
    {
      title: "Performance Tracking",
      content:
        "Track detailed stats about your day on the slopes. Analyze speed, vertical, run times, and fitness metrics while challenging friends on seasonal leaderboards.",
      imageSrc: "/Device-4.png",
      imageAlt: "Performance tracking illustration",
      fullWidth: true,
    },
  ],
  benefits: [
    {
      id: 1,
      text: "Ski with confidence on any mountain with personalized navigation.",
      image: "/Device-6.png",
    },
    {
      id: 2,
      text: "Never miss a meeting point or get lost on unfamiliar slopes again.",
      image: "/Device-7.png",
    },
    {
      id: 3,
      text: "Improve your skills with detailed performance analytics.",
      image: "/Device-8.png",
    },
    {
      id: 4,
      text: "Connect with local riders and expand your winter sports network.",
      image: "/Device-1.png",
    },
  ],
  pricing: [
    {
      name: "Free",
      href: "#",
      price: "$0",
      period: "forever",
      yearlyPrice: "$0",
      features: [
        "Basic routing and navigation",
        "Limited resort maps",
        "Performance tracking basics",
        "Group location sharing (up to 3 friends)",
      ],
      description: "Perfect for casual riders",
      buttonText: "Download Free",
      isPopular: false,
    },
    {
      name: "Premium",
      href: "#",
      price: "$9.99",
      period: "month",
      yearlyPrice: "$79.99",
      features: [
        "Advanced routing with skill-based customization",
        "Full interactive 3D maps for 2000+ resorts",
        "Complete performance analytics",
        "Unlimited group features",
        "Community event access",
        "Offline mode for all resorts",
      ],
      description: "The ultimate winter sports experience",
      buttonText: "Go Premium",
      isPopular: true,
    },
  ],
  faqs: [
    {
      question: "How does App work without internet connection?",
      answer: (
        <span>
          App downloads all mapping data to your phone so the app works offline.
          This gives you full routing and navigation functionality even when you don&apos;t have
          a data connection on the mountain. Your activity data will sync once you&apos;re connected again.
        </span>
      ),
    },
    {
      question: "How many resorts are supported?",
      answer: (
        <span>
          App currently supports over 2,000 resorts worldwide across North America, the European Alps,
          Japan, Australia, and New Zealand. We&apos;re constantly adding new resorts to our database.
        </span>
      ),
    },
    {
      question: "How does the group ski feature work?",
      answer: (
        <span>
          Our Group Ski feature lets you share your location or set a meet-up point and guides everyone there.
          You can see all your friends on the interactive map and coordinate in real-time. Location sharing is
          privacy-focused, so you can turn it on or off at any time.
        </span>
      ),
    },
    {
      question: "What kind of performance stats does App track?",
      answer: (
        <span>
          App tracks a comprehensive set of performance metrics including speed, vertical, distance,
          run count, heart rate (with connected devices), calories burned, and even identifies your best
          runs. You can analyze your data by day, trip, or season.
        </span>
      ),
    },
    {
      question: "Can I connect with other skiers and snowboarders?",
      answer: (
        <span>
          Absolutely! App has a built-in community platform where you can connect with fellow winter
          sports enthusiasts, discover and join local events, plan group outings, and expand your
          mountain network. It&apos;s the perfect way to find your riding crew!
        </span>
      ),
    },
  ],
  footer: [
    {
      id: 1,
      menu: [
        { href: "#", text: "Features" },
        { href: "#", text: "Pricing" },
        { href: "#", text: "Resorts" },
        { href: "#", text: "Community" },
        { href: "#", text: "Contact" },
      ],
    },
  ],
  testimonials: [
    {
      id: 1,
      text: "The audio navigation is incredible - I've discovered parts of resorts I never knew existed!",
      name: "Alex Johnson",
      role: "Intermediate Skier",
      image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      text: "Group Ski feature has completely eliminated the hassle of finding friends on the mountain.",
      name: "Brian Miller",
      role: "Ski Trip Organizer",
      image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 3,
      text: "The performance tracking helped me improve my technique and set new personal records this season.",
      name: "Christine Davis",
      role: "Advanced Snowboarder",
      image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 4,
      text: "I met my entire riding crew through App's community features. Game changer!",
      name: "Diana Evans",
      role: "Social Skier",
      image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 5,
      text: "The skill-based routing has given me confidence to explore new resorts without fear of ending up on runs beyond my ability.",
      name: "Ethan Ford",
      role: "Beginner Skier",
      image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 6,
      text: "The 3D resort maps are incredibly detailed - I can plan my entire day before even hitting the slopes.",
      name: "Fiona Grant",
      role: "Resort Explorer",
      image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 7,
      text: "I love that I can track my fitness data along with my riding stats. Great for my fitness goals!",
      name: "George Harris",
      role: "Fitness-Focused Rider",
      image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 8,
      text: "The offline functionality is essential when you're in the mountains with spotty service. App never lets me down.",
      name: "Hannah Irving",
      role: "Backcountry Enthusiast",
      image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
