import "./globals.css";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";

export const metadata = {
  title: "Sakuraku: Belajar & Latihan Bahasa Jepang",
  description:
    "Belajar bahasa Jepang dengan mudah dan interaktif di Sakuraku. Mulai latihan sekarang secara gratis.",
  metadataBase: new URL("https://sakuraku.id"),
  openGraph: {
    title: "Sakuraku - Belajar Bahasa Jepang",
    description:
      "Belajar bahasa Jepang dengan mudah dan interaktif di Sakuraku.",
    url: "https://sakuraku.id",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <div className="mt-[64px] min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
