import React from "react";
import { deleteContactDataService } from "../../services/delete-contact-data-service";

export const ContactCard = ({
  contactItem,
  contactData,
  setContactData,
  setContactListData,
  setEditObj,
  setIsModalOpen,
  setIsEditing,
}) => {
  const { id, firstName, lastName, telNumber } = contactItem;

  const deleteContactDataHandler = async (objId) => {
    //to be used with a functioning api
    try {
      const response = await deleteContactDataService(objId);

      /*Expecting updated response after deleting the specific data */
      setContactListData(response.data.phonebook);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContactDataHandlerTemp = (objId) => {
    const response = JSON.parse(localStorage.getItem("phonebook"));
    const filteredResponse = response.filter(
      (contactData) => contactData.id !== objId
    );
    localStorage.setItem("phonebook", JSON.stringify(filteredResponse));
    const updatedResponse = JSON.parse(localStorage.getItem("phonebook"));
    setContactListData(updatedResponse);
  };

  return (
    <div>
      <div className="flex flex-spc-btwn contact-card">
        <div className="text-align-left user-details">
          <p className="margin-0 user-details-name">
            {firstName} {lastName}
          </p>
          <p className="margin-0 fs-sml user-details-num">
            <i className="fa-solid fa-phone fs-sml"></i> {telNumber}
          </p>
        </div>
        <div className="gap-sml">
          <button
            title="Edit"
            className="btn-ico alert-primary"
            onClick={() => {
              setContactData(contactItem);
              setIsEditing(true);
              setIsModalOpen(true);
            }}
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            title="Delete"
            className="btn-ico alert-danger"
            onClick={() => deleteContactDataHandlerTemp(id)}
          >
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
