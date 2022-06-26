import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { postContactDataService } from "../../services/post-contact-data-service";
import { AlertBox } from "../AlertBox/AlertBox";

export const AddContactModal = () => {
  useEffect(() => {
    postContactDataService(1, {
      firstName: "Cardi",
      lastName: "A",
      telNumber: 8902930293,
    });
  }, []);
  const [contactData, setContactData] = useState({
    id: uuidv4(),
    firstName: "",
    lastName: "",
    telNumber: null,
  });
  const [contactDataClientSideErrors, setContactDataClientSideErrors] =
    useState({
      isTelNumberValid: false,
    });
  const { firstName, lastName, telNumber } = contactData;
  const { isTelNumberValid } = contactDataClientSideErrors;

  const formDataChangeHandler = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    setContactData((prevObj) => ({
      ...prevObj,
      [eventName]: isNaN(eventValue) ? eventValue : Number(eventValue),
    }));
  };

  const getTelNumberVerificationHandler = (telNum) => {
    const valid_tel_num_format = /^[6-9][0-9]{9}$/; //^[6-9]-->first digit should be between 6-9, [0-9]{9}$:-
    if (valid_tel_num_format.test(telNum)) {
      setContactDataClientSideErrors((prevObj) => ({
        ...prevObj,
        isTelNumberValid: true,
      }));
    } else {
      setContactDataClientSideErrors((prevObj) => ({
        ...prevObj,
        isTelNumberValid: false,
      }));
    }
  };
  const postContactData = (event) => {
    event.preventDefault();
    console.log(contactData);
  };

  return (
    <div style={{ border: "1px solid green" }}>
      <h1 style={{ color: "green" }}> Modal</h1>
      <form onSubmit={postContactData}>
        <div>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            name="firstName"
            id="first-name"
            title="First Name"
            onChange={formDataChangeHandler}
            required
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            onChange={formDataChangeHandler}
            name="lastName"
            id="last-name"
            title="Last Name"
            required
          />
        </div>
        <div>
          <label htmlFor="number">Phone Number</label>
          <input
            type="number"
            onChange={(e) => {
              formDataChangeHandler(e);
              getTelNumberVerificationHandler(Number(e.target.value));
            }}
            name="telNumber"
            id="number"
            title="Mobile Number"
            required
          />
          {Boolean(telNumber) && !isTelNumberValid && (
            <AlertBox
              alertContent={{
                type: "danger",
                message: "Enter a valid phone number",
              }}
            />
          )}
        </div>

        <input
          type="submit"
          disabled={!firstName || !lastName || !telNumber || !isTelNumberValid}
        />
      </form>
    </div>
  );
};

//To implement
//  country codes for mobile number
//
