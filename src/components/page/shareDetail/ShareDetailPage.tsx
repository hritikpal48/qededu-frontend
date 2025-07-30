import React from "react";
import { ProductPriceSection } from "./ProductPriceSection";
import { ChartUnavailable } from "./ChartUnavailable";
import { TimeRangeSelector } from "./TimeRangeSelector";
import { FundamentalsCard } from "./FundamentalsCard";
import { FinancialTabs } from "./FinancialTabs";
import { DownloadSection, EventsTable, PromotersTable, ShareholdingPattern } from "./Shareholding";
import { BuySellBox, CreateAlert, DownloadApp, ValuationMeter } from "./RightShareSidebar";

const ShareDetailPage = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="md:col-span-2">
          <ProductPriceSection
            name="A V Thomas & Co. Limited Unlisted Shares"
            price={1250}
            change="↑ 20 (1.62%)"
          />
          <ChartUnavailable />
          <TimeRangeSelector />
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              About A V Thomas & Co. Limited
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              A V Thomas & Co. Ltd was incorporated during the year 1935 with
              three businesses: Tea, Manufacturing, and Exports. The company
              manages Plantation Products Division, Trading, Logistics,
              Production, Services, and Shipping Divisions. The Group consists
              of core and non-core segment products like blended and specialty
              teas.
            </p>
          </div>
          <FundamentalsCard />
          <FinancialTabs/>
          <ShareholdingPattern />
          <EventsTable />
          <PromotersTable />
          <DownloadSection />
        </div>

        {/* Right Sidebar */}
        <div>
          <BuySellBox />
          <CreateAlert />
          <ValuationMeter />
          <DownloadApp />
        </div>
      </div>
    </>
  );
};

export default ShareDetailPage;
