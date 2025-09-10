"use client";

import { HomeData } from "@/types/settingsType";
import { getYouTubeEmbedUrl } from "@/utils";
import Link from "next/link";

interface HeroBannerProps {
  data?: Pick<HomeData, "heading1" | "subTitle1" | "youtube">; // ✅ Only required fields
  isLoading: boolean;
}

const HeroBanner = ({ data, isLoading }: HeroBannerProps) => {
  if (isLoading) {
    return (
      <section className="heroHomeBanner relative bg-white py-12 px-4 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </section>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(data?.youtube || "");

  return (
    <section className="heroHomeBanner relative bg-white py-12 px-4 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <h1 className="text-2xl md:text-4xl font-bold text-center text-black mb-4">
          {data?.heading1 || "Buy Or Sell Unlisted Shares, Pre IPO Shares, ESOP"}
        </h1>

        {/* Subtitle */}
        <p className="text-center text-[#4b4b4b] mb-8">
          {data?.subTitle1 ||
            "You can easily find list of unlisted shares which are available for trading, buy and sell Unlisted Shares at best prices."}
        </p>

        {/* Video Thumbnail or Image */}
        <div className="flex justify-center h-[280px] md:h-[600px]">
          {embedUrl ? (
            <iframe
              width="100%"
              height="100%"
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full rounded"
            />
          ) : (
            <p className="text-red-500">Invalid YouTube URL</p>
          )}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-6">
          <Link href="/">
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded cursor-pointer">
              Read Articles
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
