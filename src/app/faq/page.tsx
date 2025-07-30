"use client";
import React, { useState } from "react";
import Image from "next/image";
import faqBanner from "../../../public/images/faqBanner.jpg";
import { FaMinus, FaPlus } from "react-icons/fa";
import Link from "next/link";

const faqData = [
  {
    category: "About Unlisted/Pre-IPO Shares",
    id: "about-unlisted",
    questions: [
      "What are unlisted/Pre-IPO Shares?",
      "Are the unlisted shares in demat form?",
      "If the company is not listed, how can it be in demat form?",
      "Is buying/selling based on tips or inside info?",
      "Can a retail investor buy unlisted shares?",
      "What is the minimum amount required to invest?",
      "If the company is not listed, who manages the shares?",
      "If a company is not involved, how come the shares get credited?",
      "What is the role of Unlisted Arena here?",
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
      "How does the buyer pay for buying Unlisted Pre-IPO shares?",
      "Do I need to open a separate demat account to buy unlisted shares?",
      "How can the shares I buy be seen or credited to my demat account?",
      "How to directly handle off-market unlisted deals?",
      "Will the price of unlisted shares rise after IPO?",
      "What are the tax slabs for dividends, bonuses, or corporate actions?",
      "Why to trust Unlisted Arena?",
      "What are the risks involved in investments in Unlisted Pre-IPO shares?",
      "What are the tax implications for Unlisted Pre-IPO shares?",
    ],
  },
];

const page = () => {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleQuestion = (q: string) => {
    setOpenQuestion(openQuestion === q ? null : q);
  };

  return (
    <>
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Text */}
          <div className="w-full md:w-1.5/3">
            <h2 className="text-3xl md:text-[60px] font-bold text-gray-900 leading-tight">
              Got Questions? <br className="hidden md:block" />
              <span className="text-black">
                – We have answers for all your basic to advance level queries
              </span>
            </h2>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-4/3 flex justify-center">
            <Image
              src={faqBanner}
              alt="Looking for an Answer Illustration"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F7] py-16 px-4" id="faq-section">
        <div className="max-w-7xl mx-auto  flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <aside className="md:w-1/4">
            <div className="sticky top-24 space-y-4">
              <h3 className="text-[30px] font-bold text-gray-800">FAQ Topics</h3>
              <ul className="space-y-3 text-green-600 font-medium">
                {faqData.map((cat) => (
                  <li key={cat.id}>
                    <a href={`#${cat.id}`} className="text-[20px] hover:underline block">
                      {cat.category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:w-3/4 space-y-12">
            {faqData.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="text-[25px] font-bold text-gray-900 mb-4">
                  {section.category}
                </h2>
                <div className="space-y-4">
                  {section.questions.map((question, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-sm rounded-md overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(`${section.id}-${index}`)}
                        className="w-full text-left px-6 py-5 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold flex justify-between items-center"
                      >
                        {question}
                        <span className="ml-2">
                          {openQuestion === `${section.id}-${index}`
                            ? <FaMinus />
                            : <FaPlus />}
                        </span>
                      </button>
                      {openQuestion === `${section.id}-${index}` && (
                        <div className="px-4 py-3 text-gray-600 text-sm bg-white">
                          This is a placeholder answer for:{" "}
                          <strong>{question}</strong>. You can replace this with
                          real content or dynamically fetched FAQs.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Contact CTA */}
            <div className="mt-12 bg-green-600 text-white p-6 rounded-lg text-center">
              <h4 className="text-xl font-semibold mb-2">
                Have more questions?
              </h4>
              <p className="mb-4">
                Talk to a Qed Edu executive and get instant clarity.
              </p>
              <Link
                href="/contact-us"
                className="inline-block bg-white text-[#009966] font-semibold py-2 px-6 rounded hover:bg-gray-100 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
