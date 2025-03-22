"use client";
import Image from "next/image";
import * as React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#1e3a8a] to-[#60a5fa] text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/justlogoo.png"
            alt="LOGO"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 font-sans font-medium">
            <li>
              <Link href="/" className="hover:text-[#eab308] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-[#eab308] transition-colors">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-[#eab308] transition-colors">
                News Room
              </Link>
            </li>
            <li>
              <Link href="/features" className="hover:text-[#eab308] transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#eab308] transition-colors">
                Contact us
              </Link>
            </li>
          </ul>

          <Link href="/dashboard">
            <Button className="bg-[#eab308] hover:bg-[#ca8a04] text-[#1e3a8a] font-bold px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all">
              Free Trial
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-6 bg-gradient-to-b from-[#1e3a8a] to-[#60a5fa] text-white">
          <nav>
            <ul className="flex flex-col gap-4 font-sans">
              <li>
                <Link
                  href="/"
                  className="block py-2 hover:text-[#eab308] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="block py-2 hover:text-[#eab308] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="block py-2 hover:text-[#eab308] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  News Room
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="block py-2 hover:text-[#eab308] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block py-2 hover:text-[#eab308] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact us
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button className="bg-[#eab308] hover:bg-[#ca8a04] text-[#1e3a8a] font-bold w-full py-2 rounded-full shadow-md hover:shadow-lg transition-all">
                    Free Trial
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default NavBar;