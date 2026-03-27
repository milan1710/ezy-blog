import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "../../styles/globals.css";

export const metadata = {
  title: "Ezy Digital Blog - AI Powered Digital Marketing & SEO Blog",
  description: "Discover expert insights on digital marketing, SEO strategies, business growth, and AI-powered content.",
  keywords: "digital marketing, SEO blog, business growth, AI content, marketing tips",
  authors: [{ name: "Ezy Digital" }],
  metadataBase: new URL("https://blog.ezydigital.in"),
  openGraph: {
    title: "Ezy Digital Blog - Grow Your Business with AI Content",
    description: "Expert digital marketing blogs, SEO strategies, and business growth tips for Indian businesses.",
    url: "https://blog.ezydigital.in",
    siteName: "Ezy Digital Blog",
    images: [
      {
        url: "/thumbnail/template.png",
        width: 1200,
        height: 630,
        alt: "Ezy Digital Blog - Digital Marketing Insights"
      }
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
    site: "@ezydigital",
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
      'application/rss+xml': [
        { url: '/feed.xml', title: 'RSS Feed' },
      ],
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="application/rss+xml" title="Ezy Digital Blog RSS Feed" href="/feed.xml" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}