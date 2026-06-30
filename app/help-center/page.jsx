import HelpCenterTabs from './HelpCenterTabs';

export const metadata = {
  title: 'Pusat Bantuan | Sakuraku',
  description:
    'Temukan panduan lengkap penggunaan Sakuraku: cara latihan, cara berlangganan, dan semua pertanyaan umum.',
  alternates: { canonical: 'https://sakuraku.id/help-center' },
};

const helpData = [
  {
    topic: 'Umum',
    slug: 'general',
    items: [
      {
        id: 1,
        question: 'Apa itu Sakuraku?',
        answers: [
          'Sakuraku adalah sebuah platform yang menawarkan latihan dalam Bahasa Jepang dengan sistem "langkah demi langkah", dimulai dari hal yang paling mudah sampai tingkat yang lebih lanjut.',
        ],
      },
    ],
  },
  {
    topic: 'Pembelian',
    slug: 'purchasing',
    items: [
      {
        id: 1,
        question: 'Bagaimana cara berlangganan?',
        answers: [
          'Jika kamu ingin berlangganan, kamu dapat login terlebih dahulu, atau mendaftar akun Sakuraku terlebih dahulu. Kemudian kamu dapat klik "Subscribe" yang berada di pojok kanan atas.',
        ],
      },
      {
        id: 2,
        question: 'Apa saja yang didapatkan dari akun gratis?',
        answers: [
          'Untuk kamu yang ingin mencoba Sakuraku terlebih dahulu, kamu dapat mencoba akun gratis yang memungkinkan kamu mengakses topik latihan terbatas untuk setiap level. Jika kamu ingin membuka semua topik latihan, kamu harus mengupgrade akun kamu dengan berlangganan.',
        ],
      },
      {
        id: 3,
        question: 'Berapa biaya untuk berlangganan?',
        answers: [
          'Kamu bisa berlangganan mulai dari Rp 29.000/bulan. Harga ini hanya berlaku untuk waktu terbatas. Untuk informasi lebih lanjut tentang harga langganan, cek halaman pricing.',
        ],
      },
      {
        id: 4,
        question: 'Apakah harga tier saya bisa dipertahankan jika saya berhenti berlangganan?',
        answers: [
          'Jika kamu berhenti berlangganan, kamu tidak lagi bisa mempertahankan harga tier yang kamu miliki saat ini.',
          'Kamu mungkin akan dikenakan harga tier yang lebih tinggi jika berlangganan kembali.',
        ],
      },
    ],
  },
  {
    topic: 'Latihan',
    slug: 'exercise',
    items: [
      {
        id: 1,
        question: 'Bagaimana cara mengerjakan latihan?',
        answers: [
          'Jika kamu ingin mengerjakan latihan, kamu bisa:',
          '1. Masuk ke dashboard',
          '2. Pilih level latihan',
          '3. Kamu akan diarahkan ke daftar latihan, kemudian pilih salah satunya',
          '4. Setelah memilih dan mengkonfirmasi, kamu bisa mulai mengerjakan latihan',
        ],
      },
      {
        id: 2,
        question: 'Perbedaan tombol "Check Answer" dan "Submit Your Answer"?',
        answers: [
          '1. Tombol "Check Answer" untuk memeriksa jawaban yang kamu pilih dan akan menunjukkan apakah jawaban kamu benar atau salah, tetapi setelah melakukan ini kamu tidak dapat mengubah jawaban kamu.',
          '2. Tombol "Submit Your Answer" untuk mengirimkan semua jawaban kamu, pastikan kamu sudah menjawab semua pertanyaan.',
        ],
      },
    ],
  },
];

export default function HelpCenterPage() {
  return (
    <main className="w-full">
      <section className="w-full bg-primary-color-sk text-white py-12 px-6">
        <h1 className="text-[36px] poppins-black">Pusat Bantuan</h1>
      </section>

      <section className="w-full max-w-5xl mx-auto px-4 py-10">
        <HelpCenterTabs data={helpData} />
      </section>
    </main>
  );
}
