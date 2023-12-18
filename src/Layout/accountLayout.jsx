import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useParams } from "react-router";
import { NavLink, Navigate } from "react-router-dom";
import img1 from "./CoverImgs/pexels-efdal-yildiz-917494.jpg";
import img2 from "./CoverImgs/pexels-lumn-167699.jpg";
import img3 from "./CoverImgs/pexels-marta-wave-5876640.jpg";
import img4 from "./CoverImgs/pexels-simon-berger-1323550.jpg";
import img6 from "./CoverImgs/pexels-stein-egil-liland-6869258.jpg";
import img7 from "./CoverImgs/pexels-sam-kolder-2387873.jpg";
import img8 from "./CoverImgs/pexels-francesco-ungaro-2325446.jpg";
import Modalimgs from "./Modalimgs";
import { ProfileImg } from "./ProfileImg";
import { searchContext } from "../store/searchStore";
const AccountLayout = () => {
  const { id } = useParams();
  const {
    currentUserObj,
    setCurrentUserObj,
    updateCurrentUser,
    authorized,
    scrollToTopPage,
  } = useContext(searchContext);
  const [Cover, setCover] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const imgsCovres = [img1, img2, img3, img4, img6, img7, img8];
  function addCover(x) {
    setCover(x);
  }

  useEffect(() => {
    console.log(Cover, "cover");
    if (Cover !== null) {
      updateCurrentUser({ coverImg: Cover });
    }
  }, [Cover]);

  if (!authorized) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Account-Information</title>
      </Helmet>
      <div className="pb-3">
        <Container>
          <div className="pt-4 ">
            <div
              style={{
                backgroundImage: `url(${currentUserObj?.coverImg})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              alt=""
              className="w-100 account__bg-img d-flex align-items-end justify-content-end p-1"
            >
              <label
                htmlFor="upload"
                className="d-flex mb-4 me-3 gap-2 py-2 px-4 rounded-3 z-3 bg-info align-items-center account__btn"
                onClick={() => setModalShow(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M14.8019 6.56247L14.7879 6.5813C15.566 7.15773 15.9766 7.95307 15.9766 8.88091C15.9766 9.83751 15.5955 10.6399 14.8747 11.2008C14.2377 11.6961 13.3503 11.97 12.375 11.97H8.52344V7.25716L9.63062 8.36373C9.67939 8.41247 9.7373 8.45109 9.80103 8.47738C9.86477 8.50367 9.93307 8.51711 10.002 8.51693C10.071 8.51675 10.1392 8.50295 10.2028 8.47632C10.2664 8.44969 10.3241 8.41077 10.3726 8.36178C10.5776 8.15479 10.565 7.81782 10.3603 7.61279L10.3603 7.61277L8.37001 5.62339L8.35344 5.63997L8.37 5.62339C8.27185 5.5253 8.13876 5.4702 8 5.4702C7.86124 5.4702 7.72815 5.5253 7.63 5.62339L7.62999 5.6234L5.63968 7.6134C5.44114 7.81194 5.4221 8.13648 5.61236 8.34544C5.65998 8.3979 5.71776 8.44014 5.7822 8.46961C5.84664 8.49908 5.9164 8.51516 5.98725 8.51687C6.05809 8.51859 6.12855 8.5059 6.19434 8.47957C6.26013 8.45325 6.3199 8.41384 6.37001 8.36373L7.47656 7.25718V11.97H4.25C3.12162 11.97 2.07034 11.5982 1.29 10.9244C0.473229 10.2176 0.0234375 9.24027 0.0234375 8.16841C0.0234375 7.10792 0.441194 6.17965 1.23175 5.48099C1.80454 4.97622 2.55534 4.61942 3.38776 4.45138C3.4678 4.43522 3.54294 4.40056 3.60718 4.35018L14.8019 6.56247ZM14.8019 6.56247L14.7879 6.5813C14.3533 6.25905 13.8188 6.02218 13.2542 5.89439L14.8019 6.56247ZM3.75774 4.16126C4.06254 3.51956 4.50983 2.95592 5.06553 2.51331C5.88522 1.86147 6.90032 1.51685 8 1.51685C9.25092 1.51685 10.4308 1.96667 11.3229 2.78413L11.3229 2.78414C12.0904 3.48628 12.6128 4.41315 12.8556 5.49475L3.75774 4.16126ZM7.52344 14.0065V12.0168H8.47656V14.0065C8.47656 14.1329 8.42635 14.2541 8.33698 14.3435C8.24761 14.4329 8.12639 14.4831 8 14.4831C7.87361 14.4831 7.75239 14.4329 7.66302 14.3435C7.57365 14.2541 7.52344 14.1329 7.52344 14.0065Z"
                    fill="black"
                    stroke="#112211"
                    strokeWidth="0.046875"
                  />
                </svg>
                Set a new cover
              </label>
              <Modalimgs
                show={modalShow}
                onHide={() => setModalShow(false)}
                imgsCovres={imgsCovres}
                addCover={addCover}
              />
            </div>
          </div>
        </Container>
        <Container>
          <ProfileImg />
          <div className="account__selection px-4 account__main-links mb-3 ">
            <NavLink
              to={"/account/" + id}
              end
              className="account__brdr position-relative py-3 w-33"
            >
              <h4 className="text-center ">Account</h4>
            </NavLink>
            <NavLink
              to={`/account/${id}/history`}
              // to="/account/history"
              className="account__brdr line py-3 w-33"
            >
              <h4 className="text-center">History</h4>
            </NavLink>
            <NavLink
              to={`/account/${id}/payment`}
              // to="/account/payment"
              className="account__brdr line py-3 w-33"
            >
              <h4 className="text-center">Payment method</h4>
            </NavLink>
          </div>
        </Container>
        <Outlet />
      </div>
    </>
  );
};

export default AccountLayout;
