import { useContext, useEffect, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { searchContext } from "../../store/searchStore";
import { bookingSchema } from "../../Pages/BookingDetails/bookingValidation";
import { Visa } from "../../assets/images";
import { countries } from "../../data/country";
import "./addCardModal.css";

const AddCardModal = ({ show, handleClose }) => {
  const { currentUserObj, setCurrentUserObj, updateCurrentUser } =
    useContext(searchContext);
  const [expirationDate, setExpirationDate] = useState({ month: "", year: "" });
  const [formData, setFormData] = useState({
    // validation schema
    creditCard: "",
    cvc: "",
    month: "MM",
    year: "YY",
    username: "",
    country: "",
    license: false,
  });
  const [errorMsg, setErrorMsg] = useState([]);

  const month = () => {
    const x = [];
    for (let i = 0; i < 12; i++) {
      if (i < 9) {
        x.push(`0${i + 1}`);
      } else {
        x.push(i + 1);
      }
    }
    return [...x];
  };
  const year = () => {
    const x = [];
    const dateNow = new Date();
    const date = parseInt(dateNow.getFullYear().toLocaleString().slice(-2));
    for (let i = date; i < date + 50; i++) {
      x.push(i);
    }
    return [...x];
  };

  console.log(formData, "foom");

  // handle credi card input
  function cc_format(value) {
    const v = value
      ?.replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .slice(0, 16);
    const parts = [];
    for (let i = 0; i < v?.length; i += 4) {
      parts.push(v.substr(i, 4));
    }

    return parts?.length > 1 ? parts.join(" ") : value;
  }

  // form validation
  const bookingValidation = async (e) => {
    e.preventDefault();

    const data = {
      creditCard: formData.creditCard,
      month: e.target[1].value,
      year: e.target[2].value,
      cvc: e.target[3].value,
      username: e.target[4].value,
      country: e.target[5].value,
      license: e.target[6].checked,
    };

    console.log(e.target[5].value, "country");

    console.log(data, "formdata");
    await bookingSchema
      .validate(data, { abortEarly: false })
      .then((result) => {
        console.log(result, "result");
        handleClose();

        updateCurrentUser({
          cards: [...currentUserObj.cards, data],
        });

        // setFormData({
        //   creditCard: "",
        //   cvc: "",
        //   month: "MM",
        //   year: "YY",
        //   username: "",
        //   country: "",
        //   license: false,
        // });
      })
      .catch((err) => {
        console.log(err.errors, "error");
        setErrorMsg(err.errors);

        // return err;
      });
  };

  useEffect(() => {
    console.log(errorMsg, "error");
    console.log(formData, "form data");
    if (!show) {
      setFormData({
        creditCard: "",
        cvc: "",
        month: "MM",
        year: "YY",
        username: "",
        country: "",
        license: false,
      });
      setErrorMsg([]);
    }
  }, [show]);
  // spacesV
  return (
    <Modal show={show} className="fs-4 mt-4 ModalParent" onHide={handleClose}>
      <Modal.Title className="p-4 fs-2">Add a new Card</Modal.Title>
      <Container>
        {errorMsg?.length > 0 ? (
          <div className="alert-danger alert d-flex flex-column gap-1">
            {errorMsg.map((msg, index) => (
              <span key={index}>
                {++index} - {msg}
              </span>
            ))}
          </div>
        ) : (
          ""
        )}
      </Container>
      <Modal.Body className="p-4">
        <form className="d-flex flex-column " onSubmit={bookingValidation}>
          <div className="col">
            <div className=" w-100 d-flex flex-column justify-content-center align-items-center gap-4">
              <div className="card-input w-100 ">
                {/* credit card input  */}
                <label
                  htmlFor="card-number"
                  className="card-sub-label fw-normal  "
                >
                  Card Number
                </label>

                <div
                  className="input-group border rounded-3"
                  style={{ zIndex: "10" }}
                >
                  <input
                    type="text"
                    className="rounded-2 placeStyle  form-control border-0"
                    placeholder="4321 4321 4321 4321"
                    maxLength={19}
                    value={cc_format(formData.creditCard)}
                    onChange={(e) => {
                      const str = e.target.value.replace(/\s/g, "");

                      if (!isNaN(str)) {
                        setFormData({
                          ...formData,
                          creditCard: str,
                        });
                      }
                    }}
                  />
                  <div className="input-group-append ">
                    <span className="input-group-text h-100 bg-body border-0">
                      <img src={Visa} alt="visaImg" />
                    </span>
                  </div>
                </div>
              </div>
              {/* expiration date input  */}
              <div className=" d-flex w-100 justify-content-center gap-4 ">
                <div className="w-100 card-input">
                  <label className=" card-sub-label fw-normal ">
                    Exp. Date
                  </label>
                  <div className="form-control d-flex gap-3 p-0 border-0 ">
                    <select
                      defaultValue={"MM"}
                      length={6}
                      className="form-select form-select-lg text-center w-50"
                    >
                      <option name={"MM"} value={"MM"} disabled>
                        MM
                      </option>
                      {month().map((item, index) => (
                        <option name={item} value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <select
                      defaultValue={"YY"}
                      className="form-select form-select-lg text-center w-50"
                    >
                      <option name={"YY"} value={"YY"} disabled>
                        YY
                      </option>

                      {year().map((item, index) => (
                        <option name={item} value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* cvc input  */}
                <div className="card-input">
                  <label className=" card-sub-label fw-normal  ">CVC</label>
                  <input
                    // aria-label="CVC"
                    type="text"
                    className="me-2 w-100 placeStyle  rounded-2  form-control"
                    placeholder="456"
                    // value={formData.cvc}
                    maxLength={3}
                  />
                </div>
              </div>
              {/* username input  */}
              <div className="w-100 card-input">
                <label className="card-sub-label fw-normal ">
                  Name on Card
                </label>
                <input
                  type="text"
                  className="name placeStyle rounded-2 form-control w-100"
                  placeholder="Jon Doe"
                  // value={formData.username}
                />
              </div>
              {/* selection countries input */}
              <div className="input-group d-flex  card-input">
                <label className="card-sub-label fw-normal  ">
                  Country Or Region
                </label>
                <select
                  className="form-select rounded-2  form-control"
                  id="inputGroupSelect04"
                  aria-label="Example select with button addon"
                  
                >
                  <option disabled selected value="Choose a country">Choose a country</option>
                  {countries.map((x) => (
                    <option value={x.name} key={x.id}>
                      {x.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* check box and button submit  */}
          <Modal.Footer className="p-0 pt-4">
            <div className="text">
              <div className="form-check">
                <input
                  className="form-check-input input"
                  type="checkbox"
                  // value={formData.license}
                  id="invalidCheck"
                />
                <label
                  className=" fs-5 form-check-label  "
                  htmlFor="invalidCheck"
                >
                  Securely save my information for 1-click checkout
                </label>
              </div>

              <input
                type="submit"
                className="w-100 my-2 book-btn py-2 rounded-3"
                value="Add Card"
              />

              <p className=" fw-light fs-5 m-auto">
                By confirming your subscription, you allow The Outdoor Inn Crowd
                Limited to charge your card for this payment and future payments
                in accordance with their terms. You can always cancel your
                subscription.
              </p>
            </div>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCardModal;
