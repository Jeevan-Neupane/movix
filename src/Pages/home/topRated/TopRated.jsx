import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../Components/SwitchTabs/SwitchTabs";
import Crousel from "../../../Components/Crousel/Crousel";

import { useState } from "react";
import UseFetch from "../../../hooks/useFetch";

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = UseFetch(`/${endpoint}/top_rated`);

  const onTabChange = (tab, index) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };


  return (
    <div className="crouselSection">
      <ContentWrapper>
        <span className="crouselTitle">Top Rated</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Crousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default TopRated;
