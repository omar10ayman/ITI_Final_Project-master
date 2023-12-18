import React, { useContext } from "react";
import { addHotelsContext } from "../../store/store";
import { searchContext } from "../../store/searchStore";
import { Link } from "react-router-dom";

export const BookingBreacrumb = () => {
  const { hotelObj, getHotelsObj } = useContext(addHotelsContext);
  const { destination } = useContext(searchContext);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page">
          {hotelObj.title}
        </li>
      </ol>
    </nav>
  );
};
