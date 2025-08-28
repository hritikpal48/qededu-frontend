"use client";
import Link from "next/link";
import StockList from "../../home/StockList";

const PanUnlistedShare = () => {
  return (
    <>
      <div className="bg-white px-4 md:px-10 py-12 max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-green-700 mb-2">
          PAN & ISIN of Unlisted Shares
        </h1>
        <div className="py-5">
          <h3 className="font-bold text-[20px]">
            Get PAN and ISIN details of actively traded unlisted shares at one
            place.
          </h3>
          <p className="py-3">
            Investors may require information about PAN and ISIN of Unlisted
            Shares for:
          </p>
          <ul className="list-disc mx-5">
            <li className="pb-2">
              PAN Details of Unlisted Shares which maybe required by the
              investors for income-tax return filing purposes.
            </li>
            <li>
              ISIN Code of Unlisted Shares to identify as well as transfer
              unlisted shares from one demat account to another demat account.
            </li>
          </ul>
        </div>
      </div>

      {/* <StockList /> */}

      <div className="bg-white px-4 md:px-10 py-12 max-w-7xl mx-auto">
        <div className="text-center bg-green-600 text-white py-6 px-4 rounded-md">
          <p className="mb-3 text-[20px] font-semibold">
            Have a question? Contact us Now
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-white text-green-600 font-semibold px-5 py-2 rounded hover:bg-gray-100"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </>
  );
};

export default PanUnlistedShare;
