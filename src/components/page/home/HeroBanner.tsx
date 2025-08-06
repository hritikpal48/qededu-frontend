"use client";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <>
      <section className="heroHomeBanner relative bg-white py-12 px-4 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-black mb-4">
            Buy Or Sell Unlisted Shares, Pre IPO Shares, ESOP
          </h1>
          <p className="text-center text-[#4b4b4b] mb-8">
            You can easily find list of unlisted shares which are available for
            trading, buy and sell Unlisted Shares at best prices.
          </p>

          {/* Video Thumbnail or Image */}
          <div className="flex justify-center h-[280px] md:h-[600px] ">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/Ck1c5eLa5PI?autoplay=1&mute=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full rounded"
            />
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
    </>
  );
};

export default HeroBanner;
