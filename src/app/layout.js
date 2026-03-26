import "../styles/globals.css";

export const metadata = {
  title: "Ezy Digital Blog",
  description: "AI powered blog platform for SEO growth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}