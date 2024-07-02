// Single_item.js
import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Grid, TextField, Toolbar, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getItem } from "../../api";
import Base from "../../Base";
import { Component_Title } from "../../Components";
import { AddCircleOutline, SpaceBar } from "@mui/icons-material";

const SingleItem = () => {
  const [item, setItem] = useState({});
  const { id } = useParams();

  // Fetch item data from API
  useEffect(() => {
    getItem(id).then((data) => {
      setItem(data);
    });
  }, [id]);

  return (
    <Base>
      <Box p={3}>
        <Toolbar>
          <Component_Title>Item </Component_Title>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            // onClick={}
            variant="contained"
            startIcon={<AddCircleOutline />}
            margin="normal"
            sx={{ margin: "0.5rem" }} // Adjust margin as neede
          >
            Edit Item
          </Button>
          <Divider orientation="vertical" flexItem />

          <Button
            // onClick={}
            variant="contained"
            startIcon={<AddCircleOutline />}
            sx={{ margin: "0.5rem" }} // Adjust margin as neede
          >
            Add Batch
          </Button>
        </Toolbar>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              value={item.name || ""}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              value={item.description || ""}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Item Group"
              value={item.itemGroup || ""}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="HSN Code"
              value={item.hsn_code || ""}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Primary Unit"
              value={item.primaryUnit || ""}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Secondary Unit"
              value={item.secondaryUnit || ""}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Conversion Factor"
              value={item.conversionFactor || ""}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Batch"
              value={item.batch || ""}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
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
                    readOnly: true,
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
