"use client";

import Image from "@/components/ui/Image";
import Link from "next/link";
import {
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaTelegram,
} from "react-icons/fa";
// Define menu links as objects
import { SettingData } from "@/types/settingsType";
import { IconType } from "react-icons";
import { environmentVariables } from "@/config/app.config";

interface FooterProps {
  data: SettingData;
  isLoading: boolean;
}
const quickLinks = [
  { name: "Login", url: "/auth/login" },
  { name: "Signup", url: "/auth/signup" },
  { name: "Blog", url: "/blog" },
  { name: "Investor Resources", url: "/investor-resources" },
  {
    name: "PAN & ISIN of Unlisted Shares",
    url: "/investor-resources/pan-isin-unlisted-shares/",
  },
  {
    name: "How to get Client Master List from different brokers",
    url: "/investor-resources/how-to-get-client-master-list-from-different-brokers",
  },
];

const unlistedZoneLinks = [
  { name: "About Us", url: "/about-us", badge: "" },
  { name: "Shares List", url: "/unlisted-shares", badge: "" },
  { name: "Process", url: "/how-to-buy-unlisted-shares", badge: "" },
  { name: "FAQ", url: "/faq", badge: "" },
  { name: "In Media", url: "/in-media", badge: "" },
  { name: "Contact us", url: "/contact-us", badge: "" },
];

const Footer = ({ data, isLoading }: FooterProps) => {
  const socialIcons = [
    { icon: FaFacebook, url: data.facebook },
    { icon: FaTwitter, url: data.twitter },
    { icon: FaLinkedin, url: data.linkedin },
    { icon: FaTelegram, url: data.telegram },
    { icon: FaInstagram, url: data.instagram },
  ].filter((item): item is { icon: IconType; url: string } =>
    Boolean(item.url)
  );

  return (
    <footer className="bg-[#000] text-white py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand & Apps */}
        <div>
          {/* Logo */}

          {data.logo && (
            <Image
              src={`${environmentVariables.UPLOAD_URL}/setting/${data.logo}`}
              alt="Logo"
              className="h-30 w-30 object-contain" // controls actual size
            />
          )}

          <p className="text-sm mb-4">
            India’s No.1 Platform for Buying and Selling Unlisted Shares.
          </p>

          {/* <div className="flex gap-2 mb-4 flex-wrap">
            <Link href="/">
              <Image src={appstore} alt="App Store" width={140} height={60} />
            </Link>
            <Link href="/">
              <Image
                src={playstore}
                alt="Google Play"
                width={140}
                height={60}
              />
            </Link>
          </div>

          <Link href="/">
            <Image
              src={whatsapp}
              alt="Join WhatsApp Channel"
              width={300}
              height={70}
              className="rounded-md w-full max-w-xs"
            />
          </Link> */}
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
                {link?.badge && (
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
            <p>{data.address}</p>
          </div>
          <div className="flex items-center gap-2 mb-3 text-sm">
            <FaEnvelope />
            <span>{data.email}</span>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4 text-white text-lg">
            {socialIcons.map(({ icon: Icon, url }, idx) => (
              <Link
                href={url}
                key={idx}
                className="hover:text-[#00e676] transition"
                target="_blank"
                rel="noopener noreferrer"
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
