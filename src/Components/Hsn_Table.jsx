import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Typography, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

const HsnTable = ({ rows, columns, onRowClick }) => {
      const navigate = useNavigate();
      const [loading, setLoading] = useState(true);

  const handleRowClick = (params) => {
    if (onRowClick) {
      onRowClick(params.row); // Pass the entire row data to the parent component
    }
  };

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      setLoading(true);
      // Simulate a delay for fetching data
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);

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
    doc.save("hsn-data.pdf");
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button variant="contained" color="primary">
            <CSVLink
              data={rows}
              filename="invoice-data.csv"
              style={{ color: "white", textDecoration: "none" }}
              onClick={(event) => {
                // Prevent CSV export if no data is available
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

      <Box mt={2} overflow={"auto"}>
        {rows.length > 0 ? (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection={false}
              disableSelectionOnClick
              onRowClick={handleRowClick} // Handle row click event
              // columnHeaderHeight="42px"
              rowHeight={32}
            />
          </div>
        ) : (
          <Typography variant="subtitle1" align="center">
            No data available
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default HsnTable;
