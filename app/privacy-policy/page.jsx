export const metadata = {
  title: "Kebijakan Privasi | Sakuraku",
  description:
    "Kebijakan privasi Sakuraku — bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi kamu.",
  alternates: { canonical: "https://test.sakuraku.id/privacy-policy" },
};

const sections = [
  {
    id: 1,
    title: "Pendahuluan",
    desc: 'Kebijakan Privasi ini menjelaskan bagaimana PT. Satu Nol Tujuh ("kami"), selaku operator platform Sakuraku, mengumpulkan, menggunakan, dan melindungi data pribadi kamu. Privasi kamu sangat penting bagi kami, dan kami berkomitmen untuk melindunginya sesuai dengan hukum yang berlaku.',
    list: [],
  },
  {
    id: 2,
    title: "Informasi yang Kami Kumpulkan",
    desc: "",
    list: [
      "Data Pribadi: Kami mengumpulkan informasi yang kamu berikan saat mendaftar, seperti nama, alamat email, dan nomor telepon.",
      "Data Teknis & Penggunaan: Kami secara otomatis mengumpulkan data seperti alamat IP kamu, jenis peramban, dan pola penggunaan untuk memelihara dan meningkatkan layanan serta keamanan kami.",
    ],
  },
  {
    id: 3,
    title: "Informasi Pembayaran",
    desc: "Kami menjaga keamanan finansial kamu dengan serius. Kami tidak mengumpulkan, menyimpan, atau memiliki akses ke nomor kartu kredit lengkap atau detail rekening bank kamu. Semua transaksi pembayaran diproses secara aman melalui mitra payment gateway pihak ketiga tepercaya kami.",
    list: [],
  },
  {
    id: 4,
    title: "Bagaimana Kami Menggunakan Informasi Kamu",
    desc: "Informasi kamu digunakan untuk tujuan-tujuan berikut:",
    list: [
      "Untuk menyediakan, mengoperasikan, dan memelihara layanan pembelajaran bahasa kami.",
      "Untuk memproses transaksi kamu dan mengirimi kamu konfirmasi terkait.",
      "Untuk mengirimi kamu pembaruan dan informasi lain yang berkaitan dengan layanan kami.",
      "Untuk meningkatkan situs web kami, memperkuat keamanan, dan mencegah aktivitas penipuan.",
    ],
  },
  {
    id: 5,
    title: "Pembagian dan Pengungkapan Data",
    desc: "Kami tidak menjual data pribadi kamu. Kami dapat membagikan informasi kamu kepada penyedia layanan pihak ketiga tepercaya hanya jika diperlukan untuk menyediakan layanan kami. Kami hanya akan mengungkapkan data pribadi kamu jika diwajibkan oleh hukum.",
    list: [],
  },
  {
    id: 6,
    title: "Hak Kamu",
    desc: "Kamu berhak untuk mengakses, memperbarui, atau meminta penghapusan data pribadi kamu. Untuk menggunakan hak-hak ini, silakan hubungi kami di support@sakuraku.id.",
    list: [],
  },
  {
    id: 7,
    title: "Perubahan pada Kebijakan Privasi Ini",
    desc: "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberitahu kamu tentang perubahan signifikan dengan memublikasikan kebijakan baru di halaman ini atau dengan mengirimi kamu email.",
    list: [],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full bg-light-gray min-h-screen">
      <div className="w-full p-4 sm:p-8 lg:p-12 bg-white max-w-4xl mx-auto my-4 rounded-2xl text-[16px]">
        <h1 className="text-[32px] inter-bold">Kebijakan Privasi</h1>
        <p className="mb-8 inter-bold text-gray-text">
          Terakhir Diperbarui: 30 Juli 2025
        </p>

        <div className="w-full flex flex-col gap-8">
          {sections.map((section) => (
            <div key={section.id} className="w-full flex flex-col">
              <p className="inter-bold text-primary-color-sk">
                {section.id}. {section.title}
              </p>
              {section.desc && (
                <p className="inter-regular mt-2 text-dark-gray-text">
                  {section.desc}
                </p>
              )}
              {section.list.length > 0 && (
                <ul className="ml-6 mt-2">
                  {section.list.map((item, idx) => (
                    <li
                      key={idx}
                      className="list-disc inter-regular text-dark-gray-text mt-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 inter-regular text-gray-text text-sm">
          Untuk informasi lebih lanjut tentang perusahaan kami, silakan kunjungi
          halaman{" "}
          <a href="/about-us" className="text-primary-color-sk underline">
            Tentang Kami
          </a>
          .
        </p>
      </div>
    </main>
  );
}
