import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { postContactDataService } from "../../services/post-contact-data-service";
import { AlertBox } from "../AlertBox/AlertBox";

export const AddContactModal = ({ setIsModalOpen, setContactListData }) => {
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

  /*To be used with a functioning api*/
  const postContactDataHandler = async (reqObj) => {
    try {
      const resp = await postContactDataService(reqObj);
      /*Expecting api to return updated response*/
      setContactListData(resp.data.phonebook);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const postContactDataHandlerTemp = (reqObj) => {
    const response = JSON.parse(localStorage.getItem("phonebook")) || [];
    localStorage.setItem("phonebook", JSON.stringify([...response, reqObj]));
    const updatedResponse = JSON.parse(localStorage.getItem("phonebook"));
    setContactListData(updatedResponse);

    setIsModalOpen(false);
  };

  return (
    <div className="modal-container flex-center">
      <div className="modal-content  padding-mdm">
        <button
          title="Close Modal"
          className="btn btn-sml pos-abs-top-right  box-shadow-none red-text-color fs-sml"
          onClick={() => setIsModalOpen(false)}
        >
          <i class="fa-solid fa-circle-xmark"></i>
        </button>
        <h1> Add Contact</h1>
        <form
          onSubmit={() => postContactDataHandlerTemp(contactData)}
          className="flex-start"
        >
          <div className="input-wrapper">
            <label htmlFor="first-name" className="required-field">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="first-name"
              title="First Name"
              className="form-input"
              placeholder="Ben"
              onChange={formDataChangeHandler}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="last-name" className="required-field">
              Last Name
            </label>
            <input
              type="text"
              onChange={formDataChangeHandler}
              name="lastName"
              id="last-name"
              title="Last Name"
              className="form-input"
              placeholder="Awad"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="number" className="required-field">
              Phone Number
            </label>
            <input
              type="number"
              className="form-input"
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
            className="btn btn-cta"
            type="submit"
            disabled={
              !firstName || !lastName || !telNumber || !isTelNumberValid
            }
          />
        </form>
      </div>
    </div>
  );
};

//To implement
//  country codes for mobile number
//
