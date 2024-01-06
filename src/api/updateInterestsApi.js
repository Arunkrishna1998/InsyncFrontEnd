import axios from "axios";
import { BASE_URL } from "../config";

const updateInterestsApi = async (selectedTags) => {
  try {
    const accessToken = localStorage.getItem("access_token");

    const requestData = { interests: selectedTags };
    console.log(selectedTags);

    const response = await axios.put(
      `${BASE_URL}/api/post/update-interests/`,
      requestData,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to update interests:", response.data);
      // Handle the error, e.g., display a user-friendly message
    }
  } catch (error) {
    console.error("An error occurred while updating interests:", error);
    // Handle the error, e.g., display a user-friendly message
  }
};

export default updateInterestsApi;
