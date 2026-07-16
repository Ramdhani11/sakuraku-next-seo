// lib/articles.js — server-only helpers untuk data artikel

// const BASE =
//   process.env.NEXT_PUBLIC_API_URL_BASE ?? "https://api-sakuraku.id/api/v1/";

const BASE = "https://api.sakuraku.id/api/v1/";

export function titleToSlug(title = "") {
  return title.toLowerCase().replace(/:/g, "").replace(/ /g, "-");
}

// SATU sumber kebenaran untuk slug.
// Di kode lama: generateStaticParams pakai titleToSlug(a.slug),
// tapi generateMetadata pakai titleToSlug(a.title) → bisa mismatch.
export function getSlug(article) {
  return titleToSlug(article?.slug ?? article?.title ?? "");
}

// Memo di level module: selama satu proses `next build`,
// API /articles hanya di-hit SEKALI, bukan 2x per slug + 1x untuk params.
// (fetch POST tidak di-cache otomatis oleh Next.js)
let _articlesPromise = null;

export function getAllArticles() {
  if (!_articlesPromise) {
    _articlesPromise = (async () => {
      try {
        const res = await fetch(`${BASE}articles`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tags: [], from_date: "", to_date: "" }),
        });
        const data = await res.json();
        return data?.value ?? [];
      } catch (e) {
        console.error("[getAllArticles] error:", e);
        return [];
      }
    })();
  }
  return _articlesPromise;
}

export async function getArticleBySlug(slug) {
  const articles = await getAllArticles();
  return articles.find((a) => getSlug(a) === slug) ?? null;
}

// Excerpt untuk meta description: strip tag HTML, ambil ±155 karakter
export function excerptFromHtml(html, fallback = "") {
  if (!html) return fallback;
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.slice(0, 155) || fallback;
}
