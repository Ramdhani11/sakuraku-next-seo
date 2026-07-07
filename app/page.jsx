import Link from "next/link";

export const metadata = {
  title: "Sakuraku: Belajar Bahasa Jepang Seperti Bermain!",
  description:
    "Belajar bahasa Jepang selangkah demi selangkah, mulai dari nol sampai jago. Latihan interaktif, gamifikasi, dan progress tracking.",
  alternates: { canonical: "https://test.sakuraku.id/" },
};

const features = [
  {
    title: "Latihan Soal",
    icon: "/img/landing/practice-exercise.svg",
    desc: "Latihan rutin yang dirancang untuk membantu memperkuat kosakata, tata bahasa, dan pola kalimat melalui penggunaan bahasa Jepang sehari-hari.",
  },
  {
    title: "Latihan Khusus",
    icon: "/img/landing/special-exercise.svg",
    desc: "Latihan fokus pada area spesifik untuk membantu mengasah kemampuan bahasa utama, sebagai persiapan untuk komunikasi di dunia nyata maupun ujian JLPT.",
  },
  {
    title: "Pantau Progresmu",
    icon: "/img/landing/progress-tracking.svg",
    desc: "Pantau progres belajar kamu. Lihat pencapaian kamu, level mana saja yang telah diselesaikan, dan area mana yang perlu menjadi fokus kamu selanjutnya.",
  },
  {
    title: "Latihan Bertahap",
    icon: "/img/landing/step-exercise.svg",
    desc: "Semua materi disusun secara berurutan, dari level pemula sampai mahir. Jadi, kamu bisa tingkatin skill secara bertahap dan pastinya jadi lebih percaya diri.",
  },
];

