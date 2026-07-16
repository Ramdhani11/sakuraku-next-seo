export const metadata = {
  title: "Harga Berlangganan Sakuraku | Kuasai Bahasa Jepang",
  description:
    "Mulai belajar bahasa Jepang dengan harga terjangkau. Sistem harga bertingkat — semakin awal berlangganan, semakin murah harganya untuk selamanya.",
  alternates: { canonical: "https://sakuraku.id/pricing" },
};

const tiers = [
  { tier: "Tier 1", price: "29.000", users: "2.500", range: "1 - 2.500" },
  { tier: "Tier 2", price: "49.000", users: "2.500", range: "2.501 - 5.000" },
  { tier: "Tier 3", price: "59.000", users: "2.999", range: "5.001 - 7.999" },
  { tier: "Tier 4", price: "79.000", users: "2.000", range: "8.000 - 10.000" },
  { tier: "Tier 5", price: "99.000", users: "4.999", range: "10.001 - 14.999" },
  {
    tier: "Tier 6",
    price: "129.000",
    users: "4.001",
    range: "15.000 - 19.000",
  },
];

const features = [
  {
    title: "Buka Semua Latihan",
    desc: "Dapatkan akses penuh latihan bahasa Jepang — tanpa limitasi!",
  },
  {
    title: "Buka Tes Spesial",
    desc: "Selesaikan semua tes spesial untuk meningkatkan skill kamu di tiap levelnya.",
  },
  {
    title: "Lacak Progres",
    desc: "Makin semangat, dengan melihat perkembangan bahasa Jepang kamu setiap langkah.",
  },
  {
    title: "Latihan Bertahap",
    desc: "Ikuti alur belajar yang jelas dan terstruktur, dari pemula sampai master.",
  },
];

function monthLabel(count) {
  return count === 12 ? "1 Tahun" : `${count} Bulan`;
}

async function getCurrentPrice() {
  try {
    const guestRes = await fetch("https://api-sakuraku.id/api/v1/guest_login", {
      method: "POST",
      next: { revalidate: 3600 },
    });
    const guestToken = guestRes.headers.get("authorization");
    if (!guestToken) return null;

    const priceRes = await fetch(
      "https://api-sakuraku.id/api/v1/customer_eligible_price",
      {
        method: "POST",
        headers: {
          Authorization: guestToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: "",
          bundling_month_counts: [1, 3, 6, 12],
        }),
        next: { revalidate: 3600 },
      },
    );
    const data = await priceRes.json();
    return data?.value ?? null;
  } catch {
    return null;
  }
}

