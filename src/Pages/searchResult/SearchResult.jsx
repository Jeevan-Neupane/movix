import "./searchResult.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../Components/contentWrapper/ContentWrapper";
import noResults from "../../assets/no-results.png";
import MovieCard from "../../Components/MovieCard/MovieCard";
import Spinner from "../../Components/Spinner/Spinner";
function SearchResult() {
  const [data, setdata] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchIntialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setdata(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setdata({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setdata(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };
  useEffect(() => {
    setPageNum(1);
    fetchIntialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}

      {
        !loading  && (
          <ContentWrapper>
            {
              data?.results.length>0?(
                <>
                <div className="pageTitle">
                  {`Search ${data?.total_results>1 ?"results":"result"} of '${query}'`}
                </div>
                <InfiniteScroll className="content" dataLength={data?.results.length || []} next={fetchNextPageData} hasMore={pageNum<=data?.total_pages} loader={<Spinner/>}>
                  {
                    data.results.map((item,index)=>{
                      if(item.media_type==="person"){
                        return;
                      }
                      return (
                        <MovieCard key={index} data={item} fromSearch={true}/>
                      )

                    })
                  }
                </InfiniteScroll>
                </>


              ):(
                <span className="resultNotFound">
                  Sorry Result Not Found
                </span>
              )
            }
          </ContentWrapper>
        )
      }
    </div>
  );
}

export default SearchResult;
