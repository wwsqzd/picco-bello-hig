import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { ScrollToTop } from "@/components/features/ScrollToTop";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://picco-bello-hig.de"),
  title: "Picco Bello Heiligenstadt",
  description:
    "Picco Bello ist eine Pizzeria im Herzen von Heiligenstadt mit einer großen Auswahl an köstlichen Pizzen aus frischen Zutaten.",
  openGraph: {
    title: "Picco Bello Heiligenstadt",
    description:
      "Picco Bello ist eine Pizzeria im Herzen von Heiligenstadt mit einer großen Auswahl an köstlichen Pizzen aus frischen Zutaten.",
    type: "website",
    locale: "de_DE",
    siteName: "Picco Bello Heiligenstadt",
    images: [
      {
        url: "/mainlogo.png",
        width: 300,
        height: 163,
        alt: "Picco Bello Heiligenstadt – Pizzeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Picco Bello Heiligenstadt",
    description:
      "Picco Bello ist eine Pizzeria im Herzen von Heiligenstadt mit einer großen Auswahl an köstlichen Pizzen aus frischen Zutaten.",
    images: ["/mainlogo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={"h-full antialiased"}>
      <body>
        <ScrollToTop />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Script
          src="https://www.foodbooking.com/widget/js/ewm2.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
