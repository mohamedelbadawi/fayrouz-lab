"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, User } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "الفحوصات", href: "/tests" },
    { name: "المقالات", href: "/articles" },
    { name: "عن المختبر", href: "/about" },
    { name: "تواصل معنا", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-primary-dark-green font-tajawal font-bold text-2xl flex flex-col leading-none">
            <span>مختبر</span>
            <span>الفيروز</span>
          </div>
          <div className="text-sm text-gray-500 font-cairo">للتحاليل الطبية</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-tajawal font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`transition-colors relative py-2 ${
                isActive(link.href) 
                  ? "text-primary-dark-green font-bold" 
                  : "hover:text-primary-light-green"
              }`}
            >
              {link.name}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-dark-green rounded-full shadow-sm" />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-primary-dark-green transition-colors" 
            aria-label="القائمة"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 absolute w-full shadow-lg">
          <nav className="flex flex-col gap-2 px-4 font-tajawal font-medium text-gray-700">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`transition-colors py-3 px-4 rounded-xl ${
                  isActive(link.href) 
                    ? "bg-secondary-soft-green text-primary-dark-green font-bold" 
                    : "hover:bg-gray-50 hover:text-primary-light-green"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
