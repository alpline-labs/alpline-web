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
  name: "Skimate",
  description: "Navigate smarter, ski better, connect deeper.",
  cta: "Download Now",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: [
    "Ski Navigation",
    "Snowboard App",
    "Winter Sports",
    "Mountain Navigation",
    "Ski Tracking",
    "Snow Community",
    "Ski GPS",
    "Resort Maps",
    "Ski Social Network",
  ],
  links: {
    email: "support@skimate.app",
    twitter: "https://twitter.com/skimate",
    discord: "https://discord.gg/skimate",
    github: "https://github.com/skimate",
    instagram: "https://instagram.com/skimate",
  },
  features: [
    {
      name: "Smart Audio Navigation",
      description:
        "Turn-by-turn audio guidance keeps you on track without stopping. Works seamlessly with your helmet's audio system for hands-free navigation on any run.",
      icon: <HeadphonesIcon className="h-6 w-6" />,
    },
    {
      name: "Interactive 3D Resort Maps",
      description:
        "Explore over 2,000 resorts worldwide with stunning 3D maps. See real-time lift and trail status, locate facilities, and never get lost again.",
      icon: <MapIcon className="h-6 w-6" />,
    },
    {
      name: "Performance Analytics",
      description:
        "Track speed, vertical, distance, and heart rate. Analyze your runs, compare with friends on private leaderboards, and improve season after season.",
      icon: <BarChart3Icon className="h-6 w-6" />,
    },
    {
      name: "Live Location Sharing",
      description:
        "See where your friends are on the mountain in real-time. Coordinate meet-ups and never lose your group again with smart group navigation features.",
      icon: <MapPinIcon className="h-6 w-6" />,
    },
    {
      name: "Resort Information",
      description:
        "Get live updates on lift and trail status, weather conditions, and crowd levels. Access ski patrol info and resort facilities instantly.",
      icon: <MountainSnowIcon className="h-6 w-6" />,
    },
    {
      name: "Community & Events",
      description:
        "Connect with fellow skiers and snowboarders. Discover local events, plan group trips, and expand your mountain network.",
      icon: <HeartIcon className="h-6 w-6" />,
    },
  ],
  featureHighlight: [
    {
      title: "Audio Navigation That Just Works",
      description:
        "Turn-by-turn audio guidance delivered right to your ears. No more stopping to check your phone - keep your eyes on the slopes while Skimate guides you to your destination. Works seamlessly with any helmet audio system or earbuds, completely offline.",
      imageSrc: "/app-screens/feature-navigation.png",
      direction: "rtl" as const,
    },
    {
      title: "Stunning 3D Resort Maps",
      description:
        "Explore every corner of 2,000+ resorts worldwide with gorgeous interactive maps. Toggle between 2D and 3D views, see real-time lift and trail status, find facilities instantly, and plan your perfect ski day before you even get on the mountain.",
      imageSrc: "/app-screens/hero-home-map.png",
      direction: "ltr" as const,
    },
    {
      title: "Track Every Run, Improve Every Season",
      description:
        "Comprehensive performance tracking captures speed, distance, vertical, and more. Compete with friends on private leaderboards, analyze your best runs, track your fitness goals, and watch your skills improve year after year.",
      imageSrc: "/app-screens/feature-stats.png",
      direction: "rtl" as const,
    },
  ],
  bento: [
    {
      title: "Smart Routing for Your Skill Level",
      content:
        "Get personalized routes based on your ability. Never accidentally end up on terrain that's too challenging or too easy. Dynamic re-routing adjusts if you take a wrong turn or encounter a closed lift.",
      imageSrc: "/app-screens/feature-route-planning.png",
      imageAlt: "Ski routing illustration",
      fullWidth: true,
    },
    {
      title: "Hands-Free Audio Guidance",
      content:
        "Keep your eyes on the mountain while audio instructions guide you at every turn. Works with any helmet audio or earbuds, offline.",
      imageSrc: "/app-screens/feature-navigation.png",
      imageAlt: "Audio navigation illustration",
      fullWidth: false,
    },
    {
      title: "Find Your Friends Instantly",
      content:
        "See exactly where your group is on the mountain. Set meet-up points and never waste time coordinating over text.",
      imageSrc: "/app-screens/feature-location-sharing.png",
      imageAlt: "Group location illustration",
      fullWidth: false,
    },
    {
      title: "Detailed Performance Analytics",
      content:
        "Every run tracked automatically. Speed, vertical, distance, time - all captured seamlessly. Compare with friends and track your improvement season after season.",
      imageSrc: "/app-screens/feature-stats.png",
      imageAlt: "Performance tracking illustration",
      fullWidth: true,
    },
  ],
  benefits: [
    {
      id: 1,
      text: "Navigate any resort with confidence, even on your first visit.",
      image: "/app-screens/hero-home-map.png",
    },
    {
      id: 2,
      text: "Keep your group together without constant phone checking.",
      image: "/app-screens/feature-location-sharing.png",
    },
    {
      id: 3,
      text: "Track your improvement and compete with friends all season.",
      image: "/app-screens/feature-stats.png",
    },
    {
      id: 4,
      text: "Discover new trails and find the best runs for your skill level.",
      image: "/app-screens/feature-route-planning.png",
    },
  ],
  faqs: [
    {
      question: "How does Skimate work without internet connection?",
      answer: (
        <span>
          Skimate downloads all mapping data to your phone so the app works offline.
          This gives you full routing and navigation functionality even when you don&apos;t have
          a data connection on the mountain. Your activity data will sync once you&apos;re connected again.
        </span>
      ),
    },
    {
      question: "How many resorts are supported?",
      answer: (
        <span>
          Skimate currently supports over 2,000 resorts worldwide across North America, the European Alps,
          Japan, Australia, and New Zealand. We&apos;re constantly adding new resorts to our database.
        </span>
      ),
    },
    {
      question: "How does the audio navigation work?",
      answer: (
        <span>
          Skimate provides turn-by-turn audio instructions that work seamlessly with any earbuds or helmet audio system.
          The audio guides you at every intersection without interrupting your music or calls. It works completely offline
          and uses advanced GPS tracking to keep you on the right path.
        </span>
      ),
    },
    {
      question: "Can I see where my friends are on the mountain?",
      answer: (
        <span>
          Yes! With live location sharing, you can see exactly where your friends are on the resort map in real-time.
          Set meet-up points, coordinate group runs, and never lose track of your crew. All location sharing is
          privacy-focused and you can toggle it on or off anytime.
        </span>
      ),
    },
    {
      question: "What kind of performance stats does Skimate track?",
      answer: (
        <span>
          Skimate tracks comprehensive metrics including speed, vertical distance, total distance, run count,
          heart rate (with connected devices), calories burned, and time on mountain. Compare your stats with
          friends on private leaderboards and track your progress season after season.
        </span>
      ),
    },
    {
      question: "Is Skimate really free?",
      answer: (
        <span>
          Yes! Skimate is completely free to download and use. All core features including audio navigation,
          3D maps, performance tracking, and social features are available at no cost. We believe everyone
          should have access to great navigation and safety tools on the mountain.
        </span>
      ),
    },
  ],
  footer: [
    {
      id: 1,
      menu: [
        { href: "#features", text: "Features" },
        { href: "#", text: "Resorts" },
        { href: "#", text: "Community" },
        { href: "#faq", text: "FAQ" },
        { href: "#", text: "Contact" },
      ],
    },
  ],
  testimonials: [
    {
      id: 1,
      text: "The audio navigation is a game-changer. I never have to stop and pull out my phone to check where I'm going. It's like having a personal guide in my ear!",
      name: "Sarah Chen",
      role: "Intermediate Skier",
      image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      text: "Finally found a solution to losing my friends on the mountain! The live location feature means we can split up and easily meet back up for lunch.",
      name: "Marcus Thompson",
      role: "Group Trip Organizer",
      image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 3,
      text: "Love seeing my stats improve week after week. The leaderboards with friends add a fun competitive element to our ski days.",
      name: "Jamie Rodriguez",
      role: "Advanced Snowboarder",
      image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 4,
      text: "The 3D maps helped me discover trails I never knew existed. Now I feel confident exploring any resort without getting lost.",
      name: "Alex Petrov",
      role: "Resort Explorer",
      image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 5,
      text: "As a beginner, the skill-based routing gives me confidence to explore without accidentally ending up on a black diamond run!",
      name: "Emily Watson",
      role: "Beginner Skier",
      image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 6,
      text: "Met some of my best ski buddies through the community features. It's not just an app, it's a whole network of riders.",
      name: "David Kim",
      role: "Community Enthusiast",
      image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
