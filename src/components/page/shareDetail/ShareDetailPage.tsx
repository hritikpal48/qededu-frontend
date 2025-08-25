"use client"
import React, { useEffect } from "react";
import { ProductPriceSection } from "./ProductPriceSection";
import { ChartUnavailable } from "./ChartUnavailable";
import { TimeRangeSelector } from "./TimeRangeSelector";
import { FundamentalsCard } from "./FundamentalsCard";
import { BuySellBox, CreateAlert, DownloadApp, ValuationMeter } from "./RightShareSidebar";
import { useSearchParams } from 'next/navigation';
import { useFetchStockDetails } from "@/services/stock.service";
const ShareDetailPage = () => {
  const searchParams = useSearchParams()
  const id: string | null = searchParams.get('id');
  const { data, isLoading, refetch } = useFetchStockDetails(id);

  useEffect(() => {
    refetch();
  }, [id]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="md:col-span-2">
          <ProductPriceSection
            name={data?.name ?? ''}
            price={data?.price ?? 0}
            change="↑ 20 (1.62%)"
          />
          <ChartUnavailable />
          <TimeRangeSelector />
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              {data?.name ?? ''}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {data?.about}
            </p>
          </div>
          <FundamentalsCard data={data?.fundamentals} name={data?.name ?? ''} sharePrice={data?.price ?? 0} />
          {/* <FinancialTabs /> */}
          {/* <ShareholdingPattern /> */}
          {/* <EventsTable /> */}
          {/* <PromotersTable /> */}
          {/* <DownloadSection /> */}
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
