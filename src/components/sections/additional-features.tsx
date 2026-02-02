"use client";

import { Section } from "@/components/section";
import {
  ShieldCheckIcon,
  CloudOffIcon,
  WatchIcon,
  HeartPulseIcon,
  LockIcon,
  ZapOffIcon,
  MapIcon,
  UsersIcon
} from "lucide-react";
import { motion } from "framer-motion";

const additionalFeatures = [
  {
    icon: ShieldCheckIcon,
    title: "Privacy First",
    description: "Your data is yours. We never sell it, and all features are designed with your safety in mind.",
  },
  {
    icon: ZapOffIcon,
    title: "No Ads, Ever",
    description: "The free version is truly free. No ads wasting your battery, data, or time.",
  },
  {
    icon: CloudOffIcon,
    title: "Works Offline",
    description: "Download maps and navigate without internet. Perfect for areas with spotty reception.",
  },
  {
    icon: WatchIcon,
    title: "Apple Watch Support",
    description: "Control your tracking and get stats right on your wrist. Close your rings while skiing.",
  },
  {
    icon: HeartPulseIcon,
    title: "Fitness Integration",
    description: "Syncs with Apple Health, Google Fit, and Strava. All your fitness data in one place.",
  },
  {
    icon: MapIcon,
    title: "2,000+ Resorts",
    description: "Works at resorts worldwide across North America, Europe, Japan, Australia, and more.",
  },
  {
    icon: LockIcon,
    title: "Emergency SOS",
    description: "Quick access to ski patrol and emergency services with your exact location.",
  },
  {
    icon: UsersIcon,
    title: "Private Groups",
    description: "Create private friend groups and leaderboards. No public sharing required.",
  },
];

export function AdditionalFeatures() {
  return (
    <Section
      id="additional-features"
      className="py-24 bg-muted/20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            And a Whole Lot More
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for the perfect ski day, all in one app
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
