import "./heroBanner.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { MyImage } from "../../../Components/LazyLoadImage/Image";
import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper";

function HeroBanner() {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, loading } = UseFetch("/movie/upcoming");
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    const bg =
      url.backDrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop_img">
          <MyImage src={background} />
        </div>
      )}
      <div className="opacity-layer">
        
      </div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies,TV shows and people to discover.Explore Now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for movies or TV shows..."
              onKeyUp={searchQueryHandler}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default HeroBanner;
