import axios from "axios";

const api = "http://127.0.0.1:5000/api/auth";

export const signUp = async (data) => {
  try {
    const response = await axios.post(`${api}/register`, data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (data) => {
  try {
    const response = await axios.post(`${api}/login`, data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}