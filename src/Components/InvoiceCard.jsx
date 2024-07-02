// InvoiceCard.js
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

const InvoiceCard = ({ invoice }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">ID: {invoice.id}</Typography>
        <Typography color="text.secondary">Date: {invoice.date}</Typography>
        <Typography>Customer: {invoice.customer}</Typography>
        <Typography>Total: ${invoice.total}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View Details</Button>
      </CardActions>
    </Card>
  );
};

export default InvoiceCard;
