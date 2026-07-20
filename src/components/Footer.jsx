import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white px-4 sm:px-8 py-4 flex flex-col mbl:flex-row justify-between items-start mbl:items-center gap-4">
      <Link href="/" className="flex items-center">
        <img
          src="/img/logo-footer-sk.svg"
          alt="Sakuraku"
          className="h-[72px]"
        />
      </Link>
      <nav className="flex flex-col mbl:flex-row gap-4 inter-regular text-sm">
        <Link href="/about-us" className="hover:text-light-gray-text">
          Tentang Kami
        </Link>
        <Link href="/terms-of-service" className="hover:text-light-gray-text">
          Syarat &amp; Ketentuan
        </Link>
        <Link href="/privacy-policy" className="hover:text-light-gray-text">
          Kebijakan Privasi
        </Link>
        <Link href="/articles" className="hover:text-light-gray-text">
          Artikel
        </Link>
        <Link href="/faq" className="hover:text-light-gray-text">
          FAQ
        </Link>
        <Link href="/help-center" className="hover:text-light-gray-text">
          Help Center
        </Link>
      </nav>
    </footer>
  );
}
