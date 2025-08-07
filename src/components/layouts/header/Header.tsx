"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogout } from "@/services/auth.service";
import toast from "react-hot-toast";

// Utility to check if user is logged in based on cookie
const isUserLoggedIn = () => {
  if (typeof window === "undefined") return false;
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="));
  return !!token;
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const onError = (err: any) => {
    const message = err?.response?.data?.message ?? "Logout failed";
    toast.error(message);
  };

  const onSuccess = () => {
    toast.success("Logged out successfully");
    router.push("/auth/login");
    setIsLoggedIn(false);
  };

  const { mutate: logoutMutate, isPending: isLogoutPending } = useLogout({
    onError,
    onSuccess,
  });

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Unlisted Shares List", href: "/unlisted-shares" },
    { name: "Process", href: "/how-to-buy-unlisted-shares" },
    { name: "FAQ", href: "/faq" },
    { name: "In Media", href: "/in-media" },
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

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <Link href="/auth/login">
                <button className="border border-white text-white px-4 py-1 rounded hover:bg-white hover:text-black transition cursor-pointer">
                  Login
                </button>
              </Link>
              <Link href="/auth/signup">
                <button className="bg-green-600 px-4 py-1 rounded text-white hover:bg-green-700 transition cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={() => logoutMutate({})}
              disabled={isLogoutPending}
              className="bg-green-600 px-4 py-1 rounded text-white hover:bg-green-700 transition cursor-pointer disabled:opacity-50"
            >
              {isLogoutPending ? "Logging out..." : "Logout"}
            </button>
          )}

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
            {!isLoggedIn ? (
              <>
                <Link href="/auth/login" className="w-full">
                  <button className="w-full border border-white text-white py-2 rounded hover:bg-white hover:text-black transition">
                    Login
                  </button>
                </Link>
                <Link href="/auth/signup" className="w-full">
                  <button className="w-full bg-blue-600 py-2 rounded text-white hover:bg-blue-500 transition">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  logoutMutate({});
                  setIsOpen(false);
                }}
                className="w-full bg-green-600 py-2 rounded text-white hover:bg-green-500 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
