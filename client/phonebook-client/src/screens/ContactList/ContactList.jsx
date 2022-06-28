import axios from "axios";
import React, { useEffect, useState } from "react";
import { AddContactModal } from "../../components/AddContactModal/AddContactModal";
import { getAllContactsService } from "../../services/get-all-contact-service";
import { ContactCard } from "./ContactCard";
import { v4 as uuidv4 } from "uuid";
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
  const [editObj, setEditObj] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const initialState = {
    id: uuidv4(),
    firstName: "",
    lastName: "",
    telNumber: "", //can't give null as initial value for controlled inputs
  };
  const [contactData, setContactData] = useState(editObj || initialState);

  /*
  const [contactDataSuggestion, setContactDataSuggestion] = useState({
    id: uuidv4(),
    firstName: "",
    lastName: "",
    telNumber: "",
  });
*/
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    //  getAllContactsHandler() to be used with a functioning api
  }, []);

  const getAllContactsHandler = async () => {
    // to be used with a functioning api
    try {
      const resp = await getAllContactsService();
      //Expecting the whole phonebook database
      setContactListData(resp.data.phonebook);
    } catch (error) {
      console.log(error); //todo :- proper error handling with a functioning api
    }
  };

  const searchContacts = (contactsArr, searchInputArg) => {
    if (searchInputArg) {
      if (isNaN(searchInputArg)) {
        const searchInputCombined = searchInputArg
          .trim()
          .split(" ")
          .join("")
          .toLowerCase(); //eliminating spaces and changing input into lowercase
        return contactsArr.filter((contactItem) => {
          const { firstName, lastName } = contactItem;
          return (
            firstName.toLowerCase().includes(searchInputCombined) ||
            lastName.toLowerCase().includes(searchInputCombined) ||
            (firstName + lastName).toLowerCase().includes(searchInputCombined)
          );
        });
      } else {
        return contactsArr.filter((contactItem) => {
          return ("" + contactItem.telNumber).includes(searchInputArg); //converting telNum to string and searching for the input number
        });
      }
    }
    return contactsArr;
  };

  return (
    <>
      {isModalOpen && (
        <AddContactModal
          setIsModalOpen={setIsModalOpen}
          setContactListData={setContactListData}
          editObj={editObj}
          setEditObj={setEditObj}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          contactData={contactData}
          setContactData={setContactData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
      <div className="phonebook-wrapper">
        <h1 className="fs-lrg"> Phone Book App</h1>
        <div className="phonebook-header">
          <div className="flex flex-spc-btwn">
            <p className="fs-mdm fw-bold font-size-mdm">Contacts</p>
            <button
              className="btn btn-cta"
              onClick={() => setIsModalOpen(true)}
            >
              + Add Contact
            </button>
          </div>
        </div>
        <div>
          <input
            type="search"
            placeholder="Search for Contacts"
            className="form-input text-align-left"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="phonebook-container">
          {searchContacts(contactListData, searchInput).length !== 0 ? (
            searchContacts(contactListData, searchInput).map((contactItem) => {
              const { id } = contactItem;
              return (
                <ContactCard
                  key={id}
                  contactItem={contactItem}
                  contactData={contactData}
                  setContactData={setContactData}
                  setContactListData={setContactListData}
                  setEditObj={setEditObj}
                  setIsModalOpen={setIsModalOpen}
                  setIsEditing={setIsEditing}
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
                  onClick={() => {
                    if (searchInput) {
                      setContactData((prevObj) => {
                        if (isNaN(searchInput)) {
                          const searchInputArr = searchInput.split(" "); //splitting  input into an array

                          return {
                            ...prevObj,
                            firstName: searchInputArr[0],
                            lastName: searchInputArr[1] || "",
                          };
                        } else {
                          return { ...prevObj, telNumber: Number(searchInput) };
                        }
                      });
                    }
                    setIsModalOpen(true);
                  }}
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
