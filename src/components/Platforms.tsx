import Image from "next/image";

export default function Platforms() {
  // Using existing logos from /public/ directory
  const platforms = [
    { name:"X", file:"X_logo.jpg" }, 
    { name:"LinkedIn", file:"LinkedIn.png" }, 
    { name:"Pinterest", file:"pinterest Background Removed.png" },
    { name:"Reddit", file:"reddit logi.png" }, 
    { name:"Facebook", file:"facebook logo.png" }, 
    { name:"Threads", file:"therads logo Background Removed.png" },
    { name:"Snapchat", file:"snapchat.jpg" }, 
    { name:"Twitch", file:"twitch logo.png" }, 
    { name:"Instagram", file:"insta logi Background Removed.png" },
    { name:"YouTube", file:"youtubelogo.png" },
    { name:"TikTok", file:"tiktok logo Background Removed.png" },
    { name:"Telegram", file:"telegram logo Background Removed.png" },
    { name:"Discord", file:"discord logo.jpg" },
    { name:"Bluesky", file:"bluesky Background Removed.png" },
    { name:"Quora", file:"quora logo Background Removed.png" }
  ];
  
  // Split into two rows: 8 + 7
  const firstRow = platforms.slice(0, 8);
  const secondRow = platforms.slice(8);
  
  return (
    <section id="platforms" className="relative mx-auto max-w-7xl px-6 py-14">
      <div className="text-white/70">Publish everywhere</div>
      <h3 className="mt-1 text-4xl font-semibold md:text-5xl" style={{fontFamily:"var(--font-display)"}}>
        One click. <span className="text-[#AC7BFF]">15+ channels</span>.
      </h3>

      <div className="mt-8 space-y-6">
        {/* First Row - Marquee */}
        <div className="overflow-hidden"
             style={{maskImage:"linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
                     WebkitMaskImage:"linear-gradient(to right, transparent, black 6%, black 94%, transparent)"}}>
          <div className="flex gap-8 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
            {[...firstRow, ...firstRow].map((p, i) => (
              <div key={p.name + i} className="flex items-center gap-3 shrink-0">
                <span className="grid h-12 w-12 md:h-14 md:w-14 place-items-center rounded-full bg-white/10 backdrop-blur overflow-hidden border border-white/5">
                  <Image src={`/${p.file}`} alt={p.name} width={28} height={28} className="object-contain" />
                </span>
                <div className="text-white/80 text-sm md:text-base font-medium whitespace-nowrap">{p.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Marquee (reverse direction) */}
        <div className="overflow-hidden"
             style={{maskImage:"linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
                     WebkitMaskImage:"linear-gradient(to right, transparent, black 6%, black 94%, transparent)"}}>
          <div className="flex gap-8 animate-[marquee-reverse_25s_linear_infinite] hover:[animation-play-state:paused]">
            {[...secondRow, ...secondRow].map((p, i) => (
              <div key={p.name + i} className="flex items-center gap-3 shrink-0">
                <span className="grid h-12 w-12 md:h-14 md:w-14 place-items-center rounded-full bg-white/10 backdrop-blur overflow-hidden border border-white/5">
                  <Image src={`/${p.file}`} alt={p.name} width={28} height={28} className="object-contain" />
                </span>
                <div className="text-white/80 text-sm md:text-base font-medium whitespace-nowrap">{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee animation styles */}
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
