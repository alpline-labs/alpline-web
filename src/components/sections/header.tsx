"use client";

import { Icons } from "@/components/icons";
import { MobileDrawer } from "@/components/mobile-drawer";
import { buttonVariants } from "@/components/ui/button";
import { easeInOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [addBorder, setAddBorder] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY);
      setAddBorder(currentScrollY > 20);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    // Set isInitialLoad to false after the component has mounted
    setIsInitialLoad(false);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    controls.start(isVisible ? "visible" : "hidden");
  }, [isVisible, controls]);

  const headerVariants = {
    hidden: { opacity: 0, y: "-100%" },
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
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial="hidden"
          animate={controls}
          exit="hidden"
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
              title="App"
              className="relative mr-6 flex items-center space-x-2"
            >
              <Icons.logo className="w-auto" />
              <span className="font-bold text-xl tracking-tight">{siteConfig.name}</span>
            </Link>
            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link
                href="#featureScroll"
                onClick={handleNavClick("featureScroll")}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                EXPERIENCE
              </Link>
              <Link
                href="#features"
                onClick={handleNavClick("features")}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                FEATURES
              </Link>
              <Link
                href="#benefits"
                onClick={handleNavClick("benefits")}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                BENEFITS
              </Link>
              <Link
                href="#testimonials"
                onClick={handleNavClick("testimonials")}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                TESTIMONIALS
              </Link>
              <Link
                href="#pricing"
                onClick={handleNavClick("pricing")}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                PRICING
              </Link>
              <Link
                href="#faq"
                onClick={handleNavClick("faq")}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                FAQ
              </Link>
            </nav>

            <div className="hidden lg:block">
              <Link
                href="#"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-8 text-white rounded-full group"
                )}
              >
                {siteConfig.cta}
              </Link>
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
      )}
    </AnimatePresence>
  );
}