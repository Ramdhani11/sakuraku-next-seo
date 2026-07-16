"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  return (
    <header className="w-full h-[64px] bg-white fixed top-0 z-[999] flex justify-between items-center border-b border-light-gray-text shadow-lg px-6">
      <a href="/" className="flex items-center min-w-max">
        <img src="/img/sakuraku-2.svg" alt="Sakuraku" className="h-[56px]" />
      </a>
      <nav className="flex items-center gap-4 text-sm">
        <Link
          href="/pricing"
          className="flex items-center gap-2 px-4 py-1 rounded-lg bg-black text-white inter-bold"
        >
          <img src="/img/star.svg" alt="" className="w-4 h-4" />
          Subscribe
        </Link>
        <a
          href="https://sakuraku.id/login"
          className="inter-bold text-gray-700 hover:text-primary-color-sk"
        >
          Login
        </a>
      </nav>
    </header>
  );
}
