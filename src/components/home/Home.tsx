import ExploreInvest from "./ExploreInvest";
import HeroBanner from "./HeroBanner";
import InfoSection from "./InfoSection";
import SharesList from "./SharesList";
import WhyUnlistedArena from "./WhyUnlistedArena";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <InfoSection/>
      <SharesList/>
      <ExploreInvest/>
      <WhyUnlistedArena/>
    </>
  );
};

export default Home;
