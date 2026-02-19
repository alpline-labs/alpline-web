import { siteConfig } from "@/lib/config";
import Image from "next/image";
import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

interface Icon {
  icon: JSX.Element;
  url: string;
}

const icons: Icon[] = [
  { icon: <InstagramLogoIcon />, url: siteConfig.links.instagram },
  { icon: <TwitterLogoIcon />, url: siteConfig.links.twitter },
];

type Link = {
  text: string;
  url: string;
};

const links: Link[] = [
  { text: "Features", url: "#features" },
  { text: "FAQ", url: "#faq" },
  { text: "Privacy Policy", url: "/privacy" },
  { text: "Terms of Service", url: "/terms" },
  { text: "Contact", url: `mailto:${siteConfig.links.email}` },
];

export function Footer() {
  return (
    <footer className="flex flex-col gap-y-5 rounded-lg px-7 py-5 md:px-10 container">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Image
            src="/appicon.png"
            alt="Skimate Logo"
            width={24}
            height={24}
            className="rounded"
          />
          <h2 className="text-lg font-bold text-foreground">
            {siteConfig.name}
          </h2>
        </div>

        <div className="flex gap-x-2">
          {icons.map((icon, index) => (
            <a
              key={index}
              href={icon.url}
              className="flex h-5 w-5 items-center justify-center text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4"
            >
              {icon.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-y-5 md:flex-row md:items-center">
        <ul className="flex flex-col gap-x-5 gap-y-2 text-muted-foreground md:flex-row md:items-center">
          {links.map((link, index) => (
            <li
              key={index}
              className="text-[15px]/normal font-medium text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4"
            >
              <a href={link.url}>{link.text}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between text-sm font-medium tracking-tight text-muted-foreground">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
