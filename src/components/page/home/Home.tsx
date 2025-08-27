"use client";
import BlogCard from "../blog";
import ExploreInvest from "./ExploreInvest";
import HeroBanner from "./HeroBanner";
import InfoSection from "./InfoSection";
import ProcessSteps from "./ProcessSteps";
import SharesList from "./SharesList";
import StockList from "./StockList";
import { useFetchStockList } from "@/services/stock.service";
import { GetStockListApiParams, StockData } from "@/types/stock";
import { useState, useMemo } from "react";

const Home = () => {
  const [params, setParams] = useState<GetStockListApiParams>({
    page: 1,
    limit: 10,
    keyword: "",
  });

  const { data, isLoading, refetch } = useFetchStockList(params);

  // Filter data for unlisted (type 1)
  const unlistedData = useMemo(() => {
    return data?.data?.filter((item: StockData) => item.type === 1) || [];
  }, [data]);

  // Filter data for IPO (type 4)
  const ipoData = useMemo(() => {
    return data?.data?.filter((item: StockData) => item.type === 3) || [];
  }, [data]);

  return (
    <>
      <HeroBanner />
      <InfoSection />

      {/* Pass filtered unlisted data */}
      <SharesList data={unlistedData} isLoading={isLoading} />

      <ExploreInvest />
      <ProcessSteps />

      {/* Pass filtered IPO data */}
      <StockList data={ipoData} isLoading={isLoading} />

      <BlogCard />
    </>
  );
};

export default Home;
