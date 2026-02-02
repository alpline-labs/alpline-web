"use client";

import { Section } from "@/components/section";
import { easeInOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "lucide-react";

export function Hero() {
  const { scrollY } = useScroll({
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollY, [0, 300], [100, 0]);
  const y2 = useTransform(scrollY, [0, 300], [50, 0]);
  const y3 = useTransform(scrollY, [0, 300], [0, 0]);
  const y4 = useTransform(scrollY, [0, 300], [50, 0]);
  const y5 = useTransform(scrollY, [0, 300], [100, 0]);

  return (
    <Section id="hero" className="min-h-[100vh] w-full overflow-hidden">
      <main className="mx-auto pt-16 sm:pt-24 md:pt-32 text-center relative px-4">
        <div className="relative">
          <motion.div
            initial={{ scale: 4.5, height: "80vh" }}
            animate={{ scale: 1, height: "10vh" }}
            transition={{
              scale: { delay: 0, duration: 1.8, ease: easeInOutCubic },
              height: { delay: 0, duration: 1.8, ease: easeInOutCubic },
            }}
            className="mb-16 relative z-20"
            style={{ transformOrigin: "top" }}
          >
            <div className="h-20 w-20 flex items-center justify-center mx-auto">
              <Image
                src="/appicon.png"
                alt="Skimate Logo"
                width={80}
                height={80}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute inset-0 top-20 z-10"
          >
            {siteConfig.name}
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: easeInOutCubic }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            {siteConfig.description}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: easeInOutCubic }}
            className="max-w-2xl mx-auto text-xl md:text-2xl mb-12 font-medium text-muted-foreground text-balance"
          >
            Turn-by-turn audio navigation. Real-time performance tracking. Live friend location.
            Everything you need for the perfect ski day, all in one free app.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
        >
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
          >
            <img
              src="/download-apple.svg"
              alt="Download on App Store"
              className="h-12"
            />
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
          >
            <img
              src="/download-google.svg"
              alt="Get it on Google Play"
              className="h-12"
            />
          </a>
        </motion.div>
        <div className="flex flex-nowrap items-center justify-center gap-4 sm:gap-8 h-auto sm:h-[500px] select-none">
          <motion.img
            src="/app-screens/feature-location-sharing.png"
            alt="Live location sharing with friends"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ y: y1 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-40 sm:w-64 h-auto flex-shrink-0 rounded-3xl shadow-2xl"
          />
          <motion.img
            src="/app-screens/feature-navigation.png"
            alt="Turn-by-turn audio navigation"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ y: y2 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-40 sm:w-64 h-auto flex-shrink-0 rounded-3xl shadow-2xl"
          />
          <motion.img
            src="/app-screens/hero-home-map.png"
            alt="Interactive 3D resort maps"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ y: y3 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-40 sm:w-64 h-auto flex-shrink-0 rounded-3xl shadow-2xl"
          />
          <motion.img
            src="/app-screens/feature-stats.png"
            alt="Performance tracking and analytics"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ y: y4 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-40 sm:w-64 h-auto flex-shrink-0 rounded-3xl shadow-2xl"
          />
          <motion.img
            src="/app-screens/feature-community.png"
            alt="Connect with ski community"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ y: y5 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-40 sm:w-64 h-auto flex-shrink-0 rounded-3xl shadow-2xl"
          />
        </div>
      </main>
    </Section>
  );
}
