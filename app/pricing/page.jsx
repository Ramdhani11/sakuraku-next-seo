import Link from 'next/link';

export const metadata = {
  title: 'Harga Berlangganan Sakuraku | Kuasai Bahasa Jepang',
  description:
    'Mulai belajar bahasa Jepang dengan harga terjangkau. Sistem harga bertingkat — semakin awal berlangganan, semakin murah harganya untuk selamanya.',
  alternates: { canonical: 'https://sakuraku.id/pricing' },
};

const tiers = [
  { tier: 'Tier 1', price: '29.000', users: '2.500', range: '1 - 2.500' },
  { tier: 'Tier 2', price: '49.000', users: '2.500', range: '2.501 - 5.000' },
  { tier: 'Tier 3', price: '59.000', users: '2.999', range: '5.001 - 7.999' },
  { tier: 'Tier 4', price: '79.000', users: '2.000', range: '8.000 - 10.000' },
  { tier: 'Tier 5', price: '99.000', users: '4.999', range: '10.001 - 14.999' },
  { tier: 'Tier 6', price: '129.000', users: '4.001', range: '15.000 - 19.000' },
];

const features = [
  {
    title: 'Akses Latihan Tanpa Batas',
    desc: 'Dapatkan akses penuh latihan bahasa Jepang — tanpa limitasi!',
  },
  {
    title: 'Buka Tes Spesial',
    desc: 'Selesaikan semua tes spesial untuk meningkatkan skill kamu di tiap levelnya.',
  },
  {
    title: 'Lacak Progres',
    desc: 'Makin semangat, dengan melihat perkembangan bahasa Jepang kamu setiap langkah.',
  },
  {
    title: 'Latihan Bertahap',
    desc: 'Ikuti alur belajar yang jelas dan terstruktur, dari pemula sampai master.',
  },
  {
    title: 'Sistem Harga Bertingkat',
    desc: 'Semakin awal berlangganan, semakin rendah harga bulanannya — dan harga kamu terkunci selamanya.',
  },
];

async function getCurrentPrice() {
  try {
    // Get guest token first
    const guestRes = await fetch('https://api.sakuraku.id/api/v1/guest_login', {
      method: 'POST',
      next: { revalidate: 3600 },
    });
    const guestToken = guestRes.headers.get('authorization');
    if (!guestToken) return null;

    // Fetch current eligible price
    const priceRes = await fetch('https://api.sakuraku.id/api/v1/customer_eligible_price', {
      method: 'POST',
      headers: { Authorization: guestToken, 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: '', bundling_month_counts: [1, 3, 6, 12] }),
      next: { revalidate: 3600 },
    });
    const data = await priceRes.json();
    return data?.value ?? null;
  } catch {
    return null;
  }
}

