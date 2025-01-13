import axios from "axios";
import { getHsn } from "./action/hsn";
import { getItemGroup } from "./action/itemgroup";
import api from "./action/api";
// import api from "./api";
// const itemapi = `${api}/auth`;

const token = sessionStorage.getItem("token");

// export const getItems = async () => {
//     try {
//         const response = await axios.get(api);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//     }
//     }

export const getItems = async () => {
  try {
    const response = await axios.get(`${api}/get-items`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    });
    // fetch hsn data from getHsn with id from response of all items
    const items = response.data;
    const itemsWithHsn = await Promise.all(
      items.map(async (item) => {
        const hsn = await getHsn(item.hsnsaccode_id);
        console.log(hsn);
        const itemGroup = await getItemGroup(item.itemgroup_id);
        return {
          ...item,
          hsn_code: hsn.hsn_sac_code,
          itemGroup: itemGroup.name,
        };
        
      })
    );
    return itemsWithHsn;

  } catch (error) {
    console.error(error);
  }
};

// get single item by id

export const getItem = async (id) => {
    try {
        const response = await axios.get(`${api}/get-items/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        });
        const item = response.data;
        const hsn = await getHsn(item.hsnsaccode_id);
        console.log(hsn);
        const itemGroup = await getItemGroup(item.itemgroup_id);
        return {
          ...item,
          hsn_code: hsn.hsn_code,
          itemGroup: itemGroup.name,
        };
    } catch (error) {
        console.error(error);
    }
    }
    


export const createItem = async (item) => {
    try {
        const response = await axios.post(`${api}/items`, item, {
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

    