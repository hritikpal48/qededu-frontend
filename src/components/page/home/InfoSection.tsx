"use client";

import Link from "next/link";
import { FaFileAlt, FaPlayCircle, FaToggleOn, FaSearch } from "react-icons/fa";

const InfoSection = () => {
  const options = [
    {
      title: "Unlisted Shares",
      description:
        "Make your portfolio dynamic by investing in top unlisted shares which are comparatively less volatile.",
      icon: <FaFileAlt className="text-green-600 text-4xl mb-5" />,
      href: "/",
    },
    {
      title: "Pre IPO Shares",
      description:
        "Invest in quality unlisted companies before their IPO and be a part of their growth story early.",
      icon: <FaPlayCircle className="text-green-600 text-4xl mb-5" />,
      href: "/",
    },
    {
      title: "Delisted Shares",
      description:
        "Invest in quality delisted companies with strong fundamentals and promoter confidence.",
      icon: <FaToggleOn className="text-green-600 text-4xl mb-5" />,
      href: "/",
    },
    {
      title: "Rarely Traded Shares",
      description:
        "Invest in hidden gem stocks that are rarely traded despite being listed.",
      icon: <FaSearch className="text-green-600 text-4xl mb-5" />,
      href: "/",
    },
  ];
  return (
    <div className="bg-[#f7f7f7]">
      <div className="text-black py-16 px-4 md:px-10 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-center">
          India’s #1 Dealer for Buying Unlisted Shares, Pre IPO Shares & Rarely
          Traded Shares
        </h1>
        <p className="text-gray-600 mb-10 text-base md:text-lg max-w-3xl mx-auto text-center">
          Unlisted Arena is India’s Leading Dealer which enables all class
          investors to buy or sell Unlisted Shares, Pre-IPO Shares & Rarely
          Traded Shares
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left Grid - Investment Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {options.map((option, idx) => (
              <Link key={idx} href={option.href}>
                <div className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 hover:bg-black hover:text-white shadow transition-all duration-300 ease-in-out group">
                  {option.icon}
                  <h4 className="text-lg font-semibold mb-1">{option.title}</h4>
                  <p className="text-sm group-hover:text-white">
                    {option.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Content - Info & CTA */}
          <div>
            <h2 className="text-2xl font-semibold leading-snug">
              At <span className="text-green-600 font-bold">Qed Edu</span> —
              access the world of Pre-IPO and Unlisted shares easily like never
              before!
            </h2>
            <p className="text-base md:text-lg mt-3">
              Our platform bridges the gap between retail investors and
              promising private market opportunities. We prioritize transparency
              and reliability, ensuring that every investment listed meets a
              high standard of due diligence.
            </p>
            <p className="text-base md:text-lg mt-3">
              Gain early access to high-growth companies and diversify your
              portfolio with alternative assets that have the potential for
              long-term value creation. With Qed Edu, you're always ahead of the
              curve.
            </p>
            <p className="text-base md:text-lg mt-3">
              Start your journey today — because smart investing is not just
              about access, it's about making informed choices with the right
              platform by your side.
            </p>
            <div className="mt-6">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition cursor-pointer">
                View Unlisted Shares
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
