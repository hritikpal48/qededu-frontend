"use client";

import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Unlisted Shares List", href: "/unlisted-shares" },
    { name: "Process", href: "/process" },
    { name: "FAQ", href: "/faq" },
    { name: "In Media", href: "/media" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <>
      <nav className="bg-black text-white px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-white font-bold text-2xl flex items-center">
            <span className="text-blue-700 text-3xl font-extrabold">Q</span>
            <span className="text-yellow-400 text-3xl font-extrabold">E</span>
            <span className="text-green-400 text-3xl font-extrabold">D</span>
            <span className="ml-2 text-white">Edu</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className="hover:text-green-600 uppercase text-sm font-semibold"
            >
              {name}
            </Link>
          ))}
        </div>

        {/* Right Side: Login & Signup */}
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <button className="border border-white text-white px-4 py-1 rounded hover:bg-white hover:text-black transition cursor-pointer">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-green-600 px-4 py-1 rounded text-white hover:bg-green-700 transition cursor-pointer">
              Sign Up
            </button>
          </Link>

          {/* Hamburger for Mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center space-y-1"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className="w-6 h-0.5 bg-blue-500" />
            <span className="w-6 h-0.5 bg-blue-500" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black text-white md:hidden flex flex-col space-y-4 p-4 z-50">
          {navItems.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className="hover:text-blue-500 uppercase text-sm font-semibold"
              onClick={() => setIsOpen(false)}
            >
              {name}
            </Link>
          ))}
          <div className="flex space-x-4 mt-4">
            <Link href="/login" className="w-full">
              <button className="w-full border border-white text-white py-2 rounded hover:bg-white hover:text-black transition">
                Login
              </button>
            </Link>
            <Link href="/signup" className="w-full">
              <button className="w-full bg-blue-600 py-2 rounded text-white hover:bg-blue-500 transition">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
