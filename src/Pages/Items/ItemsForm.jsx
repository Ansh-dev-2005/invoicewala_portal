// src/FormComponent.js
import React, { useState } from "react";
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
} from "@mui/material";
import Base from "../../Base"

const ItemsForm = () => {
  const [formData, setFormData] = useState({
    product: "",
    supplyType: "1",
    packing: "",
    unit: "",
    decimal: "0",
    hsn: "",
    taxCategory: "",
    company: "",
    mrp: "",
    purchaseRate: "",
    cost: "",
    saleRate: "",
    free: "",
    scheme: "",
    schemeType: "1",
    status: "1",
    colorType: "",
    advanceInfo: false,
    discount: "1",
    itemDisc1: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <Base>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Basic Info
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="product"
              name="product"
              label="Product"
              fullWidth
              value={formData.product}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="supplyType-label">Supply Type</InputLabel>
              <Select
                labelId="supplyType-label"
                id="supplyType"
                name="supplyType"
                value={formData.supplyType}
                onChange={handleChange}
              >
                <MenuItem value="1">Goods</MenuItem>
                <MenuItem value="2">Service</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="packing"
              name="packing"
              label="Packing"
              fullWidth
              value={formData.packing}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="unit"
              name="unit"
              label="Unit 1st"
              fullWidth
              value={formData.unit}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="decimal-label">Unit in Decimal</InputLabel>
              <Select
                labelId="decimal-label"
                id="decimal"
                name="decimal"
                value={formData.decimal}
                onChange={handleChange}
              >
                <MenuItem value="0">No</MenuItem>
                <MenuItem value="1">Yes</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="hsn"
              name="hsn"
              label="HSN/SAC"
              fullWidth
              value={formData.hsn}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="taxCategory"
              name="taxCategory"
              label="Tax Category"
              fullWidth
              value={formData.taxCategory}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="company"
              name="company"
              label="Company"
              fullWidth
              value={formData.company}
              onChange={handleChange}
            />
          </Grid>
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
              id="purchaseRate"
              name="purchaseRate"
              label="Purchase Rate"
              fullWidth
              value={formData.purchaseRate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="cost"
              name="cost"
              label="Cost"
              fullWidth
              value={formData.cost}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="saleRate"
              name="saleRate"
              label="Sale Rate"
              fullWidth
              value={formData.saleRate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="free"
                  name="free"
                  label="Free"
                  fullWidth
                  value={formData.free}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="scheme"
                  name="scheme"
                  label="Scheme"
                  fullWidth
                  value={formData.scheme}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="schemeType-label">Scheme Type</InputLabel>
              <Select
                labelId="schemeType-label"
                id="schemeType"
                name="schemeType"
                value={formData.schemeType}
                onChange={handleChange}
              >
                <MenuItem value="1">Full Scheme</MenuItem>
                <MenuItem value="2">Half Scheme</MenuItem>
                <MenuItem value="3">1/3 Scheme</MenuItem>
                <MenuItem value="4">Qtr. Scheme</MenuItem>
                <MenuItem value="5">All Scheme</MenuItem>
                <MenuItem value="6">Whole Scheme</MenuItem>
                <MenuItem value="7">No Scheme</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="1">Continue</MenuItem>
                <MenuItem value="2">Discontinue</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="colorType-label">Color Type</InputLabel>
              <Select
                labelId="colorType-label"
                id="colorType"
                name="colorType"
                value={formData.colorType}
                onChange={handleChange}
              >
                <MenuItem value="">---Blank---</MenuItem>
                <MenuItem value="red">Red</MenuItem>
                <MenuItem value="blue">Blue</MenuItem>
                <MenuItem value="green">Green</MenuItem>
                <MenuItem value="purple">Purple</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.advanceInfo}
                  onChange={handleChange}
                  name="advanceInfo"
                  color="primary"
                />
              }
              label="Advance Info"
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom>
          Discount
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="discount-label">Discount</InputLabel>
              <Select
                labelId="discount-label"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
              >
                <MenuItem value="1">Exclusive</MenuItem>
                <MenuItem value="2">Inclusive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="itemDisc1"
              name="itemDisc1"
              label="Item Disc 1 %"
              fullWidth
              value={formData.itemDisc1}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </form>
    </Base>
  );
};

export default ItemsForm;
