import axios from "axios";

const api = "http://localhost:5000/api/item-groups";
const token = sessionStorage.getItem("token");

// get signle hsn by id
export const getItemGroup = async (id) => {
  try {
    const response = await axios.get(`${api}/get-item-groups/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
