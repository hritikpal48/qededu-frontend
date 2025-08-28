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
  const [params, setParams] = useState<GetStockListApiParams>({
    page: 1,
    limit: 10,
    keyword: "",
  });

    const [blogParams, setBlogParams] = useState<GetBlogListApiParams>({
    page: 1,
    limit: 10,
    // keyword: "",
    type:3
  });

  const { data, isLoading, refetch } = useFetchStockList(params);

  const { data:blogData, isLoading:blogLoading, refetch:blogRefetch } = useFetchBlogList(blogParams);


  const handlePageChange = useCallback((page: number) => {
    setParams((p) => ({ ...p, page }));
  }, []);

  const handleLimitChange = useCallback((limit: number) => {
    setParams((p) => ({ ...p, limit, page: 1 }));
  }, []);

  const unlistedData = useMemo(() => {
    return data?.data?.filter((item: StockData) => item.type === STOCK_TYPE.UNLISTED) || [];
  }, [data]);

  const ipoData = useMemo(() => {
    return data?.data?.filter((item: StockData) => item.type === STOCK_TYPE.ISO) || [];
  }, [data]);

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

      <SharesList data={unlistedData} isLoading={isLoading} />

      <ExploreInvest />
      <ProcessSteps />

      <StockList
        data={ipoData}
        loading={isLoading}
        page={params.page}
        perPage={params.limit}
        totalItems={ipoData?.length ?? 0}
        setPage={handlePageChange}
        setPerPage={handleLimitChange}
      />

<BlogPage blogData={blogDataFilter} blogLoading={blogLoading} isHomePage={true} /> 

   </>
  );
};

export default Home;
