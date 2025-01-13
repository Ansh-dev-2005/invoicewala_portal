// InvoiceTable.js
import React, { useState } from "react";
import { Box, TextField, Grid, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

const Item_Group_Table = ({ rows, columns, getRowId, onRowClick }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const handleExportPDF = () => {
    if (rows.length === 0) {
      alert("No data available to export.");
      return;
    }
    const doc = new jsPDF();
    const tableColumns = columns.map((col) => col.headerName);
    const tableRows = rows.map((row) => columns.map((col) => row[col.field]));

    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
    });
    doc.save("invoice-data.pdf");
  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            <CSVLink
              data={rows}
              filename="invoice-data.csv"
              style={{ color: "white", textDecoration: "none" }}
              onClick={(event) => {
                if (rows.length === 0) {
                  alert("No data available to export.");
                  event.preventDefault();
                }
              }}
            >
              Export CSV
            </CSVLink>
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleExportPDF}>
            Export PDF
          </Button>
        </Grid>
      </Grid>

      <Box mt={2} height={400} overflow={"auto"}>
        {rows.length > 0 ? (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            getRowId={getRowId}
            onRowClick={onRowClick}
            rowsPerPageOptions={[5]}
            checkboxSelection
            autoHeight
            autosizeOptions={{
              columns: columns.map((col) => col.field),
              includeOutliers: true,
              includeHeaders: true,
            }}
            rowHeight={32}
          />
        ) : (
          <Typography variant="subtitle1" align="center">
            No data available
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Item_Group_Table;
