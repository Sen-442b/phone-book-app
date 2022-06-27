import axios from "axios";
import React, { useEffect, useState } from "react";
import { ContactCard } from "./ContactCard";
const mockData = [
  { id: 1, firstName: "Lorem", lastName: "Ipsum", telNumber: 9092 },
  { id: 2, firstName: "John", lastName: "Doe", telNumber: 9092 },
  { id: 3, firstName: "Nicholas", lastName: "Cage", telNumber: 9092 },
  { id: 3, firstName: "Nicholas", lastName: "Cage", telNumber: 9092 },
  { id: 3, firstName: "Nicholas", lastName: "Cage", telNumber: 9092 },
  { id: 3, firstName: "Nicholas", lastName: "Cage", telNumber: 9092 },
  { id: 3, firstName: "Nicholas", lastName: "Cage", telNumber: 9092 },
  { id: 3, firstName: "Nicholas", lastName: "Cage", telNumber: 9092 },
];

const getAllContactsService = async () => {
  const response = await axios.get("http://localhost:8080/phonebook");
  console.log(response);
};

export const ContactList = () => {
  const [contactListData, setContactListData] = useState(
    JSON.parse(localStorage.getItem("contactListData")) || []
  );

  const getAllContactsHandler = async () => {
    try {
      const resp = await getAllContactsService();
    } catch (error) {}
  };
  useEffect(() => {
    //getAllContactsHandler(); :- to be used with a functioning api
  }, []);

  return (
    <div className="phonebook-wrapper">
      <h1> Phone Book App</h1>
      <div className="phonebook-header">
        <div className="flex flex-spc-btwn">
          <p>Contacts</p>
          <button className="btn btn-cta">Add Contact</button>
        </div>
      </div>
      <div>
        <input
          type="search"
          placeholder="Search for Contacts"
          className="width-100"
        />
      </div>
      <div className="phonebook-container">
        {contactListData.length !== 0 ? (
          mockData.map((contactItem) => {
            return <ContactCard props={contactItem} />;
          })
        ) : (
          <div className="phonebook-empty">
            <div>
              <h3>Nothing to Show Here</h3>
              <button title="Add Contact" className="create-contact-icon">
                <i class="fa-solid fa-circle-plus fs-lrg"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
