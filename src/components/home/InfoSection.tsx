"use client";

import { FaFileAlt, FaPlayCircle, FaToggleOn, FaSearch } from "react-icons/fa";

const InfoSection = () => {
  return (
    <section className="bg-white text-black py-16 px-4 md:px-10 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-center">
        India’s #1 Dealer for Buying Unlisted Shares, Pre IPO Shares & Rarely
        Traded Shares
      </h1>
      <p className="text-gray-600 mb-10 text-base md:text-lg max-w-3xl mx-auto text-center">
        Unlisted Arena is India’s Leading Dealer which enables all class
        investors to buy or sell Unlisted Shares, Pre-IPO Shares & Rarely Traded
        Shares
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="border border-[#f1f1f1] rounded-lg p-5 shadow-sm hover:shadow-md transition">
            <FaFileAlt className="text-blue-600 text-2xl mb-2" />
            <h4 className="font-bold text-lg mb-1">Unlisted Shares</h4>
            <p className="text-gray-600 text-sm">
              Make your portfolio dynamic by investing in top unlisted shares
              which are comparatively less volatile.
            </p>
          </div>

          {/* Card 2 */}
          <div className="border border-[#f1f1f1] rounded-lg p-5 shadow-sm hover:shadow-md transition">
            <FaPlayCircle className="text-blue-600 text-2xl mb-2" />
            <h4 className="font-bold text-lg mb-1">Pre IPO Shares</h4>
            <p className="text-gray-600 text-sm">
              Invest in quality unlisted companies before their IPO and be a
              part of their growth story early.
            </p>
          </div>

          {/* Card 3 */}
          <div className="border border-[#f1f1f1] rounded-lg p-5 shadow-sm hover:shadow-md transition">
            <FaToggleOn className="text-blue-600 text-2xl mb-2" />
            <h4 className="font-bold text-lg mb-1">Delisted Shares</h4>
            <p className="text-gray-600 text-sm">
              Invest in quality delisted companies with strong fundamentals and
              promoter confidence.
            </p>
          </div>

          {/* Card 4 */}
          <div className="border border-[#f1f1f1] rounded-lg p-5 shadow-sm hover:shadow-md transition">
            <FaSearch className="text-blue-600 text-2xl mb-2" />
            <h4 className="font-bold text-lg mb-1">Rarely Traded Shares</h4>
            <p className="text-gray-600 text-sm">
              Invest in hidden gem stocks that are rarely traded despite being
              listed.
            </p>
          </div>
        </div>

        <div className="">
          <h2 className="text-2xl leading-normal font-semibold">
            At <span className="text-blue-600 font-bold">Qed Edu</span> — access
            the world of Pre-IPO and Unlisted shares easily like never before!
          </h2>
          <p className="text-gray-600 mb-10 text-base md:text-lg pt-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo culpa a ad, labore accusamus temporibus consequuntur? Quod, doloremque unde accusantium blanditiis dolore quia eum iusto alias, ad totam repellendus provident! Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          {/* CTA Button */}
          <div className="mt-10">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition">
              Unlisted Shares List
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
