import React from "react";

export const ContactCard = ({ props }) => {
  const { id, firstName, lastName, telNumber } = props;
  return (
    <div>
      <div>
        <div>
          <p>{firstName}</p> <p>{lastName}</p>
        </div>
        <p>{telNumber}</p>
      </div>
      <div>
        <button>edit</button>
        <button>delete</button>
      </div>
    </div>
  );
};