export default async function PricingPage() {
  const priceData = await getCurrentPrice();
  const currentPrice = priceData?.bundling_prices?.[0]?.eligible_price;

  return (
    <main className="relative w-full min-h-screen flex flex-col gap-4 p-4 sm:p-8">

      {/* ── HEADER ── */}
      <section className="w-full text-center py-12">
        <h1 className="text-3xl md:text-4xl poppins-black mb-4">
          Kuasai Bahasa Jepang Secara Terstruktur, Mulai Hari Ini
        </h1>
        <p className="inter-regular text-[16px] max-w-2xl mx-auto text-gray-text">
          Latih bahasa Jepang dengan cara yang menyenangkan dan terjangkau — lewat latihan
          yang membantu kamu berkembang secara bertahap, kapan saja, di mana saja!
        </p>
      </section>

      {/* ── PRICING CARDS ── */}
      <section className="w-full flex flex-col md:flex-row gap-6 justify-center max-w-4xl mx-auto">
        {/* Free */}
        <div className="flex-1 bg-white rounded-2xl p-6 border-2 border-light-gray shadow-md flex flex-col gap-4">
          <div>
            <p className="inter-bold text-gray-text uppercase text-sm">Standar</p>
            <p className="text-4xl poppins-black mt-1">GRATIS</p>
            <p className="inter-regular text-sm text-gray-text mt-2">Coba latihan gratis setiap level</p>
          </div>
          <ul className="flex flex-col gap-2 inter-regular text-sm flex-1">
            <li className="flex items-start gap-2">
              <span className="text-dark-green font-bold">✓</span>
              Coba 2 latihan per level sebagai uji coba
            </li>
          </ul>
          <Link
            href="https://sakuraku.id/login"
            className="w-full text-center py-3 rounded-lg border-2 border-black inter-bold text-sm"
          >
            Mode Gratis
          </Link>
        </div>

        {/* Master */}
        <div className="flex-1 bg-primary-color-sk text-white rounded-2xl p-6 shadow-xl flex flex-col gap-4 relative overflow-hidden">
          <div>
            <p className="inter-bold uppercase text-sm opacity-80">Master</p>
            {currentPrice ? (
              <p className="text-4xl poppins-black mt-1">
                Rp {currentPrice.toLocaleString('id-ID')}
                <span className="text-base inter-regular opacity-80">/bln</span>
              </p>
            ) : (
              <p className="text-4xl poppins-black mt-1">Rp 29.000 - 129.000</p>
            )}
            <p className="inter-regular text-sm mt-2 opacity-90">
              Dapatkan harga spesial ini untuk selamanya. Cukup berlangganan hari ini!
            </p>
          </div>
          <ul className="flex flex-col gap-2 inter-regular text-sm flex-1">
            {features.map((f) => (
              <li key={f.title} className="flex items-start gap-2">
                <span className="font-bold">✓</span>
                <span><strong>{f.title}</strong> — {f.desc}</span>
              </li>
            ))}
          </ul>
          <Link
            href="https://sakuraku.id/login"
            className="w-full text-center py-3 rounded-lg bg-white text-primary-color-sk inter-bold text-sm"
          >
            Beli Paket
          </Link>
          <p className="text-xs opacity-70 inter-regular">
            *Harga ini hanya tersedia sekarang. Jika kamu berlangganan sekarang,
            kamu bisa menikmati harga ini selamanya.
          </p>
        </div>
      </section>

      {/* ── TIER TABLE ── */}
      <section className="w-full max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl poppins-black text-center mb-2">Sistem Harga Bertingkat</h2>
        <p className="inter-regular text-center text-gray-text mb-8 max-w-2xl mx-auto">
          Kami sangat menghargai setiap pelajar yang bergabung. Semakin awal kamu
          berlangganan, semakin baik penawaran yang kamu terima! 🎉
        </p>
        <div className="overflow-x-auto rounded-2xl border border-line-gray">
          <table className="w-full text-sm inter-regular">
            <thead>
              <tr className="bg-primary-color-sk text-white">
                <th className="p-3 text-left poppins-semibold">Tier</th>
                <th className="p-3 text-left poppins-semibold">Harga Perbulan (IDR)</th>
                <th className="p-3 text-left poppins-semibold">Jumlah Pengguna</th>
                <th className="p-3 text-left poppins-semibold">Rentang Peringkat</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((t, i) => (
                <tr key={t.tier} className={i % 2 === 0 ? 'bg-white' : 'bg-light-gray'}>
                  <td className="p-3 poppins-semibold">{t.tier}</td>
                  <td className="p-3">Rp {t.price}</td>
                  <td className="p-3">{t.users}</td>
                  <td className="p-3">{t.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 bg-light-gray rounded-2xl p-6 inter-regular text-sm text-dark-gray-text">
          <p className="poppins-bold mb-2">Mengapa Sistem Ini?</p>
          <p>
            Kami memberikan penghargaan kepada para pendukung setia dan pengguna awal
            dengan harga bulanan yang lebih terjangkau. Semakin awal kamu bergabung,
            semakin besar penghematan kamu — dan kamu akan mempertahankan tingkatan
            hargamu selama tetap berlangganan.
          </p>
          <p className="mt-3 poppins-semibold text-primary-color-sk">
            ✅ Kunci harga kamu sekarang dan nikmati akses penuh ke semua fitur kami
            dengan penawaran terbaik.
          </p>
        </div>
      </section>

    </main>
  );
}
