import axios from "axios";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { postContactDataService } from "../../services/post-contact-data-service";
import { AlertBox } from "../AlertBox/AlertBox";

export const AddContactModal = ({
  setIsModalOpen,
  setContactListData,
  editObj,
  setEditObj,
  searchInput,
  setSearchInput,
  contactData,
  setContactData,
  isEditing,
  setIsEditing,
}) => {
  const initialState = {
    id: uuidv4(),
    firstName: "",
    lastName: "",
    telNumber: "", //can't give null as initial value for controlled inputs
  };

  const { firstName, lastName, telNumber } = contactData;

  const [contactDataClientSideErrors, setContactDataClientSideErrors] =
    useState({
      isTelNumberValid: /^[6-9][0-9]{9}$/.test(telNumber) ? true : false,
    });
  const { isTelNumberValid } = contactDataClientSideErrors;

  const formDataChangeHandler = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    setContactData((prevObj) => ({
      ...prevObj,
      [eventName]: isNaN(parseInt(eventValue))
        ? eventValue
        : Number(eventValue),
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
    const editedResponse = JSON.parse(localStorage.getItem("phonebook"));
    setContactListData(editedResponse);

    setIsModalOpen(false);
  };

  const editContactService = async (editObj) => {
    const { id } = editObj;

    const response = await axios.patch(
      `http://localhost:8080/phonebook/${id}`,
      editObj
    );
    return response;
  };

  const editContactDataHandler = async (editObj) => {
    try {
      const response = await editContactService(editObj);
      //Expecting updated response from the api
      setContactListData(response.data.phonebook);
      setIsModalOpen(false);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editContactDataHandlerTemp = (editedObj) => {
    const response = JSON.parse(localStorage.getItem("phonebook"));
    const editedResponse = response.map((contactItem) =>
      contactItem.id === editedObj.id ? editedObj : contactItem
    );

    localStorage.setItem("phonebook", JSON.stringify(editedResponse));
    const updatedResponse = JSON.parse(localStorage.getItem("phonebook"));

    setContactListData(updatedResponse);
    setIsModalOpen(false);

    setIsEditing(false);
  };

  return (
    <div className="modal-container flex-center">
      <div className="modal-content  padding-mdm">
        <button
          title="Close Modal"
          className="btn btn-sml pos-abs-top-right  box-shadow-none red-text-color fs-sml"
          onClick={() => {
            setIsModalOpen(false);
            setIsEditing(false);
            setContactData(initialState);
          }}
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
        <h1>{isEditing ? "Edit Contact" : "Add Contact"}</h1>
        <form
          onSubmit={
            isEditing
              ? (e) => {
                  e.preventDefault();
                  editContactDataHandlerTemp(contactData);
                  setContactData(initialState);
                }
              : (e) => {
                  e.preventDefault();
                  postContactDataHandlerTemp(contactData);
                  setContactData(initialState);

                  setSearchInput("");
                }
          }
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
              value={firstName}
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
              value={lastName}
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
              value={telNumber}
            />
            {Boolean(telNumber) && !isTelNumberValid && (
              <AlertBox
                alertContent={{
                  type: "danger",
                  message: "Enter a valid phone number (Indian format)",
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

//CHECK
//EDIT NOT WORKING
// IMPLEMENT SEARCH FUNCTIONALITY
