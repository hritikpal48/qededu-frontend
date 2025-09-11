"use client";
import AppImages from "@/config/constant/app.images";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { useFaqDetails } from "@/services/settings.service";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import { environmentVariables } from "@/config/app.config";


const categoryLabels: Record<string, string> = {
  about: "About Unlisted/Pre-IPO Shares",
  "how-to-trade": "How to Trade in Unlisted Shares/Pre-IPO Shares",
};

const FaqPage = () => {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data, isLoading, isError } = useFaqDetails();
  console.log('data', data)

  // ✅ Categorize FAQs dynamically and sort "about" first
  const categorizedFaqs = useMemo(() => {
    // ✅ Safe check: agar data ya data.faq array nahi hai to empty object return karo
    if (!data || !Array.isArray(data.faq)) {
      return { grouped: {}, orderedCategories: [] };
    }

    const grouped: Record<string, typeof data.faq> = {};

    data.faq.forEach((faq) => {
      if (!grouped[faq.category]) grouped[faq.category] = [];
      grouped[faq.category].push(faq);
    });

    const orderedCategories = Object.keys(grouped).sort((a, b) => {
      if (a === "about") return -1; // ✅ Pehle "about" category show ho
      if (b === "about") return 1;
      return a.localeCompare(b); // ✅ Baaki alphabetically sort ho
    });

    return { grouped, orderedCategories };
  }, [data]);

  // ✅ Set default active category (about first)
  React.useEffect(() => {
    if (categorizedFaqs.orderedCategories.length > 0 && !activeCategory) {
      setActiveCategory(categorizedFaqs.orderedCategories[0]);
    }
  }, [categorizedFaqs, activeCategory]);

  const toggleQuestion = (q: string) => {
    setOpenQuestion(openQuestion === q ? null : q);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {data?.title || "Got Questions?"}
            </h2>
            <div className="mt-4 text-gray-600 text-sm">
              {isLoading ? (
                <SkeletonLoader />
              ) : (

                <div
                  className="text-base leading-relaxed text-gray-800 [&>p]:mb-4 [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:list-inside [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:mb-4 [&>strong]:font-bold [&>a]:text-blue-600 [&>a]:underline"
                  dangerouslySetInnerHTML={{ __html: data?.description || "" }}
                />

                // <div
                //   className="px-6 py-3"
                //   dangerouslySetInnerHTML={{ __html: data?.description || "" }}
                // />
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src={`${environmentVariables.UPLOAD_URL}/setting/${data?.image}` || AppImages.faq.faqBanner}
              alt="FAQ Banner"
              width={500}
              height={500}

              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#F7F7F7] py-16 px-4" id="faq-section">
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <SkeletonLoader className="h-12 mb-2" />
          ) : (
            <>
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-4 justify-center mb-10">
                {categorizedFaqs.orderedCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setOpenQuestion(null);
                    }}
                    className={`px-6 py-2 rounded-full font-medium transition ${activeCategory === cat
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {categoryLabels[cat] ?? cat}
                  </button>
                ))}
              </div>

              {/* Active Category Questions */}
              {activeCategory && (
                <div className="space-y-4">
                  {categorizedFaqs.grouped[activeCategory]?.map((faq) => (
                    <div
                      key={faq._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(faq._id)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center font-semibold text-gray-800 hover:bg-gray-50"
                      >
                        {faq.question}
                        {openQuestion === faq._id ? (
                          <FaMinus className="text-green-600" />
                        ) : (
                          <FaPlus className="text-green-600" />
                        )}
                      </button>
                      {openQuestion === faq._id && (
                        <div className="px-6 py-3 text-gray-600 text-sm">
                                          <div
                  className="text-base leading-relaxed text-gray-800 [&>p]:mb-4 [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:list-inside [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:mb-4 [&>strong]:font-bold [&>a]:text-blue-600 [&>a]:underline"
                  dangerouslySetInnerHTML={{ __html: faq.answer || "" }}
                />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Contact CTA */}
          {!isLoading && (
            <div className="mt-16 bg-green-600 text-white p-8 rounded-lg text-center">
              <h4 className="text-2xl font-semibold mb-3">
                Didn’t find your answer?
              </h4>
              <p className="mb-5">
                Talk to a Unlisted Edge executive and get instant clarity.
              </p>
              <Link
                href="/contact-us"
                className="inline-block bg-white text-green-700 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition"
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FaqPage;
