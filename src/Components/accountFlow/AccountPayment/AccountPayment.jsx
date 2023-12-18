import { Container } from "react-bootstrap";
import "./accountPayment.css";
import React, { useState } from "react";
import PaymentModal from "./modal";
import AddCardModal from "../../addCardModal/addCardModal";
import { PaymentCard } from "./PaymentCard";
import { searchContext } from "../../../store/searchStore";
import { useContext } from "react";
import { AddNewCard } from "./AddNewCard";

const AccountPayment = () => {
  const [modalShow, setModalShow] = useState(false);
  let { currentUserObj, authorized } = useContext(searchContext);


  return (
    <div>
      <Container className="bg-white py-3 rounded-3 CardpaymentModel d-flex justify-content-center align-items-center ">
        <div className="row gy-4 justify-content-center align-items-center w-100">
          <div className="d-flex justify-content-center   align-items-center col-lg-5 col-12">

          {currentUserObj?.cards?.map((item, index) => (
            <PaymentCard item={item} key={index} index={index} />
            ))}
            </div>

          <div className="col-lg-5 col-12 ">
            <AddNewCard setModalShow={() => setModalShow(true)} />
          </div>
        </div>

        <AddCardModal
          show={modalShow}
          handleClose={() => setModalShow(false)}
        />
      </Container>
    </div>
  );
};

export default AccountPayment;
