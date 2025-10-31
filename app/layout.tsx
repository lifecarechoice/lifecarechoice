import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import LanguageSetter from "@/components/LanguageSetter";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = DM_Serif_Display({ 
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lifecarechoice.com"),
  title: "Life Care Choice | Every Choice Deserves Care",
  description: "Talk to a licensed professional. Clear options. Straight answers.",
  keywords: "life insurance, final expense, mortgage protection, IUL, indexed universal life",
  openGraph: {
    title: "Life Care Choice | Every Choice Deserves Care",
    description: "Talk to a licensed professional. Clear options. Straight answers.",
    url: "https://lifecarechoice.com",
    siteName: "Life Care Choice",
    images: [
      {
        url: "https://lifecarechoice.com/lcc-logo-meta.png",
        width: 1200,
        height: 630,
        alt: "Life Care Choice Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Life Care Choice | Every Choice Deserves Care",
    description: "Talk to a licensed professional. Clear options. Straight answers.",
    images: ["https://lifecarechoice.com/lcc-logo-meta.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <LanguageSetter />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

