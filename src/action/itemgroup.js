import axios from "axios";
import api from "./api";
const itemgroupapi = `${api}`;
// const api = "http://localhost:5000/api/item-groups";
const token = sessionStorage.getItem("token");

// get signle hsn by id
export const getItemGroup = async (id) => {
  try {
    const response = await axios.get(`${itemgroupapi}/get-item-groups/${id}`, {
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

export const createItemGroup = async (data) => {
  try {
    const response = await axios.post(`${itemgroupapi}/item-groups`, data, {
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

export const getItemGroups = async () => {
  try {
    console.log("getItemGroups: token:", token);
    const response = await axios.get(`${itemgroupapi}/get-item-groups`, {
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

export const updateItemGroup = async (id, data) => {
  try {
    const response = await axios.put(
      `${itemgroupapi}/update-item-groups/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}