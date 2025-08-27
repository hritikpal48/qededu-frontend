"use client";

import { useState, useMemo } from "react";
import Image from "@/components/ui/Image";
import { environmentVariables } from "@/config/app.config";
import Link from "next/link";

interface StockItem {
  _id: string;
  name: string;
  image: string;
  type: number; // 1 = unlisted, 4 = IPO, etc.
  link?: string;
  slug: string;
}

interface SharesListProps {
  data: StockItem[];
  isLoading: boolean;
}

const ShareCard = ({
  image,
  name,
  // category,
  href,
}: {
  image: string;
  name: string;
  // category: string;
  href?: string;
}) => {
  return (
    <div className="shadow-lg rounded overflow-hidden bg-white hover:scale-[1.02] transition">
      <div className="flex items-center justify-center h-44 bg-white">
        <Image
          src={`${environmentVariables.UPLOAD_URL}/stocks/${image}`}
          alt={name}
          width={150}
          height={100}
        />
      </div>
      <div className="bg-black text-white p-4 text-center">
        {/* <div className="text-[#59C20F] text-xs mb-1">{category}</div> */}
        <h4 className="font-semibold text-lg leading-tight">{name}</h4>
        <Link
          href={`/share/${href}`}
          className="ml-2 text-sm font-medium text-dark hover:underline"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

const SharesList = ({ data, isLoading }: SharesListProps) => {
  const [tab, setTab] = useState<"all" | "offerings">("all");

  // Filter data based on tab
  const filteredData = useMemo(() => {
    if (tab === "all") {
      // "all" could be unlisted stocks (type === 1)
      return data.filter((item) => item.type === 1);
    } else {
      // "offerings" could be latest IPO or offerings (type === 4)
      return data.filter((item) => item.type === 1);
    }
  }, [tab, data]);

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!filteredData.length) {
    return <div className="text-center py-10">No shares available.</div>;
  }

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
        {filteredData.map((item) => (
          <ShareCard
            key={item._id}
            image={item.image}
            name={item.name}
            // category={item.category}
            href={item.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default SharesList;
