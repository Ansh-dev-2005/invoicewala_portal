import React, { useEffect, useState } from "react";
import Base from "../../Base";
import { Component_Title } from "../../Components";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Toolbar,
  Typography,
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import VendorTable from "../../Components/Vendor_Table";
import { useNavigate } from "react-router-dom";
import { getVendors } from "../../action/vendor";

const Vendor = () => {
  const [initialRows, setInitialRows] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
    // legal_name: "",
    // trade_name: "",
    // shortName: "",
    // gstin: "",
    // gstState: "",
    // gststate_code: "",
    // gst_reg_date: "",
    // msmeRegNo: "",
    // email: "",
    // phone: "",
    // bill_address: "",
    // bill_city: "",
    // bill_pin: "",
    // ship_address: "",
    // ship_city: "",
    // ship_pin: "",
    // contact_person: "",
    // phone_1: "",
    // mobile: "",
    // active: true,
    // website: "",
    // cin: "",

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "trade_name", headerName: "Name" },
    { field: "ship_address", headerName: "Address" },
    { field: "phone", headerName: "Contact" },
    { field: "email", headerName: "Email" },
    { field: "gstin", headerName: "GST" },
    { field: "gstState", headerName: "State" },
    { field: "bill_address", headerName: "Bill Address" },
    { field: "bill_city", headerName: "Bill City" },
    { field: "bill_pin", headerName: "Bill Pin" },
    { field: "ship_city", headerName: "Ship City" },
    { field: "ship_pin", headerName: "Ship Pin" },
    { field: "contact_person", headerName: "Contact Person" },
    { field: "phone_1", headerName: "Phone 1" },
    { field: "mobile", headerName: "Mobile" },
    { field: "cin", headerName: "CIN" }, 
  ];

  const Navigate = useNavigate();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 600;

  useEffect(() => {
    const getVendorData = async () => {
      try {
        const response = await getVendors();
        if (response) {
          setInitialRows(response.data);
          console.log("Vendor Data: ", response.data);
        }
      } catch (error) {
        console.error("Error fetching vendor data: ", error);
      } finally {
        setLoading(false); // Data fetching completed
      }
    };
    getVendorData();
  }, []);

  const handlevendoradd = () => {
    Navigate("/masters/vendor/Add-Vendor");
  };

  return (
    <Base>
      <Toolbar>
        <Component_Title>Vendor List</Component_Title>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          onClick={handlevendoradd}
          variant="contained"
          startIcon={<AddCircleOutline />}
        >
          Add Vendor
        </Button>
      </Toolbar>

      {/* Check if data is loading */}
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : isMobile ? (
        <Box>
          {initialRows.length > 0 ? (
            initialRows.map((row) => (
              <Card key={row.id} sx={{ maxWidth: 345, margin: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {row.trade_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {row.ship_address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {row.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {row.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {row.gstin}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => Navigate(`/masters/vendor/${row.id}`)}
                    >
                      View
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            ))
          ) : (
            <Typography variant="body1">No vendors found.</Typography>
          )}
        </Box>
      ) : (
        <VendorTable rows={initialRows} columns={columns} />
      )}
    </Base>
  );
};

export default Vendor;
