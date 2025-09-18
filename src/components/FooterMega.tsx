"use client";

import {
  SiYoutube, SiX, SiDiscord, SiLinkedin, SiInstagram
} from "react-icons/si";

const nav = {
  company: ["About","Careers","Contact"],
  product: ["Tools","Explore","Feature request","Pricing","How Zap works"],
  resources: ["Customer stories","Blog","Affiliate","Media assets","Help center","Learning center"],
  best: ["Viral shorts guide","Founder style videos"],
  legal: ["Terms","Privacy","Cookies","Accessibility","Email protection","Trust center"],
};

export default function FooterMega() {
  return (
    <footer className="relative mt-16">

      {/* Content without container */}
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        {/* nav columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <Col title="Company" items={nav.company} />
          <Col title="Product" items={nav.product} />
          <Col title="Resources" items={nav.resources} />
          <Col title="Best Practices" items={nav.best} />
          <Col title="Trust & Legal" items={nav.legal} />
        </div>

        {/* bottom row: text left, socials right */}
        <div className="relative flex items-center justify-between mt-16">
          <p className="text-sm text-white/70">Built by Sonetz Inc. for creators</p>

          <div className="flex items-center gap-4">
            <Soc href="https://www.youtube.com/@usezap_ai" icon={<SiYoutube />} />
            <Soc href="https://x.com/usezap_ai" icon={<SiX />} />
            <Soc href="https://discord.gg/QwvVmcug" icon={<SiDiscord />} />
            <Soc href="https://www.linkedin.com/company/sonetz-inc/" icon={<SiLinkedin />} />
            <Soc href="https://www.instagram.com/usezap_ai/" icon={<SiInstagram />} />
          </div>
        </div>

        {/* BIG wordmark bottom-left */}
        <div className="pointer-events-none absolute bottom-6 left-0 select-none opacity-5 md:bottom-8 md:left-1">
          <div
            className="text-[min(22vw,16rem)] leading-none tracking-tight text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            zap
          </div>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, items }: { title: string; items: string[] }) {
  const getHref = (item: string) => {
    if (item === "Contact") return "https://x.com/urja_kohli";
    
    // Pages that are ready and should work normally
    const readyPages = ["Terms", "Privacy", "Blog", "Pricing"];
    
    // Pages that should go to coming-soon (as specified by user)
    const comingSoonPages = [
      "About", "Careers", "Tools", "Feature request", "How Zap works",
      "Customer stories", "Affiliate", "Media assets", "Help center", 
      "Learning center", "Viral shorts guide", "Founder style videos",
      "Cookies", "Accessibility", "Email protection", "Trust center"
    ];
    
    // Check if this is a ready page
    if (readyPages.includes(item)) {
      return `/${slug(item)}`;
    } else if (comingSoonPages.includes(item)) {
      // All specified pages go to coming-soon
      return "/coming-soon";
    } else {
      // Default for any other pages
      return "/coming-soon";
    }
  };

  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-white/80">{title}</h4>
      <ul className="space-y-2 text-white/70">
        {items.map((it) => (
          <li key={it}>
            <a 
              className="hover:text-white" 
              href={getHref(it)}
              target={it === "Contact" ? "_blank" : undefined}
              rel={it === "Contact" ? "noopener noreferrer" : undefined}
            >
              {it}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Soc({ href, icon }: { href: string; icon: React.ReactNode }) {
  const isExternal = href.startsWith("http");
  
  return (
    <a
      href={href}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[.06] text-white/85 transition hover:translate-y-[-1px] hover:bg-white/[.1]"
      aria-label="social"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <span className="text-lg">{icon}</span>
    </a>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
