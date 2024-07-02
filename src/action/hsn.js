import axios from "axios";

const api = "http://localhost:5000/api/hsn";
const token = sessionStorage.getItem("token");

// get signle hsn by id
export const getHsn = async (id) => {
    try {
        const response = await axios.get(`${api}/${id}`, {
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
    