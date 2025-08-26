"use client";

import useCookie from "@/hooks/useCookies";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogout } from "@/services/auth.service";
import toast from "react-hot-toast";
import { RiAccountCircleLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const { value: token, deleteCookie } = useCookie("access_token");
  const isLoggedIn = !!token;

  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const onError = (err: any) => {
    const message = err?.response?.data?.message ?? "Logout failed";
    toast.error(message);
  };

  const onSuccess = () => {
    deleteCookie(); // ✅ Remove access_token cookie
    toast.success("Logged out successfully");
    router.push("/auth/login");
  };

  const { mutate: logoutMutate, isPending: isLogoutPending } = useLogout({
    onError,
    onSuccess,
  });

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
            <span className="text-blue-700 text-3xl font-bold">Q</span>
            <span className="text-yellow-400 text-3xl font-bold">E</span>
            <span className="text-green-400 text-3xl font-bold">D</span>
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

        {/* Right Side (Desktop) */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            // If not logged in → show Login + Sign Up
            <>
              <Link href="/auth/login">
                <button className="border border-white text-white px-4 py-1 rounded hover:bg-white hover:text-black transition cursor-pointer text-[14px] md:text-[16px]">
                  Login
                </button>
              </Link>
              <Link href="/auth/signup">
                <button className="bg-green-600 px-4 py-1 rounded text-white hover:bg-green-700 transition cursor-pointer text-[14px] md:text-[16px]">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            // If logged in → show account dropdown
            <div
              ref={dropdownRef}
              className="relative inline-block text-center pt-2"
            >
              <button onClick={() => setOpen(!open)} className="cursor-pointer">
                <RiAccountCircleLine className="w-8 h-8 text-white" />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3">
                  <ul className="flex flex-col text-gray-700">
                    {/* Profile */}
                    <li>
                      <Link
                        href="/user/dashboard"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-green-700 hover:text-white rounded-lg transition"
                        onClick={() => setOpen(false)}
                      >
                        <FaUser /> Profile
                      </Link>
                    </li>

                    {/* Logout */}
                    <li>
                      <button
                        onClick={() => {
                          logoutMutate({});
                          setOpen(false);
                        }}
                        disabled={isLogoutPending}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-green-700 hover:text-white rounded-lg transition disabled:opacity-50"
                      >
                        <FiLogOut />
                        {isLogoutPending ? "Logging out..." : "Logout"}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Hamburger Icon for Mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center space-y-1"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className="w-6 h-0.5 bg-white" />
            <span className="w-6 h-0.5 bg-white" />
            <span className="w-6 h-0.5 bg-white" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-15 left-0 w-full bg-black text-white md:hidden flex flex-col space-y-4 p-4 z-50">
          {navItems.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className="hover:text-green-500 uppercase text-sm font-semibold"
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
                  <button className="w-full bg-green-600 py-2 rounded text-white hover:bg-green-500 transition">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/user/dashboard" className="w-full">
                  <button className="w-full border border-white text-white py-2 rounded hover:bg-white hover:text-black transition">
                    Profile
                  </button>
                </Link>
                <button
                  onClick={() => {
                    logoutMutate({});
                    setIsOpen(false);
                  }}
                  className="w-full bg-green-600 py-2 rounded text-white hover:bg-green-500 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
