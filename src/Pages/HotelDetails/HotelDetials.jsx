import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addHotelsContext } from "../../store/store";
import "./hotelDetials.css";
import stars from "./assets/Frame 52.png";
import star from "./assets/Stars.png";
import locationIcon from "./assets/Location.png";
import unFillFav from "./assets/Vector.png";
import FillFav from "./assets/heart.png";
import share from "./assets/Share.png";
import imgHotel from "./assets/Rectangle 3.png";
import "bootstrap/js/dist/carousel";
import Loading from "../../Components/Loading/Loading";
import { searchContext } from "../../store/searchStore";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
export default function HotelDetials() {
  const { getHotelsObj, hotelObj, isFavorites, isFavoritesClick } =
    useContext(addHotelsContext);
  const { scrollToTopPage, updateCurrentUser, currentUserObj } =
    useContext(searchContext);
  const { id } = useParams();
  const topRef = useRef();
  let navigate = useNavigate();

  const [isFav, setIsFav] = useState(false);

  let locate = useParams();
  function getLocate() {
    console.log(locate);
  }

  useEffect(() => {
    // scrollToTopPage(topRef);
    console.log(id, "id");
    console.log(hotelObj);
    if (hotelObj.id === undefined) {
      getHotelsObj(id);
    }
    // const colRef = collection(database, "hotels");
    // addDoc(colRef, { id: id, details: hotelObj }).then((data) =>
    //   console.log(data, "hotel details ")
    // );

    console.log(hotelObj, "hotelObj");
  }, []);

  function clickedFav() {
    setIsFav(true);
    updateCurrentUser({ favourites: [...currentUserObj.favourites, hotelObj] });
    if (isFav) {
      setIsFav(false);
      let deletedFav = currentUserObj.favourites.filter(
        (hotel) => hotel.id !== id
      );
      updateCurrentUser({ favourites: [...deletedFav] });
    }
  }

  const checkfav = (hotelObj) => {
    let FoundId = currentUserObj?.favourites?.find(({ id }) => id == hotelObj?.id);
    if (FoundId === undefined) {
      setIsFav(false);
    } else {
      setIsFav(true);
    }
  };

  useEffect(() => {
    checkfav(hotelObj);
  }, []);

  const reviews = ["Near park", "Clean hotel", "Near theater"];
  const amenitiesList = [
    { iconClass: "fa-solid fa-door-open", text: "Outdoor" },
    { iconClass: "fa-solid fa-person-swimming", text: "Open pool" },
    { iconClass: "fa-solid fa-spa", text: "Spa and wellness center" },
    { iconClass: "fa-solid fa-utensils", text: "Restaurant" },
    { iconClass: "fa-solid fa-bell", text: "Room servies" },
    { iconClass: "fa-solid fa-dumbbell", text: "Fitness room" },
    { iconClass: "fa-solid fa-martini-glass", text: "BarLounage" },
    { iconClass: "fa-solid fa-wifi", text: "Free wifi" },
    { iconClass: "fa-solid fa-mug-hot", text: "TeaCaffea machine" },
  ];
  const usersReviews = [
    { name: "Omar ayman", rate: "5.0 Amazing" },
    { name: "Mohamed Gaber", rate: "4.5 Exeleant" },
    { name: "Mohamed gemy", rate: "3.5 Good" },
    { name: "Mahmoud Ragb", rate: "4.0 very good" },
  ];

  const randNum = Math.round(Math.random() * 5);

  return hotelObj.length !== 0 ? (
    <div ref={topRef} className="container details">
      {/* title and price  */}
      <div className="d-flex flex-md-row flex-column">
        <div className="col-md-11 col-12">
          <div className="d-flex flex-column flex-md-row ">
            <h3>{hotelObj.title}</h3>
            <div className="d-flex">
              <div className="px-2 p-1 d-flex gap-1 rateStars">
                {[1, 2, 3, 4, 5]
                  .slice(0, Math.floor(hotelObj?.rating))
                  .map((item) => (
                    <BsStarFill key={item} size={20} />
                  ))}
                {[1, 2, 3, 4, 5]
                  .slice(
                    Math.floor(hotelObj?.rating),
                    Math.floor(hotelObj?.rating) + 1
                  )
                  .map((item) => (
                    <BsStarHalf key={item} size={20} />
                  ))}
                {[1, 2, 3, 4, 5]
                  .slice(Math.floor(hotelObj?.rating) + 1)
                  .map((item) => (
                    <BsStar key={item} size={20} />
                  ))}
                {/* <img src={stars} alt="" /> */}
              </div>
              <p className="p-1">{hotelObj?.rating} stars</p>
            </div>
          </div>
          <p className="text-muted">
            <span>
              <img src={locationIcon} alt="" />
            </span>
            {hotelObj?.location?.address}
          </p>
        </div>
        <p className="text-muted">
          starting from
          <br />
          <p style={{ color: "salmon", fontSize: "20px" }}>$240/night</p>
        </p>
      </div>
      {/* button */}
      <div className="d-flex flex-md-row flex-column justify-content-between align-items-lg-center">
        <div className="d-flex flex-row mt-4 gap-3 ">
          <div>
            <p className="text-muted box-rate">{hotelObj?.rating}</p>
          </div>
          <p className="m-text">
            {hotelObj?.rankingDetails?.replace(/[<a></a>]/g, "")}
          </p>
          <p className="m-text text-muted">{hotelObj?.numberReviews} Reviews</p>
        </div>
        <div className="d-flex gap-3">
          <div  onClick={clickedFav} className="col-3 col-md-1 favIcon">
            {isFav ? (
              <img src={FillFav} alt="" />
            ) : (
              <img src={unFillFav} alt="" />
            )}
          </div>
          <div className="col-3 col-md-1 favIcon" onClick={getLocate}>
            <img src={share} alt="" />
          </div>
          <button
            className="button-style"
            onClick={() => navigate(`/bookingDetails/${id}`)}
          >
            Book Now
          </button>
        </div>
      </div>
      {/* carsoul */}
      <div className="  d-flex justify-content-center my-3">
        <div
          id="carouselExampleCaptions"
          className="carousel slide carouselDiv w-75 rounded-3 overflow-hidden"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            {[1, 2, 3].map((item) => (
              <button
                key={item}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={`${item}`}
                aria-label={`Slide ${item + 1}`}
              />
            ))}
          </div>
          <div className="carousel-inner">
            {hotelObj.photos ? (
              <>
                <div className="carousel-item active w-100">
                  <img
                    style={{ objectFit: "cover" }}
                    src={hotelObj?.photos[0]?.urlTemplate
                      ?.replace("{width}", "500")
                      .replace("{height}", "200")}
                    className="w-100"
                    alt="..."
                  />
                </div>
                {[1, 2, 3].map((item) => (
                  <div key={item} className="carousel-item w-100">
                    <img
                      style={{ objectFit: "cover" }}
                      src={hotelObj?.photos[item]?.urlTemplate
                        ?.replace("{width}", "500")
                        .replace("{height}", "200")}
                      className="w-100"
                      alt="..."
                    />
                  </div>
                ))}
              </>
            ) : (
              <div className="carousel-item w-100">
                <img src={imgHotel} className="w-100" alt="..." />
              </div>
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <hr className="my-5" />
      {/* overview */}
      <div>
        <h4>Overview</h4>
        <p className="text-muted ">
          Located in Taksim Gmsuyu, the heart of Istanbul, the CVK Park
          Bosphorus Hotel Istanbul has risen from the ashes of the historic Park
          Hotel, which also served as Foreign Affairs Palace 120 years ago and
          is hosting its guests by assuming this hospitality mission. With its
          452 luxurious rooms and suites, 8500 m2 SPA and fitness area, 18
          meeting rooms including 4 dividable ones and 3 terraces with Bosphorus
          view, Istanbuls largest terrace with Bosphorus view (4500 m2) and
          latest technology infrastructure, CVK Park Bosphorus Hotel Istanbul is
          destined to be the popular attraction point of the city. Room and
          suite categories at various sizes with city and Bosphorus view, as
          well as 68 separate luxury suites, are offered to its special guests
          as a wide variety of selection.
        </p>
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 my-5">
          <div className="features d-flex flex-column justify-content-center align-items-center gap-2">
            <h3 className="text-light m-0 ">{hotelObj?.rating}</h3>
            <h6 className="m-0 fs-5">Very Good</h6>
            <p className="text-muted fs-6">{hotelObj?.numberReviews}</p>
          </div>

          {reviews.map((item, index) => (
            <div
              key={index}
              className="features-bg bg-transparent  d-flex flex-column justify-content-between align-items-center pt-3 "
            >
              <img src={star} alt="" />
              <p
                style={{
                  fontSize: "15px",
                }}
                className=""
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-5" />
      {/* Amentions */}
      <div>
        <h4>Amenities</h4>
        <div className="my-3 p-2 listDiv d-flex flex-row justify-content-start  ">
          <ul className="list-unstyled d-flex flex-column gap-4 col-6">
            {amenitiesList.slice(0, 5).map((item, index) => (
              <li key={index} className="d-flex gap-2">
                <i className={item.iconClass}></i>
                <span className="text-muted">{item.text}</span>
              </li>
            ))}
          </ul>
          <ul className="list-unstyled d-flex flex-column gap-4 col-6">
            {amenitiesList.slice(5).map((item, index) => (
              <li key={index} className="d-flex gap-2">
                <i className={item.iconClass}></i>
                <span className="text-muted">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Reviews */}
      <div>
        <hr className="my-5" />
        <h4>Reviews</h4>
        <p className="text-muted">{hotelObj?.numberReviews} verified reviews</p>
        {usersReviews.map((item) => (
          <div key={item.name}>
            <hr className="my-3" />
            <div className="">
              <div className="d-flex flex-row gap-2">
                <h5>{item.name}</h5>
                <p className="text-muted">{item.rate}</p>
              </div>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
}
