import axios from "axios";

export const deleteContactDataService = async (objId) => {
  const response = await axios.delete(
    `http://localhost:8080/phonebook/${objId}`
  );
  return response;
};
