// app/product/[slug]/page.tsx
import { Metadata } from "next";

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
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gray-200 h-64 w-full flex items-center justify-center">
            <span className="text-gray-500">
              Featured Image: EatClub Branding
            </span>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
              <span>28 Jul, 2025</span>
              <div className="flex space-x-4">
                <button className="hover:text-blue-500">Share</button>
                <button className="hover:text-blue-500">Tweet</button>
                <button className="hover:text-blue-500">Save</button>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              EatClub Secures Rs 185 Crore in Funding Led by Tiger Global: A
              Strong Signal for the Cloud Kitchen Sector
            </h1>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Introduction: EatClub's Major Fundraise and Strategic
                Reorganization
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Mumbai-based cloud kitchen startup EatClub has successfully
                raised Rs 185 crore (approximately $22 million) in a fresh
                funding round led by global venture capital giant Tiger
                Global...
              </p>
              <p className="text-gray-700 leading-relaxed">
                The funding round is accompanied by a significant leadership
                reshuffle: co-founder and CEO Jaydeep Barman has moved into the
                role of Chairman, while fellow co-founder Ankush Grover steps in
                as the new CEO.
              </p>
            </section>

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
                    <span>Rs 212 crore</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Post this funding, EatClub's estimated post-money valuation
                stands at Rs 4,585 crore...
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Growth Trajectory and Brand Portfolio
              </h2>
              <p className="text-gray-700 leading-relaxed">
                EatClub operates 16 multi-cuisine brands including...
              </p>

              <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500 text-center">
                  Brand portfolio list would be displayed here
                </p>
              </div>
            </section>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {[
                  "Cloud Kitchen",
                  "Startup Funding",
                  "Tiger Global",
                  "Food Tech",
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
          </div>
        </article>

        <aside className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-2 text-gray-800">Author</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200" />
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
      </main>
    </div>
  );
}
