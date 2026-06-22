import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import Footer from "./components/footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Becca's Cafe",
    template: "Becca's Cafe | %s"
  },
  description: "Curated coffee, matcha, and thoughtful bites at Becca's Cafe by the East Coast.",
  openGraph: {
    title: "Becca's Cafe",
    description: "Curated coffee, matcha, and thoughtful bites at Becca's Cafe by the East Coast.",
    images: ["/assets/images/branding/logo.png"]
  },
  icons: {
    icon: [
      { url: "/assets/icons/favicon.ico", sizes: "any" },
      { url: "/assets/icons/favicon.png", type: "image/png" }
    ],
    apple: "/assets/icons/apple-touch-icon.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css" />
        <link rel="stylesheet" href="/assets/css/styles.css?v=next-1" />
      </head>
      <body>
        <div className="body-layout">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
