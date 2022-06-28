import axios from "axios";

/* TO BE USED WITH A FUNCTIONING API */
export const getAllContactsService = async () => {
  const response = await axios.get("http://localhost:8080/phonebook");
  return response;
};
