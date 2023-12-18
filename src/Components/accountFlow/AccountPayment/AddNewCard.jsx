import React from "react";

export const AddNewCard = ({ setModalShow }) => {

  return (
  
      <div
        className="add-visa py-3 rounded-3 add-visa-width w-100"
        onClick={setModalShow}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="65"
          viewBox="0 0 64 65"
          fill="none"
        >
          <path
            d="M56 32.5C56 19.25 45.25 8.5 32 8.5C18.75 8.5 8 19.25 8 32.5C8 45.75 18.75 56.5 32 56.5C45.25 56.5 56 45.75 56 32.5Z"
            stroke="#8DD3BB"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M32 22.5V42.5M42 32.5H22"
            stroke="#8DD3BB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>Add a new card</p>
      </div>
    
  );
};
