import UseFetch from "../../hooks/useFetch";
import "./styleDetail.scss";
import Cast from "../../Components/Cast/Cast";
import VideosSection from "./videosSection/VideosSection";

import { useParams } from "react-router-dom";
import DetailsBanner from "./DetailsBanner/DetailsBanner";
import Similar from "./Crousel/Similar";
import Recommendation from "./Crousel/Recommendation";

function Details() {
  const { mediaType, id } = useParams();

  const { data, loading } = UseFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = UseFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
}

export default Details;
