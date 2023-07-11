//*Optional Chaining is used
import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenresConfiguration } from "./Store/store";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/home/Home";
import Details from "./Pages/details/Details";
import SearchResult from "./Pages/searchResult/SearchResult";
import ErrorPage from "./Pages/404page/ErrorPage";
import Explore from "./Pages/explore/Explore";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.home);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);
  const fetchApiConfig = async () => {
    try {
      const data = await fetchDataFromApi("/configuration");
      const url = {
        backDrop: data.images.secure_base_url + "original",
        poster: data.images.secure_base_url + "original",
        profile: data.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    } catch (error) {
      console.log(error);
    }
  };

  const genresCall = async () => {
    let promise = [];
    let endpoint = ["tv", "movie"];

    let allGeneres = {};

    endpoint.forEach((url) => {
      promise.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promise);
    data.map(({ genres }) => {
      return genres.map((item) => {
        return (allGeneres[item.id] = item);
      });
    });
    dispatch(getGenresConfiguration(allGeneres));
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Header />} />
        <Route path="/" element={<Home />} />
        <Route path=":mediaType/:id" element={<Details />} />
        <Route path="search/:query" element={<SearchResult />} />
        <Route path="explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<ErrorPage />} />
        <Route element={<Footer />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
