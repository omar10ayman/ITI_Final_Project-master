import { Button, Modal } from "react-bootstrap";

export default function PaymentModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="d-flex justify-content-center align-items-center"
    >
      <Modal.Title className="p-4 fs-2 pb-2">Add a new Card</Modal.Title>

      <Modal.Body className="p-4 pt-0">
        <form className="d-flex">
          <div className="col">
            <div className="coolinput w-100">
              <label for="card-number" className="text fw-normal labelText ">
                Card Number
              </label>
              <input
                type="number"
                className="visa rounded-2 placeStyle ps-2"
                placeholder="4321 4321 4321 4321"
              />
              <div className="mb-3 d-flex justify-content-between gap-3">
                <div className="w-100">
                  <label className=" text fw-normal labelText">Exp. Date</label>
                  <br />
                  <input
                    className="me-2 w-100 input placeStyle rounded-2 ps-2"
                    placeholder="02/27"
                    // type="date"
                    // aria-label="Exp. Date"
                  />
                </div>
                <div className="w-100">
                  <label className=" text fw-normal  labelText">CVC</label>
                  <input
                    // aria-label="CVC"
                    type="text"
                    className="me-2 w-100 placeStyle  rounded-2 ps-2"
                    placeholder="456"
                    maxLength={3}
                  />
                </div>
              </div>
              <label className="text fw-normal labelText">Name on Card</label>
              <input
                type="text"
                className="name placeStyle rounded-2 ps-2"
                placeholder="Jon Doe"
              />
              <div className="input-group d-flex">
                <div className="col">
                  <label className="text fw-normal  labelText">
                    Country Or Region
                  </label>
                  <select
                    className="form-select rounded-2 "
                    id="inputGroupSelect04"
                    aria-label="Example select with button addon"
                  >
                    <option>United States</option>
                    <option value="1">Turkey</option>
                    <option value="2">England</option>
                    <option value="3">Egypt</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className="text">
          <div className="form-check">
            <input
              className="form-check-input input ps-2"
              type="checkbox"
              value=""
              id="flexCheckIndeterminate"
            />
            <label
              className=" text form-check-label "
              for="flexCheckIndeterminate"
            >
              Securely save my information for 1-click checkout
            </label>
          </div>

          <Button
            // onClick={handleClose}
            className="w-100 text my-2 book-btn "
          >
            Add Card
          </Button>
          <p className="text fw-light fs-0 m-auto">
            By confirming your subscription, you allow The Outdoor Inn Crowd
            Limited to charge your card for this payment and future payments in
            accordance with their terms. You can always cancel your
            subscription.
          </p>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
