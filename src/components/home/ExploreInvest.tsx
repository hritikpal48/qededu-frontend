"use client";

import Image from "next/image";

const exploreCards = [
  {
    image: "/info/price-trend.png",
    title: "Track Unlisted Shares/Pre IPO Shares Details",
    description:
      "All the details regarding Unlisted Shares/Pre IPO Shares at your fingertips.",
  },
  {
    image: "/info/sector-wise.png",
    title: "Sectoral Analysis of Unlisted & Pre IPO Companies",
    description:
      "In-depth view of sector-wise grouping across unlisted & Pre IPO Companies.",
  },
  {
    image: "/info/price-chart.png",
    title: "Price Chart of Unlisted Shares/Pre IPO Shares",
    description:
      "Analyse multiple charts & historical data to track unlisted & Pre IPO Share price movement.",
  },
  {
    image: "/info/shareholding.png",
    title: "Shareholding Pattern of Unlisted & Pre IPO Companies",
    description:
      "Study the shareholding pattern & understand key stakeholders in Unlisted/Pre IPO Companies.",
  },
];

const ExploreInvest = () => {
  return (
    <section className="bg-black text-white py-12 px-4 text-center">
      <h2 className="text-green-400 font-bold text-xl mb-1">
        Explore | Analyse | Invest
      </h2>
      <p className="text-white text-sm mb-10 max-w-xl mx-auto">
        Unlisted Arena simplifies your investments in Unlisted Shares
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
        {exploreCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-blue-500 p-4 rounded-lg shadow-md hover:scale-105 transition"
          >
            <div className="bg-white rounded-md overflow-hidden p-2 mb-3">
              <Image
                src={card.image}
                alt={card.title}
                width={300}
                height={300}
                className="mx-auto"
              />
            </div>
            <h3 className="text-white font-semibold text-sm mb-1">
              {card.title}
            </h3>
            <p className="text-white text-xs">{card.description}</p>
          </div>
        ))}
      </div>

      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-xs">
        Explore Unlisted Shares Now!
      </button>
    </section>
  );
};

export default ExploreInvest;
