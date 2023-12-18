import "./Card.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
export const Card = ({ duration, img, title, buttonName, pathTo }) => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Link to={pathTo}>
        <div
          data-aos="fade-up"
          data-aos-duration={`${duration}`}
          className="cardParent py-2 animation"
          style={{
            backgroundImage: `url(${img})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="d-flex  flex-column h-100  align-items-center justify-content-end">
            <div className="cardData text-white container d-flex align-items-center justify-content-between">
              <div className="title d-flex flex-column text-white">
                <h3 className="m-0">{title}</h3>
                <h6>An amazing journey</h6>
              </div>
              <div className="price">
                <h3>600$</h3>
              </div>
            </div>
            <button className="BookHotelBtn">{buttonName}</button>
          </div>
        </div>
      </Link>
    </>
  );
};
