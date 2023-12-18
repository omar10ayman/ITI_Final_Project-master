import React from "react";
import frame from "../../assets/images/accountFlow/Frame 186.png";

export const PriceCard = ({ img, title }) => {
  return (
    <div className="">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <img
            src={img}
            className="side-header-img me-3"
            alt=""
            onError={(error) => {
              console.log(error, "erroronimage");
            }}
          />
          <div>
            <h6 className="img-header">{title}</h6>
            <p className="side-head mb-0 fw-bold">
              Superior room - 1 double bed or 2 twin beds
            </p>
            <div className="d-flex align-items-center">
              <div className="btn-cardds me-2">
                <div className="btn-text btn-cardds border rounded "> 4.2</div>
              </div>
              <p className="revieew mb-0">
                <span className="very">Very Good </span>54 reviews
              </p>
            </div>
          </div>
        </div>
        <p className="p-4 m-0">
          Your booking is protected by <span className="fw-bold"> golobe </span>
        </p>
        <hr className="m-0" />
        <div className="card-body p-4">
          <h5 className="card-title">Price Details</h5>
          <div className="d-flex justify-content-between">
            <div className="card-textt">
              <p>Base Fare</p>
              <p>Discount</p>
              <p>Taxes</p>
              <p>Service Fee</p>
            </div>

            <div className="card-pricee">
              <p> $240</p>
              <p> $0</p>
              <p> $20</p>
              <p>$5 </p>
            </div>
          </div>
          <hr className="" />
          <div className="d-flex justify-content-between">
            <p className="card-textt">Total </p>
            <p className="card-pricee">$25</p>
          </div>
        </div>
      </div>
    </div>
  );
};
