import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./index.css";
import AccountInfo from "../../../Components/accountFlow/accountInfo/accountInfo";
import { Helmet } from "react-helmet";
import { searchContext } from "../../../store/searchStore";
import { Navigate } from "react-router-dom";
import { Suspense } from "react";
import { SearchForm } from "../../../Components/SearchForm/SearchForm";

const initialObj = {
  firstName: "",
  email: "",
  password: "",
  phone: "",
};
const Account = () => {
  const { currentUserObj } = useContext(searchContext);

  const [inputs, setInputs] = useState(initialObj);
  const [errorMessage, setErrorMessage] = useState(initialObj);

  useEffect(() => {
    if (currentUserObj?.id === "0") {
      return;
    } else {
      setInputs({ ...inputs, ...currentUserObj });
    }
  }, [currentUserObj]);

  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center LoaderParent">
          <div className="loader"></div>
        </div>
      }
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Account-Information</title>
      </Helmet>
      <div className="bg pb-3">
        {/* <AccountLayout/> */}
        <Container>
          <div className="account__info rounded-3">
            <AccountInfo
              label="First Name"
              inputs={inputs}
              name={"firstName"}
              setInputs={setInputs}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              type={"text"}
            />
            <AccountInfo
              label="Last Name"
              name="lastName"
              inputs={inputs}
              setInputs={setInputs}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              type={"text"}
            />
            <AccountInfo
              label="Email"
              btn
              name="email"
              inputs={inputs}
              setInputs={setInputs}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              type={"text"}
            />
            <AccountInfo
              label="Password"
              content="John Doe"
              name="password"
              inputs={inputs}
              setInputs={setInputs}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              type={"password"}
            />
            <AccountInfo
              label="Phone number"
              content="+1 000-000-0000"
              name="phone"
              inputs={inputs}
              setInputs={setInputs}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              type={"text"}
            />
            <AccountInfo
              label="Address"
              content="St 32 main downtown, Los Angeles, California, USA"
              name="address"
              inputs={inputs}
              setInputs={setInputs}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              type={"text"}
            />
            <AccountInfo
              label="Date of birth"
              content="01-01-1992"
              name="birthDate"
              type="date"
              inputs={inputs}
              setInputs={setInputs}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </div>
        </Container>
      </div>
    </Suspense>
  );
};

export default Account;
