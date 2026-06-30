export const metadata = {
  title: 'Tentang Kami | Sakuraku',
  description:
    'PT. Satu Nol Tujuh — pendiri Sakuraku. Platform belajar bahasa Jepang yang dibangun oleh tim engineer profesional sejak 2018.',
  alternates: { canonical: 'https://sakuraku.id/about-us' },
};

export default function AboutUsPage() {
  return (
    <main className="w-full overflow-x-hidden bg-white text-[16px]">

      {/* Hero */}
      <div
        style={{ backgroundImage: "url('/img/about-us-hero.png')", backgroundPosition: 'center', backgroundSize: 'cover' }}
        className="w-full h-[200px] sm:h-[260px] lg:h-[380px] bg-primary-color-sk flex justify-start items-center"
      >
        <h1 className="text-white p-12 text-[36px] lg:text-[56px] inter-bold">COMPANY PROFILE</h1>
      </div>

      <div className="w-full p-4 sm:p-8 lg:p-12 bg-light-gray">
        <h2 className="text-primary-color-sk text-[20px] inter-bold">ABOUT US</h2>
        <div className="flex flex-col inter-regular gap-4 mt-3">
          <p>
            Sejak 2018, bisnis inti kami di PT. Satu Nol Tujuh telah menyediakan solusi pengembangan sistem
            profesional dan khusus untuk berbagai klien. Dengan memanfaatkan keahlian teknis yang mendalam ini,
            kami mendirikan Sakuraku dengan misi khusus: menciptakan platform pembelajaran bahasa Jepang daring
            yang paling efektif dan ramah pengguna.
          </p>
          <p>
            Kami bukan hanya pendidik, tetapi juga teknisi yang membangun layanan ini dari nol. Latar belakang
            unik ini memungkinkan kami memastikan lingkungan belajar yang stabil, aman, dan lancar.
          </p>
        </div>

        {/* Company Info Card */}
        <div className="w-full rounded-3xl bg-primary-indigo p-4 md:p-8 flex flex-col-reverse lg:flex-row text-white my-8 gap-4">
          <div className="w-full lg:w-4/12 p-4 flex flex-col gap-3">
            <h2 className="text-[36px] poppins-black">Informasi</h2>
            <p className="poppins-bold">PT. Satu Nol Tujuh</p>
            <p className="poppins-regular text-sm">
              Jl. Bukit Permai No. 16, Ciwaruga, Kec. Parongpong, Kabupaten Bandung Barat, Jawa Barat 40559, Indonesia
            </p>
            <p className="my-4 poppins-regular text-sm">Didirikan sejak 12 Februari 2018</p>
            <p className="poppins-regular text-sm">Nomor Registrasi Bisnis (AHU)</p>
            <p className="poppins-regular text-sm">AHU-0008568.AH.01.01 Tahun 2018</p>
            <p className="mt-4 poppins-regular text-sm">Kegiatan Usaha Terdaftar (KBLI):</p>
            <ul className="ml-6 poppins-regular text-sm">
              <li className="list-disc">Aktivitas Portal Web dan/atau Platform Digital (63122)</li>
              <li className="list-disc">Pendidikan Bahasa Swasta (85495)</li>
              <li className="list-disc">Kegiatan Pemrograman Komputer (6201)</li>
            </ul>
          </div>
          <div className="w-full lg:w-8/12 p-4">
            <div
              style={{ backgroundImage: "url('/img/about-us-info.png')", backgroundPosition: 'center', backgroundSize: 'cover' }}
              className="w-full h-[240px] sm:h-[320px] lg:h-[500px] rounded-3xl flex justify-end items-end"
            >
              <div className="flex items-center gap-2 m-4 bg-black bg-opacity-40 px-3 py-1 rounded-lg">
                <img src="/img/107.svg" alt="107" className="w-[20px] h-[20px]" />
                <p className="text-white poppins-bold text-sm">107 LLC</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="w-full flex flex-col lg:flex-row bg-light-gray mt-8">
          <div className="w-full lg:w-4/12 p-4">
            <h2 className="text-[40px] inter-bold mb-4">Hubungi Kami</h2>
            <p className="inter-regular text-sm">
              Untuk memastikan bahwa seluruh pertanyaan pengguna tercatat dengan baik dan ditangani dengan
              kualitas terbaik, kami telah memusatkan saluran dukungan kami pada komunikasi berbasis teks.
            </p>
          </div>
          <div className="w-full inter-regular lg:w-4/12 p-4">
            <img src="/icon/whatsapp.svg" alt="whatsapp" className="w-[24px] h-[24px] mb-4 mt-8" />
            <p>
              Hubungi Kami melalui{' '}
              <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer"
                className="text-primary-color-sk italic underline">
                Whatsapp
              </a>
            </p>
            <p className="text-sm text-gray-text">(Jam Layanan Chat: Senin - Jumat, pukul 09.00 - 17.00 WIB)</p>
            <p className="text-sm text-gray-text">Catatan: Nomor WhatsApp ini hanya menerima percakapan teks (chat).</p>
          </div>
          <div className="w-full inter-regular lg:w-4/12 p-4">
            <img src="/img/email.png" alt="email" className="w-[24px] h-[24px] mb-4 mt-8" />
            <p>Email Support: support@sakuraku.id</p>
            <p className="text-sm text-gray-text">(Kami umumnya akan merespons dalam 24 jam kerja)</p>
          </div>
        </div>
      </div>
    </main>
  );
}
