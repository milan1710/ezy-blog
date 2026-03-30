export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://blog.ezydigital.in/sitemap.xml",
  };
}