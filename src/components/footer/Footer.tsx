'use client';

import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaTelegramPlane,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-4 md:px-10 pt-10 pb-5 text-sm">
      {/* Top Quote */}
      <div className="text-center text-white font-light italic mb-10 text-4xl">
        <span className="font-bold text-white">❝ </span>
        The biggest risk of all is not taking one — <span className="font-serif">Mellody Hobson</span>
        <span className="font-bold text-white">❞</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto">

        {/* Logo & Highlights */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Qed <span className="text-yellow-400">Edu</span>
          </h2>
          <div className="space-y-3">
            <div className="bg-[#111] p-3 rounded border-b border-white">
              <strong className="text-blue-500 block mb-1">🎯 Attractive Pricing</strong>
              <p className="text-gray-300">Get best quotes prevailing in the market</p>
            </div>
            <div className="bg-[#111] p-3 rounded border-b border-white">
              <strong className="text-blue-500 block mb-1">⚡ Fastest Delivery</strong>
              <p className="text-gray-300">Get shares in your demat in few hours only!</p>
            </div>
            <div className="bg-[#111] p-3 rounded border-b border-white">
              <strong className="text-blue-500 block mb-1">🔒 Secure Payments</strong>
              <p className="text-gray-300">Hassle-free payments via NEFT, IMPS & UPI</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Join us at-</h3>
          <div className="flex gap-4 text-blue-400 text-lg mb-4">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaLinkedinIn className="hover:text-white cursor-pointer" />
            <FaTelegramPlane className="hover:text-white cursor-pointer" />
          </div>
          <a
            href="https://wa.me/919512101210"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-teal-600 hover:bg-teal-700 px-5 py-2 rounded-full text-white font-medium transition"
          >
            💬 Join WhatsApp Community
          </a>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Important Links</h3>
          <ul className="space-y-2 text-blue-400">
            <li><Link href="/blog">› Blog</Link></li>
            <li><Link href="/about">› About Us</Link></li>
            <li><Link href="/faq">› FAQ</Link></li>
            <li><Link href="/legal">› Legal</Link></li>
            <li><Link href="/process">› Process</Link></li>
            <li><Link href="/media">› In Media</Link></li>
            <li><Link href="/resources">› Investor Resources</Link></li>
            <li><Link href="/client-master">› Get Client Master List</Link></li>
            <li><Link href="/pan-isin">› PAN & ISIN of Unlisted Shares</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-center gap-3">
              <FaPhone /> <span>9512101210</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone /> <span>9601860011</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope /> <span>info@qededu.com</span>
            </li>
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1" />
              <span>
                120-B, Behind Vaishali Enclave, <br />
                Anjar-Kutch, Gujarat
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-gray-400 text-xs mt-10 border-t border-gray-700 pt-4">
        © 2022 Qed Edu. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
