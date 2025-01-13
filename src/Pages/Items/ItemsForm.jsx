import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Typography,
  Autocomplete,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import Base from "../../Base";
import { getHsn, getHsns } from "../../action/hsn";
import { getItemGroups } from "../../action/itemgroup";
import { createItem } from "../../api";
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};


const ItemsForm = () => {
  const [value, setValue] = useState(0);
  const [hsnData, setHsnData] = useState([]);
  const [itemGroupData, setItemGroupData] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    itemgroup_id: "",
    groupName: "",
    isActive: true,
    hsnsaccode_id: "",
    hsnCode: "",
    primary_unit: "",
    secondary_unit: "",
    conversion_factor: "",
    barcode: "",
    mrp: "",
    rsp: "",
    purchasePrice: "",
    item_type: "",
    weight: "",
    height: "",
    length: "",
    stdRate: "",
    rate_1: "",
    rate_2: "",
    property_1: "",
    property_2: "",
    property_3: "",
    property_4: "",
    property_5: "",
    property_6: "",
    autoGenerateBarcode: false,
    batchRequired: false,
  });

  useEffect(() => {
    if (formData.autoGenerateBarcode) {
      generateBarcode();
    }
    getHsns().then((data) => {
      setHsnData(data);
    });
    getItemGroups().then((data) => {
      setItemGroupData(data);
    });
  }, [formData.autoGenerateBarcode]);

  const generateBarcode = () => {
    const barcode = Math.floor(
      1000000000 + Math.random() * 9000000000
    ).toString();
    setFormData((prev) => ({
      ...prev,
      barcode,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAutocompleteChange = (event, value, key, labelKey) => {
    if (key === "itemgroup_id") {
      setFormData((prev) => ({
        ...prev,
        [key]: value ? value.id : "",
        [labelKey]: value ? value.name || value.name : "",
      }));
    }
    if (key === "hsnsaccode_id") {
      setFormData((prev) => ({
        ...prev,
        [key]: value ? value.id : "",
        [labelKey]: value ? value.hsn_sac_code || value.hsn_sac_code : "",
      }));
    }
  };

  const close = () => {
    window.location.href = "/masters/items";
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    const item = {
      ...formData,
      itemgroup_id: formData.itemgroup_id,
      hsnsaccode_id: formData.hsnsaccode_id,
    };
    createItem(item).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        alert("Item Created Successfully");
        setFormData({
          productName: "",
          description: "",
          itemgroup_id: "",
          groupName: "",
          isActive: true,
          hsnsaccode_id: "",
          hsnCode: "",
          primary_unit: "",
          secondary_unit: "",
          conversion_factor: "",
          barcode: "",
          mrp: "",
          rsp: "",
          purchasePrice: "",
          item_type: "",
          weight: "",
          height: "",
          length: "",
          stdRate: "",
          rate_1: "",
          rate_2: "",
          property_1: "",
          property_2: "",
          property_3: "",
          property_4: "",
          property_5: "",
          property_6: "",
          autoGenerateBarcode: false,
          batchRequired: false,
        });
      }
    });
  };
   const handleTabChange = (event, newValue) => {
     setValue(newValue);
   };

  return (
    <Base>
      <form
        style={{
          padding: "30px",
        }}
        onSubmit={handleSubmit}
      >
        {/* Basic Info Section */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Basic Info
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="productName"
                  name="productName"
                  label="Product Name"
                  fullWidth
                  value={formData.productName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  fullWidth
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={itemGroupData}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, value) =>
                    handleAutocompleteChange(
                      e,
                      value,
                      "itemgroup_id",
                      "groupName"
                    )
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Item Group" fullWidth />
                  )}
                  value={
                    itemGroupData.find(
                      (itemGroup) => itemGroup._id === formData.itemgroup_id
                    ) || null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="item_type-label">Item Type</InputLabel>
                  <Select
                    labelId="item_type-label"
                    id="item_type"
                    label="Item Type"
                    name="item_type"
                    value={formData.item_type}
                    onChange={handleChange}
                  >
                    <MenuItem value="goods">Goods</MenuItem>
                    <MenuItem value="service">Service</MenuItem>
                    <MenuItem value="capex">Capex</MenuItem>
                    <MenuItem value="others">Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="isActive-label">Status</InputLabel>
                  <Select
                    labelId="isActive-label"
                    id="isActive"
                    name="isActive"
                    value={formData.isActive}
                    onChange={handleChange}
                  >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={hsnData}
                  getOptionLabel={(option) => option.hsn_sac_code}
                  onChange={(e, value) =>
                    handleAutocompleteChange(
                      e,
                      value,
                      "hsnsaccode_id",
                      "hsnCode"
                    )
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="HSN Code" fullWidth />
                  )}
                  value={
                    hsnData.find((hsn) => hsn._id === formData.hsnsaccode_id) ||
                    null
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Pricing & Barcode Section */}
        <Card sx={{ mb: 4 }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="form sections tabs"
          >
            <Tab label="Pricing & Barcode" />
            <Tab label="Dimensions" />
            <Tab label="Additional Properties" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pricing & Barcode
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="mrp"
                    name="mrp"
                    label="M.R.P"
                    fullWidth
                    value={formData.mrp}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="rsp"
                    name="rsp"
                    label="R.S.P"
                    fullWidth
                    value={formData.rsp}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="purchasePrice"
                    name="purchasePrice"
                    label="Purchase Price"
                    fullWidth
                    value={formData.purchasePrice}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="rate"
                    name="rate"
                    label="Rate"
                    fullWidth
                    value={formData.rate}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="barcode"
                    name="barcode"
                    label="Barcode"
                    fullWidth
                    value={formData.barcode}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.autoGenerateBarcode}
                        onChange={handleChange}
                        name="autoGenerateBarcode"
                        color="primary"
                      />
                    }
                    label="Auto Generate Barcode"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Dimensions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="weight"
                    name="weight"
                    label="Weight"
                    fullWidth
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="height"
                    name="height"
                    label="Height"
                    fullWidth
                    value={formData.height}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="length"
                    name="length"
                    label="Length"
                    fullWidth
                    value={formData.length}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Additional Properties
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="property_1"
                    name="property_1"
                    label="Property 1"
                    fullWidth
                    value={formData.property_1}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="property_2"
                    name="property_2"
                    label="Property 2"
                    fullWidth
                    value={formData.property_2}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="property_3"
                    name="property_3"
                    label="Property 3"
                    fullWidth
                    value={formData.property_3}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="property_4"
                    name="property_4"
                    label="Property 4"
                    fullWidth
                    value={formData.property_4}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </TabPanel>
        </Card>

        {/* Dimensions Section */}

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>

        <Button onClick={close} style={{marginLeft:"10px"}} type="Close" variant="contained" color="primary">
          Close
        </Button>
      </form>
    </Base>
  );
};

export default ItemsForm;
