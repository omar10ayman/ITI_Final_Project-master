import React, { useContext, useRef } from "react";
import { Container } from "react-bootstrap";
import { BookedTicket } from "../../Components/BookedTicket/BookedTicket";
import { BookingBreacrumb } from "../BookingDetails/BookingBreacrumb";
import { addHotelsContext } from "../../store/store";
import locationIcon from "../HotelDetails/assets/Location.png";
import share from "../HotelDetails/assets/Share.png";
import {useParams} from 'react-router-dom'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import avatar from "../../assets/images/accountFlow/accountAvatar.png";
// import ticketImg from "./download 2.png";
const BookedTicketFinalDetailsPage = () => {
  let {bookId} = useParams()
  const contactsList = [
    "If you have any questions about our Website or our Terms of Use, please contact:",
    "Golobe Group Q.C.S.C",
    "Golobe Tower",
    " P.O. Box: 22550",
    "Doha, State of Qatar",
    "Further contact details can be found at golobe.com/help",
  ];
  const paymentList = [
    "If you are purchasing your ticket using a debit or credit card via the Website, we will process these payments via the automated secure common payment gateway which will be subject to fraud screening purposes.",
    "If you do not supply the correct card billing address and/or cardholder information, your booking will not be confirmed and the overall cost may increase. We reserve the right to cancel your booking if payment is declined for any reason or if you have supplied incorrect card information. If we become aware of, or is notified of, any fraud or illegal activity associated with the payment for the booking, the booking will be cancelled and you will be liable for all costs and expenses arising from such cancellation, without prejudice to any action that may be taken against us.",
    "Golobe may require the card holder to provide additional payment verification upon request by either submitting an online form or visiting the nearest Golobe office, or at the airport at the time of check-in. Golobe reserves the right to deny boarding or to collect a guarantee payment (in cash or from another credit card) if the card originally used for the purchase cannot be presented by the cardholder at check-in or when collecting the tickets, or in the case the original payment has been withheld or disputed by the card issuing bank. Credit card details are held in a secured environment and transferred through an internationally accepted system.",
  ];

  const { hotelObj } = useContext(addHotelsContext);
  const capture = useRef(null);
  const downloadPdf = () => {
    html2canvas(capture.current).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF();
      const compWidth = doc.internal.pageSize.getWidth();
      const compHeight = doc.internal.pageSize.getHeight();
      const widthToHeight =
        capture.current.clientWidth / capture.current.clientHeight;
      doc.addImage(
        imgData,
        "SVG",
        0,
        compWidth / 2 - 25,
        compWidth,
        compWidth / widthToHeight + 5
      );
      doc.save("ticket.pdf");
    });
  };

  return (
    <Container className=" min-vh-100 d-flex flex-column justify-content-center align-items-center noFavParent">
      {/* ------------------------- booking nav ------------------------- */}
      <div className="w-100">
        <BookingBreacrumb  />
      </div>

      {/* ------------------------- title and price ------------------------- */}
      <div className="d-flex flex-sm-row flex-column w-100 p-3 justify-content-between my-2">
        <div className="">
          <h3>{hotelObj.title}</h3>
          <div className="text-muted">
            <span>
              <img src={locationIcon} alt="" />
            </span>
            <span>{hotelObj?.location?.address}</span>
          </div>
        </div>

        <div className="d-flex flex-md-column flex-row justify-content-between align-items-end gap-2">
          <h4
            className="ps-3 m-0"
            style={{ color: "salmon", fontSize: "25px" }}
          >
            $240
          </h4>
          <div className="d-flex gap-3">
            <div className="col-3 col-md-1 favIcon">
              <img src={share} alt="" />
            </div>
            <button
              className="btn px-4"
              style={{ backgroundColor: "var(--mint-green)" }}
              onClick={downloadPdf}
            >
              Download
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------- booked ticket ------------------------- */}
      <div className="w-100">
        <BookedTicket item={hotelObj} capture={capture}/>
      </div>

      {/* ------------------------- terms and conitions ------------------------- */}
      <div className="shadow rounded-3 p-4 m-2">
        <h2 className="py-3">Terms and Conditions</h2>
        <section className="">
          <h4>Payments</h4>

          <ul className="text-muted">
            {paymentList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="">
          <h4>Contact Us</h4>

          <ul className="text-muted">
            {contactsList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
            <li>
              If you have any questions about our Website or our Terms of Use,
              please contact:
            </li>
          </ul>
        </section>
      </div>
    </Container>
  );
};

export default BookedTicketFinalDetailsPage;
