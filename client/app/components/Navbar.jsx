import Link from "next/link";

export default function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200">
      <Link className="flex items-center justify-center" href="/">
        <span className="text-2xl font-bold text-green-600">GlobalHealth</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:text-orange-500 transition-colors" href="/how-it-works">
          How It Works
        </Link>
        <Link className="text-sm font-medium hover:text-orange-500 transition-colors" href="/services">
          Services
        </Link>
        <Link className="text-sm font-medium hover:text-orange-500 transition-colors" href="/about">
          About Us
        </Link>
        <Link className="text-sm font-medium hover:text-orange-500 transition-colors" href="/contact">
          Contact
        </Link>
      </nav>
    </header>
  );
}
