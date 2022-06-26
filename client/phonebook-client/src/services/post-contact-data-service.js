import axios from "axios";

export const postContactDataService = async (reqObj) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/phonebook",
      reqObj
    );
    console.log(response);
  } catch (error) {}
};
