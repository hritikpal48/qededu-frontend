// app/product/[slug]/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import AppImages from "@/config/constant/app.images";

interface PageProps {
  params: {
    slug: string;
  };
}

export const generateMetadata = ({ params }: PageProps): Metadata => {
  return {
    title: `Blog - ${params.slug}`,
  };
};

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-2 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gray-200 h-64 w-full flex items-center justify-center overflow-hidden relative">
            <Image
              src={AppImages.blogImg.blog1}
              alt="Blog Image"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-6 md:p-8">
            {/* Meta Info */}
            <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
              <span>28 Jul, 2025</span>
              <div className="flex space-x-4">
                <button className="text-green-600 bg-green-100 cursor-pointer px-2 py-1 rounded-sm text-[12px]">
                  Share
                </button>
                <button className="text-green-600 bg-green-100 cursor-pointer px-2 py-1 rounded-sm text-[12px]">
                  Tweet
                </button>
                <button className="text-green-600 bg-green-100 cursor-pointer px-2 py-1 rounded-sm text-[12px]">
                  Save
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-3xl font-bold text-gray-900 mb-6">
              EatClub Secures Rs 185 Crore in Funding Led by Tiger Global: A
              Strong Signal for the Cloud Kitchen Sector
            </h1>

            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Introduction: EatClub's Major Fundraise and Strategic
                Reorganization
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Mumbai-based cloud kitchen startup EatClub has successfully
                raised Rs 185 crore (approximately $22 million) in a fresh
                funding round led by global venture capital giant Tiger Global.
                This fundraise is part of a broader strategic restructuring
                within the company.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The funding round includes a leadership change, with co-founder
                Jaydeep Barman transitioning to the role of Chairman, and Ankush
                Grover stepping in as the new CEO.
              </p>
            </section>

            {/* Funding Details */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Funding Breakdown and Valuation Surge
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                EatClub's board approved a special resolution to issue 11,830
                preference shares to the participating investors.
              </p>

              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="font-medium">Tiger Global:</span>
                    <span>Rs 126 crore</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">A91 Partners:</span>
                    <span>Rs 37.5 crore</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">
                      360 ONE Asset Management:
                    </span>
                    <span>Rs 21.2 crore</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Post this investment, EatClub's estimated post-money valuation
                has surged to Rs 4,585 crore, indicating strong investor
                confidence in the company's potential and the broader food-tech
                market.
              </p>
            </section>

            {/* Market Impact */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Market Impact and Competitive Edge
              </h2>
              <p className="text-gray-700 leading-relaxed">
                This strategic investment places EatClub in a stronger position
                to compete with leading food delivery and kitchen aggregators.
                The capital will be used to optimize operations, strengthen
                supply chains, and enhance tech infrastructure for real-time
                order tracking and analytics.
              </p>
            </section>

            {/* Brand Portfolio */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Growth Trajectory and Brand Portfolio
              </h2>
              <p className="text-gray-700 leading-relaxed">
                EatClub operates over 16 multi-cuisine cloud kitchen brands,
                catering to a wide range of tastes— from North Indian to
                Continental to Healthy Bowls.
              </p>

              <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500 text-center">
                  Brand portfolio list would be displayed here
                </p>
              </div>
            </section>

            {/* Investor Sentiment */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Investor Sentiment and Industry Response
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Tiger Global’s backing reinforces a rising confidence in the
                scalability of cloud kitchens in India. With food delivery
                demand projected to grow exponentially post-pandemic, EatClub’s
                focus on efficiency and multi-brand strategy resonates well with
                market trends.
              </p>
            </section>

            {/* Industry Outlook */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Cloud Kitchen Sector Outlook
              </h2>
              <p className="text-gray-700 leading-relaxed">
                The cloud kitchen market in India is expected to reach $2
                billion by 2027, with increasing urban demand and tech-enabled
                delivery logistics. EatClub, with its proven operations model,
                is well-positioned to capitalize on this trend.
              </p>
            </section>

            {/* Roadmap */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Future Roadmap and Expansion Plans
              </h2>
              <p className="text-gray-700 leading-relaxed">
                With the new funds, EatClub plans to expand to Tier 2 cities,
                introduce AI-driven menu personalization, and reduce delivery
                times through hyperlocal kitchen networks.
              </p>
            </section>

            {/* Tags */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {[
                  "Cloud Kitchen",
                  "Startup Funding",
                  "Tiger Global",
                  "Food Tech",
                  "Venture Capital",
                  "EatClub",
                  "Business Strategy",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        <aside className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-2 text-gray-800">Author</h4>
            <div className="flex items-center gap-4">
              <Image src={AppImages.team.team1} alt="authorImage" width={50} height={50} className="rounded-full flex items-center justify-center bg-gray-200 overflow-hidden relative" />
              <div>
                <p className="font-medium text-gray-800">Jaydeep Barman</p>
                <p className="text-sm text-gray-500">Chairman, EatClub</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-2 text-gray-800">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Cloud Kitchen",
                "Funding",
                "Tiger Global",
                "Startup",
                "Venture Capital",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">
              Recent Posts
            </h4>
            <ul className="space-y-4 text-sm text-gray-700">
              <li className="border-b pb-2">
                <a href="#" className="hover:text-blue-500">
                  India’s Top 5 Cloud Kitchens in 2025
                </a>
              </li>
              <li className="border-b pb-2">
                <a href="#" className="hover:text-blue-500">
                  How Tiger Global Shapes Startup Ecosystems
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  FoodTech Trends to Watch in 2026
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
