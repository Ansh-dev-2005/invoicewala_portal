import axios from "axios";
import { getHsn } from "./action/hsn";
import { getItemGroup } from "./action/itemgroup";

const api = "http://localhost:5000/api/items/items";
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
    const response = await axios.get(api, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    });
    // fetch hsn data from getHsn with id from response of all items
    const items = response.data;
    const itemsWithHsn = await Promise.all(
      items.map(async (item) => {
        const hsn = await getHsn(item.hsn_code);
        console.log(hsn);
        const itemGroup = await getItemGroup(item.itemGroup);
        return {
          ...item,
          hsn_code: hsn.hsn_code,
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
        const response = await axios.get(`${api}/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the Authorization header
        },
        });
        const item = response.data;
        const hsn = await getHsn(item.hsn_code);
        console.log(hsn);
        const itemGroup = await getItemGroup(item.itemGroup);
        return {
          ...item,
          hsn_code: hsn.hsn_code,
          itemGroup: itemGroup.name,
        };
    } catch (error) {
        console.error(error);
    }
    }
    
