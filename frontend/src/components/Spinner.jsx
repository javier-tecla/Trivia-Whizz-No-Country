import React from "react";
import "./spinner.css";

export default function Spinner() {
  return (
    <span className="loader">
      <span className="loading-bar"></span>
      <span className="percentage"></span>
    </span>
  );
}
