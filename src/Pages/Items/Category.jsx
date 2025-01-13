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
  IconButton,
  Card,
  Typography,
  CircularProgress,
} from "@mui/material";
import { AddCircleOutline, Delete as DeleteIcon } from "@mui/icons-material";
import {
  createItemGroup,
  getItemGroups,
  updateItemGroup,
} from "../../action/itemgroup";
import Item_Group_Table from "../../Components/Item_Group_Table";

const Category = () => {
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  const [formValues, setFormValues] = useState({
    name: "",
    shortName: "",
    attribute1: "",
    attribute2: "",
    attribute3: "",
    attribute4: "",
    attribute5: "",
    attribute6: "",
  });

  useEffect(() => {
    // Fetch data from the server
    setLoading(true); // Start loading
    getItemGroups()
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      }
    );
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "shortName", headerName: "Short Name", width: 150 },
    { field: "attribute1", headerName: "Attribute 1", width: 150 },
    { field: "attribute2", headerName: "Attribute 2", width: 150 },
    { field: "attribute3", headerName: "Attribute 3", width: 150 },
    { field: "attribute4", headerName: "Attribute 4", width: 150 },
    { field: "attribute5", headerName: "Attribute 5", width: 150 },
    { field: "attribute6", headerName: "Attribute 6", width: 150 },
    // Add other fields as needed
  ];

  const handleAddGroup = () => {
    setFormValues({
      name: "",
      shortName: "",
      attribute1: "",
      attribute2: "",
      attribute3: "",
      attribute4: "",
      attribute5: "",
      attribute6: "",
    });
    setEditingIndex(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (row) => {
    console.log("Row: ", row);
    if (row) {
      setFormValues({
        name: row.name,
        shortName: row.shortName,
        attribute1: row.attribute1,
        attribute2: row.attribute2,
        attribute3: row.attribute3,
        attribute4: row.attribute4,
        attribute5: row.attribute5,
        attribute6: row.attribute6,
        id: row.id,
      });
      setEditingIndex(row.id);
      setOpen(true);
    } else {
      console.error("Error: The selected row does not exist");
    }
  };

  const handleDelete = (index) => () => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleInputChange = (field) => (event) => {
    setFormValues({ ...formValues, [field]: event.target.value });
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 600;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingIndex !== null) {
      updateItemGroup(editingIndex, formValues)
        .then((updatedRow) => {
          setRows(
            rows.map((row) => (row.id === editingIndex ? updatedRow : row))
          );
          setOpen(false);
        })
        .catch((error) => {
          console.error("Error updating item group: ", error);
        });
    } else {
      createItemGroup(formValues)
        .then((newRow) => {
          setRows([...rows, newRow]);
          setOpen(false);
        })
        .catch((error) => {
          console.error("Error creating item group: ", error);
        });
    }
  };

  return (
    <Base>
      <Toolbar>
        <Component_Title>Category List</Component_Title>

        <Box sx={{ flexGrow: 1 }} />
        <Button
          onClick={handleAddGroup}
          variant="contained"
          startIcon={<AddCircleOutline />}
        >
          Add Category
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
          {rows.map((row) => (
            <Card
              key={row.id}
              sx={{ m: "10px", p: "10px", maxWidth: "90vw" }}
              onClick={() => handleEdit(row)}
            >
              <Typography variant="h6">{row.name}</Typography>
              <Typography variant="body1">{row.shortName}</Typography>
              <Typography variant="body1">{row.attribute1}</Typography>
              <Typography variant="body1">{row.attribute2}</Typography>
              <Typography variant="body1">{row.attribute3}</Typography>
              <Typography variant="body1">{row.attribute4}</Typography>
              <Typography variant="body1">{row.attribute5}</Typography>
              <Typography variant="body1">{row.attribute6}</Typography>
              <IconButton
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(row.id)();
                }}
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}
        </Box>
      ) : (
        <Item_Group_Table
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          onRowClick={(params) => handleEdit(params.row)}
        />
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingIndex === null ? "Add New Category" : "Edit Category"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Group Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formValues.name}
              onChange={handleInputChange("name")}
              required
            />
            <TextField
              margin="dense"
              id="shortName"
              name="shortName"
              label="Short Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formValues.shortName}
              onChange={handleInputChange("shortName")}
              required
            />
            <TextField
              margin="dense"
              id="attribute1"
              name="attribute1"
              label="Attribute 1"
              type="text"
              fullWidth
              variant="outlined"
              value={formValues.attribute1}
              onChange={handleInputChange("attribute1")}
            />
            <TextField
              margin="dense"
              id="attribute2"
              name="attribute2"
              label="Attribute 2"
              type="text"
              fullWidth
              variant="outlined"
              value={formValues.attribute2}
              onChange={handleInputChange("attribute2")}
            />
            <TextField
              margin="dense"
              id="attribute3"
              name="attribute3"
              label="Attribute 3"
              type="text"
              fullWidth
              variant="outlined"
              value={formValues.attribute3}
              onChange={handleInputChange("attribute3")}
            />
            <TextField
              margin="dense"
              id="attribute4"
              name="attribute4"
              label="Attribute 4"
              type="text"
              fullWidth
              variant="outlined"
              value={formValues.attribute4}
              onChange={handleInputChange("attribute4")}
            />
            <TextField
              margin="dense"
              id="attribute5"
              name="attribute5"
              label="Attribute 5"
              type="text"
              fullWidth
              variant="outlined"
              value={formValues.attribute5}
              onChange={handleInputChange("attribute5")}
            />
            <TextField
              margin="dense"
              id="attribute6"
              name="attribute6"
              label="Attribute 6"
              type="text"
              fullWidth
              variant="outlined"
              value={formValues.attribute6}
              onChange={handleInputChange("attribute6")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">
              {editingIndex === null ? "Add" : "Update"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Base>
  );
};

export default Category;
