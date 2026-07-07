// lib/furigana.js — versi SERVER-SAFE dari processHtmlWithFurigana.
// Tidak pakai document/DOM sama sekali, jadi bisa jalan saat `next build`
// dan hasilnya masuk ke file .html statis (penting untuk SEO).

export function buildVocabList(article) {
  const map = new Map();
  (article?.sentences ?? []).forEach((s) => {
    (s.vocab_translation ?? []).forEach((v) => {
      if (v?.word && !map.has(v.word)) {
        map.set(v.word, {
          word: v.word,
          reading: v.reading ?? "",
          translation: v.translation ?? "",
        });
      }
    });
  });
  // Kata terpanjang dulu, agar 日本語 tidak "dimakan" oleh 日本
  return [...map.values()].sort((a, b) => b.word.length - a.word.length);
}

function applyInlineMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/(^|[^*])\*(?!\*)([^*]+?)\*(?!\*)/g, "$1<i>$2</i>");
}

// Sama persis dengan versi client kamu — memang sudah string murni
function tokenizeWithFurigana(text, vocabList) {
  let result = "";
  let i = 0;
  while (i < text.length) {
    let matched = null;
    for (const vocab of vocabList) {
      if (text.startsWith(vocab.word, i)) {
        matched = vocab;
        break;
      }
    }
    if (matched) {
      result += `<ruby class="hoverable-word" data-word="${matched.word}">${matched.word}</ruby>`;
      i += matched.word.length;
    } else {
      result += text[i];
      i++;
    }
  }
  return result;
}

// Pengganti DOM tree-walk: pecah HTML jadi [tag, teks, tag, teks, ...]
// dengan regex, lalu proses hanya bagian teks. Bagian di dalam <ruby>
// dilewati, sama seperti guard `closest("ruby")` di versi lama.
export function processHtmlWithFurigana(html, vocabList) {
  if (!html) return "";
  let rubyDepth = 0;

  return html
    .split(/(<[^>]*>)/g)
    .map((part) => {
      if (part.startsWith("<")) {
        if (/^<ruby\b/i.test(part)) rubyDepth++;
        else if (/^<\/ruby\s*>/i.test(part))
          rubyDepth = Math.max(0, rubyDepth - 1);
        return part; // tag dilewatkan apa adanya
      }
      if (rubyDepth > 0 || !part) return part;
      return tokenizeWithFurigana(applyInlineMarkdown(part), vocabList);
    })
    .join("");
}
