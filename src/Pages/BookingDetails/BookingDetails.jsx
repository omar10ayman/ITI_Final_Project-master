import React, { useContext, useEffect, useState } from "react";
// import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./BookingDetails.css";
import { Helmet } from "react-helmet";
import { HotelCard } from "./HotelCard";
import { PriceCard } from "./PriceCard";
import { searchContext } from "../../store/searchStore";
import { BookingBreacrumb } from "./BookingBreacrumb";
import AddCardModal from "../../Components/addCardModal/addCardModal";
import { CardsLists } from "./CardsLists";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { addHotelsContext } from "../../store/store";

const BookingDetails = () => {
  const { currentUserObj, authorized, searchData } = useContext(searchContext);
  const { hotelObj, getHotelsObj } = useContext(addHotelsContext);
  const [cardsLists, setCardsLists] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const { hotelId } = useParams();

  const handleShow = () => {
    if (currentUserObj.cards?.length !== 0) {
      setCardsLists(true);
      setModalShow(true);
    } else {
      setCardsLists(false);
      setModalShow(true);
    }
  };

  useEffect(() => {
    if (hotelObj.title === undefined) {
      getHotelsObj(hotelId);
    }
  }, []);

  const location = useLocation();
  if (!authorized) {
    return <Navigate to="/login" state={location.pathname} />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Booking-Details</title>
      </Helmet>
      <div className="container BookinDetailParent ">
        <BookingBreacrumb />
        <div className="d-flex justify-content-center w-100">
          <div className="d-flex  justify-content-center gap-2 flex-column flex-md-row align-items-start">
            {
              <HotelCard
                handleShow={handleShow}
                img={hotelObj?.photos[0]?.urlTemplate
                  .replace("{width}", "500")
                  .replace("{height}", "500")}
                title={hotelObj?.title}
                data={searchData}
              />
            }

            <PriceCard
              img={hotelObj?.photos[1]?.urlTemplate
                ?.replace("{width}", "500")
                ?.replace("{height}", "500")}
              title={hotelObj?.title}
            />
          </div>
        </div>
        {cardsLists ? (
          <CardsLists show={modalShow} setModalShow={setModalShow} />
        ) : (
          <AddCardModal show={modalShow} handleClose={setModalShow} />
        )}
      </div>
    </>
  );
};

export default BookingDetails;
