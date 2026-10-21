import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://osobola.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Osobola | Build with AI. Understand every line.",
  description:
    "Learn to plan, generate, understand, debug, and deploy full-stack websites with AI. Build practical skills while keeping control of your code, data, and deployment.",
  applicationName: "Osobola",
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Osobola | Build with AI. Understand every line.",
    description: "Learn to build full-stack websites with AI and keep control of your code.",
    url: "/",
    siteName: "Osobola",
    type: "website",
    images: [{ url: "/opengraph-image.svg", width: 1200, height: 630, alt: "Osobola — Build with AI, understand every line" }],
  },
  twitter: { card: "summary_large_image", title: "Osobola", description: "Build with AI. Understand every line.", images: ["/opengraph-image.svg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
