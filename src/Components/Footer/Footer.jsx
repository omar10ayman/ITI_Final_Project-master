import "./footer.css";
import Logo from "../../assets/images/logo-removebg.png";
import { useContext } from "react";
import { addHotelsContext } from "../../store/store";
import { useNavigate } from "react-router-dom";
export const Footer = () => {
  let { setDestnation } = useContext(addHotelsContext);
  let navigate = useNavigate();
  let Countrys = [
    "Canada",
    "Alaksa",
    "France",
    "iceLand",
    "roma",
    "cairo",
    "london",
    "turkey",
  ];
  const CountryBtn = (country) => {
    setDestnation(country);
    navigate(`/CountryHotels/${country}`);
  };
  return (
    <footer className="footer-section ">
      <div className="container ">
        <div className="footer-content pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-logo">
                  <img src={Logo} alt="Logo" />
                </div>
                <div className="footer-text">
                  <p>
                    Lorem ipsum dolor sit amet, consec tetur adipisicing elit,
                    sed do eiusmod tempor incididuntut consec tetur adipisicing
                    elit,Lorem ipsum dolor sit amet.
                  </p>
                </div>
                <div className="footer-social-icon mb-2">
                  <span>Follow us</span>
                  <a href="#">
                    <i className="fab fa-facebook-f facebook-bg"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter twitter-bg"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-youtube youtube-bg"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Our Destinations</h3>
                </div>
                <ul>
                  {Countrys.map((element) => (
                    <li key={element} onClick={() => CountryBtn(element)}>
                      {element}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Subscribe</h3>
                </div>
                <div className="footer-text mb-25">
                  <p>
                    Don’t miss to subscribe to our new feeds, kindly fill the
                    form below.
                  </p>
                </div>
                <div className="subscribe-form">
                  <form action="#">
                    <input type="text" placeholder="Email Address" />
                    <button>
                      <i className="fab fa-telegram-plane"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
