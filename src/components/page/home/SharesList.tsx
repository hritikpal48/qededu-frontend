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
  title: string|undefined;
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
 <div className="group flex  shadow-lg rounded-xl overflow-hidden bg-white hover:shadow-2xl hover:scale-[1.009] transition-all duration-300">
  {/* Image section */}
  <div className="flex-shrink-0 w-40 h-full bg-gray-50  overflow-hidden shadow-xl">
    <Image
      src={`${environmentVariables.UPLOAD_URL}/stocks/${image}`}
      alt={name}
      className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-110"
    />
  </div>
  {/* Content section */}
  <div className="flex flex-col p-6 pt-3 flex-1">
    {/* Optional category badge */}
    {/* <div className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600 mb-2">
      {category}
    </div> */}
    <h4 className="font-semibold text-lg text-gray-800 group-hover:text-black transition">
      {name}
    </h4>
    <Link
      href={`/share/${href}`}
      className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline"
    >
      Learn More →
    </Link>
  </div>
</div>
  );
};
const SharesList = ({ data, isLoading, isHomePage, title }: SharesListProps & { isHomePage?: boolean }) => {
  const [tab, setTab] = useState<"all" | "offerings">("all");
  // Filter data based on tab
  const filteredData = useMemo(() => {
    if (tab === "all") {
      return data.filter((item) => item.type === 1);
    } else {
      return data.filter((item) => item.type === 1); // offerings = IPO
    }
  }, [tab, data]);
  // :white_check_mark: If homepage, only show first 6 items
  const visibleData = isHomePage ? filteredData.slice(0, 6) : filteredData;
  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  if (!visibleData.length) {
    return <div className="text-center py-10">No shares available.</div>;
  }
  return (
    <section className="max-w-7xl mx-auto px-4 pt-10 pb-25">
      <h2 className="text-4xl font-bold text-center mb-4">
        {title || "Latest Unlisted Shares"}
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
        {visibleData.map((item) => (
          <ShareCard
            key={item._id}
            image={item.image}
            name={item.name}
            href={item.slug}
          />
        ))}
      </div>
    </section>
  );
};
export default SharesList;