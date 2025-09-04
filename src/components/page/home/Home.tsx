"use client";
import { BLOG_TYPE, STOCK_TYPE } from "@/utils/constant";
import BlogPage from "../blog";
import ExploreInvest from "./ExploreInvest";
import HeroBanner from "./HeroBanner";
import InfoSection from "./InfoSection";
import ProcessSteps from "./ProcessSteps";
import SharesList from "./SharesList";
import StockList from "./StockList";
import { useFetchStockList } from "@/services/stock.service";
import { GetStockListApiParams, StockData } from "@/types/stock";
import { useState, useMemo, useCallback } from "react";
import { BlogData, GetBlogListApiParams } from "@/types/blogType";
import { useFetchBlogList } from "@/services/blog.service";
const Home = () => {
  // SharesList ke liye params (type: 1)
  const [sharesParams, setSharesParams] = useState<GetStockListApiParams>({
    page: 1,
    limit: 10,
    keyword: "",
    type: STOCK_TYPE.UNLISTED
  });

  // StockList ke liye params (type: 4)
  const [stockParams, setStockParams] = useState<GetStockListApiParams>({
    page: 1,
    limit: 10,
    keyword: "",
    type: STOCK_TYPE.IPO
  });

  const [blogParams, setBlogParams] = useState<GetBlogListApiParams>({
    page: 1,
    limit: 10,
    // keyword: "",
    type: 3
  });

  // SharesList ke liye API call
  const { data: sharesData, isLoading: sharesLoading, refetch: sharesRefetch } = useFetchStockList(sharesParams);

  // StockList ke liye API call
  const { data: stockData, isLoading: stockLoading, refetch: stockRefetch } = useFetchStockList(stockParams);

  // Blog data ke liye API call
  const { data: blogData, isLoading: blogLoading, refetch: blogRefetch } = useFetchBlogList(blogParams);

  const handleStockPageChange = useCallback((page: number) => {
    setStockParams((p) => ({ ...p, page }));
  }, []);

  const handleStockLimitChange = useCallback((limit: number) => {
    setStockParams((p) => ({ ...p, limit, page: 1 }));
  }, []);



  const blogDataFilter = useMemo(() => {
    if (Array.isArray(blogData)) {
      return blogData.filter((item: BlogData) => item.type === BLOG_TYPE.NEWS);
    }
    return [];
  }, [blogData]);
  return (
    <>
      <HeroBanner />
      <InfoSection />

      <SharesList data={sharesData?.data ?? []} isLoading={sharesLoading} isHomePage={true} />

      <ExploreInvest />
      <ProcessSteps />
      <StockList
        data={stockData?.data ?? []}
        loading={stockLoading}
        page={stockParams.page}
        perPage={stockParams.limit}
        totalItems={stockData?.totalItems ?? 0}
        setPage={handleStockPageChange}
        setPerPage={handleStockLimitChange}
      />

      <BlogPage blogData={blogDataFilter} blogLoading={blogLoading} isHomePage={true} /> 

    </>
  );
};

export default Home;
