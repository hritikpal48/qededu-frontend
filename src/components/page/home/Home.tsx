import BlogCard from "../blog";
import PastIpoTable from "../../ui/pastIpoTable/PastIpoTable";
import ExploreInvest from "./ExploreInvest";
import HeroBanner from "./HeroBanner";
import InfoSection from "./InfoSection";
import ProcessSteps from "./ProcessSteps";
import SharesList from "./SharesList";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <InfoSection />
      <SharesList />
      <ExploreInvest />
      <ProcessSteps />
      <PastIpoTable />
      <BlogCard />
    </>
  );
};

export default Home;
