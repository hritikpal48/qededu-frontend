import BlogCard from "../blog";
import ExploreInvest from "./ExploreInvest";
import HeroBanner from "./HeroBanner";
import InfoSection from "./InfoSection";
import ProcessSteps from "./ProcessSteps";
import SharesList from "./SharesList";
import StockList from "./StockList";
const Home = () => {
  return (
    <>
      <HeroBanner />
      <InfoSection />
      <SharesList />
      <ExploreInvest />
      <ProcessSteps />
      <StockList />
      <BlogCard />
    </>
  );
};

export default Home;
