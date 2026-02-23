import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { IoMenuSharp } from "react-icons/io5";

export function MobileDrawer() {
  const handleNavClick = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <IoMenuSharp className="text-2xl" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-6">
          <div className="">
            <Link
              href="/"
              title="brand-logo"
              className="relative mr-6 flex items-center space-x-2"
            >
              <Image
                src="/appicon.png"
                alt="Alpline Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="font-bold text-xl">{siteConfig.name}</span>
            </Link>
          </div>
        </DrawerHeader>
        <div className="px-6 py-4 space-y-4">
          <Link
            href="#feature-showcase"
            onClick={handleNavClick("feature-showcase")}
            className="block text-base font-medium hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="#testimonials"
            onClick={handleNavClick("testimonials")}
            className="block text-base font-medium hover:text-primary transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="#faq"
            onClick={handleNavClick("faq")}
            className="block text-base font-medium hover:text-primary transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/map"
            className="block text-base font-medium hover:text-primary transition-colors"
          >
            Try Demo
          </Link>
        </div>
        <DrawerFooter className="flex flex-col gap-3">
          <a
            href="#"
            className="inline-flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <img
              src="/download-apple.svg"
              alt="Download on App Store"
              className="h-12"
            />
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <img
              src="/download-google.svg"
              alt="Get it on Google Play"
              className="h-12"
            />
          </a>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
