import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getItem } from "../../api"; // Assuming you have an updateItem function in your API
import Base from "../../Base";
import { Component_Title } from "../../Components";
import { AddCircleOutline } from "@mui/icons-material";

const SingleItem = () => {
  const [item, setItem] = useState({});
  const [editMode, setEditMode] = useState(false); // State to manage edit mode
  const { id } = useParams();

  // Fetch item data from API
  useEffect(() => {
    getItem(id).then((data) => {
      setItem(data);
    });
  }, [id]);

  // Function to handle saving changes
  const handleSave = () => {
    // Call API to update item here
    // updateItem(item)
    //   .then((updatedItem) => {
    //     setItem(updatedItem);
    //     setEditMode(false); // Exit edit mode after saving
    //   })
    //   .catch((error) => {
    //     console.error("Error updating item:", error);
    //     // Handle error appropriately
    //   });
  };

  // Function to handle editing
  const handleEdit = () => {
    setEditMode(true); // Enter edit mode
  };

  return (
    <Base>
      <Box p={3}>
        <Toolbar>
          <Component_Title>Item Details</Component_Title>
          <Box sx={{ flexGrow: 1 }} />
          {!editMode && ( // Show Edit Item button when not in edit mode
            <Button
              variant="contained"
              startIcon={<AddCircleOutline />}
              onClick={handleEdit}
              sx={{ margin: "0.5rem" }}
            >
              Edit Item
            </Button>
          )}
          {editMode && ( // Show Save button when in edit mode
            <Button
              variant="contained"
              startIcon={<AddCircleOutline />}
              onClick={handleSave}
              sx={{ margin: "0.5rem" }}
            >
              Save
            </Button>
          )}
          <Divider orientation="vertical" flexItem />
          <Button
            variant="contained"
            startIcon={<AddCircleOutline />}
            sx={{ margin: "0.5rem" }}
          >
            Add Batch
          </Button>
        </Toolbar>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              value={item.productName || ""}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: !editMode,
              }}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              value={item.description || ""}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: !editMode,
              }}
              onChange={(e) =>
                setItem({ ...item, description: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Item Group"
              value={item.itemGroup || ""}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: !editMode,
              }}
              onChange={(e) => setItem({ ...item, itemGroup: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="HSN Code"
              value={item.hsnCode || ""}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: !editMode,
              }}
              onChange={(e) => setItem({ ...item, hsn_code: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Primary Unit"
              value={item.primary_unit || ""}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: !editMode,
              }}
              onChange={(e) =>
                setItem({ ...item, primaryUnit: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Secondary Unit"
              value={item.secondary_unit || ""}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: !editMode,
              }}
              onChange={(e) =>
                setItem({ ...item, secondaryUnit: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Conversion Factor"
              value={item.conversion_factor || ""}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: !editMode,
              }}
              onChange={(e) =>
                setItem({ ...item, conversionFactor: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Batch"
              value={item.batch || ""}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: !editMode,
              }}
              onChange={(e) => setItem({ ...item, batch: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Attributes:</Typography>
            {item.attributes &&
              item.attributes.map((attribute, index) => (
                <TextField
                  key={index}
                  label={`${attribute.key}: `}
                  value={attribute.value || ""}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  InputProps={{
                    readOnly: !editMode,
                  }}
                  onChange={(e) => {
                    const newAttributes = [...item.attributes];
                    newAttributes[index] = {
                      ...newAttributes[index],
                      value: e.target.value,
                    };
                    setItem({ ...item, attributes: newAttributes });
                  }}
                  margin="normal"
                />
              ))}
          </Grid>
        </Grid>
      </Box>
    </Base>
  );
};

export default SingleItem;
