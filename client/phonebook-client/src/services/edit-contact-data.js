import axios from "axios";

export const editContactService = async (editObj) => {
  const { id } = editObj;

  const response = await axios.patch(
    `http://localhost:8080/phonebook/${id}`,
    editObj
  );
  return response;
};
