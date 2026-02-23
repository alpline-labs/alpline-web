"use client";

import { Section } from "@/components/section";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface Feature {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  benefits: string[];
}

const features: Feature[] = [
  {
    title: "Audio Navigation That Just Works",
    description:
      "Turn-by-turn audio guidance delivered right to your ears without interrupting your music or calls. Keep your eyes on the slopes while Alpline guides you to your destination.",
    imageSrc: "/app-screens/feature-navigation.png",
    imageAlt: "Turn-by-turn audio navigation",
    benefits: [
      "Works with any helmet audio system or earbuds",
      "Completely offline - no internet required",
      "Voice commands with \"Hey Alpline\"",
      "Never stop to check your phone again",
    ],
  },
  {
    title: "See Where Everyone Is",
    description:
      "Never lose your group again. See exactly where your friends are on the mountain in real-time and coordinate meet-ups effortlessly.",
    imageSrc: "/app-screens/feature-location-sharing.png",
    imageAlt: "Live location sharing with friends",
    benefits: [
      "Real-time friend locations on the map",
      "Set and navigate to meet-up points",
      "Privacy-focused with full control",
      "Works across the entire resort",
    ],
  },
  {
    title: "Know Your Stats, Improve Your Skills",
    description:
      "Track every run automatically. See your speed, distance, vertical, and compare with friends on private leaderboards.",
    imageSrc: "/app-screens/feature-stats.png",
    imageAlt: "Performance tracking and analytics",
    benefits: [
      "Automatic run detection and tracking",
      "Compete with friends on leaderboards",
      "Track progress season after season",
      "Heart rate zones and fitness metrics",
    ],
  },
  {
    title: "Connect With the Community",
    description:
      "Discover events, meet fellow skiers and snowboarders, and expand your mountain network. Find your riding crew.",
    imageSrc: "/app-screens/feature-community.png",
    imageAlt: "Connect with ski community",
    benefits: [
      "Discover local ski events and meetups",
      "Connect with riders at your skill level",
      "Plan group trips and coordinate schedules",
      "Share tips and favorite runs",
    ],
  },
  {
    title: "Get Live Resort Information",
    description:
      "Real-time lift and trail status, weather conditions, and crowd levels. Know before you go and optimize your ski day.",
    imageSrc: "/app-screens/feature-resort-info.png",
    imageAlt: "Resort information and status",
    benefits: [
      "Live lift and trail open/closed status",
      "Real-time weather and snow conditions",
      "Crowd levels and wait times",
      "Find facilities and ski patrol instantly",
    ],
  },
];

export function FeatureShowcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <Section
      id="feature-showcase"
      className="py-24 bg-gradient-to-b from-background to-muted/20"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need on the Mountain
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Alpline combines navigation, tracking, and social features into one powerful app
          </p>
        </div>

        <div className="space-y-32">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 lg:gap-20 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <img
                      src={feature.imageSrc}
                      alt={feature.imageAlt}
                      className="w-full max-w-sm mx-auto rounded-3xl shadow-2xl"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-8">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <motion.li
                        key={benefitIndex}
                        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: benefitIndex * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <svg
                          className="w-6 h-6 text-primary flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-base">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
