import React from "react";
import "./Button.scss";

const Button = ({ handleClick, children, className }) => {
  return (
    <button
      className={`btn ${className ? className : ""}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
export default Button;
