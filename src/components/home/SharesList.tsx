"use client";

import { useState } from "react";
import Image from "next/image";

const latestShares = {
  all: [
    {
      name: "NSDL Unlisted Shares",
      logo: "/logos/nsdl.png",
      category: "FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "NSE Unlisted Shares",
      logo: "/logos/nse.png",
      category: "EXCHANGES · FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "Onix Renewable Unlisted Shares",
      logo: "/logos/onix.png",
      category: "LATEST OFFERINGS · MANUFACTURING · OTHERS · POWER",
      link: "#",
    },
    {
      name: "NSDL Unlisted Shares",
      logo: "/logos/nsdl.png",
      category: "FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "NSE Unlisted Shares",
      logo: "/logos/nse.png",
      category: "EXCHANGES · FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "Onix Renewable Unlisted Shares",
      logo: "/logos/onix.png",
      category: "LATEST OFFERINGS · MANUFACTURING · OTHERS · POWER",
      link: "#",
    },
    {
      name: "NSDL Unlisted Shares",
      logo: "/logos/nsdl.png",
      category: "FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "NSE Unlisted Shares",
      logo: "/logos/nse.png",
      category: "EXCHANGES · FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "Onix Renewable Unlisted Shares",
      logo: "/logos/onix.png",
      category: "LATEST OFFERINGS · MANUFACTURING · OTHERS · POWER",
      link: "#",
    },
  ],
  offerings: [
    {
      name: "Apollo Green Unlisted Shares",
      logo: "/logos/apollo.png",
      category: "LATEST OFFERINGS · MANUFACTURING · POWER",
      link: "#",
    },
    {
      name: "Matrix Gas",
      logo: "/logos/matrix.png",
      category: "LATEST OFFERINGS · MANUFACTURING · POWER",
      link: "#",
    },
    {
      name: "Apollo Green Unlisted Shares",
      logo: "/logos/apollo.png",
      category: "LATEST OFFERINGS · MANUFACTURING · POWER",
      link: "#",
    },
    {
      name: "Matrix Gas",
      logo: "/logos/matrix.png",
      category: "LATEST OFFERINGS · MANUFACTURING · POWER",
      link: "#",
    },
    {
      name: "Apollo Green Unlisted Shares",
      logo: "/logos/apollo.png",
      category: "LATEST OFFERINGS · MANUFACTURING · POWER",
      link: "#",
    },
    {
      name: "Matrix Gas",
      logo: "/logos/matrix.png",
      category: "LATEST OFFERINGS · MANUFACTURING · POWER",
      link: "#",
    },
  ],
};

const SharesList = () => {
  const [tab, setTab] = useState("all");

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-4">
        Latest Unlisted Shares
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-8 mb-8 text-sm font-medium">
        <button
          onClick={() => setTab("all")}
          className={`pb-2 ${
            tab === "all"
              ? "border-b-2 border-black text-black"
              : "text-gray-400"
          }`}
        >
          ALL
        </button>
        <button
          onClick={() => setTab("offerings")}
          className={`pb-2 ${
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
              <div className="text-green-400 text-xs mb-1">{item.category}</div>
              <h4 className="font-semibold text-lg leading-tight">
                {item.name}
              </h4>
              <a
                href={item.link}
                className="text-blue-400 text-sm inline-block mt-2 hover:underline"
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
