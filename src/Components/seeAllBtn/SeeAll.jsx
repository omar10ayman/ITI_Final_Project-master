import React from "react";
import "./sellAll.css";
import { Link } from "react-router-dom";

export const SeeAllButton = () => {
  return (
    <Link to={"allcities"}>
      <button className="seeAllBtn">see All</button>
    </Link>
  );
};
