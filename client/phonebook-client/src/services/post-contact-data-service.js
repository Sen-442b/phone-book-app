import axios from "axios";

// TO BE USED WITH A FUNCTIONING API

export const postContactDataService = async (reqObj) => {
  const response = await axios.post("http://localhost:8080/phonebook", reqObj);
  return response;
};
