"use client";
import AppImages from "@/config/constant/app.images";
import React, { useState } from "react";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { useFqaDetails } from "@/services/settings.service";
const customLoader = ({ src }: { src: string }) =>
  src.startsWith("http") ? src : `${src}`;

const faqData = [
  {
    category: "About Unlisted/Pre-IPO Shares",
    id: "about-unlisted",
    questions: [
      "What are unlisted/Pre-IPO Shares?",
      "Are the unlisted shares in demat form?",
      "If the company is not listed, how can it be in demat form?",
      "Is buying/selling based on tips or inside info?",
    ],
  },
  {
    category: "How to Trade in Unlisted Shares/Pre-IPO Shares",
    id: "how-to-trade",
    questions: [
      "How to buy unlisted shares?",
      "How to sell unlisted shares?",
      "What is the lock-in period for Pre-IPO shares?",
      "Can I buy shares of any company before IPO?",
    ],
  },
];

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState(faqData[0].id);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const { data, isLoading, isError } = useFqaDetails();
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
              Got Questions?
            </h2>

            {/* Render HTML safely */}
            <div className="mt-4 text-gray-600 text-sm">
              <div
                className="px-6 py-3"
                dangerouslySetInnerHTML={{ __html: data?.description || "" }}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src={AppImages.faq.faqBanner}
              alt="FAQ Banner"
              width={500}
              height={500}
              loader={customLoader}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#F7F7F7] py-16 px-4" id="faq-section">
        <div className="max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            {faqData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenQuestion(null);
                }}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  activeCategory === cat.id
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* Questions Accordion */}
          <div className="space-y-4">
            {faqData
              .find((cat) => cat.id === activeCategory)
              ?.questions.map((question, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(`${activeCategory}-${index}`)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    {question}
                    {openQuestion === `${activeCategory}-${index}` ? (
                      <FaMinus className="text-green-600" />
                    ) : (
                      <FaPlus className="text-green-600" />
                    )}
                  </button>
                  {openQuestion === `${activeCategory}-${index}` && (
                    <div className="px-6 py-3 text-gray-600 text-sm">
                      This is a placeholder answer for:{" "}
                      <strong>{question}</strong>. Replace it with real content.
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-green-600 text-white p-8 rounded-lg text-center">
            <h4 className="text-2xl font-semibold mb-3">
              Didn’t find your answer?
            </h4>
            <p className="mb-5">
              Talk to a Qed Edu executive and get instant clarity.
            </p>
            <Link
              href="/contact-us"
              className="inline-block bg-white text-green-700 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqPage;
