import "./globals.css";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";

export const metadata = {
  title: "Sakuraku: Belajar & Latihan Bahasa Jepang",
  description:
    "Belajar bahasa Jepang dengan mudah dan interaktif di Sakuraku. Mulai latihan sekarang secara gratis.",
  metadataBase: new URL("https://test.sakuraku.id"),
  openGraph: {
    title: "Sakuraku - Belajar Bahasa Jepang",
    description:
      "Belajar bahasa Jepang dengan mudah dan interaktif di Sakuraku.",
    url: "https://test.sakuraku.id",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Sakuraku ",
      },
    ],
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sakuraku",
    description:
      "Belajar bahasa Jepang dengan mudah dan interaktif di Sakuraku.",
    images: ["/og.png"],
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
