import axios from "axios";
import api from "./api";

const token = sessionStorage.getItem("Token");

export const getVendors = async () => {
  try {
    const response = await axios.get(`${api}/get-vendors`,
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the Authorization header
            },
    }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createVendor = async (data) => {
  try {
    const response = await axios.post(`${api}/create-vendor`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getVendor = async (id) => {
  try {
    const response = await axios.get(`${api}/get-vendors/${id}`,{
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
};

export const updateVendor = async (id, data) => {
  try {
    const response = await axios.put(`${api}/update-vendors/${id}`, data,
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
};
