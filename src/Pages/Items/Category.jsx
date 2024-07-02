import React, { useState } from "react";
import Base from "../../Base";
import { Component_Title, InvoiceTable } from "../../Components";
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
  Grid,
} from "@mui/material";
import { AddCircleOutline, Delete as DeleteIcon } from "@mui/icons-material";

const Category = () => {
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [rows, setRows] = useState([
    {
      id: 1,
      group_name: "Fabric",
      group_short_name: "FAB",
      attributes: ["Color", "Size", "Material"],
    },
    {
      id: 2,
      group_name: "Toys",
      group_short_name: "TOY",
      attributes: ["Type", "Age Range", "Brand"],
    },
    // add more sample data here
  ]);
  const [formValues, setFormValues] = useState({
    group_name: "",
    group_short_name: "",
    attributes: ["", "", "", "", "", ""],
  });

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "group_id", headerName: "Group ID", width: 150 },
  { field: "group_name", headerName: "Group Name", width: 150 },
  { field: "group_short_name", headerName: "Short Name", width: 150 },
  {
    field: "attributes",
    headerName: "Attributes",
    width: 300,
    // valueGetter: (params) =>
    //   params.row.attributes ? params.row.attributes.join(", ") : "",
  },
];


const generateGroupId = (groupName, groupShortName, attributes) => {
  return `${groupName}-${groupShortName}-${attributes.join("-")}`;
};


  const handleAddGroup = () => {
    setFormValues({
      group_name: "",
      group_short_name: "",
      attributes: ["", "", "", "", "", ""],
    });
    setEditingIndex(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (index) => () => {
    if (rows[index] && rows[index].attributes) {
      setFormValues(rows[index]);
      setEditingIndex(index);
      setOpen(true);
    } else {
      console.error("Error: The selected row does not have attributes");
    }
  };

  const handleDelete = (index) => () => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleInputChange = (field) => (event) => {
    setFormValues({ ...formValues, [field]: event.target.value });
  };

  const handleAttributeChange = (index) => (event) => {
    const newAttributes = [...formValues.attributes];
    newAttributes[index] = event.target.value;
    setFormValues({ ...formValues, attributes: newAttributes });
  };

const handleSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const attributes = [
    formData.get("attribute_0") || "",
    formData.get("attribute_1") || "",
    formData.get("attribute_2") || "",
    formData.get("attribute_3") || "",
    formData.get("attribute_4") || "",
    formData.get("attribute_5") || "",
  ];
  const groupName = formData.get("group_name");
  const groupShortName = formData.get("group_short_name");
  const groupId = generateGroupId(groupName, groupShortName, attributes);

  const newGroup = {
    id: editingIndex === null ? rows.length + 1 : rows[editingIndex].id,
    group_name: groupName,
    group_short_name: groupShortName,
    attributes: attributes,
    group_id: groupId,
  };

  const newRows = [...rows];
  if (editingIndex === null) {
    newRows.push(newGroup);
  } else {
    newRows[editingIndex] = newGroup;
  }

  setRows(newRows);
  handleClose();
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

      <InvoiceTable
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={(params) => handleEdit(params.row.id - 1)()}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingIndex === null ? "Add New Category" : "Edit Category"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="group_name"
              name="group_name"
              label="Group Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formValues.group_name}
              onChange={handleInputChange("group_name")}
              required
            />
            <TextField
              margin="dense"
              id="group_short_name"
              name="group_short_name"
              label="Short Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formValues.group_short_name}
              onChange={handleInputChange("group_short_name")}
              required
            />
            <Box>
              {formValues.attributes.map((attr, index) => (
                <Grid container spacing={1} key={index}>
                  <Grid item xs={10}>
                    <TextField
                      margin="dense"
                      id={`attribute_${index}`}
                      name={`attribute_${index}`}
                      label={`Attribute ${index + 1}`}
                      type="text"
                      fullWidth
                      variant="outlined"
                      value={attr}
                      onChange={handleAttributeChange(index)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      onClick={() => {
                        const newAttributes = [...formValues.attributes];
                        newAttributes[index] = "";
                        setFormValues({
                          ...formValues,
                          attributes: newAttributes,
                        });
                      }}
                      size="large"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Box>
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
