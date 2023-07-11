import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../Components/SwitchTabs/SwitchTabs";
import Crousel from "../../../Components/Crousel/Crousel";

import { useState } from "react";
import UseFetch from "../../../hooks/useFetch";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const { data, loading } = UseFetch(`/trending/all/${endpoint}`);

  const onTabChange = (tab, index) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };


  return (
    <div className="crouselSection">
      <ContentWrapper>
        <span className="crouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Crousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
