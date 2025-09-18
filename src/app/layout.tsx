import "./globals.css";
import { Unbounded, Space_Grotesk } from "next/font/google";

const display = Unbounded({ subsets:["latin"], weight:["600","700","800"], variable:"--font-display" });
const body = Space_Grotesk({ subsets:["latin"], variable:"--font-body" });

export const metadata = { 
  title: "Zap - Your AI Marketer", 
  description: "Create once. Publish everywhere.",
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/zap logo Background Removed.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/zap logo Background Removed.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/zap logo Background Removed.png',
    },
  ],
  other: {
    'msapplication-TileImage': '/zap logo Background Removed.png',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/zap logo Background Removed.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/zap logo Background Removed.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/zap logo Background Removed.png" />
        <link rel="shortcut icon" href="/zap logo Background Removed.png" />
        <meta name="msapplication-TileImage" content="/zap logo Background Removed.png" />
      </head>
      <body className={`${display.variable} ${body.variable} bg-[#0B0911] text-white`} style={{fontFamily:"var(--font-body)"}}>
        {children}
      </body>
    </html>
  );
}
