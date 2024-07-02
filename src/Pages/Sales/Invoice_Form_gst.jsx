import React, { useState } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Grid,
  Box,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import {
  CalendarMonthOutlined as CalendarIcon,
  Delete,
} from "@mui/icons-material";
import Base from "../../Base";
import { Component_Title } from "../../Components";

const SalesInvoiceForm = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [products, setProducts] = useState([
    {
      product_name: "",
      quantity: 0,
      rate: 0,
      discount: 0,
      gst_rate: 0,
    },
  ]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { product_name: "", quantity: 0, rate: 0, discount: 0, gst_rate: 0 },
    ]);
  };

  const handleDelete = (index) => () => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleProductChange = (index, field) => (event) => {
    const newProducts = products.slice();
    newProducts[index][field] = event.target.value;
    setProducts(newProducts);
  };

  const calculateAmount = (product) => {
    const totalBeforeGST =
      product.quantity * product.rate - (product.rate*product.discount/100);
    const gstAmount = totalBeforeGST * (product.gst_rate / 100);
    return totalBeforeGST + gstAmount;
  };
   const totalAmount = products.reduce(
     (sum, product) => sum + calculateAmount(product),
     0
   );

   const roundedTotalAmount = Math.round(totalAmount);


  return (
    <Base>
      <Box padding={2}>
        <RadioGroup row value={selectedValue} onChange={handleChange}>
          <FormControlLabel
            value="POS_sale"
            control={<Radio />}
            label="POS Sale"
            labelPlacement="start"
          />
          <FormControlLabel
            value="Registered"
            control={<Radio />}
            label="Registered"
            labelPlacement="start"
          />
        </RadioGroup>
        {selectedValue === "POS_sale" && (
          <div>
            {/* Form for POS Sale */}
            <p>Form for POS Sale</p>
          </div>
        )}
        {selectedValue === "Registered" && (
          <Box>
            <Component_Title>Customer Details</Component_Title>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Invoice Number"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={10} container justifyContent="flex-end">
                <Grid item md={3}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Invoice Date"
                    variant="outlined"
                    type="date"
                    required
                  />
                </Grid>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Customer GSTIN"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Customer Address"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Place of Supply"
                  variant="outlined"
                  required
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Component_Title>Product Details</Component_Title>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
            <TableContainer component={Paper} sx={{ mt: 2, overflowX: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell>GST Rate</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          value={product.product_name}
                          onChange={handleProductChange(index, "product_name")}
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          value={product.quantity}
                          onChange={handleProductChange(index, "quantity")}
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          value={product.rate}
                          onChange={handleProductChange(index, "rate")}
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          value={product.discount}
                          onChange={handleProductChange(index, "discount")}
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          value={product.gst_rate}
                          onChange={handleProductChange(index, "gst_rate")}
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          value={calculateAmount(product)}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={handleDelete(index)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Box>
                <Typography variant="h6">Discount Info</Typography>
                <Typography>Total Item Disc.: </Typography>
                <Typography>Scheme: </Typography>
              </Box>
              <Box>
                <Typography variant="h6">Tax Info</Typography>
                <Typography>IGST 0.00%: ₹ 0.00</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Typography variant="h6">Total Disc.: ₹ 0.00</Typography>
                <TableContainer component={Paper} sx={{ width: 400 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Additional Details</TableCell>
                        <TableCell>%</TableCell>
                        <TableCell>₹ Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Round Off: ₹ {(roundedTotalAmount-totalAmount).toFixed(2)} <br/>
                  Invoice Value: ₹ {roundedTotalAmount}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Base>
  );
};

export default SalesInvoiceForm;
