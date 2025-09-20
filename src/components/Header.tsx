"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? "backdrop-blur-xl border-b border-white/10" 
        : "backdrop-blur-none border-b border-transparent"
    }`}>
      {/* Gradient background that appears on scroll */}
      <div 
        className={`absolute inset-0 -z-10 transition-opacity duration-300 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: [
            "radial-gradient(40rem 20rem at 10% -10%, rgba(170,115,255,.12), transparent 50%)",
            "radial-gradient(30rem 15rem at 90% -10%, rgba(120,80,255,.10), transparent 55%)",
            "linear-gradient(180deg, rgba(12,8,18,0.85) 0%, rgba(9,7,12,0.95) 100%)"
          ].join(", "),
        }}
      />
      
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo with enhanced styling - clickable */}
        <Link href="/" className="flex items-center gap-3 transition-all duration-200 hover:scale-105">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-lg">
            <Image src="/zap logo Background Removed.png" alt="Zap" width={24} height={24} className="object-contain" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent" style={{fontFamily:"var(--font-display)"}}>Zap</span>
        </Link>
        
        {/* Enhanced navigation */}
        <nav className="hidden gap-8 md:flex text-white/75">
          <a href="/gallery" className="transition-all duration-200 hover:text-white hover:scale-105">Explore</a>
          <a href="/pricing" className="transition-all duration-200 hover:text-white hover:scale-105">Pricing</a>
          <a href="/blog" className="transition-all duration-200 hover:text-white hover:scale-105">Blog</a>
        </nav>
        
        {/* Modern CTA button */}
        <a href="https://zap.sonetz.com/" className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/10">
          <span className="relative z-10">Get started</span>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#AC7BFF]/20 to-[#7A4DFF]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </a>
      </div>
    </header>
  );
}