export default function LandingPage() {
  return (
    <main className="w-full max-w-[1920px] mx-auto p-2 mbl:p-6 overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="flex justify-between flex-col mbl:flex-row mbl:items-center mbl:px-12 mt-12">
        <div className="w-full mbl:w-6/12">
          <h1 className="md:text-4xl text-3xl poppins-black w-full max-w-[500px]">
            Belajar bahasa Jepang seperti bermain!
          </h1>
          <div className="flex gap-2 items-center font-bold mt-8">
            <a
              href="https://test.sakuraku.id/login"
              className="py-3 px-5 border border-black inter-bold rounded-lg bg-black text-white"
            >
              Masuk
            </a>
            <a
              href="https://test.sakuraku.id/register"
              className="py-3 px-5 border border-black inter-bold rounded-lg bg-white text-black"
            >
              Daftar
            </a>
          </div>
          <div className="mt-4">
            <a
              href="https://test.sakuraku.id/dashboard"
              className="text-primary-indigo inter-bold"
            >
              Lanjutkan sebagai tamu
            </a>
          </div>
        </div>
        <div className="w-full mbl:w-6/12 mt-8 mbl:mt-0">
          <p className="text-justify inter-regular text-[16px]">
            Di program ini, kamu akan belajar bahasa Jepang selangkah demi
            selangkah, mulai dari nol sampai jago. Latihan disusun biar kamu
            makin percaya diri sedikit demi sedikit, karena di tiap levelnya
            kamu akan dihadapi sama kalimat dan pola yang makin menantang. Jadi,
            baik kamu baru memulai atau lagi ngejar biar lancar, latihan akan
            membuat ritme belajarmu jadi seru. Progres pun akan terasa lebih
            mudah dicapai dan pastinya seru!
          </p>
        </div>
      </section>

      {/* ── FILLER IMAGES ── */}
      <div className="w-full flex my-24 px-2">
        <div className="flex flex-col mbl:flex-row w-full justify-start items-stretch gap-1">
          <div className="w-full mbl:w-[17.67%] flex flex-col gap-1">
            <div className="relative w-full h-[142px] rounded-lg overflow-hidden">
              <picture>
                <source
                  srcSet="/img/landing/filler/fill-1-webp.webp"
                  type="image/webp"
                />
                <img
                  src="/img/landing/filler/fill-1-png.png"
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </picture>
            </div>
            <div className="w-full h-[142px] bg-primary-indigo rounded-lg flex justify-center items-center text-[12px] text-white p-4">
              Belajar bahasa Jepang jadi lebih seru! Kumpulin EXP, naik level,
              dan lacak kemajuan kamu.
            </div>
          </div>
          <div className="w-full mbl:w-[27.95%] rounded-lg overflow-hidden">
            <picture>
              <source
                srcSet="/img/landing/filler/fill-3-webp.webp"
                type="image/webp"
              />
              <img
                src="/img/landing/filler/fill-3-png.png"
                alt=""
                className="w-full h-[285px] object-cover object-center"
              />
            </picture>
          </div>
          <div className="w-full mbl:w-[23.6%] grid grid-cols-2 gap-1">
            <div className="flex flex-col gap-1">
              <div className="w-full h-[142px] bg-light-orange-land rounded-full"></div>
              <div className="relative w-full h-[142px] rounded-lg overflow-hidden">
                <picture>
                  <source
                    srcSet="/img/landing/filler/fill-5-webp.webp"
                    type="image/webp"
                  />
                  <img
                    src="/img/landing/filler/fill-5-png.png"
                    alt=""
                    className="w-full h-full object-cover object-center"
                  />
                </picture>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-full h-[142px] bg-primary-indigo rounded-lg"></div>
              <div className="w-full h-[142px] bg-light-green-land rounded-lg"></div>
            </div>
          </div>
          <div className="w-full mbl:w-[16.79%] h-[285px] bg-yellow-land rounded-lg flex flex-col justify-center items-center gap-2 text-[40px]">
            <h2 className="hanalei-regular">AYO!</h2>
            <h2 className="hanalei-fill-regular">AYO!</h2>
            <h2 className="hanalei-regular">AYO!</h2>
          </div>
          <div className="w-full mbl:w-[13.98%] rounded-lg overflow-hidden">
            <picture>
              <source
                srcSet="/img/landing/filler/fill-9-webp.webp"
                type="image/webp"
              />
              <img
                src="/img/landing/filler/fill-9-png.png"
                alt=""
                className="w-full h-[285px] object-cover object-top mbl:object-center"
              />
            </picture>
          </div>
        </div>
      </div>

      {/* ── APA YANG KAMU DAPATKAN ── */}
      <section className="w-full mt-16">
        <h2 className="text-[36px] text-center poppins-black">
          Apa yang akan kamu dapatkan
        </h2>
        <p className="text-[16px] text-center inter-regular">
          Semua yang kamu butuhkan biar belajar bahasa Jepang makin lancar, dari
          latihan sampai pantau progres
        </p>
        <div className="w-full flex flex-col mbl:flex-row justify-between rounded-xl bg-primary-color-sk p-8 gap-4 mt-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="w-full mbl:w-4/12 bg-white rounded-xl p-4"
            >
              <img
                src={f.icon}
                alt={f.title}
                className="w-full max-h-[160px] object-contain"
              />
              <h3 className="inter-bold text-xl my-4">{f.title}</h3>
              <p className="inter-regular">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STEP SECTION ── */}
      <section className="w-full flex flex-col justify-between items-center rounded-xl bg-primary-soft-color-sk p-8 gap-8 mt-8">
        <div className="w-full flex flex-col mbl:flex-row justify-between mb-8">
          <div className="w-full mbl:w-3/12">
            <h2 className="text-[36px] poppins-black">Ikuti Setiap Langkah</h2>
          </div>
          <div className="w-full mbl:w-6/12 mt-4 md:mt-0">
            <p className="text-[16px] inter-regular">
              Ikuti alur belajar yang jelas dan terstruktur di setiap level
              perjalanan bahasa Jepang kamu. Mulai dari dasar hingga keahlian
              tingkat lanjut, setiap tahapan dirancang untuk menyambung dari
              materi sebelumnya.
            </p>
          </div>
        </div>
        <img
          src="/img/landing/steps.svg"
          alt="learning steps"
          className="hidden mbl:block w-full"
        />
        <img
          src="/img/landing/steps-m.png"
          alt="learning steps"
          className="block mbl:hidden w-full"
        />
      </section>

      {/* ── TES TERSTRUKTUR ── */}
      <section className="w-full flex flex-col justify-between items-center rounded-xl bg-light-blue-landing p-8 gap-8 mt-8">
        <div className="w-full flex justify-start">
          <div className="w-full md:w-8/12 lg:w-6/12">
            <h2 className="text-[36px] poppins-black">
              Tes Terstruktur dari beginner sampai ekspert
            </h2>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between px-0 md:px-8 gap-4">
          <div className="w-full md:w-6/12">
            <img
              src="/img/landing/test-terstruktur.svg"
              alt="structured test"
              className="block w-full"
            />
          </div>
          <div className="w-full md:w-6/12 flex items-center">
            <div className="w-full flex flex-col inter-regular items-start gap-2 text-[16px] text-justify">
              <p>
                Satu Jalur Belajar, Dari Dasar Hingga Mahir. Tak perlu bingung
                harus mulai dari mana. Mulai dari mengenal huruf Hiragana &amp;
                Katakana pelan-pelan, lanjut ke obrolan santai sehari-hari,
                sampai akhirnya masuk ke materi kompleks level mahir.
              </p>
              <p>
                Materinya disusun bertahap supaya kamu nggak kaget dan
                belajarnya tetap nyaman, tapi progresnya jelas terasa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTIKEL ── */}
      <section className="w-full flex flex-col justify-between items-center rounded-xl bg-primary-soft-color-sk px-8 pt-8 gap-8 mt-8">
        <div className="w-full flex justify-center">
          <div className="w-full md:w-8/12 text-center">
            <h2 className="text-[36px] poppins-black">
              Artikel untuk latihan membaca
            </h2>
            <p className="mt-4 md:mt-8 inter-regular">
              Ingin coba membaca artikel dalam bahasa jepang? tapi takut mentok
              di satu kata kanji? Tenang alur baca tetap lancar, kamu cukup
              arahkan kursor ke kata yang kamu gatau, akan muncul tooltip kecil
              yang nunjukkin cara baca, dan terjemahan artinya!
            </p>
            <div className="flex justify-center mt-6 mb-4">
              <Link
                href="/articles"
                className="py-3 px-8 bg-primary-color-sk text-white rounded-lg inter-bold"
              >
                Lihat Artikel
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[120%] sm:w-full flex justify-center">
          <img
            src="/img/landing/artikel.svg"
            alt="article feature"
            className="w-full"
          />
        </div>
      </section>

      {/* ── CTA FOOTER ── */}
      <section className="w-full flex flex-col justify-center items-center bg-secondary-color-sk rounded-t-[50px] min-h-[400px] py-16 mt-8">
        <h2 className="poppins-bold text-[36px] text-center">
          Siap untuk mengambil
        </h2>
        <h2 className="poppins-bold text-[36px] text-center">
          langkah pertama?
        </h2>
        <div className="flex gap-2 items-center font-bold mt-8">
          <a
            href="https://test.sakuraku.id/login"
            className="min-w-[153px] inter-bold p-[10px] border border-black rounded-lg bg-black text-white text-center"
          >
            Masuk
          </a>
          <a
            href="https://test.sakuraku.id/register"
            className="min-w-[153px] inter-bold p-[10px] border border-black rounded-lg bg-white text-black text-center"
          >
            Daftar
          </a>
        </div>
      </section>
    </main>
  );
}
