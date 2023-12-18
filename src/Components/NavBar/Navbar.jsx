import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";
import avatar from "../../assets/images/accountFlow/accountAvatar.png";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { searchContext } from "./../../store/searchStore";
import { Button } from "react-bootstrap";
import Logo from "../../assets/images/logo-removebg.png";
export const NavigationBar = () => {
  let navigatation = useNavigate();
  const { currentUserObj, setCurrentUserObj, setAuthorized } =
    useContext(searchContext);

  const userLogOut = () => {
    localStorage.removeItem("currentUser");
    setCurrentUserObj({ id: "0" });
    navigatation("/");
    setAuthorized(false);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      className="bg-body-tertiary navbarParent p-2 "
    >
      <Container>
        <Navbar.Brand className="logoBrand" onClick={() => navigatation("/")}>
          <img src={Logo} alt="Logo" />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav " className="p-1 ">
          <i className="fa-solid fa-circle-chevron-down NavbarButton"></i>
        </Navbar.Toggle>
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className=" flex-md-row flex-column align-items-center justify-content-center"
        >
          <Nav className="m-auto d-flex gap-1 align-items-center ">
            <Nav.Link
              className="text-dark"
              onClick={() => navigatation("CountryAirports")}
            >
              <i className="fa-solid fa-plane px-1"></i>Find Flights
            </Nav.Link>
            <Nav.Link
              className="text-dark"
              onClick={() => navigatation("allcities")}
            >
              <i className="fa-solid fa-couch px-1"></i>Find Stays
            </Nav.Link>
          </Nav>
          <Nav className="d-flex gap-1 align-items-center">
            <Nav.Link
              className="text-dark "
              onClick={() => navigatation("Favourites")}
            >
              <i className="fa-solid fa-heart px-1"></i>Favourites
            </Nav.Link>
            {currentUserObj?.id !== "0" ? (
              <div className="d-flex justify-content-between align-items-center gap-2">
                <Link
                  to={`account/${currentUserObj?.firstName}${currentUserObj?.lastName}-${currentUserObj?.id}`}
                  className="d-flex justify-content-between align-items-center gap-2"
                >
                  <img
                    src={currentUserObj?.profileImg}
                    width={"40px"}
                    height={"40px"}
                    alt="AvataLogo"
                    style={{ objectFit: "cover" }}
                    className="rounded-circle"
                  />
                  <span className="text-dark">
                    {currentUserObj.firstName
                      ?.split("")[0]
                      .concat(`. ${currentUserObj?.lastName}`)
                      .toUpperCase()}
                  </span>
                </Link>
                <button
                  className="btn btn-outline-danger rounded-circle btnLogOut p-0"
                  onClick={userLogOut}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Nav.Link
                className="text-dark"
                eventKey={2}
                onClick={() => navigatation("login")}
              >
                <span className="text-dark">Login</span>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
