import React, { useContext, useEffect, useRef, useState } from "react";
import "./addhotels.css";
import SearchForm from "../../Components/SearchForm/SearchForm";
import SingleHotel from "./singleHotel";
import { useNavigate, useParams } from "react-router-dom";
import { addHotelsContext } from "../../store/store";
import { Helmet } from "react-helmet";
import Loading from "../../Components/Loading/Loading";
import { searchContext } from "../../store/searchStore";
import { Suspense, lazy } from "react";
export default function CountryHotelsPage() {
  const { countryTitle } = useParams();
  const {
    countryHotels,
    setCountryHotels,
    isFavorites,
    isFavoritesClick,
    countryCheck,
    setDestnation,
  } = useContext(addHotelsContext);
  const { searchData, setSeachData, scrollToTopPage,currentUserObj } =
    useContext(searchContext);
  const topRef = useRef();

  useEffect(() => {

    scrollToTopPage(topRef);
    console.log(countryHotels, "hoootels");
    if (countryTitle !== undefined) {
      setDestnation(countryTitle);
    }
  }, [countryTitle]);
  const checkFav = ()=>{

  }

  // useEffect(()=>{

  // },[countryTitle])
  // async function delayForDemo(promise) {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, 6000);
  //   }).then(() => promise);
  // }
//   // let LazySingle = lazy(() => delayForDemo(import("./singleHotel")));
// console.log(currentUserObj.favourites[0].id)
// console.log(currentUserObj.favourites[1].id)
// console.log(currentUserObj.favourites[2].id)
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${countryTitle}-Hotels`}</title>
      </Helmet>
      <div ref={topRef}>
        <div
          style={{
            width: "100%",
            marginTop: "150px",
          }}
        >
          <SearchForm />
        </div>

        {!countryCheck ? (
          countryHotels?.length !== 0 ? (
            countryHotels?.map((hotel, ind) => (
              <SingleHotel
                hotel={hotel}
                key={ind}
                countryTitle={countryTitle}
              />
            ))
          ) : (
            <Loading />
          )
        ) : (
          <span>noFound</span>
        )}
      </div>
    </>
  );
}
