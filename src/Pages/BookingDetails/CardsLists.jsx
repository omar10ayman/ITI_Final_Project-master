import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { PaymentCard } from "../../Components/accountFlow/AccountPayment/PaymentCard";
import { searchContext } from "../../store/searchStore";
import { AddNewCard } from "../../Components/accountFlow/AccountPayment/AddNewCard";
import AddCardModal from "../../Components/addCardModal/addCardModal";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { addHotelsContext } from "../../store/store";
import { v4 as uuidv4 } from "uuid";
export const CardsLists = ({ show, setModalShow }) => {
  const { currentUserObj, updateCurrentUser } = useContext(searchContext);
  const [showAddCard, setShowAddCard] = useState(false);
  const { hotelObj } = useContext(addHotelsContext);
  let [idgen, setidGen] = useState("");
  let navigations = useNavigate();
  const submitSure = (item) => {
    swal({
      title: "Are you sure?",
      text: "Your Booking will Submit With This Card",
      icon: "success",
      buttons: {
        confirm: { text: "Ok  ", className: "sweet-warning" },
        cancel: "Cancel",
      },
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Submit Successfully", {
          icon: "success",
          button: false,
          timer: 1500,
        })
          .then(() => {
            let x = uuidv4()
            updateCurrentUser({
              bookingsStays: [

                ...currentUserObj.bookingsStays,
                { id: x, card: item, booked: hotelObj },
              ],
              
            });
            return x;
          })
          .then((x) => navigations(`finalDetails/${x}`));
      }
    });
  };
  return (
    <>
      <Modal
        show={show}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Cards </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-3">
          <AddNewCard
            setModalShow={() => {
              setShowAddCard(true);
              setModalShow(false);
            }}
          />

          <div className="row flex-wrap justify-content-center align-items-center">
            {currentUserObj?.cards?.map((item, index) => (
              <div
                key={index}
                index={index}
                onClick={() => submitSure(item)}
                className="row m-0 p-0 col-12 col-md-6 "
              >
                <PaymentCard key={index} item={item} />
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
      <AddCardModal
        show={showAddCard}
        handleClose={() => {
          setModalShow(true);
          setShowAddCard(false);
        }}
      />
    </>
  );
};
