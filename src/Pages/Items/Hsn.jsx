import React, { useEffect, useState } from "react";
import Base from "../../Base";
import { Component_Title } from "../../Components";
import {
  Box,
  Button,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import { createHsn, getHsns, updateHsn } from "../../action/hsn"; // Assuming you have an updateHsn function
import HsnTable from "../../Components/Hsn_Table";
import { Navigate, useNavigate } from "react-router-dom";

const Hsn = () => {
  const [open, setOpen] = useState(false);
  const [hsnType, setHsnType] = useState("goods");
  const [selectedHsn, setSelectedHsn] = useState(null); // State to hold the selected HSN for update
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const [rates, setRates] = useState([
    {
      item_rate: 0,
      eff_from_date: "",
      gst_rate: 0,
      igst: 0,
      cgst: 0,
      sgst: 0,
      cess: 0,
    },
  ]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "hsn_sac_code", headerName: "HSN Code", width: 150 },
    { field: "hsn_description", headerName: "HSN Description", width: 200 },
    { field: "type", headerName: "Type", width: 130 },
    {
      field: "rates",
      headerName: "Rates",
      width: 150,
      renderCell: (params) => {
        const rates = params.value;
        return rates
          .map((rate) => `${rate.item_rate} @ ${rate.gst_rate}%`)
          .join(", ");
      },
    },
  ];

  useEffect(() => {
    const fetchHsn = async () => {
      try {
        const response = await getHsns();
        if (response) {
          console.log("HSN Data: ", response);
          setRows(response);
        } else {
          console.error("Data Not Available");
        }
      } catch (error) {
        console.error("Error fetching HSNs:", error);
      } finally {
        setLoading(false); // Data fetching completed
      }
    };
    fetchHsn();
  }, []);

  const handleAddHsn = () => {
    setSelectedHsn(null); // Reset selectedHsn when adding new HSN
    setRates([
      {
        item_rate: 0,
        eff_from_date: "",
        gst_rate: 0,
        igst: 0,
        cgst: 0,
        sgst: 0,
        cess: 0,
      },
    ]); // Reset rates
    setOpen(true);
  };

  const handleEditHsn = (hsn) => {
    setSelectedHsn(hsn); // Set the selected HSN for update
    setHsnType(hsn.type); // Set the type
    setRates(hsn.rates); // Set the rates
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedHsn(null); // Reset selectedHsn on dialog close
    setRates([
      {
        item_rate: 0,
        eff_from_date: "",
        gst_rate: 0,
        igst: 0,
        cgst: 0,
        sgst: 0,
        cess: 0,
      },
    ]); // Reset rates
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const hsnData = {
      hsn_sac_code: formData.get("hsn_code"),
      hsn_description: formData.get("hsn_description"),
      type: hsnType,
      rates: rates.map((rate, index) => ({
        item_rate: Number(formData.get(`item_rate_${index}`)),
        eff_from_date: formData.get(`eff_from_date_${index}`),
        gst_rate: Number(formData.get(`cgst_${index}`)) * 2,
        igst: Number(formData.get(`cgst_${index}`)) * 2,
        cgst: Number(formData.get(`cgst_${index}`)),
        sgst: Number(formData.get(`cgst_${index}`)),
        cess: Number(formData.get(`cess_${index}`)),
      })),
    };

    try {
      if (selectedHsn) {
        // Update existing HSN
        const response = await updateHsn(selectedHsn.id, hsnData);
        if (response.status === 200) {
          console.log("HSN Updated Successfully");
        }
      } else {
        // Create new HSN
        const response = await createHsn(hsnData);
        if (response.status === 200) {
          console.log("HSN Created Successfully");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setOpen(false);
    setSelectedHsn(null);
  };
  const Navigate = useNavigate();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 600;

  const handleHsnChange = (event) => {
    setHsnType(event.target.value);
  };

  const handleGstChange = (index, field, value) => {
    const newRates = [...rates];
    newRates[index][field] = value;

    if (field === "cgst" || field === "sgst") {
      const cgst = newRates[index].cgst || 0;
      const sgst = newRates[index].sgst || 0;
      newRates[index].gst_rate = cgst + sgst;
      newRates[index].igst = newRates[index].gst_rate;
    }

    setRates(newRates);
  };

  const handleAddRate = () => {
    setRates([
      ...rates,
      {
        item_rate: 0,
        eff_from_date: "",
        gst_rate: 0,
        igst: 0,
        cgst: 0,
        sgst: 0,
        cess: 0,
      },
    ]);
  };

  const handleRemoveRate = (index) => {
    const newRates = rates.filter((_, i) => i !== index);
    setRates(newRates);
  };

  return (
    <Base>
      <Toolbar>
        <Component_Title>HSN/SAC List</Component_Title>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          onClick={handleAddHsn}
          variant="contained"
          startIcon={<AddCircleOutline />}
        >
          Add HSN/SAC Code
        </Button>
      </Toolbar>
      {isMobile ? (
        <Box>
          {rows.length > 0 ? (
            rows.map((row) => (
              <Card key={row.id} sx={{ maxWidth: 450, margin: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {row.hsn_sac_code}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {row.hsn_description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {row.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {row.rates
                        .map((rate) => `${rate.item_rate} @ ${rate.gst_rate}%`)
                        .join(", ")}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {row.rates
                        .map((rate) => `CGST: ${rate.cgst}%`)
                        .join(", ")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {row.rates
                        .map((rate) => `SGST: ${rate.sgst}%`)
                        .join(", ")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {row.rates
                        .map((rate) => `IGST: ${rate.igst}%`)
                        .join(", ")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {row.rates
                        .map((rate) => `CESS: ${rate.cess}%`)
                        .join(", ")}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleEditHsn(row)}>
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
        <HsnTable rows={rows} columns={columns} onRowClick={handleEditHsn} />
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedHsn ? "Edit HSN/SAC Code" : "Add HSN/SAC Code"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              name="hsn_code"
              label="HSN Code"
              fullWidth
              defaultValue={selectedHsn?.hsn_sac_code || ""}
              margin="dense"
              required
            />
            <TextField
              name="hsn_description"
              label="HSN Description"
              fullWidth
              defaultValue={selectedHsn?.hsn_description || ""}
              margin="dense"
              required
            />
            <TextField
              select
              label="Type"
              fullWidth
              value={hsnType}
              onChange={handleHsnChange}
              margin="dense"
              required
            >
              <MenuItem value="goods">Goods</MenuItem>
              <MenuItem value="services">Services</MenuItem>
            </TextField>

            {rates.map((rate, index) => (
              <Box key={index} sx={{ marginTop: 2 }}>
                <TextField
                  name={`item_rate_${index}`}
                  label="Item Rate"
                  type="number"
                  fullWidth
                  defaultValue={rate.item_rate}
                  onChange={(e) =>
                    handleGstChange(index, "item_rate", e.target.value)
                  }
                  margin="dense"
                  required
                />
                <TextField
                  name={`eff_from_date_${index}`}
                  label="Effective From"
                  type="date"
                  fullWidth
                  defaultValue={rate.eff_from_date}
                  margin="dense"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <TextField
                    name={`cgst_${index}`}
                    label="CGST (%)"
                    type="number"
                    fullWidth
                    defaultValue={rate.cgst}
                    onChange={(e) =>
                      handleGstChange(index, "cgst", e.target.value)
                    }
                    margin="dense"
                    required
                  />
                  <TextField
                    name={`sgst_${index}`}
                    label="SGST (%)"
                    type="number"
                    fullWidth
                    defaultValue={rate.sgst}
                    onChange={(e) =>
                      handleGstChange(index, "sgst", e.target.value)
                    }
                    margin="dense"
                    required
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    name={`igst_${index}`}
                    label="IGST (%)"
                    type="number"
                    fullWidth
                    defaultValue={rate.igst}
                    onChange={(e) =>
                      handleGstChange(index, "igst", e.target.value)
                    }
                    margin="dense"
                    required
                  />
                  <TextField
                    name={`cess_${index}`}
                    label="Cess (%)"
                    type="number"
                    fullWidth
                    defaultValue={rate.cess}
                    onChange={(e) =>
                      handleGstChange(index, "cess", e.target.value)
                    }
                    margin="dense"
                    required
                  />
                </Box>
                <IconButton onClick={() => handleRemoveRate(index)}>
                  <Delete />
                </IconButton>
              </Box>
            ))}
            <Button onClick={handleAddRate}>Add Rate</Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Base>
  );
};

export default Hsn;
