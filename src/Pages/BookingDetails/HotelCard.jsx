import React from "react";
import download1 from "../../assets/images/accountFlow/download1.png";
import location from "../../assets/images/accountFlow/Location.svg";
import building from "../../assets/images/accountFlow/building.svg";
import right from "../../assets/images/accountFlow/right.svg";
import left from "../../assets/images/accountFlow/left.svg";
import Button from "react-bootstrap/Button";
export const HotelCard = ({ handleShow, img, title, data }) => {
  console.log(data);
  return (
    <div className=" d-flex ">
      <div className="card mb-3">
        <div className="card-header d-flex justify-content-between gap-3 align-items-center ">
          <h4 className="">
            {data.GuestAndRooms} Superior room - 1 double bed or{" "}
            <span>2 twin beds </span>
          </h4>
          <h6 className="card-price">
            $240<span className="align-content-end night">/night </span>
          </h6>
        </div>
        {/* second section  */}
        <div className="p-2">
          <div className=" d-flex body my-4 p-4 align-items-center">
            <img src={img} className="body-img" alt="" srcSet="" />
            <div className=" body-location">
              <h6 className="card-text text-center ms-2">{title}</h6>
              <div className="d-flex align-items-center">
                <img
                  src={location}
                  className="body-sub-img mx-2 mb-0"
                  alt=""
                  srcSet=""
                />
                <p className="card-sub-text mb-0">
                  Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* third section  */}
        <div className="p-2 d-flex flex-column align-items-center">
          <div className="container row justify-content-between ">
            <h6 className=" align-items-center col-4 text-center m-0 ">
              Thursday, Dec 8 <br /> <span> Check-In</span>
            </h6>
            <div className="direc d-flex col-4 justify-content-center align-items-center">
              <img className="line" src={left} alt="" />
              <img className="home-logo" src={building} alt="" />
              <img className="line" src={right} alt="" />
            </div>
            <h6 className=" mx-auto col-4 text-center m-0 ">
              Thursday, Dec 9 <br /> <span>Check-Out</span>
            </h6>
          </div>
          <Button
            variant="primary"
            className="btn btn-primary book-btn mt-4 p-2 w-100"
            onClick={handleShow}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};
