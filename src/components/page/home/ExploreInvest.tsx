"use client";

import Image from "@/components/ui/Image";
import AppImages from "@/config/constant/app.images";
const exploreCards = [
  {
    image: AppImages.explore.explore1,
    title: "Track Unlisted Shares/Pre IPO Shares Details",
    description:
      "All the details regarding Unlisted Shares/Pre IPO Shares at your fingertips.",
  },
  {
    image: AppImages.explore.explore2,
    title: "Sectoral Analysis of Unlisted & Pre IPO Companies",
    description:
      "In-depth view of sector-wise grouping across unlisted & Pre IPO Companies.",
  },
  {
    image: AppImages.explore.explore3,
    title: "Price Chart of Unlisted Shares/Pre IPO Shares",
    description:
      "Analyse multiple charts & historical data to track unlisted & Pre IPO Share price movement.",
  },
  {
    image: AppImages.explore.explore4,
    title: "Shareholding Pattern of Unlisted & Pre IPO Companies",
    description:
      "Study the shareholding pattern & understand key stakeholders in Unlisted/Pre IPO Companies.",
  },
];

const ExploreInvest = () => {
  return (
    <section className="bg-black text-white py-25 px-4 text-center">
      <div className="mb-15">
        <h2 className="font-bold text-5xl mb-3">
          Explore | <span className="text-green-500"> Analyse | Invest</span>
        </h2>
        <p className="text-white mx-auto text-4xl">
          <i>Unlisted Arena simplifies your investments in Unlisted Shares</i>
        </p>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
        {exploreCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-[#ffffff47] p-10 rounded-[30px]"
          >
            <div className="mb-7">
              <Image
                src={card.image}
                alt={card.title}
                width={350}
                height={300}
                className="mx-auto"
              />
            </div>
            <h3 className="text-white font-semibold text-[20px] mb-1">
              {card.title}
            </h3>
            <p className="text-white text-[16px]">{card.description}</p>
          </div>
        ))}
      </div>

      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition cursor-pointer">
        Explore Unlisted Shares Now
      </button>
    </section>
  );
};

export default ExploreInvest;
