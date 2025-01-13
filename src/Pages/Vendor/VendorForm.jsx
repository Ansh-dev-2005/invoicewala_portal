import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import Base from "../../Base";
import { createVendor, getVendor, updateVendor } from "../../action/vendor";
import { useNavigate, useParams } from "react-router-dom";
import validateGSTIN from "../../Components/validateGSTIN";

const AddVendorForm = () => {
  const { vendorId } = useParams();
  const [formType, setFormType] = useState("Add");

  const [vendorData, setVendorData] = useState({
    legal_name: "",
    trade_name: "",
    shortName: "",
    gstin: "",
    gstState: "",
    gststate_code: "",
    gst_reg_date: "",
    msmeRegNo: "",
    email: "",
    phone: "",
    bill_address: "",
    bill_city: "",
    bill_pin: "",
    ship_address: "",
    ship_city: "",
    ship_pin: "",
    contact_person: "",
    phone_1: "",
    mobile: "",
    active: true,
    website: "",
    cin: "",
  });
  const [loading, setLoading] = useState(false);
  const [stateInfo, setStateInfo] = useState({ stateCode: "", stateName: "" });
  const navigate = useNavigate();

  const [fetching, setFetching] = useState(!!vendorId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "gstin") {
      if (value.length === 15) {
        const gstinValidation = validateGSTIN(value);
        console.log("GSTIN Validation: ", gstinValidation);
        //  console.log("GSTIN Validation: ", gstinValidation);
        if (gstinValidation.valid) {
          setStateInfo({
            stateCode: gstinValidation.stateCode,
            stateName: gstinValidation.stateName,
          });
          // Update GST State and State Code fields
          setVendorData((prev) => ({
            ...prev,
            gstState: gstinValidation.stateName,
            gststate_code: gstinValidation.stateCode,
          }));
        } else {
          setStateInfo({ stateCode: "", stateName: "" });
          setVendorData((prev) => ({
            ...prev,
            gstState: "",
            gststate_code: "",
          }));
        }
      } else {
        setStateInfo({ stateCode: "", stateName: "" });
        setVendorData((prev) => ({
          ...prev,
          gstState: "",
          gststate_code: "",
        }));
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formType === "Add") {
        const response = await createVendor(vendorData);
        if (response.status === 201) {
          alert("Vendor added successfully");
        }
      } else {
        const response = await updateVendor(vendorId, vendorData);
        if (response.status === 200) {
          alert("Vendor updated successfully");
        }
      }
      navigate("/masters/vendor");
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to ${formType === "Add" ? "add" : "update"} vendor`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (vendorId) {
      setFormType("Update");
      const fetchVendor = async () => {
        try {
          const data = await getVendor(vendorId);
          console.log("Vendor Data: ", data);
          setVendorData(data);
          if (data.gstin) {
            const gstinValidation = validateGSTIN(data.gstin);
            if (gstinValidation.valid) {
              setStateInfo({
                stateCode: gstinValidation.stateCode,
                stateName: gstinValidation.stateName,
              });
            }
          }
        } catch (error) {
          console.error("Error fetching vendor:", error);
        } finally {
          setFetching(false);
        }
      };

      fetchVendor();
    }
  }, [vendorId]);

  if (fetching) {
    return (
      <Base>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </Base>
    );
  }

  return (
    <Base>
      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
        >
          {formType === "Add" ? "Add Vendor" : "Update Vendor"}
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Business Information */}
          <Typography variant="h6" gutterBottom>
            Business Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="legal_name"
                name="legal_name"
                label="Legal Name"
                fullWidth
                value={vendorData.legal_name}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="trade_name"
                name="trade_name"
                label="Trade Name"
                fullWidth
                value={vendorData.trade_name}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="shortName"
                name="shortName"
                label="Short Name"
                fullWidth
                value={vendorData.shortName}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>

          {/* GST & Registration Information */}
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            GST & Registration Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="gstin"
                name="gstin"
                label="GSTIN"
                fullWidth
                value={vendorData.gstin}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="gstState"
                name="gstState"
                label="GST State"
                fullWidth
                value={vendorData.gstState}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="gststate_code"
                name="gststate_code"
                label="GST State Code"
                fullWidth
                value={vendorData.gststate_code}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="gst_reg_date"
                name="gst_reg_date"
                label="GST Registration Date"
                fullWidth
                value={vendorData.gst_reg_date}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="msmeRegNo"
                name="msmeRegNo"
                label="MSME Registration Number"
                fullWidth
                value={vendorData.msmeRegNo}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>

          {/* Billing Information */}
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Billing Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="bill_address"
                name="bill_address"
                label="Billing Address"
                fullWidth
                value={vendorData.bill_address}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="bill_city"
                name="bill_city"
                label="Billing City"
                fullWidth
                value={vendorData.bill_city}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="bill_pin"
                name="bill_pin"
                label="Billing Pin"
                fullWidth
                value={vendorData.bill_pin}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>

          {/* Shipping Information */}
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Shipping Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="ship_address"
                name="ship_address"
                label="Shipping Address"
                fullWidth
                value={vendorData.ship_address}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="ship_city"
                name="ship_city"
                label="Shipping City"
                fullWidth
                value={vendorData.ship_city}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="ship_pin"
                name="ship_pin"
                label="Shipping Pin"
                fullWidth
                value={vendorData.ship_pin}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
          {/* Contact Information */}
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Contact Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="contact_person"
                name="contact_person"
                label="Contact Person"
                fullWidth
                value={vendorData.contact_person}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="phone_1"
                name="phone_1"
                label="Phone 1"
                fullWidth
                value={vendorData.phone_1}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="mobile"
                name="mobile"
                label="Mobile"
                fullWidth
                value={vendorData.mobile}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>

          {/* Additional Information */}
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Additional Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="website"
                name="website"
                label="Website"
                fullWidth
                value={vendorData.website}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="cin"
                name="cin"
                label="CIN"
                fullWidth
                value={vendorData.cin}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, mx: "auto", display: "block", borderRadius: 2 }}
            >
              Submit
            </Button>
          )}
        </form>
      </Box>
    </Base>
  );
};

export default AddVendorForm;
