import React from "react";

export const ContactCard = ({ props }) => {
  const { id, firstName, lastName, telNumber } = props;
  return (
    <div>
      <div className="flex flex-spc-btwn contact-card">
        <div className="text-align-left user-details">
          <p className="margin-0 user-details-name">
            {firstName} {lastName}
          </p>
          <p className="margin-0 fs-sml user-details-num">{telNumber}</p>
        </div>
        <div className="gap-sml">
          <button title="Edit" className="btn-ico alert-primary">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button title="Delete" className="btn-ico alert-danger">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
