import axios from "axios";
import React, { useEffect } from "react";
import { ContactCard } from "./ContactCard";
const mockData = [
  { id: 1, firstName: "lorem", lastName: "ipsum", telNumber: 9092 },
  { id: 2, firstName: "bruh", lastName: "patra", telNumber: 9092 },
  { id: 3, firstName: "susy", lastName: "baka", telNumber: 9092 },
];

const getAllContactsService = async () => {
  const response = await axios.get("http://localhost:8080/phonebook");
  console.log(response);
};

const getAllContactsHandler = () => {};

export const ContactList = () => {
  useEffect(() => {
    getAllContactsService();
  }, []);
  return (
    <div>
      <h1> Phone Book App</h1>
      <div className="phonebook-header">
        <div>Contacts</div>
        <div>Add Contacts</div>
      </div>
      <div>
        <input type="search" placeholder="Search for Contacts" />
      </div>
      <div>
        {mockData.map((contactItem) => {
          return <ContactCard props={contactItem} />;
        })}
      </div>
    </div>
  );
};
