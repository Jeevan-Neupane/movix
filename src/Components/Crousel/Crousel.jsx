import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import { MyImage } from "../LazyLoadImage/Image";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../Genres/Genres";

import "./crousel.scss";

function Crousel({ data, loading, endpoint,title }) {
  const crouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = crouselContainer.current;
    const scollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    <div className="skeletonItem">
      <div className="posterBlock skeleton"></div>
      <div className="textBlock ">
        <div className="title skeleton"></div>
        <div className="date skeleton"></div>
      </div>
    </div>;
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {
          title && <div className="carouselTitle">
            {title}
          </div>
        }
        <BsFillArrowLeftCircleFill
          className="carouselLeftNavar arrow"
          onClick={() => navigation("left")}
        />

        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={crouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  className="carouselItem"
                  key={item.id}
                  onClick={() => {
                    navigate(`/${item.media_type || endpoint}/${item.id}`);
                  }}
                >
                  <div className="posterBlock">
                    <MyImage src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_Date).format("MMM D,YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem}
            {skItem}
            {skItem}
            {skItem}
            {skItem}
            {skItem}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Crousel;