import "./homestyle.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./Trending/Trending";
import Popular from "./Popular/Popular";
import TopRated from "./topRated/TopRated";

function Home() {
  return <div className="homePage">
    <HeroBanner/>
    <Trending/>
    <Popular/>
    <TopRated/>
  </div>;
}

export default Home;
