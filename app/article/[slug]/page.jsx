import ArticleContent from "./ArticleContent";
import Link from "next/link";

const BASE =
  process.env.NEXT_PUBLIC_API_URL_BASE ?? "https://api.sakuraku.id/api/v1/";

// Wajib untuk output: export — hanya slug dari generateStaticParams yang valid
export const dynamicParams = false;

function titleToSlug(title) {
  return title.toLowerCase().replace(/:/g, "").replace(/ /g, "-");
}

async function getGuestToken() {
  try {
    const res = await fetch(`${BASE}guest_login`, {
      method: "POST",
      cache: "no-store",
    });
    return res.headers.get("authorization");
  } catch {
    return null;
  }
}

async function getAllArticles() {
  try {
    const res = await fetch(`${BASE}articles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tags: [], from_date: "", to_date: "" }),
      cache: "no-store",
    });
    const data = await res.json();
    return data?.value ?? [];
  } catch {
    return [];
  }
}

// generateStaticParams dipanggil saat build.
// Jika API tidak bisa diakses, kembalikan placeholder agar build tidak crash.
// Saat deploy ke server yang bisa akses API, semua artikel akan ter-generate.
export async function generateStaticParams() {
  try {
    const articles = await getAllArticles();
    const filtered = articles.filter(
      (a) => !a.sentences || a.sentences.length < 1,
    );

    // console.log("[generateStaticParams] article:", articles);
    // console.log("[generateStaticParams] filtered:", filtered.length);

    if (filtered.length === 0) {
      return [{ slug: "_placeholder" }];
    }

    console.log(
      "[generateStaticParams] filtered:",
      filtered.map((a) => ({ slug: titleToSlug(a.slug) })),
    );

    return filtered.map((a) => ({ slug: titleToSlug(a.slug) }));
  } catch (e) {
    console.error("generateStaticParams error:", e);
    return [{ slug: "_placeholder" }];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (slug === "_placeholder") return { title: "Artikel | Sakuraku" };

  try {
    const articles = await getAllArticles();

    const article = articles.find((a) => titleToSlug(a.title) === slug);
    const title = article?.title ?? slug;

    return {
      title: `${title} | Artikel Sakuraku`,
      description: `Baca artikel bahasa Jepang "${title}" di Sakuraku dengan fitur tooltip furigana.`,
      alternates: { canonical: `https://sakuraku.id/article/${slug}` },
    };
  } catch {
    return { title: "Artikel | Sakuraku" };
  }
}

async function getArticleBySlug(slug) {
  try {
    const articles = await getAllArticles();

    return articles.find((a) => titleToSlug(a.slug) === slug) ?? null;
  } catch {
    return null;
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;

  console.log(slug);

  // Placeholder page — tidak ditampilkan ke user
  if (slug === "_placeholder") {
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

  const article = await getArticleBySlug(slug);

  if (!article) {
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

  return (
    <main className="w-full p-[10px] sm:p-6 bg-white min-h-screen">
      <div className="article_content  w-full sm:w-[80%] max-w-[640px] mx-auto roboto-regular">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 bg-black text-white rounded-lg px-4 py-2 inter-bold text-sm mb-8"
        >
          ← Kembali
        </Link>
        <ArticleContent article={article} />
      </div>
    </main>
  );
}
