import axios from "axios";
import api from "./api";
const userapi = `${api}`;
// const api = "http://127.0.0.1:5000/api/auth";

export const signUp = async (data) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.post(`${userapi}/register`, data, {
      headers: headers,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (data) => {
  
  try {
    // const response = await axios.post(`${userapi}/login`, data);
    // // store response in session storage
    // sessionStorage.setItem("token", response.data.token);
    // console.log(response.data);

    // authorization header
 
    
    const credentials = btoa(`${data.Username}:${data.Password}`);

      
    const final_data ={
      "org_short_name": data.org_short_name
    }

   
    const response = await axios.post(`${userapi}/login`, final_data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
    });
     
    return response;

    // console request

    
   

  } catch (error) {
    console.log(error);
  }
}

export const getMenuItems = async () => {
  try {
    const response = await axios.get(`${userapi}/get-menus`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(response.data);

    return response.data;

  } catch (error) {
    console.log(error);
  }
};

export const orgisAvailable = async (data) => {
  try {
    const response = await axios.get(`${userapi}/get-orgs-hortname/${data}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}