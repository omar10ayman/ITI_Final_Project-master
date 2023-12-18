import React from "react";
import { Box } from "../box/Box";
import "./MainBookFlight.css";
import img_1 from "./pexels-luis-del-río-15286.jpg";
import img_2 from "./pexels-stein-egil-liland-3408744.jpg";
import img_3 from "./pexels-oleksandr-p-345522.jpg";
import img_4 from "./pexels-paul-ijsendoorn-33041.jpg";
import { useNavigate } from "react-router-dom";
export const MainBookFlight = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className=" MainBookFlight gap-3 d-flex align-items-center justify-content-between flex-column flex-md-row ">
        <div className="leftFlightChild d-flex flex-column align-items-center p-3">
          <div className="upSide">
            <h3>
              Backpacking <br /> Sri Lanka
            </h3>
            <p>
              Traveling is a unique experience as it's the best way to unplug
              from the pushes and pulls of daily life. It helps us to forget
              about our problems, frustrations, and fears at home. During our
              journey, we experience life in different ways. We explore new
              places, cultures, cuisines, traditions, and ways of living.
            </p>
          </div>
          <div className="downSide    w-100 h-100 d-flex justify-content-center align-items-end">
            <button
              className="BookFlightBtn"
              onClick={() => navigate("CountryAirports")}
            >
              BookFlight
            </button>
          </div>
        </div>
        <div className="rightFlightChild d-flex flex-wrap justify-content-between align-items-center gap-2">
          <Box imgsrc={img_1} />
          <Box imgsrc={img_2} />
          <Box imgsrc={img_3} />
          <Box imgsrc={img_4} />
        </div>
      </div>
    </div>
  );
};
