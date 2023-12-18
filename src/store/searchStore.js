import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "@firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { getAuth } from "firebase/auth";
import { addHotelsContext } from "./store";
import { accountAvatar, accountBg } from "../assets/images";

// import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCb-UkvpCD0WgqHJMgLK6UBnXKBJWRSZzE",
  authDomain: "iti-final-project-ammmoz06.firebaseapp.com",
  projectId: "iti-final-project-ammmoz06",
  storageBucket: "iti-final-project-ammmoz06.appspot.com",
  messagingSenderId: "1029659505242",
  appId: "1:1029659505242:web:22dfc008d7d7e348085e63",
};

export const searchContext = createContext(0);

export default function SearchContextProvider(props) {
  const { hotelObj } = useContext(addHotelsContext);
  //--------------------- firebase --------------------//
  initializeApp(firebaseConfig);
  const database = getFirestore();
  const auth = getAuth();
  let navigations = useNavigate();

  // const auth=  firebase.auth();

  //--------------------- useState --------------------//

  let [searchData, setSeachData] = useState({
    destination: "",
  });
  let [authorized, setAuthorized] = useState(false);
  const [currentUserObj, setCurrentUserObj] = useState({
    id: "0",
  });

  const userID = localStorage.getItem("currentUser");
  const currentRef = doc(database, "users", currentUserObj?.id);
  const usersReference = collection(database, "users");

  //--------------------- useEffect --------------------//
  useEffect(() => {
    if (currentUserObj?.id === "0") {
      // const userID = sessionStorage.getItem("currentUser");
      console.log(userID, "user id");

      if (userID !== null && userID !== undefined && userID !== "undefined") {
        getCurrentUserData();
        setAuthorized(true);
      } else {
        console.log("no snapshot");
      }
    } else {
      setAuthorized(true);
    }
  }, []);

  //--------------------- createNewUserObj --------------------//
  function createNewUserObj({
    firstName,
    lastName,
    email,
    password,
    phone,
    profileImg,
  }) {
    const user = {
      firstName: firstName !== undefined ? firstName : "",
      lastName: lastName !== undefined ? lastName : "",
      email: email !== undefined ? email : "",
      password: password !== undefined ? password : "",
      phone: phone !== undefined ? phone : "",
      address: "",
      profileImg: profileImg !== undefined ? profileImg : accountAvatar,
      coverImg: accountBg,
      birthDate: "",
      bookingsFlights: [],
      bookingsStays: [],
      favourites: [],
      cards: [],
    };
    console.log(user, "user object creat");
    addDoc(usersReference, user).then((snapshot) => {
      // console.log(snapshot, "add user");
      localStorage.setItem("currentUser", snapshot.id);
      setCurrentUserObj({ ...user, id: snapshot.id });
    });
  }

  //--------------------- getCurrentUserData --------------------//
  const getCurrentUserData = () => {
    const currentRef = doc(database, "users", userID);
    getDoc(currentRef).then((snapshot) => {
      console.log(snapshot.data(), "current user");
      setCurrentUserObj({ ...snapshot.data(), id: userID });
    });
  };

  //--------------------- currentUserSnapshot --------------------//
  onSnapshot(currentRef, (snapshot) => {
    console.log(snapshot?.data(), "snapshot listen");
  });

  //--------------------- updateCurrentUser --------------------//
  const updateCurrentUser = (change) => {
    if (currentUserObj?.id !== "0") {
      updateDoc(currentRef, { ...change }).then((snapshot) => {
        getCurrentUserData();
      });
    }
  };

  //--------------------- addUserFavouriteHotel --------------------//
  function addUserFavouriteHotel(hotelID) {
    const found = currentUserObj.favourites.find(({ id }) => id === hotelID);
    console.log(found, "found");
    if (found === undefined) {
      console.log(currentUserObj.favourites, "found");
      console.log(hotelObj, "hotel");

      // updateCurrentUser({
      //   favourites: [...currentUserObj.favourites, hotelObj],
      // });
    }
  }

  function scrollToTopPage(ref) {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
  // favFunction
  // function clickedHeart(hotel) {
  //   if (authorized) {
  //     // setClicked(true);
  //     updateCurrentUser({ favourites: [...currentUserObj.favourites, hotel] });
  //     if (clicked) {
  //       // setClicked(false);
  //       let deletedFav = currentUserObj.favourites.filter(
  //         ({ id }) => id !== hotel.id
  //       );
  //       updateCurrentUser({ favourites: [...deletedFav] });
  //     }
  //   } else {
  //     navigations("/login");
  //   }
  // }
  //--------------------- lazy loading delay function --------------------//
  async function delayForDemo(promise) {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    }).then(() => promise);
  }

  return (
    <searchContext.Provider
      value={{
        searchData,
        setSeachData,
        database,
        setCurrentUserObj,
        currentUserObj,
        updateCurrentUser,
        usersReference,
        authorized,
        setAuthorized,
        delayForDemo,
        auth,
        addUserFavouriteHotel,
        createNewUserObj,
        scrollToTopPage,
        // clickedHeart,
        // clicked,
        // setClicked
      }}
    >
      {props.children}
    </searchContext.Provider>
  );
}
