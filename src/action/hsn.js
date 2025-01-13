import axios from "axios";
import api from "./api";
const hsnapi = `${api}`;
const token = sessionStorage.getItem("token");

// get signle hsn by id
export const getHsn = async (id) => {
    try {
        const response = await axios.get(`${hsnapi}/get-hsn/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
    }

export const getHsns = async () => {
    try {
        const response = await axios.get(`${hsnapi}/get-hsns`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
    }
    
export const createHsn = async (data) => {
    try {
        const response = await axios.post(`${hsnapi}/create-hsn`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        });
        return response;
    } catch (error) {
        console.error(error);
    }
    }

export const updateHsn = async (id, data) => {
    try {
        const response = await axios.put(`${hsnapi}/update-hsn/${id}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        });
        return response;
    } catch (error) {
        console.error(error);
    }
    }