export default async function PricingPage() {
  const priceData = await getCurrentPrice();
  const bundles = priceData?.bundling_prices ?? [];
  const bestMonthCount = bundles.length
    ? Math.max(...bundles.map((b) => b.month_count))
    : null;

  return (
    <main className="relative w-full min-h-screen flex flex-col gap-4 p-4 sm:p-8">
      {/* ── HEADER ── */}
      <section className="w-full text-center py-12">
        <h1 className="text-3xl md:text-4xl poppins-black mb-4">
          Kuasai Bahasa Jepang Secara Terstruktur, Mulai Hari Ini
        </h1>
        <p className="inter-regular text-[16px] max-w-2xl mx-auto text-gray-text">
          Latih bahasa Jepang dengan cara yang menyenangkan dan terjangkau —
          lewat latihan yang membantu kamu berkembang secara bertahap, kapan
          saja, di mana saja!
        </p>
      </section>

      {/* ── FREE TRIAL STRIP ── */}
      <section className="w-full max-w-4xl mx-auto mb-4">
        <div className="w-full bg-white rounded-2xl border-2 border-light-gray p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="inter-bold text-sm uppercase text-gray-text">
              Standar · Gratis
            </p>
            <p className="inter-regular text-sm text-gray-text">
              Coba 2 latihan per level sebagai uji coba, tanpa perlu
              berlangganan.
            </p>
          </div>
          <a
            href="https://sakuraku.id/login"
            className="shrink-0 text-center py-2 px-5 rounded-lg border-2 border-black inter-bold text-sm"
          >
            Mode Gratis
          </a>
        </div>
      </section>

      {/* ── PRICING COMPOSITION (ala Pricing.jsx) ── */}
      <section className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Left: apa yang kamu dapatkan */}
        <div className="w-full md:w-4/12 h-min flex flex-col bg-white p-8 rounded-[12px] shadow-md">
          <p className="inter-bold mb-4 text-primary-color-sk">
            Apa yang kamu dapatkan
          </p>
          {features.map((f) => (
            <div key={f.title} className="w-full flex gap-4 mb-4">
              <div className="flex items-start mt-1 text-dark-green">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <p className="inter-bold">{f.title}</p>
                <p className="inter-regular text-sm text-gray-text">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: kartu harga per bundle */}
        <div className="w-full md:w-8/12 grid grid-cols-1  gap-4">
          {bundles.length ? (
            bundles.map((item) => {
              const isBest = item.month_count === bestMonthCount;
              const hasDiscount = item.base_price > item.eligible_price;
              return (
                <div
                  key={item.month_count}
                  className={`relative rounded-[12px] p-5 flex flex-col ${
                    isBest ? "bg-primary-color-sk text-white" : "bg-white"
                  }`}
                >
                  {isBest && (
                    <span className="absolute top-3 right-3 text-[10px] uppercase inter-bold bg-white text-primary-color-sk px-2 py-1 rounded-full">
                      Paling Hemat
                    </span>
                  )}
                  <p className="poppins-semibold text-lg mb-2">
                    {monthLabel(item.month_count)}
                  </p>

                  {hasDiscount && (
                    <p
                      className={`text-sm inter-bold line-through ${isBest ? "text-white/70" : "text-dark-line-gray"}`}
                    >
                      Rp {item.base_price.toLocaleString("id-ID")}
                    </p>
                  )}
                  <p
                    className={`text-2xl inter-bold ${isBest ? "text-white" : "text-primary-color-sk"}`}
                  >
                    Rp {item.eligible_price.toLocaleString("id-ID")}
                  </p>

                  {hasDiscount && (
                    <p
                      className={`inter-regular text-xs mt-2 ${isBest ? "text-white/80" : "text-gray-text"}`}
                    >
                      *Harga ini hanya tersedia sekarang. Berlangganan sekarang
                      untuk menikmati harga ini selamanya.
                    </p>
                  )}

                  <a
                    href="https://sakuraku.id/login"
                    className={`mt-4 w-full text-center py-2 rounded-lg inter-bold text-sm ${
                      isBest
                        ? "bg-white text-primary-color-sk"
                        : "bg-primary-color-sk text-white"
                    }`}
                  >
                    Pilih Paket
                  </a>
                </div>
              );
            })
          ) : (
            <div className="col-span-full bg-white rounded-[12px] p-6 text-center inter-regular text-gray-text">
              Harga sedang tidak tersedia, silakan cek kembali nanti.
            </div>
          )}
        </div>
      </section>

      {/* ── TIER TABLE ── */}
      <section className="w-full hidden max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl poppins-black text-center mb-2">
          Sistem Harga Bertingkat
        </h2>
        <p className="inter-regular text-center text-gray-text mb-8 max-w-2xl mx-auto">
          Kami sangat menghargai setiap pelajar yang bergabung. Semakin awal
          kamu berlangganan, semakin baik penawaran yang kamu terima! 🎉
        </p>
        <div className="overflow-x-auto rounded-2xl border border-line-gray">
          <table className="w-full text-sm inter-regular">
            <thead>
              <tr className="bg-primary-color-sk text-white">
                <th className="p-3 text-left poppins-semibold">Tier</th>
                <th className="p-3 text-left poppins-semibold">
                  Harga Perbulan (IDR)
                </th>
                <th className="p-3 text-left poppins-semibold">
                  Jumlah Pengguna
                </th>
                <th className="p-3 text-left poppins-semibold">
                  Rentang Peringkat
                </th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((t, i) => (
                <tr
                  key={t.tier}
                  className={i % 2 === 0 ? "bg-white" : "bg-light-gray"}
                >
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
            Kami memberikan penghargaan kepada para pendukung setia dan pengguna
            awal dengan harga bulanan yang lebih terjangkau. Semakin awal kamu
            bergabung, semakin besar penghematan kamu — dan kamu akan
            mempertahankan tingkatan hargamu selama tetap berlangganan.
          </p>
          <p className="mt-3 poppins-semibold text-primary-color-sk">
            ✅ Kunci harga kamu sekarang dan nikmati akses penuh ke semua fitur
            kami dengan penawaran terbaik.
          </p>
        </div>
      </section>
    </main>
  );
}
