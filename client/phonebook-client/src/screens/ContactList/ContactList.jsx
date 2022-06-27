import axios from "axios";
import React, { useEffect, useState } from "react";
import { AddContactModal } from "../../components/AddContactModal/AddContactModal";
import { getAllContactsService } from "../../services/get-all-contact-service";
import { ContactCard } from "./ContactCard";
/*
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
*/

export const ContactList = () => {
  const [contactListData, setContactListData] = useState(
    JSON.parse(localStorage.getItem("phonebook")) || []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    //  getAllContactsHandler() to be used with a functioning api
  }, []);

  const getAllContactsHandler = async () => {
    // to be used with a functioning api
    try {
      const resp = await getAllContactsService();
    } catch (error) {
      console.log(error); //todo :- proper error handling with a functioning api
    }
  };

  return (
    <>
      {isModalOpen && (
        <AddContactModal
          setIsModalOpen={setIsModalOpen}
          setContactListData={setContactListData}
        />
      )}
      <div className="phonebook-wrapper">
        <h1> Phone Book App</h1>
        <div className="phonebook-header">
          <div className="flex flex-spc-btwn">
            <p>Contacts</p>
            <button
              className="btn btn-cta"
              onClick={() => {
                setIsModalOpen(true);
                console.log(contactListData);
              }}
            >
              + Add Contact
            </button>
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
            contactListData.map((contactItem) => {
              const { id } = contactItem;
              return (
                <ContactCard
                  id={id}
                  contactItem={contactItem}
                  setContactListData={setContactListData}
                />
              );
            })
          ) : (
            <div className="phonebook-empty">
              <div>
                <h3>Nothing to Show Here</h3>
                <button
                  title="Add Contact"
                  className="create-contact-icon"
                  onClick={() => setIsModalOpen(true)}
                >
                  <i class="fa-solid fa-circle-plus fs-lrg"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
