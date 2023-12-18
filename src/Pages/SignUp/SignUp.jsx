import React, { useContext, useEffect, useState } from "react";
import img from "../../assets/signupImg.png";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import "../Login/Login.css";
import "./SignUp.css";
import { Helmet } from "react-helmet";
import { searchContext } from "../../store/searchStore";
import { addDoc, getDocs, query, where } from "@firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { accountAvatar, accountBg } from "../../assets/images";

function SignUpPage() {
  const navigate = useNavigate();
  let interv;

  // ------------------------- use context ------------------------- //
  const { setCurrentUserObj, usersReference, setAuthorized, createNewUserObj } =
    useContext(searchContext);

  // ------------------------- use state ------------------------- //
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [checkLicenes, setCheckLicenes] = useState(false);
  const [userObject, setUserObject] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  // ------------------------- use effect ------------------------- //
  useEffect(() => {
    if (
      userObject.firstName === "" ||
      userObject.lastName === "" ||
      userObject.email === "" ||
      userObject.phone === "" ||
      userObject.password === "" ||
      userObject.confirmPassword === ""
    ) {
      setErrorMessage("Please Enter All Required Data");
      setSubmitEnabled(false);
    } else if (
      userObject.password.length < 6 ||
      userObject.password !== userObject.confirmPassword ||
      !userObject.email.match(/^[a-zA-Z]+[a-zA-Z0-9-_.]*@[a-z]+\.[a-z]+/) ||
      !userObject.firstName.match(/^[a-zA-Z]{3,}/) ||
      !userObject.lastName.match(/^[a-zA-Z]{3,}/) ||
      !userObject.phone.match(/^[0-9]{9,}/)
    ) {
      setErrorMessage("");
      setSubmitEnabled(false);
    } else if (!checkLicenes) {
      setErrorMessage("Make Sure To Accept The Licenes");
      setSubmitEnabled(false);
    } else {
      setErrorMessage("");
      setSubmitEnabled(true);
    }
  }, [userObject, checkLicenes, submitEnabled]);

  useEffect(() => {
    return () => {
      clearTimeout(interv);
    };
  }, []);

  // ------------------------- user sign up ------------------------- //
  function userSignUp(event) {
    event.preventDefault();

    if (submitEnabled) {
      const que = query(
        usersReference,
        where("email", "==", userObject.email) ||
          where("phone", "==", userObject.phone)
      );
      getDocs(que).then((snapshot) => {
        if (snapshot.docs.length > 0) {
          setErrorMessage("This Email or Phone Is Already In Use");
        } else {
          setAuthorized(true);
          swal({
            icon: "success",
            button: false,
            closeOnClickOutside: false,
            timer: 2000,
          })
            .then(() => createNewUserObj({ ...userObject }))
            .then(() => navigate("/"));
        }
      });
    }
  }

  return (
    <>
      {/* ------------------------- helmet title ------------------------- */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>SignUp</title>
      </Helmet>
      <div className="container loginParent d-flex justify-content-center align-items-center ">
        <div className=" justify-content-center flex-column flex-md-row d-flex align-items-center gap-3 w-100 ">
          {/* ------------------------- view image ------------------------- */}
          <div
            className="imgContainerSign shadow"
            style={{
              backgroundImage: `url(${img})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />

          {/* ------------------------- sign up form ------------------------- */}
          <form
            className="logForm border shadow rounded-4 d-flex flex-column justify-content-center align-items-center gap-2 h-100 bg-light"
            onSubmit={userSignUp}
          >
            {/* ------------------------- sign uo title ------------------------- */}
            <div className="align-self-start d-flex flex-column p-2 ">
              <h2 className="m-0">Signup</h2>
              <span>Signup now and get full access to our app.</span>
            </div>

            {/* ------------------------- name input ------------------------- */}
            <div className="d-flex w-100 gap-2">
              {/* ------------------------- first name input ------------------------- */}
              <input
                required
                placeholder="Firstname"
                type="text"
                className="form-control"
                title="First Name Can Not Be Less Than 3 And Only Charachters"
                onChange={(event) =>
                  setUserObject({
                    ...userObject,
                    firstName: event.target.value,
                  })
                }
              />

              {/* ------------------------- last name input ------------------------- */}
              <input
                required
                placeholder="Lastname"
                type="text"
                className="form-control"
                title="Last Name Can Not Be Less Than 3 And Only Charachters"
                onChange={(event) =>
                  setUserObject({
                    ...userObject,
                    lastName: event.target.value,
                  })
                }
              />
            </div>

            {/* ------------------------- email input ------------------------- */}
            <div className="w-100">
              <input
                type="email"
                className="form-control "
                placeholder="Enter your Email"
                title="Email Should Include @"
                required
                onChange={(event) => {
                  setUserObject({ ...userObject, email: event.target.value });

                  setErrors({
                    ...errors,
                    emailError: !event.target.value.match(
                      /^[a-zA-Z]+[a-zA-Z0-9-_.]*@[a-z]+\.[a-z]+/
                    )
                      ? "This Email Is Not Valid"
                      : "",
                  });
                }}
              />
              {errors?.emailError ? (
                <span className=" ps-2 text-danger">{errors?.emailError}</span>
              ) : null}
            </div>

            {/* ------------------------- number input ------------------------- */}
            <input
              type="number"
              className="form-control "
              placeholder="Enter your Phone"
              title="Phone Can Not Be Less Than 9"
              required
              onChange={(event) =>
                setUserObject({ ...userObject, phone: event.target.value })
              }
            />

            {/* ------------------------- password ------------------------- */}
            <div className="w-100">
              <div className="input-group ">
                {/* ------------------------- password input ------------------------- */}
                <input
                  type={isHiddenPassword ? "password" : "text"}
                  className="form-control"
                  placeholder="Enter your Password"
                  required
                  onChange={(event) => {
                    setUserObject({
                      ...userObject,
                      password: event.target.value,
                    });

                    setErrors({
                      ...errors,
                      confirmError:
                        event.target.value.length < 6
                          ? "Passwords Should Be 6 Characters At Least"
                          : userObject.confirmPassword !== event.target.value
                          ? "Password Does Not Match"
                          : "",
                    });
                  }}
                />

                {/* ------------------------- hiiden icon password ------------------------- */}
                <div className="input-group-append">
                  <span
                    className=" input-group-text  h-100"
                    onClick={() => setIsHiddenPassword(!isHiddenPassword)}
                  >
                    {isHiddenPassword ? (
                      <BsEyeSlashFill size={23} />
                    ) : (
                      <BsEyeFill size={23} />
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* ------------------------- confirm password input ------------------------- */}
            <div className="w-100">
              <input
                type={isHiddenPassword ? "password" : "text"}
                className="form-control"
                placeholder="Confirm your Password"
                required
                onChange={(event) => {
                  setUserObject({
                    ...userObject,
                    confirmPassword: event.target.value,
                  });

                  setErrors({
                    ...errors,
                    confirmError:
                      userObject.password !== event.target.value
                        ? "Passwords Does Not Match"
                        : "",
                  });
                }}
              />

              {errors?.confirmError ? (
                <span className="fs-6 ps-2 text-danger">
                  {errors?.confirmError}
                </span>
              ) : null}
            </div>

            {/* ------------------------- remember checkbox ------------------------- */}
            <div className="align-self-start">
              <input
                type="checkbox"
                className="form-check-input "
                onChange={(event) => {
                  setCheckLicenes(event.target.checked);
                  setErrors({
                    ...errors,
                    licenesError: event.target.checked
                      ? ""
                      : "Make Sure To Accept The Licenes",
                  });
                }}
              />
              <label className="px-1">
                I agree to all the Terms and Privacy Policies
              </label>
            </div>

            {/* ------------------------- sign up button ------------------------- */}
            <div className="d-flex flex-column w-75">
              <button
                className={submitEnabled ? "submitBtn" : "submitBtn-disabled"}
                onClick={userSignUp}
              >
                Create Account
              </button>
              <span className="fs-6 ps-2 text-danger">{errorMessage}</span>
            </div>

            {/* ------------------------- log in button ------------------------- */}
            <div className="   d-flex align-items-center justify-content-center">
              <span> Already have an acount?</span>
              <Link to={"/login"} replace className=" url-colored btn p-1">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
