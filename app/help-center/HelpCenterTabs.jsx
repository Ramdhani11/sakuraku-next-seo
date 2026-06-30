'use client';

import { useState } from 'react';

export default function HelpCenterTabs({ data }) {
  const [activeTab, setActiveTab] = useState(data[0]?.slug ?? '');
  const [openId, setOpenId] = useState(null);

  const activeData = data.find((d) => d.slug === activeTab);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Tab sidebar */}
      <div className="lg:w-64 flex lg:flex-col gap-2">
        {data.map((tab) => (
          <button
            key={tab.slug}
            onClick={() => { setActiveTab(tab.slug); setOpenId(null); }}
            className={`px-4 py-3 rounded-xl text-left inter-bold text-sm cursor-pointer transition-colors ${
              activeTab === tab.slug
                ? 'bg-primary-color-sk text-white'
                : 'bg-white text-dark-gray-text border border-line-gray hover:border-primary-color-sk'
            }`}
          >
            {tab.topic}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1">
        {activeData && (
          <div className="flex flex-col gap-3">
            {activeData.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-line-gray shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left inter-bold text-sm cursor-pointer"
                >
                  <span>{item.question}</span>
                  <span className="text-primary-color-sk text-xl ml-4 flex-shrink-0">
                    {openId === item.id ? '−' : '+'}
                  </span>
                </button>
                {openId === item.id && (
                  <div className="px-6 pb-4 inter-regular text-dark-gray-text text-sm leading-relaxed border-t border-line-gray pt-4">
                    {item.answers.map((a, i) => (
                      <p key={i} className="mb-1">{a}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
