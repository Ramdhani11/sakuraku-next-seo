'use client';

import { useState } from 'react';

export default function FAQAccordion({ items }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl border border-line-gray overflow-hidden shadow-sm"
        >
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full flex justify-between items-center px-6 py-4 text-left inter-bold cursor-pointer"
          >
            <span>{item.question}</span>
            <span className="text-primary-color-sk text-xl ml-4 flex-shrink-0">
              {openId === item.id ? '−' : '+'}
            </span>
          </button>
          {openId === item.id && (
            <div className="px-6 pb-4 inter-regular text-dark-gray-text text-sm leading-relaxed border-t border-line-gray pt-4">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
