// app/article/[slug]/page.jsx — Server Component
// Semua konten (judul, body + <ruby> furigana, tags, tanggal) dirender
// SAAT BUILD dan masuk ke .html statis. Client JS hanya untuk tooltip.

import Link from "next/link";
import {
  excerptFromHtml,
  getAllArticles,
  getArticleBySlug,
  getSlug,
} from "./ArticleContent";
import ArticleTooltip from "./ArticleTooltip";
import { buildVocabList, processHtmlWithFurigana } from "./Furigana";

const SITE_URL = "https://test.sakuraku.id";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const articles = await getAllArticles();

    const filtered = articles.filter(
      (a) => !a.sentences || a.sentences.length < 1,
    );

    if (filtered.length === 0) return [{ slug: "_placeholder" }];

    return filtered.map((a) => ({ slug: getSlug(a) }));
  } catch (e) {
    console.error("generateStaticParams error:", e);
    return [{ slug: "_placeholder" }];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (slug === "_placeholder") {
    // Jangan sampai halaman placeholder ikut terindeks Google
    return { title: "Artikel | Sakuraku", robots: { index: false } };
  }

  const article = await getArticleBySlug(slug);
  const title = article?.title ?? slug;
  const description = excerptFromHtml(
    article?.content,
    `Baca artikel bahasa Jepang "${title}" di Sakuraku dengan fitur tooltip furigana.`,
  );
  const url = `${SITE_URL}/article/${slug}`;

  return {
    title: `${title} | Artikel Sakuraku`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Sakuraku",
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
  };
}

function NotFound() {
  return (
    <main className="w-full flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="poppins-bold text-xl">Artikel tidak ditemukan.</p>
      <Link
        href="/articles"
        className="text-primary-indigo inter-bold underline"
      >
        ← Kembali ke daftar artikel
      </Link>
    </main>
  );
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;

  if (slug === "_placeholder") return <NotFound />;

  const article = await getArticleBySlug(slug);
  if (!article) return <NotFound />;

  // === Semua pemrosesan terjadi DI SINI, di server, saat build ===
  const vocabList = buildVocabList(article);
  const processedHtml = processHtmlWithFurigana(article.content, vocabList);

  // Kirim vocab sebagai plain object (serializable) ke client component
  const vocabMap = Object.fromEntries(vocabList.map((v) => [v.word, v]));

  // Fallback <h1> jika konten tidak punya heading sendiri
  const hasH1 = /<h1[\s>]/i.test(article.content ?? "");

  const formattedDate = article?.created_at
    ? new Date(article.created_at).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: "2025-11-15T18:09:40+07:00",
    inLanguage: "id",
    url: `${SITE_URL}/article/${slug}`,
    publisher: { "@type": "Organization", name: "Sakuraku" },
  };

  return (
    <main className="w-full p-[10px] sm:p-6 bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="article_content w-full sm:w-[80%] max-w-[640px] mx-auto roboto-regular">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 bg-black text-white rounded-lg px-4 py-2 inter-bold text-sm mb-8"
        >
          ← Kembali
        </Link>

        {!hasH1 && (
          <h1 className="w-full text-center inter-bold mt-8 text-2xl">
            {article.title}
          </h1>
        )}

        {/* Body artikel: HTML sudah jadi, ber-<ruby>, dirender server.
            ArticleTooltip hanya membungkus untuk interaksi hover. */}
        <ArticleTooltip vocab={vocabMap}>
          <div
            className="article-body text-[14px] sm:text-[20px] leading-relaxed my-8"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />
        </ArticleTooltip>

        {/* Tags */}
        {article?.tags?.length > 0 && (
          <div className="w-full mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 capitalize rounded-lg bg-primary-color-sk text-white text-sm inter-regular"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Date */}
        {formattedDate && (
          <div className="mt-4 text-gray-text inter-regular text-sm">
            {formattedDate}
          </div>
        )}
      </div>
    </main>
  );
}
