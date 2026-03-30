import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "../styles/globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://blog.ezydigital.in"),

  title: {
    default: "Ezy Digital Blog - AI Powered Digital Marketing & SEO Blog",
    template: "%s | Ezy Digital Blog",
  },

  description:
    "Discover expert insights on digital marketing, SEO strategies, business growth, and AI-powered content. Boost your online presence with actionable guides.",

  keywords: [
    "digital marketing",
    "SEO blog",
    "business growth",
    "AI content",
    "marketing tips",
    "SEO strategies",
    "Indian business blog",
  ],

  authors: [{ name: "Milan Kansara", url: "https://ezydigital.in" }],
  creator: "Ezy Digital",
  publisher: "Ezy Digital",

  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "Ezy Digital Blog - Grow Your Business with AI Content",
    description:
      "Expert digital marketing blogs, SEO strategies, and business growth tips for Indian businesses.",
    url: "https://blog.ezydigital.in",
    siteName: "Ezy Digital Blog",
    images: [
      {
        url: "/thumbnail/template.png",
        width: 1200,
        height: 630,
        alt: "Ezy Digital Blog - Digital Marketing Insights",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ezy Digital Blog - AI Powered SEO Content",
    description: "Expert digital marketing insights for business growth",
    images: ["/thumbnail/template.png"],
    creator: "@ezydigital",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://blog.ezydigital.in",
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "RSS Feed" },
      ],
    },
  },

  verification: {
    google: "PUT_YOUR_GOOGLE_CODE_HERE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7VF4QZR1SV"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7VF4QZR1SV');
          `}
        </Script>

        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}