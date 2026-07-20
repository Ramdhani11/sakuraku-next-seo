import { siteUrl } from "../../src/utils/siteUrl";

// NOTE: Route is /terms-of-servise (typo preserved to match existing SPA route)
export const metadata = {
  title: "Syarat dan Ketentuan Layanan | Sakuraku",
  description:
    "Syarat dan ketentuan penggunaan platform Sakuraku. Dengan menggunakan layanan kami, kamu setuju untuk terikat oleh ketentuan ini.",
  alternates: { canonical: siteUrl + "/terms-of-service" },
};

const sections = [
  {
    id: 1,
    title: "Definisi",
    intro: "",
    list: [
      '"Pengguna" merujuk pada setiap individu yang mengakses atau menggunakan Layanan.',
      '"Konten" berarti semua teks, gambar, video, dan materi lain yang disediakan di situs web.',
    ],
  },
  {
    id: 2,
    title: "Layanan",
    intro:
      "Layanan Sakuraku menyediakan sumber daya pembelajaran bahasa Jepang dan kelas daring, terutama untuk pengguna di Indonesia. Kami berhak untuk mengubah atau menghentikan Layanan kapan saja.",
    list: [],
  },
  {
    id: 3,
    title: "Kelayakan",
    intro: "",
    list: [
      "Kamu harus berusia minimal 13 tahun untuk menggunakan Layanan.",
      "Jika kamu berusia di bawah 13 tahun, kamu hanya dapat menggunakan Layanan dengan persetujuan dan pengawasan dari orang tua atau wali yang sah.",
    ],
  },
  {
    id: 4,
    title: "Akun dan Tanggung Jawab Pengguna",
    intro: "",
    list: [
      "Pembuatan Akun: Kamu harus memberikan informasi yang akurat, lengkap, dan terkini selama proses pendaftaran.",
      "Keamanan Akun: Kamu bertanggung jawab untuk menjaga kerahasiaan kata sandi kamu dan atas semua aktivitas yang terjadi di bawah akun kamu.",
      "Perilaku yang Dilarang: Kamu setuju untuk tidak menyalahgunakan Layanan untuk tujuan ilegal atau tidak sah.",
    ],
  },
  {
    id: 5,
    title: "Pembayaran dan Pengembalian Dana",
    intro: "",
    list: [
      "Biaya: Semua biaya untuk kursus atau materi pembelajaran kami ditampilkan di situs web kami dan dicantumkan dalam Rupiah Indonesia (IDR).",
      "Kebijakan Pengembalian Dana: Kecuali diwajibkan lain oleh hukum yang berlaku di Indonesia, semua pembayaran bersifat final dan tidak dapat dikembalikan.",
    ],
  },
  {
    id: 6,
    title: "Kekayaan Intelektual",
    intro:
      "Semua konten, merek dagang, dan materi di situs web kami (termasuk teks, gambar, dan video) adalah milik eksklusif Sakuraku atau pemberi lisensinya. Kamu tidak boleh menyalin, mereproduksi, atau mendistribusikan ulang materi kami tanpa persetujuan tertulis dari kami sebelumnya.",
    list: [],
  },
  {
    id: 7,
    title: "Sanggahan Jaminan dan Batasan Tanggung Jawab",
    intro: "",
    list: [
      'Layanan "SEBAGAIMANA ADANYA": Layanan disediakan atas dasar "SEBAGAIMANA ADANYA". Kami tidak menjamin bahwa Layanan akan berjalan tanpa gangguan atau bebas dari kesalahan.',
      "Batasan Tanggung Jawab: Sejauh diizinkan oleh hukum, Sakuraku tidak akan bertanggung jawab atas segala kerugian tidak langsung yang timbul dari penggunaan Layanan.",
      "Layanan Pihak Ketiga: Kami tidak bertanggung jawab atas konten atau keakuratan situs web pihak ketiga yang tertaut ke platform kami.",
    ],
  },
  {
    id: 8,
    title: "Pengakhiran",
    intro:
      "Kami dapat mengakhiri atau menangguhkan akun kamu dengan segera, tanpa pemberitahuan sebelumnya, untuk alasan apa pun termasuk pelanggaran Ketentuan ini. Kamu juga dapat mengakhiri akun kamu kapan saja dengan menghubungi support@sakuraku.id.",
    list: [],
  },
  {
    id: 9,
    title: "Hukum yang Mengatur dan Penyelesaian Sengketa",
    intro:
      "Ketentuan ini akan diatur oleh hukum Republik Indonesia. Setiap sengketa yang timbul akan diselesaikan secara eksklusif di yurisdiksi Pengadilan Negeri Jakarta Selatan. Kedua belah pihak setuju untuk berusaha menyelesaikan sengketa melalui negosiasi atau mediasi secara damai terlebih dahulu.",
    list: [],
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="w-full bg-light-gray min-h-screen">
      <div className="w-full p-4 sm:p-8 lg:p-12 bg-white max-w-4xl mx-auto my-4 rounded-2xl text-[16px]">
        <h1 className="text-[32px] inter-bold mb-8">
          Syarat dan Ketentuan Layanan
        </h1>

        <p className="inter-regular text-dark-gray-text mb-8">
          Selamat datang di Sakuraku. Ketentuan Layanan ini mengatur akses dan
          penggunaan kamu atas situs web kami ({siteUrl}) dan layanan kami.
          Dengan membuat akun atau menggunakan Layanan kami, kamu setuju untuk
          terikat oleh Ketentuan ini.
        </p>

        <div className="w-full flex flex-col gap-8">
          {sections.map((section) => (
            <div key={section.id} className="w-full flex flex-col">
              <p className="inter-bold text-primary-color-sk">
                {section.id}. {section.title}
              </p>
              {section.intro && (
                <p className="inter-regular mt-2 text-dark-gray-text">
                  {section.intro}
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
      </div>
    </main>
  );
}
