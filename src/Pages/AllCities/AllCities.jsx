import React, { useContext, useEffect, useRef, useState } from "react";
import all from "../../data/city.json";
import axios from "axios";
import { Card } from "../../Components/Card/Card";
import "./allCities.css";
import Loading from "../../Components/Loading/Loading";
import { searchContext } from "../../store/searchStore";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import image from "../../assets/loginImg.png";
function AllCities({ scrollPosition }) {
  const { scrollToTopPage } = useContext(searchContext);
  const [cityImg, setCity] = useState([]);
  const topRef = useRef();

  const getAllCities = async () => {
    let arr = [];
    // const url =
    //   "https://nomad-list-cities.p.rapidapi.com/nomad-list/europe?size=30&page=1&sort=desc&sort_by=overall_score";
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "X-RapidAPI-Key": "872d9711d6msh649af9c6f912c09p1fa3ffjsn9fd6f1d47461",
    //     "X-RapidAPI-Host": "nomad-list-cities.p.rapidapi.com",
    //   },
    // };
    // const res = await fetch(url, options);
    // const data = await res.json();
    const cities = all.map((c) => c.name);
    for (let i = cities.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let k = cities[i];
      cities[i] = cities[j];
      cities[j] = k;
    }
    const spliceCities = cities.splice(0, 25);
    for (let i = 0; i < spliceCities.length; i++) {
      const res = await axios.get(
        `https://api.pexels.com/v1/search/?page=1&per_page=2&query=${spliceCities[i]}`,
        {
          headers: {
            Authorization:
              "SdaCPFt3E5Z1tam3Ts9kMios6LXoIvexDn9Z4ZP8v8kRmI6AwNaSGw4S",
          },
        }
      );
      arr.push({
        img: res.data?.photos[0]?.src?.original,
        title: spliceCities[i],
        id: Math.floor(Math.random() * 1000),
      });
    }
    console.log(arr);
    setCity([...arr]);
    console.log(arr, "cities");
  };

  useEffect(() => {
    getAllCities();
    scrollToTopPage(topRef);
  }, []);

  return (
    <div
      ref={topRef}
      className="container city mb-3 d-flex flex-wrap gap-3 justify-content-center align-items-center"
    >
      {cityImg.length ? (
        cityImg.map((city) => (
          // <LazyLoadImage
          //   scrollPosition={scrollPosition}
          //   width="100%"
          //   height="auto"
          //   src={city.img}
          //   effect="blur"
          // />

          <Card
            img={city.img}
            title={city.title}
            key={city.id}
            buttonName={"Book a Hotel"}
            pathTo={`/CountryHotels/${city.title}`}
          />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default trackWindowScroll(AllCities);
