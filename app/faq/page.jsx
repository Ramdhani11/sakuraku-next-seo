import FAQAccordion from "./FAQAccordion";
import Link from "next/link";

export const metadata = {
  title: "FAQ - Pertanyaan yang Sering Diajukan | Sakuraku",
  description:
    "Temukan jawaban atas pertanyaan umum seputar Sakuraku: cara berlangganan, harga, fitur latihan, dan lebih banyak lagi.",
  alternates: { canonical: "https://sakuraku.id/faq" },
};

const faqItems = [
  {
    id: "about",
    question: "Apa itu Sakuraku?",
    answer:
      'Sakuraku adalah sebuah platform yang menawarkan latihan dalam Bahasa Jepang dengan sistem "langkah demi langkah", dimulai dari hal yang paling mudah sampai tingkat yang lebih lanjut.',
  },
  {
    id: "subscribe",
    question: "Bagaimana cara berlangganan?",
    answer:
      'Jika kamu ingin berlangganan, kamu dapat login terlebih dahulu, atau mendaftar akun Sakuraku terlebih dahulu. Kemudian kamu dapat klik "Subscribe" yang berada di pojok kanan atas.',
  },
  {
    id: "price",
    question: "Berapa biaya untuk berlangganan?",
    answer:
      "Kamu bisa berlangganan mulai dari Rp 29.000/bulan. Harga ini menggunakan sistem bertingkat — semakin awal kamu berlangganan, semakin rendah harganya untuk selamanya.",
  },
  {
    id: "free",
    question: "Apa yang didapat dengan akun gratis?",
    answer:
      "Dengan akun gratis, kamu bisa mencoba 2 latihan per level sebagai uji coba. Untuk membuka semua topik latihan, kamu perlu upgrade akun dengan berlangganan.",
  },
  {
    id: "cancel",
    question: "Bagaimana cara membatalkan langganan?",
    answer:
      "Kamu bisa membatalkan langganan kapan saja melalui halaman profil. Setelah dibatalkan, akses premium tetap aktif hingga akhir periode berlangganan yang sudah dibayar.",
  },
  {
    id: "payment",
    question: "Metode pembayaran apa yang tersedia?",
    answer:
      "Saat ini kami menerima pembayaran melalui GoPay dan metode transfer lainnya. Pembayaran diproses melalui payment gateway yang aman.",
  },
];

export default function FAQPage() {
  return (
    <main className="w-full">
      {/* Hero */}
      <section className="w-full bg-primary-color-sk text-white py-16 px-6 text-center">
        <h1 className="text-[36px] poppins-black mb-2">Punya Pertanyaan?</h1>
        <p className="inter-regular max-w-xl mx-auto">
          Kirim pertanyaan kamu ke kami untuk mendapatkan jawaban pertanyaan
          kamu.
        </p>
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <div className="flex items-center gap-2 text-sm inter-regular opacity-80">
            <img src="/icon/general_q.svg" alt="" className="w-6 h-6" /> Umum
          </div>
          <div className="flex items-center gap-2 text-sm inter-regular opacity-80">
            <img src="/icon/purchase_q.svg" alt="" className="w-6 h-6" />{" "}
            Pembelian
          </div>
          <div className="flex items-center gap-2 text-sm inter-regular opacity-80">
            <img src="/icon/exercise_q.svg" alt="" className="w-6 h-6" />{" "}
            Latihan
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="w-full max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl poppins-black mb-8 text-center">
          Pertanyaan yang Sering Diajukan
        </h2>
        <FAQAccordion items={faqItems} />
        <div className="mt-8 text-center inter-regular text-gray-text">
          Tidak menemukan jawaban yang kamu cari?{" "}
          <Link
            href="/help-center"
            className="text-primary-color-sk underline inter-bold"
          >
            Cek Help Center
          </Link>
        </div>
      </section>
    </main>
  );
}
