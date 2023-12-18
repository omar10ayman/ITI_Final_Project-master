import React, { useContext, useEffect, useState } from "react";
import { accountAvatar } from "../assets/images";
import profile1 from "./ProfileAvatars/profile1.jpg";
import profile2 from "./ProfileAvatars/profile2.jpg";
import profile3 from "./ProfileAvatars/profile3.jpg";
import profile4 from "./ProfileAvatars/profile4.jpg";
import profile5 from "./ProfileAvatars/profile5.jpg";
import profile6 from "./ProfileAvatars/profile6.jpg";
import profile7 from "./ProfileAvatars/profile7.jpg";
import profile8 from "./ProfileAvatars/profile8.jpg";
import profile9 from "./ProfileAvatars/profile9.jpg";
import profile10 from "./ProfileAvatars/profile10.jpg";
import Modalimgs from "./Modalimgs";
import { searchContext } from "./../store/searchStore";
export const ProfileImg = () => {
  const { currentUserObj, setCurrentUserObj, updateCurrentUser } =
    useContext(searchContext);
  const [ProfileAvatar, setAvatar] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  console.log(modalShow);
  function addCover(x) {
    setAvatar(x);
  }
  const profileImgs = [
    profile1,
    profile2,
    profile3,
    profile4,
    profile5,
    profile6,
    profile7,
    profile8,
    profile9,
    profile10,
  ];
  useEffect(() => {
    if (ProfileAvatar !== null) {
      updateCurrentUser({ profileImg: ProfileAvatar });
      setCurrentUserObj({ ...currentUserObj, profileImg: ProfileAvatar });
    }
  }, [ProfileAvatar]);

  return (
    <div className="account__avatar d-flex flex-column align-items-center ">
      <img
        src={currentUserObj?.profileImg}
        alt=""
        className="account__avatar__img rounded-circle"
        onClick={() => setModalShow(true)}
      />
      <div
        className={
          currentUserObj.firstName === undefined
            ? "d-none"
            : "text-center mb-2 avatarName "
        }
      >
        <h4 className="m-0">{`${
          currentUserObj.firstName !== undefined ? currentUserObj.firstName : ""
        } ${
          currentUserObj.lastName !== undefined ? currentUserObj.lastName : ""
        }`}</h4>
      </div>
      <Modalimgs
        show={modalShow}
        onHide={() => setModalShow(false)}
        imgsCovres={profileImgs}
        addCover={addCover}
      />
    </div>
  );
};
