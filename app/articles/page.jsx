// app/articles/page.jsx
// PENTING: pakai getAllArticles + getSlug yang SAMA dengan detail page.
// Link yang dihasilkan di sini dijamin identik dengan hasil
// generateStaticParams, sehingga error "missing param" tidak terjadi.

import Link from "next/link";
import { getAllArticles, getSlug } from "../article/[slug]/ArticleContent";

export const metadata = {
  title: "Artikel Bahasa Jepang | Sakuraku",
  description:
    "Latihan membaca artikel bahasa Jepang dengan tooltip furigana. Baca artikel dengan mudah, tanpa harus buka kamus terpisah.",
  alternates: { canonical: "https://sakuraku.id/articles" },
};

const levelColors = {
  N5: "bg-green-100 text-green-800",
  N4: "bg-blue-100 text-blue-800",
  N3: "bg-yellow-100 text-yellow-800",
  N2: "bg-orange-100 text-orange-800",
  N1: "bg-red-100 text-red-800",
};

export default async function ArticlesPage() {
  const all = await getAllArticles();

  // HARUS sama persis dengan filter di generateStaticParams detail page
  const articles = all.filter((a) => !a.sentences || a.sentences.length < 1);

  return (
    <main className="w-full max-w-5xl mx-auto p-4 sm:p-8 py-12">
      <h1 className="text-3xl poppins-black mb-2">Artikel Bahasa Jepang</h1>
      <p className="inter-regular text-gray-text mb-8">
        Latihan membaca artikel dengan tooltip furigana — arahkan kursor ke kata
        untuk melihat cara baca dan artinya.
      </p>

      {articles.length === 0 ? (
        <div className="text-center py-24 inter-regular text-gray-text">
          Belum ada artikel tersedia.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => {
            const slug = getSlug(article); // ← satu-satunya sumber slug
            return (
              <Link
                key={slug}
                href={`/article/${slug}`}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow border border-light-gray flex flex-col gap-3"
              >
                {article.level && (
                  <span
                    className={`self-start text-xs px-2 py-1 rounded-full poppins-semibold ${
                      levelColors[article.level] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {article.level}
                  </span>
                )}
                <h2 className="poppins-bold text-[16px] leading-snug line-clamp-3">
                  {article.title ?? slug}
                </h2>
                {article.created_at && (
                  <p className="text-xs text-gray-text inter-regular mt-auto">
                    {new Date(article.created_at).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
