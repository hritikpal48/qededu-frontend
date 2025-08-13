'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import placeholderimage from "../../../../../../public/images/placeholderImage.png";

const customLoader = ({ src }: { src: string }) => {
  return src.startsWith("http") ? src : `${src}`;
};

export default function MyShareTab() {
    const [activeSubTab, setActiveSubTab] = useState<"buy" | "sell">("buy");


    return (
        <div>
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-10">
            <button
              className={`px-4 py-2 font-medium w-[50%] cursor-pointer ${
                activeSubTab === "buy"
                  ? "border-b-2 bg-[#E9F7E8] text-green-500"
                  : "text-gray-600 hover:text-green-500"
              }`}
              onClick={() => setActiveSubTab("buy")}
            >
              Buy
            </button>
            <button
              className={`px-4 py-2 font-medium w-[50%] cursor-pointer ${
                activeSubTab === "sell"
                  ? "border-b-2 bg-[#E9F7E8] text-green-500"
                  : "text-gray-600 hover:text-green-500"
              }`}
              onClick={() => setActiveSubTab("sell")}
            >
              Sell
            </button>
          </div>

          {/* Buy Tab Content */}
          {activeSubTab === "buy" && (
            <>
              <h2 className="text-[22px] font-semibold mb-4">
                My Share - <span className="text-green-600">Buy</span>
              </h2>
              <div className="overflow-x-auto border-t border-gray-200">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="px-4 py-3 font-bold text-sm text-gray-700">
                        Company Name
                      </th>
                      <th className="px-4 py-3 font-bold text-sm text-gray-700">
                        Unlisted Share Price
                      </th>
                      <th className="px-4 py-3 font-bold text-sm text-gray-700">
                        IPO Price{" "}
                      </th>
                      <th className="px-4 py-3 font-bold text-sm text-gray-700">
                        CMP
                      </th>
                      <th className="px-4 py-3 font-bold text-sm text-gray-700">
                        Gain or Loss
                      </th>
                      <th className="px-4 py-3 font-bold text-sm text-gray-700">
                        <button>Details</button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 flex items-center gap-2">
                        <Image
                          src={placeholderimage.src}
                          alt="placeholderimage"
                          width={24}
                          height={24}
                          className="rounded-sm"
                          loader={customLoader}
                        />
                        <Link
                          href="/"
                          className="ml-2 text-sm font-medium text-dark hover:underline"
                        >
                          Kitra Rosario test
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm">877</td>
                      <td className="px-4 py-3 text-sm">877</td>
                      <td className="px-4 py-3 text-sm">877</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-2 bg-green-100 text-green-700">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM385 215c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71L280 392c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-214.1-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 103c9.4-9.4 24.6-9.4 33.9 0L385 215z"></path>
                          </svg>{" "}
                          877%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Link href="">
                          <FaRegEye />
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Sell Tab Content */}
          {activeSubTab === "sell" && (
            <>
              <h2 className="text-[22px] font-semibold mb-4">
                My Share - <span className="text-yellow-600">Sell</span>
              </h2>
              <div className="overflow-x-auto border-t border-gray-200">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="px-4 py-3 font-bold text-sm text-gray-700">
                        Company Name
                      </th>
                      <th className="px-4 py-3 font-bold text-sm text-gray-700">
                        Unlisted Share Price
                      </th>
                      <th className="px-4 py-3 font-bold text-sm text-gray-700">
                        IPO Price{" "}
                      </th>
                      <th className="px-4 py-3 font-bold text-sm text-gray-700">
                        CMP
                      </th>
                      <th className="px-4 py-3 font-bold text-sm text-gray-700">
                        Gain or Loss
                      </th>
                      <th className="px-4 py-3 font-bold text-sm text-gray-700">
                        <button>Details</button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 flex items-center gap-2">
                        <Image
                          src={placeholderimage}
                          alt="placeholderimage"
                          width={24}
                          height={24}
                          className="rounded-sm"
                          loader={customLoader}
                        />
                        <Link
                          href="/"
                          className="ml-2 text-sm font-medium text-dark hover:underline"
                        >
                          Kitra Rosario test
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm">877</td>
                      <td className="px-4 py-3 text-sm">877</td>
                      <td className="px-4 py-3 text-sm">877</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-2 bg-green-100 text-green-700">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM385 215c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71L280 392c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-214.1-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 103c9.4-9.4 24.6-9.4 33.9 0L385 215z"></path>
                          </svg>{" "}
                          877%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Link href="">
                          <FaRegEye />
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
    );
  }
  