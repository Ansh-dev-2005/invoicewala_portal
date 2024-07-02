import React, { useState } from 'react';
import Base from '../../Base';
import { Component_Title, InvoiceTable } from '../../Components';
import { Box, Button, Toolbar, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

const Hsn = () => {
    
        const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([
      { id: 1, hsn_code: 9405, hsn_description: "Light", hsn_rate: 18 },
      { id: 2, hsn_code: 8544, hsn_description: "Fan", hsn_rate: 28 },
      // add more sample data here
    ]);
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "hsn_code", headerName: "HSN Code", width: 150 },
        { field: "hsn_description", headerName: "HSN Description", width: 200 },
        { field: "hsn_rate", headerName: "Rate %", width: 130, type: "number" },
    ];
    const handleAddHsn = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const newHsn = {
        id: rows.length + 1,
        hsn_code: formData.get("hsn_code"),
        hsn_description: formData.get("hsn_description"),
        hsn_rate: formData.get("hsn_rate"),
      };
      setRows([...rows, newHsn]);
      handleClose();
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

      <InvoiceTable rows={rows} columns={columns} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New HSN/SAC Code</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="hsn_code"
              name="hsn_code"
              label="HSN Code"
              type="number"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="hsn_description"
              name="hsn_description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="hsn_rate"
              name="hsn_rate"
              label="Rate %"
              type="number"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Base>
  );
}

export default Hsn