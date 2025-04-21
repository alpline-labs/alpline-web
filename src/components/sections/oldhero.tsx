"use client";

import { Icons } from "@/components/icons";
import { Section } from "@/components/section";
import { easeInOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { motion, useScroll, useTransform } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MapIcon, MountainSnowIcon, CompassIcon } from "lucide-react";

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
    <Section id="hero" className="min-h-[100vh] w-full overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-gray-900">
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
            <div className="bg-blue-600 text-white text-xl font-bold p-4 h-20 w-20 flex items-center justify-center rounded-3xl mx-auto shadow-md">
              <Icons.logo className="w-auto h-[40px]" />
            </div>
          </motion.div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute inset-0 top-20 z-10 text-blue-600 font-bold"
          >
            {siteConfig.name}
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: easeInOutCubic }}
            className="text-4xl sm:text-5xl font-bold mb-4 tracking-tighter text-gray-900 dark:text-white"
          >
            {siteConfig.description}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: easeInOutCubic }}
            className="max-w-2xl mx-auto text-lg sm:text-xl mb-8 font-medium text-balance text-gray-700 dark:text-gray-300"
          >
            Navigate with confidence, track your performance, and connect with fellow riders - all in one seamless winter sports app.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: easeInOutCubic }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 mx-auto max-w-md"
          >
            <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
              <MountainSnowIcon className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">2000+ Resorts</span>
            </div>
            <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
              <CompassIcon className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Smart Routing</span>
            </div>
            <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
              <MapIcon className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">3D Maps</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: easeInOutCubic }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              href="#"
              className={cn(
                buttonVariants({ size: "lg", variant: "default" }),
                "bg-blue-600 hover:bg-blue-700 text-white rounded-full"
              )}
            >
              Download Now
            </Link>
            <Link
              href="#features"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-full"
              )}
            >
              Learn More
            </Link>
          </motion.div>
        </div>
        
        <div className="flex flex-nowrap items-center justify-center gap-4 sm:gap-8 h-auto sm:h-[500px] select-none overflow-hidden mt-8">
          <motion.img
            src="/Device-1.png"
            alt="CarVNav ski routing screen"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ y: y1 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-40 sm:w-60 h-[333px] sm:h-[500px] flex-shrink-0 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800"
          />
          <motion.img
            src="/Device-2.png"
            alt="CarVNav audio navigation screen"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ y: y2 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-40 sm:w-60 h-[333px] sm:h-[500px] flex-shrink-0 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800"
          />
          <motion.img
            src="/Device-3.png"
            alt="CarVNav 3D resort maps screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ y: y3 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-40 sm:w-64 h-[333px] sm:h-[500px] flex-shrink-0 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 z-10"
          />
          <motion.img
            src="/Device-4.png"
            alt="CarVNav performance tracking screen"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ y: y4 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-40 sm:w-60 h-[333px] sm:h-[500px] flex-shrink-0 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800"
          />
          <motion.img
            src="/Device-5.png"
            alt="CarVNav community screen"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ y: y5 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-40 sm:w-60 h-[333px] sm:h-[500px] flex-shrink-0 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: easeInOutCubic }}
          className="absolute bottom-0 left-0 right-0 pb-8 pointer-events-none"
        >
          <div className="w-full flex justify-center">
            <svg className="w-6 h-12 text-blue-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </main>
    </Section>
  );
}