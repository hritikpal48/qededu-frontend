"use client";

import Image from "@/components/ui/Image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaTelegramPlane,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import appstore from "../../../../public/images/app-store-apple.png";
import playstore from "../../../../public/images/google-store.png";
import whatsapp from "../../../../public/images/whats.webp";

// Define menu links as objects
const quickLinks = [
  { name: "Off Market Annexure", url: "/off-market-annexure" },
  { name: "PAN of Unlisted Shares", url: "/pan-unlisted-shares" },
  { name: "SEBI Guidelines", url: "/sebi-guidelines" },
  { name: "Frequently Asked Questions", url: "/faqs" },
  { name: "Knowledge Center", url: "/knowledge-center" },
  { name: "Blog", url: "/blog" },
];

const unlistedZoneLinks = [
  { name: "About Us", url: "/about-us" },
  { name: "Contact Us", url: "/contact-us" },
  { name: "Privacy Policy", url: "/privacy-policy" },
  { name: "Terms of Use", url: "/terms" },
  { name: "Disclaimer", url: "/disclaimer" },
  { name: "Banking Alert", url: "/banking-alert", badge: true },
];

const socialIcons = [
  { icon: FaFacebookF, url: "#" },
  { icon: FaTwitter, url: "#" },
  { icon: FaLinkedinIn, url: "#" },
  { icon: FaTelegramPlane, url: "#" },
  { icon: FaInstagram, url: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-[#000] text-white py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand & Apps */}
        <div>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 pb-3">
            <div className="text-white font-bold text-2xl flex items-center">
              <span className="text-blue-700 text-3xl font-extrabold">Q</span>
              <span className="text-yellow-400 text-3xl font-extrabold">E</span>
              <span className="text-green-400 text-3xl font-extrabold">D</span>
              <span className="ml-2 text-white">Edu</span>
            </div>
          </Link>
          <p className="text-sm mb-4">
            India’s No.1 Platform for Buying and Selling Unlisted Shares.
          </p>

          <div className="flex gap-2 mb-4 flex-wrap">
             <Link href="/"><Image src={appstore} alt="App Store" width={140} height={60} /></Link>
             <Link href="/"><Image src={playstore} alt="Google Play" width={140} height={60} /></Link>
          </div>

          <Link href="/">
            <Image
              src={whatsapp}
              alt="Join WhatsApp Channel"
              width={300}
              height={70}
              className="rounded-md w-full max-w-xs"
            />
          </Link>
        </div>

        {/* Unlisted Zone Info */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Unlisted Zone</h4>
          <ul className="space-y-2 text-sm">
            {unlistedZoneLinks.map((link) => (
              <li key={link.name} className="flex items-center gap-2">
                <Link
                  href={link.url}
                  className="hover:text-[#00e676] transition"
                >
                  {link.name}
                </Link>
                {link.badge && (
                  <span className="bg-green-500 text-xs px-1.5 py-0.5 rounded text-white">
                    New
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.url}
                  className="hover:text-[#00e676] transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Our Office</h4>
          <div className="flex items-start gap-2 mb-3 text-sm">
            <FaMapMarkerAlt className="mt-1" />
            <p>SCO-44, Sector 5-MDC, Panchkula, Haryana</p>
          </div>
          <div className="flex items-center gap-2 mb-3 text-sm">
            <FaEnvelope />
            <span>sales@qededu.com</span>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4 text-white text-lg">
            {socialIcons.map(({ icon: Icon, url }, idx) => (
              <Link
                href={url}
                key={idx}
                className="hover:text-[#00e676] transition"
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 mt-10 pt-4 text-center text-sm text-gray-400">
        © 2018–2025 <span className="text-white">QED edu</span>. All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;
