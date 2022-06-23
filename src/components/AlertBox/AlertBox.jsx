import React from "react";

const getIcon = (actionType) => {
  if (actionType === "success") return "fa-check-circle";
  else if (actionType === "danger") return "fa-exclamation-circle";
  else return "fa-radiation-alt";
};

export const AlertBox = ({ alertContent }) => {
  const { message, type } = alertContent;

  return (
    <div className={`alert alert-${type} text-align-justify`}>
      <i className={`fas ${getIcon(type)}`}></i> {message}
    </div>
  );
};
