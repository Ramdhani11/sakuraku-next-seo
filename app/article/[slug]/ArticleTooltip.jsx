"use client";

// ArticleTooltip.jsx — pengganti ArticleContent.
// PENTING: komponen ini TIDAK memproses konten artikel sama sekali.
// Konten sudah jadi HTML statis dari server dan masuk lewat {children},
// sehingga tetap ada di file .html hasil build (SEO-friendly).
// Tugas komponen ini cuma satu: tooltip saat hover kata ber-furigana.

import { useState } from "react";

export default function ArticleTooltip({ vocab, children }) {
  const [hovered, setHovered] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseOver = (e) => {
    const target =
      e.target instanceof Element ? e.target.closest(".hoverable-word") : null;

    if (!target) {
      setHovered(null);
      return;
    }

    const word = target.getAttribute("data-word");
    const match = vocab?.[word];
    if (!match) return;

    const rect = target.getBoundingClientRect();
    setHovered(match);
    setPos({
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY + 32,
    });
  };

  return (
    <>
      <div onMouseOver={handleMouseOver} onMouseLeave={() => setHovered(null)}>
        {children}
      </div>

      {hovered && (
        <div
          className="fixed bg-white text-black text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none z-50 border border-light-gray"
          style={{
            top: `${pos.y}px`,
            left: `${pos.x}px`,
            transform: "translateX(-50%)",
          }}
        >
          <div>
            <span className="inter-bold">Kata:</span> {hovered.word}
          </div>
          <div>
            <span className="inter-bold">Baca:</span> {hovered.reading}
          </div>
          <div>
            <span className="inter-bold">Arti:</span> {hovered.translation}
          </div>
        </div>
      )}
    </>
  );
}
