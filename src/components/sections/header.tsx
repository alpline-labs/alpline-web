"use client";

import { MobileDrawer } from "@/components/mobile-drawer";
import { buttonVariants } from "@/components/ui/button";
import { easeInOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Header() {
  const [addBorder, setAddBorder] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setAddBorder(currentScrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Set isInitialLoad to false after the component has mounted
    setIsInitialLoad(false);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerVariants = {
    visible: { opacity: 1, y: 0 },
  };

  const handleNavClick = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial="visible"
      animate="visible"
      variants={headerVariants}
      transition={{
        duration: isInitialLoad ? 1 : 0.3,
        delay: isInitialLoad ? 0.5 : 0,
        ease: easeInOutCubic,
      }}
      className={cn("sticky top-0 z-50 p-0 bg-background/60 backdrop-blur")}
    >
      <div className="flex justify-between items-center container mx-auto p-2">
        <Link
          href="/"
          title={siteConfig.name}
          className="relative mr-6 flex items-center space-x-2"
        >
          <Image
            src="/appicon.png"
            alt="Alpline Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-bold text-xl tracking-tight">{siteConfig.name}</span>
        </Link>
        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            href="#feature-showcase"
            onClick={handleNavClick("feature-showcase")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="#testimonials"
            onClick={handleNavClick("testimonials")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="#faq"
            onClick={handleNavClick("faq")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/map"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Try Demo
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#"
            className="inline-flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <img
              src="/download-apple.svg"
              alt="Download on App Store"
              className="h-9"
            />
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <img
              src="/download-google.svg"
              alt="Get it on Google Play"
              className="h-9"
            />
          </a>
        </div>
        <div className="mt-2 cursor-pointer block lg:hidden">
          <MobileDrawer />
        </div>
      </div>
      <motion.hr
        initial={{ opacity: 0 }}
        animate={{ opacity: addBorder ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute w-full bottom-0"
      />
    </motion.header>
  );
}
