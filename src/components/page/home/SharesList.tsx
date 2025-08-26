"use client";

import { useState } from "react";
import Image from "@/components/ui/Image";
import AppImages from "@/config/constant/app.images";
interface ShareItem {
  name: string;
  logo: string;
  category: string;
  link: string;
}

interface LatestShares {
  all: ShareItem[];
  offerings: ShareItem[];
}

const latestShares: LatestShares = {
  all: [
    {
      name: "NSDL Unlisted Shares",
      logo: AppImages.share.share1,
      category: "FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "NSE Unlisted Shares",
      logo: AppImages.share.share1,
      category: "EXCHANGES · FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "Onix Renewable Unlisted Shares",
      logo: AppImages.share.share2,
      category: "LATEST OFFERINGS · MANUFACTURING · OTHERS · POWER",
      link: "#",
    },
    {
      name: "NSDL Unlisted Shares",
      logo: AppImages.share.share3,
      category: "FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "NSE Unlisted Shares",
      logo: AppImages.share.share4,
      category: "EXCHANGES · FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "Onix Renewable Unlisted Shares",
      logo: AppImages.share.share5,
      category: "LATEST OFFERINGS · MANUFACTURING · OTHERS · POWER",
      link: "#",
    },
    {
      name: "NSDL Unlisted Shares",
      logo: AppImages.share.share6,
      category: "FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "NSE Unlisted Shares",
      logo: AppImages.share.share7,
      category: "EXCHANGES · FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
  ],
  offerings: [
    {
      name: "CAMS Investor Services",
      logo: AppImages.share.share8,
      category: "FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "India INX Exchange",
      logo: AppImages.share.share2,
      category: "EXCHANGES · FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "ReNew Power Ventures",
      logo: AppImages.share.share3,
      category: "LATEST OFFERINGS · MANUFACTURING · OTHERS · POWER",
      link: "#",
    },
    {
      name: "Karvy Stock Broking",
      logo: AppImages.share.share4,
      category: "FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "Metropolitan Stock Exchange",
      logo: AppImages.share.share5,
      category: "EXCHANGES · FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "Adani Green Energy",
      logo: AppImages.share.share6,
      category: "LATEST OFFERINGS · MANUFACTURING · OTHERS · POWER",
      link: "#",
    },
    {
      name: "HDFC Securities",
      logo: AppImages.share.share7,
      category: "FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
    {
      name: "Bombay Stock Exchange Tech",
      logo: AppImages.share.share8,
      category: "EXCHANGES · FINANCIAL SERVICES · LATEST OFFERINGS",
      link: "#",
    },
  ],
};

const ShareCard = ({
  image,
  name,
  category,
  href,
}: {
  image: string;
  name: string;
  category: string;
  href: string;
}) => {
  return (
    <div className="shadow-lg rounded overflow-hidden bg-white hover:scale-[1.02] transition">
      <div className="flex items-center justify-center h-44 bg-white">
        <Image
          src={image}
          alt={name}
          width={150}
          height={100}
          objectFit="contain"
        />
      </div>
      <div className="bg-black text-white p-4 text-center">
        <div className="text-[#59C20F] text-xs mb-1">{category}</div>
        <h4 className="font-semibold text-lg leading-tight">{name}</h4>
        <a
          href={href ?? "#"}
          className="text-white text-sm inline-block mt-2 hover:underline"
        >
          Learn More ›
        </a>
      </div>
    </div>
  );
};

const SharesList = () => {
  const [tab, setTab] = useState<"offerings" | "all">("all");

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
          <ShareCard
            image={item?.logo}
            name={item?.name}
            category={item?.category}
            href={item?.link}
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default SharesList;
