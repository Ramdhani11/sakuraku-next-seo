"use client";

import { useRef, useState, useMemo, useEffect } from "react";

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

function processHtmlWithFurigana(html, vocabList) {
  if (typeof window === "undefined" || !html) return html;
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent;
      text = text.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
      text = text.replace(/(^|[^*])\*(?!\*)([^*]+?)\*(?!\*)/g, "$1<i>$2</i>");
      const replaced = tokenizeWithFurigana(text, vocabList);
      if (replaced !== text) {
        const span = document.createElement("span");
        span.innerHTML = replaced;
        node.replaceWith(...Array.from(span.childNodes));
      }
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === "RUBY" || node.closest?.("ruby")) return;
      const children = Array.from(node.childNodes);
      for (const child of children) walk(child);
    }
  }

  walk(wrapper);
  return wrapper.innerHTML;
}

function tokenizeArticleContent(html) {
  if (typeof window === "undefined" || !html) return { header: "", blocks: [] };
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `<temp>${html}</temp>`;
  const article = wrapper.querySelector("temp") || wrapper;
  const blocks = [];
  let header = "";
  let currentTextBlock = "";

  Array.from(article.childNodes).forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === "H1") {
        header = node.outerHTML;
        return;
      }
      if (node.tagName === "FIGURE") {
        if (currentTextBlock.trim()) {
          blocks.push({ type: "text", content: currentTextBlock });
          currentTextBlock = "";
        }
        const img = node.querySelector("img");
        if (img)
          blocks.push({
            type: "image",
            src: img.getAttribute("src"),
            alt: img.getAttribute("alt") || "",
          });
        return;
      }
      currentTextBlock += node.outerHTML;
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      currentTextBlock += node.textContent;
    }
  });

  if (currentTextBlock.trim())
    blocks.push({ type: "text", content: currentTextBlock });
  return { header, blocks };
}

export default function ArticleContent({ article }) {
  const articleRef = useRef();
  const [hoveredWord, setHoveredWord] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Build vocab map from sentences
  const sortedVocab = useMemo(() => {
    const vocabMap = new Map();
    (article?.sentences ?? []).forEach((s) => {
      (s.vocab_translation ?? []).forEach((v) => {
        if (!vocabMap.has(v.word)) vocabMap.set(v.word, v);
      });
    });
    return [...vocabMap.values()].sort((a, b) => b.word.length - a.word.length);
  }, [article]);

  // Parse and process HTML blocks (client-side only)
  const { header, processedBlocks } = useMemo(() => {
    if (!article?.content) return { header: "", processedBlocks: [] };
    const { header, blocks } = tokenizeArticleContent(article.content);
    const processedBlocks = blocks.map((block) =>
      block.type === "text"
        ? {
            type: "text",
            content: processHtmlWithFurigana(block.content, sortedVocab),
          }
        : block,
    );
    return { header, processedBlocks };
  }, [article, sortedVocab]);

  // Hover detection
  useEffect(() => {
    const container = articleRef.current;
    if (!container) return;

    const handleMouseEnter = (e) => {
      if (!(e.target instanceof Element)) return;
      const target = e.target.closest(".hoverable-word");
      if (target) {
        const word = target.getAttribute("data-word");
        const rect = target.getBoundingClientRect();
        setHoveredWord(word);
        setTooltipPos({
          x: rect.left + window.scrollX + rect.width / 2,
          y: rect.top + window.scrollY + 32,
        });
      }
    };
    const handleMouseLeave = () => setHoveredWord(null);

    container.addEventListener("mouseenter", handleMouseEnter, true);
    container.addEventListener("mouseleave", handleMouseLeave, true);
    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter, true);
      container.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, []);

  // Find translation for hovered word
  const matchedWord = useMemo(() => {
    if (!hoveredWord) return null;
    for (const s of article?.sentences ?? []) {
      const match = s.vocab_translation?.find((v) => v.word === hoveredWord);
      if (match) return match;
    }
    return null;
  }, [hoveredWord, article]);

  const formattedDate = article?.created_at
    ? new Date(article.created_at).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <>
      {/* Title */}
      {header && (
        <div
          className="w-full text-center inter-bold mt-8 text-2xl"
          dangerouslySetInnerHTML={{ __html: header }}
        />
      )}
      {!header && article?.title && (
        <h1 className="w-full hidden text-center inter-bold mt-8 text-2xl">
          {article.title}
        </h1>
      )}

      {/* Article body */}
      <div className="flex flex-wrap gap-4 text-[20px] my-8">
        <div ref={articleRef} className="w-full">
          {processedBlocks.map((block, i) => (
            <div key={i}>
              {block.type === "image" && (
                <figure className="my-6">
                  <img
                    src={block.src}
                    alt={block.alt}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </figure>
              )}
              {block.type === "text" && (
                <div
                  dangerouslySetInnerHTML={{ __html: block.content }}
                  className="text-[14px] sm:text-[20px] leading-relaxed"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Furigana tooltip */}
      {hoveredWord && matchedWord && (
        <div
          className="fixed bg-white text-black text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none z-50 border border-light-gray"
          style={{
            top: `${tooltipPos.y}px`,
            left: `${tooltipPos.x}px`,
            transform: "translateX(-50%)",
          }}
        >
          <div>
            <span className="inter-bold">Kata:</span> {matchedWord.word}
          </div>
          <div>
            <span className="inter-bold">Baca:</span> {matchedWord.reading}
          </div>
          <div>
            <span className="inter-bold">Arti:</span> {matchedWord.translation}
          </div>
        </div>
      )}

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
    </>
  );
}
