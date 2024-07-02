// Invoice.js
import React from "react";
import Base from "../../Base";
import { Component_Title } from "../../Components";
import { Box, Button, Toolbar } from "@mui/material";
import { AddCircleOutline, Schema } from "@mui/icons-material";
import { InvoiceTable } from "../../Components";
import { useNavigate } from "react-router-dom";
import Items_Table from "../../Components/Items_Table";
import { getItems } from "../../api";
import Item_Table from "../../Components/Items_Table";

// Schema for Items:
//  name: { type: String, required: true },
//   image: { type: [String], default: [] },
//   description: { type: String },
//   itemGroup: { type: mongoose.Schema.Types.ObjectId, ref: "ItemGroup" },
//   isActive: { type: Boolean, default: true },
//   hsn_code: { type: mongoose.Schema.Types.ObjectId, ref: "HSN" },
//   primaryUnit: { type: String },
//   secondaryUnit: { type: String },
//   conversionFactor: { type: Number },
//   batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
//   attributes: { type: [AttributeSchema], default: [] },
const Items = () => {
  
 const columns = [
  { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name"},
    { field: "description", headerName: "Description"},
    { field: "itemGroup", headerName: "Item Group" },
    { field: "hsn_code", headerName: "HSN Code" },
    { field: "primaryUnit", headerName: "Primary Unit"},
    { field: "secondaryUnit", headerName: "Secondary Unit" },
    { field: "conversionFactor", headerName: "Conversion Factor" },
    { field: "batch", headerName: "Batch" },
    { field: "attributes", headerName: "Attributes" },
  ];
  
  const [initialRows, setInitialRows] = React.useState([]);
  const Navigate = useNavigate();
  const handleAddInvoice = () => {
    // redirect to /Sales/Invoice-Generate
    Navigate("/Items/Add-Items");
  };

  const fetchItems = () => {
    getItems().then((data) => {
         const dataWithIds = data.map((item, index) => ({
           ...item,
           id: index + 1, // Assign a unique ID starting from 1
           attributes: item.attributes
             .map((attr) => `${attr.key}: ${attr.value}`)
             .join(", "), // Transform attributes to string
         }));
         console.log(dataWithIds);
          setInitialRows(dataWithIds);
    }
    );
  }

  React.useEffect(() => {
    fetchItems();
  }

    , []);


  return (
    <Base>
      <Toolbar>
        <Component_Title>Item List</Component_Title>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          onClick={handleAddInvoice}
          variant="contained"
          startIcon={<AddCircleOutline />}
        >
          Add Items
        </Button>
      </Toolbar>

      <Item_Table rows={initialRows} columns={columns} />
    </Base>
  );
};

export default Items;
