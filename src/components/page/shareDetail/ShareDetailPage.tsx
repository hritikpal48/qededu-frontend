"use client";
import React, { useEffect, useState } from "react";
import { ProductPriceSection } from "./ProductPriceSection";
import { TimeRangeSelector } from "./TimeRangeSelector";
import { FundamentalsCard } from "./FundamentalsCard";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import {
  BuySellBox,
  CreateAlert,
  DownloadApp,
  ValuationMeter,
} from "./RightShareSidebar";
import { useSearchParams } from "next/navigation";
import {
  useFetchStockBySlug,
  useFetchStockDetails,
} from "@/services/stock.service";
import { useFetchStockChart } from "@/services/myshare.service";
import { ChartRange } from "@/types/myshareType";
import CommonHighChart from "@/components/CommonHighCharts";

type ShareDetailPageProps = {
  slug: string;
};

const ShareDetailPage = ({ slug }: ShareDetailPageProps) => {
  const [range, setRange] = useState<ChartRange>(ChartRange.MAX);

  // ✅ Fetch stock data
  const { data: stockData, isLoading: stockLoading, refetch: stockRefetch } = 
    useFetchStockBySlug(slug);

  // ✅ Fetch chart data with proper dependency
  const { data: chartData, isLoading: chartLoading, refetch: chartRefetch } =
    useFetchStockChart(stockData?._id, range);

  console.log('Chart Data:', chartData);

  // ✅ Refetch data when slug or range changes
  useEffect(() => {
    if (slug) {
      stockRefetch();
    }
  }, [slug, stockRefetch]);

  useEffect(() => {
    if (stockData?._id && range) {
      chartRefetch();
    }
  }, [stockData?._id, range, chartRefetch]);

  // ✅ Calculate price change from chart data
  const calculatePriceChange = () => {
    if (!chartData?.stats) return "No change data";
    
    const { changeAbs, changePct } = chartData.stats;
    const symbol = changeAbs >= 0 ? "↑" : "↓";
    const color = changeAbs >= 0 ? "text-green-600" : "text-red-600";
    
    return (
      <span className={color}>
        {symbol} {Math.abs(changeAbs)} ({Math.abs(changePct).toFixed(2)}%)
      </span>
    );
  };

  // ✅ Loading state
  if (stockLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Skeleton */}
        <div className="md:col-span-2 space-y-6">
          <SkeletonLoader className="h-10 w-1/2" />
          <SkeletonLoader className="h-80 w-full" />
          <SkeletonLoader className="h-12 w-1/3" />
          <SkeletonLoader className="h-24 w-full" />
          <SkeletonLoader className="h-48 w-full" />
        </div>

        {/* Right Sidebar Skeleton */}
        <div className="space-y-4">
          <SkeletonLoader className="h-32 w-full" />
          <SkeletonLoader className="h-20 w-full" />
        </div>
      </div>
    );
  }

  // ✅ Error state
  if (!stockData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <div className="text-red-600 text-lg">Stock not found</div>
        <div className="text-gray-500 text-sm mt-2">
          Please check the stock symbol and try again.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left Content */}
      <div className="md:col-span-2 space-y-6">
        {/* ✅ Price Section */}
        <ProductPriceSection
          name={stockData.name}
          price={chartData?.stats?.latest || stockData.price || 0}
          // change={calculatePriceChange()}
          change="↑ 20 (1.62%)"
        />

        {/* ✅ Chart Section */}
        <div className="bg-white">
          {chartLoading ? (
            <SkeletonLoader className="h-80 w-full rounded-lg" />
          ) : (
            <CommonHighChart
              name={stockData.name}
              series={chartData?.series}
              flags={chartData?.flags}
            />
          )}
        </div>

        {/* ✅ Time Range Selector */}
        <TimeRangeSelector 
          selected={range} 
          onSelect={setRange} 
        />

        {/* ✅ Company Description */}
        {stockData.about && (
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">
              About {stockData.name}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {stockData.about}
            </p>
          </div>
        )}

        {/* ✅ Fundamentals */}
        <FundamentalsCard
          data={stockData.fundamentals}
          name={stockData.name}
          sharePrice={chartData?.stats?.latest || stockData.price || 0} 
        />
      </div>

      {/* ✅ Right Sidebar */}
      <div className="space-y-4">
        <BuySellBox
          minQuantity={stockData.buyMinQuantity}
          price={chartData?.stats?.latest || stockData.price}
          name={stockData.name}
          stockId={stockData._id}
        />
        
        {/* Add other sidebar components here if needed */}
        {/* <CreateAlert />
        <ValuationMeter />
        <DownloadApp /> */}
      </div>
    </div>
  );
};

export default ShareDetailPage;