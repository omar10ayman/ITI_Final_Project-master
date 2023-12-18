import React, { useContext, useEffect, useRef } from "react";
import { Main } from "../../Components/Main/Main";
import { Header } from "../../Components/Header/Header";
import { MainBookFlight } from "../../Components/MainBookFlight.jsx/MainBookFlight";
import { Helmet } from "react-helmet";
import { searchContext } from "../../store/searchStore";
const LandingPage = () => {
  let { authorized, scrollToTopPage , currentUserObj } = useContext(searchContext);
  console.log(authorized, "autho");
  const topRef = useRef();
  console.log(currentUserObj?.favourites)
  useEffect(() => {
    scrollToTopPage(topRef);
  }, []);
  // let winowScroll = () => {
  //   const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  //   if (Math.ceil(window.scrollY) > scrollableHeight) {
  //     console.log('hi')
  //   }
  // };
  // document.addEventListener("scroll", winowScroll);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>TravelTales</title>
      </Helmet>
      <div ref={topRef} />
      <Header />
      <Main />
      <MainBookFlight />
    </>
  );
};

export default LandingPage;
