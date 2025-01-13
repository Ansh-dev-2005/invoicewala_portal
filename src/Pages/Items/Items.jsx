// Invoice.js
import React, { useState } from "react";
import Base from "../../Base";
import { Component_Title } from "../../Components";
import { Box, Button, Card, CardContent, CircularProgress, IconButton, TextField, Toolbar, Typography } from "@mui/material";
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
    { field: "productName", headerName: "Name" },
    { field: "description", headerName: "Description" },
    { field: "itemGroup", headerName: "Item Group" },
    { field: "hsn_code", headerName: "HSN Code" },
    { field: "primary_unit", headerName: "Primary Unit" },
    { field: "secondary_unit", headerName: "Secondary Unit" },
    { field: "conversion_factor", headerName: "Conversion Factor" },
    { field: "mrp", headerName: "MRP" },
    { field: "rsp", headerName: "RSP" },
    { field: "stdRate", headerName: "Standard Rate" },
  ];
  const [loading, setLoading] = useState(true); // Initialize loading state

  const [initialRows, setInitialRows] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const Navigate = useNavigate();
  const handleAddInvoice = () => {
    // redirect to /Sales/Invoice-Generate
    Navigate("/masters/Item/Add-Items");
  };

  const fetchItems = async () => {
    try {
      setLoading(true); // Start loading
      const data = await getItems();
      console.log(data);
      if (!data) {
        console.error("Data Not Available");
        return;
      }
      setInitialRows(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  React.useEffect(() => {
    fetchItems();
  }, []);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 600;
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = initialRows.filter((row) => {
    const query = searchQuery.toLowerCase();
    return (
      row.productName.toLowerCase().includes(query) ||
      row.description.toLowerCase().includes(query) ||
      (row.itemGroup && row.itemGroup.toLowerCase().includes(query)) ||
      (row.hsn_code && row.hsn_code.toLowerCase().includes(query))
    );
  });

  const handleRowClick = (params) => {
    Navigate(`/masters/Item/${params.row.id}`);
  }
  
 return (
   <Base>
     <Toolbar>
       <Component_Title>Item List</Component_Title>
       <Box sx={{ flexGrow: 1 }} />
       <TextField
         label="Search"
         variant="outlined"
         value={searchQuery}
         onChange={handleSearchChange}
         sx={{ marginRight: 2 }}
         disabled={loading} // Disable search when loading
       />
       <Button
         onClick={handleAddInvoice}
         variant="contained"
         startIcon={<AddCircleOutline />}
         disabled={loading} // Disable button when loading
       >
         Add Items
       </Button>
     </Toolbar>
     {loading ? (
       <Box
         sx={{
           display: "flex",
           justifyContent: "center",
           alignItems: "center",
           height: "60vh",
         }}
       >
         <CircularProgress />
       </Box>
     ) : isMobile ? (
       <Box>
         {filteredRows.map((row) => (
           <Card
             key={row.id}
             sx={{ m: "10px", display: "flex", maxWidth: "90vw" }}
             onClick={() => {
               Navigate(`/masters/Item/${row.id}`);
             }}
           >
             <Box sx={{ display: "flex", flexDirection: "column" }}>
               <CardContent sx={{ flex: "1 0 auto" }}>
                 <Typography component="div" variant="h5">
                   {row.productName}
                 </Typography>
                 <Typography
                   variant="subtitle1"
                   color="text.secondary"
                   component="div"
                 >
                   {row.itemGroup}
                 </Typography>
               </CardContent>
               <Box
                 sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
               >
                 {row.description}
               </Box>
             </Box>
           </Card>
         ))}
       </Box>
     ) : (
       <Item_Table
         rows={filteredRows}
         columns={columns}
         getRowId={(row) => row.id}
        //  onRowClick={(params) => handleEdit(params.row)}
        onRowClick={handleRowClick}
       />
     )}
   </Base>
 );
};
export default Items;
