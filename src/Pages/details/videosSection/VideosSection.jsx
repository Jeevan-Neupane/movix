import React, { useState } from "react";

import "./videosSection.scss";

import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../PlayButton";
import VideoPopup from "../../../Components/videoPop/VideoPop";
import { MyImage } from "../../../Components/LazyLoadImage/Image";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
   


    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {
                            data?.results?.map((video)=>{
                               return <div className="videoItem" onClick={()=>{
                                    setVideoId(video.key) 
                                    setShow(true)
                                    
                                }} key={video.id}>
                                    <div className="videoThumbnail">
                                        <MyImage src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}/>
                                        <PlayIcon/>
                                    </div>
                                    <div className="videoTitle">
                                        {video.name}
                                    </div>
                               
                                </div>
                            })
                        }
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;