import React, { useContext, useEffect, useState } from "react";
import SingleHotel from "../CountryHotels/singleHotel";
import { searchContext } from "../../store/searchStore";
import Loading from "../../Components/Loading/Loading";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import NoFavourite from "./noFavourite";
import SingleHotelTwo from "./SingleHotelTwo";
export const Favourites = () => {
  let [favItems, setFavItems] = useState(null);
  let { currentUserObj, authorized } = useContext(searchContext);
  let data = useLocation();
  console.log(data, "data");
  // currentUserObj?.favourites?.map(({ id }) => {
  //   console.log(id);
  // });
  useEffect(() => {
    setFavItems(currentUserObj?.favourites);
  }, [currentUserObj]);
  if (!authorized) {
    return <Navigate to="/login" />;
  }
  console.log(favItems, "fav");
  return (
    <div className="favParent">
      {favItems?.length === 0 ? (
        <NoFavourite />
      ) : (
        favItems?.map((hotel, ind) =>
          hotel.id == undefined ? (
            <SingleHotelTwo hotel={hotel} key={ind} isFavPage={"favPage"} />
          ) : (
            <SingleHotel hotel={hotel} key={ind} isFavPage={"favPage"} />
          )
        )
      )}
    </div>
  );
};
