// Invoice.js
import React, { useState } from "react";
import Base from "../../Base";
import { Component_Title, InvoiceCard, InvoiceTable } from "../../Components";
import {
  Box,
  Button,
  Toolbar,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useMediaQuery,
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";


const initialRows = [
  { id: 1, date: "2023-06-01", customer: "Customer A", total: 100 },
  { id: 2, date: "2023-06-02", customer: "Customer B", total: 200 },
  // add more sample data here
];

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "date", headerName: "Date", width: 150 },
  { field: "customer", headerName: "Customer", width: 200 },
  { field: "total", headerName: "Total", width: 130, type: "number" },
];

const Invoice = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [sortCriteria, setSortCriteria] = useState("date");

  const handleAddInvoice = () => {
    navigate("/Sales/Invoice-Generate");
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const sortedRows = [...initialRows].sort((a, b) => {
    if (sortCriteria === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortCriteria === "total") {
      return a.total - b.total;
    }
    return 0;
  });

  return (
    <Base>
      <Toolbar>
        <Component_Title>Invoice List</Component_Title>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          onClick={handleAddInvoice}
          variant="contained"
          startIcon={<AddCircleOutline />}
        >
          Add Invoice
        </Button>
      </Toolbar>

      <Box sx={{ flexGrow: 1 }}>
        {matches ? (
          <>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortCriteria} onChange={handleSortChange}>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="total">Total</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={2}>
              {sortedRows.map((row) => (
                <Grid item xs={12} key={row.id}>
                  <InvoiceCard invoice={row} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <InvoiceTable rows={sortedRows} columns={columns} />
        )}
      </Box>
    </Base>
  );
};

export default Invoice;
