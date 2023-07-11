import React, { useState } from "react";
import { useParams } from "react-router-dom";

import dayjs from "dayjs";
import "./detail.scss";
import { MyImage } from "../../../Components/LazyLoadImage/Image";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper";
import useFetch from "../../../Hooks/useFetch";
import NoPoster from "../../../assets/no-poster.png";
import Genres from "../../../Components/Genres/Genres";
import CircleRating from "../../../Components/circleRating/CircleRating";
import { PlayIcon } from "../PlayButton";
import VideoPopup from "../../../Components/videoPop/VideoPop";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { mediaType, id } = useParams();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const generes = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => {
    return f.job === "Director";
  });

  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Writer" || f.job === "Story"
  );

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <MyImage src={url.backDrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <MyImage
                        className="posterImg"
                        src={url.backDrop + data.poster_path}
                      />
                    ) : (
                      <MyImage className="posterImg" src={NoPoster} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} (${dayjs(
                        data.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={generes} />

                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                    </div>
                    <div className="playbtn" onClick={() => {setShow(true) ;setVideoId(video.key)}}>
                      <PlayIcon />
                      <div className="text">Watch Trailer</div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <div className="text bold">Status: </div>
                          <div className="text">{data.status}</div>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <div className="text bold">Release Date: </div>
                          <div className="text">
                            {dayjs(data.release_date).format("MMM D,YYYY")}
                          </div>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <div className="text bold">Run Time: </div>
                          <div className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </div>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {director.map((d, i) => {
                            return (
                              <span key={i}>
                                {d.name}
                                {director.length - 1 !== i && ", "}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {writer.map((d, i) => {
                            return (
                              <span key={i}>
                                {d.name}
                                {writer.length - 1 !== i && ", "}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator: </span>
                        <span className="text">
                          {data?.created_by?.map((d, i) => {
                            return (
                              <span key={i}>
                                {d.name}
                                {data?.created_by?.length - 1 !== i && ", "}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
