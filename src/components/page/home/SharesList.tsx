"use client";

import { useState } from "react";
import Image from "next/image";
import share1 from "../../../../public/images/sharelist/share1.jpg";
import share2 from "../../../../public/images/sharelist/share2.png";
import share3 from "../../../../public/images/sharelist/share3.png";
import share4 from "../../../../public/images/sharelist/share4.png";
import share5 from "../../../../public/images/sharelist/share5.png";
import share6 from "../../../../public/images/sharelist/share6.png";
import share7 from "../../../../public/images/sharelist/share7.png";
import share8 from "../../../../public/images/sharelist/share8.png";

const latestShares = {
  all: [
    {
      name: "NSDL Unlisted Shares",
      logo: share1,
      category: "FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "NSE Unlisted Shares",
      logo: share2,
      category: "EXCHANGES · FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "Onix Renewable Unlisted Shares",
      logo: share3,
      category: "LATEST OFFERINGS · MANUFACTURING · OTHERS · POWER",
      link: "#",
    },
    {
      name: "NSDL Unlisted Shares",
      logo: share4,
      category: "FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "NSE Unlisted Shares",
      logo: share5,
      category: "EXCHANGES · FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "Onix Renewable Unlisted Shares",
      logo: share6,
      category: "LATEST OFFERINGS · MANUFACTURING · OTHERS · POWER",
      link: "#",
    },
    {
      name: "NSDL Unlisted Shares",
      logo: share7,
      category: "FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "NSE Unlisted Shares",
      logo: share8,
      category: "EXCHANGES · FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
  ],
  offerings: [
    {
      name: "CAMS Investor Services",
      logo: share1,
      category: "FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "India INX Exchange",
      logo: share2,
      category: "EXCHANGES · FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "ReNew Power Ventures",
      logo: share3,
      category: "LATEST OFFERINGS · MANUFACTURING · OTHERS · POWER",
      link: "#",
    },
    {
      name: "Karvy Stock Broking",
      logo: share4,
      category: "FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "Metropolitan Stock Exchange",
      logo: share5,
      category: "EXCHANGES · FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "Adani Green Energy",
      logo: share6,
      category: "LATEST OFFERINGS · MANUFACTURING · OTHERS · POWER",
      link: "#",
    },
    {
      name: "HDFC Securities",
      logo: share7,
      category: "FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "Bombay Stock Exchange Tech",
      logo: share8,
      category: "EXCHANGES · FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
  ],
};

const SharesList = () => {
  const [tab, setTab] = useState("all");

  return (
    <section className="max-w-7xl mx-auto px-4 pt-10 pb-25">
      <h2 className="text-4xl font-bold text-center mb-4">
        Latest Unlisted Shares
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-8 mb-8 text-sm font-medium">
        <button
          onClick={() => setTab("all")}
          className={`pb-2 cursor-pointer ${
            tab === "all"
              ? "border-b-2 border-black text-black"
              : "text-gray-400"
          }`}
        >
          ALL
        </button>
        <button
          onClick={() => setTab("offerings")}
          className={`pb-2 cursor-pointer ${
            tab === "offerings"
              ? "border-b-2 border-black text-black"
              : "text-gray-400"
          }`}
        >
          LATEST OFFERINGS
        </button>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {latestShares[tab].map((item, index) => (
          <div
            key={index}
            className="shadow-lg rounded overflow-hidden bg-white hover:scale-[1.02] transition"
          >
            <div className="flex items-center justify-center h-44 bg-white">
              <Image
                src={item.logo}
                alt={item.name}
                width={150}
                height={100}
                objectFit="contain"
              />
            </div>
            <div className="bg-black text-white p-4 text-center">
              <div className="text-[#59C20F] text-xs mb-1">{item.category}</div>
              <h4 className="font-semibold text-lg leading-tight">
                {item.name}
              </h4>
              <a
                href={item.link}
                className="text-white text-sm inline-block mt-2 hover:underline"
              >
                Learn More ›
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SharesList;
