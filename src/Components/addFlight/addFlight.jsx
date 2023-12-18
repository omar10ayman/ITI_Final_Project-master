import React, { useEffect, useState } from "react";
import SingleHotel from "../../Pages/CountryHotels/singleHotel";
import { useParams } from "react-router-dom";
import axios from "axios";
import SingleAirport from "../singleAirport/singleAirport";

const AddFlightCard = () => {
  const [flights, setFlights] = useState([]);
  const { cityTitle } = useParams();

  const paramters = {
    headers: {
      "X-RapidAPI-Key": "7b9800b3e8msh60444ec86e43414p1c3014jsn665d3a4a422a",
      "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
    },
  };

  async function getFlightsData() {
    await axios
      .get(
        `https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${cityTitle}`,
        paramters
      )
      .then((response) => {
        setFlights(response?.data?.data);
        console.log(response?.data?.data, "flights");
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getFlightsData();
  }, [cityTitle]);

  return (
    <div className="mt-5 pt-5">
      {flights?.map((item) => (
        
        <SingleAirport
          name={item.name}
          country={item.countryName}
          photo={item.photoUri}
        />
      ))}
      {/* <SingleHotel hotel={hotel} key={ind} countryTitle={countryTitle} /> */}
    </div>
  );
};

export default AddFlightCard;
