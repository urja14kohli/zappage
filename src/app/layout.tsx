import "./globals.css";
import { Unbounded, Space_Grotesk } from "next/font/google";

const display = Unbounded({ subsets:["latin"], weight:["600","700","800"], variable:"--font-display" });
const body = Space_Grotesk({ subsets:["latin"], variable:"--font-body" });

export const metadata = { 
  title: "Zap - Your AI Marketer", 
  description: "Create once. Publish everywhere.",
  icons: {
    icon: "/zap logo Background Removed.png",
    shortcut: "/zap logo Background Removed.png",
    apple: "/zap logo Background Removed.png",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} bg-[#0B0911] text-white`} style={{fontFamily:"var(--font-body)"}}>
        {children}
      </body>
    </html>
  );
}
