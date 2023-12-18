import React, { useContext, useEffect } from "react";
import locationIcon from "../../Pages/CountryHotels/Location.png";
import unFillFav from "../../Pages/CountryHotels/Vector.png";
// import { useState } from "react";
// import { searchContext } from "../../store/searchStore";
import { useNavigate } from "react-router-dom";
// import { addHotelsContext } from "../../store/store";
// import CountryHotelsPage from './../../Pages/CountryHotels/AddHotels';
const SingleAirport = ({ name, country, photo, isFavPage }) => {
  //   let { currentUserObj, updateCurrentUser, authorized } =
  // useContext(searchContext);
  //   let { destination } = useContext(addHotelsContext);
  //   let [clicked, setClicked] = useState(false);
  let navigations = useNavigate();
  //   const checkfav = () => {
  //     let FoundId = currentUserObj?.favourites?.find(({ id }) => id == hotel?.id);
  //     console.log(FoundId);
  //     console.log(currentUserObj, "user");
  //     // if (FoundId === undefined) {
  //     //   setClicked(false);
  //     // } else {
  //     //   setClicked(true);
  //     // }
  //   };

  const navigate = useNavigate();
  //   const goToDetails = (id) => {
  //     navigate(`/CountryHotels/${destination}/hotelDetials/${id}`);
  //   };
  //   useEffect(() => {
  //     checkfav(hotel);
  //   }, []);
  //   function clickedHeart() {
  //     if (authorized) {
  //       setClicked(true);
  //       updateCurrentUser({ favourites: [...currentUserObj.favourites, hotel] });
  //       if (clicked) {
  //         setClicked(false);
  //         let deletedFav = currentUserObj.favourites.filter(
  //           ({ id }) => id !== hotel.id
  //         );
  //         updateCurrentUser({ favourites: [...deletedFav] });
  //       }
  //     } else {
  //       navigations("/login");
  //     }
  //   }
  //   console.log(destination, "des");

  return (
    <div className="container p-3" >
      <div className="card d-flex flex-md-row flex-column justify-content-center align-items-center justify-content-md-start align-items-md-start">
        <div className="singleCardParent p-3 object-fit-cover">
          <img height={"300px"} width={"300px"} src={photo} alt="" />
        </div>
        <div className="d-flex flex-column justify-content-end p-3 w-100  rightCardparent">
          <div className="d-flex flex-md-row flex-column justify-content-between m-0">
            <div className="d-flex flex-column">
              <h3>{name}</h3>
              <p className="text-muted">
                <span>
                  <img src={locationIcon} alt="" />
                </span>
                {country}
              </p>
            </div>
            <p className="text-muted">
              starting from
              <br />
              <span style={{ color: "salmon", fontSize: "20px" }}>
                $240/night
              </span>
            </p>
          </div>
          <div className="d-flex flex-row mt-3 gap-3">
            <div
              style={{
                width: "30px",
                height: "30px",
                border: "1px solid #3EB489",
                borderRadius: "5px",
                textAlign: "center",
                padding: "2px",
              }}
            >
              <p className="text-muted">{4.5}</p>
            </div>
            <p style={{ marginTop: "5px" }}>{"Very Good"}</p>
          </div>

          <div className="d-flex flex-row mt-3 gap-2">
            {isFavPage === "favPage" ? (
              <div />
            ) : (
              <div
                // onClick={() => clickedHeart(hotel)}
                className="col-3 col-md-1 favIcon"
              >
                <img src={unFillFav} alt="" />
              </div>
            )}
            <button
              //   onClick={() => goToDetails(hotel?.id)}
              className="col-9 col-md-10 p-2"
              style={{
                backgroundColor: "#3EB489",
                color: "black",
                borderRadius: "5px",
                border: "1px solid white",
              }}
            >
              Show Detials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleAirport;
