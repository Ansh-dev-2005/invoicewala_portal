import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { signUp } from "../action/user";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();
const steps = [
  "Company Details",
  "Billing Details",
  "Shipping Details",
  "Contact Person",
];

export default function SignUp() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({});
  const [companyDetails, setCompanyDetails] = React.useState({});
  const [billingDetails, setBillingDetails] = React.useState({});
  const [shippingDetails, setShippingDetails] = React.useState({});
  const [contactPersonDetails, setContactPersonDetails] = React.useState({});

  const handleCompanyDetailsChange = (event) => {
    const { name, value } = event.target;
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  const handleBillingDetailsChange = (event) => {
    const { name, value } = event.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handleShippingDetailsChange = (event) => {
    const { name, value } = event.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handleContactPersonDetailsChange = (event) => {
    const { name, value } = event.target;
    setContactPersonDetails({ ...contactPersonDetails, [name]: value });
  };


  const handleNext = () => {
    // set feilds to null automatically
    
   
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
      event.preventDefault();

      const mergedData = {
        ...companyDetails,
        ...billingDetails,
        ...shippingDetails,
        ...contactPersonDetails,
      };
    try {
      const response = await signUp(mergedData);
      console.log(response);
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };
const getStepContent = (step) => {
  switch (step) {
    case 0:
      return (
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Organization Name"
                autoFocus
                value={companyDetails.name || ""}
                onChange={handleCompanyDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="short_name"
                label="Short Name"
                name="short_name"
                autoComplete="short_name"
                value={companyDetails.short_name || ""}
                onChange={handleCompanyDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="gstin"
                label="GSTIN"
                name="gstin"
                autoComplete="gstin"
                
                value={companyDetails.gstin || ""}
                onChange={handleCompanyDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="gst_state"
                label="GST State"
                name="gst_state"
                autoComplete="gst_state"
                value={companyDetails.gst_state || ""}
                onChange={handleCompanyDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="gst_state_code"
                label="GST State Code"
                name="gst_state_code"
                autoComplete="gst_state_code"
                value={companyDetails.gst_state_code || ""}
                onChange={handleCompanyDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="gst_reg_date"
                label="GST Registration Date"
                name="gst_reg_date"
                autoComplete="gst_reg_date"
                value={companyDetails.gst_reg_date || ""}
                onChange={handleCompanyDetailsChange}
              />
            </Grid>
          </Grid>
        </Box>
      );
    case 1:
      return (
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="bill_address"
                label="Billing Address"
                name="bill_address"
                autoComplete="bill_address"
                value={billingDetails.bill_address || ""}
                onChange={handleBillingDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="bill_city"
                label="Billing City"
                name="bill_city"
                autoComplete="bill_city"
                value={billingDetails.bill_city || ""}
                onChange={handleBillingDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="bill_pin"
                label="Billing PIN"
                name="bill_pin"
                autoComplete="bill_pin"
                value={billingDetails.bill_pin || ""}
                onChange={handleBillingDetailsChange}
              />
            </Grid>
          </Grid>
        </Box>
      );
    case 2:
      return (
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="ship_address"
                label="Shipping Address"
                name="ship_address"
                autoComplete="ship_address"
                value={shippingDetails.ship_address || ""}
                onChange={handleShippingDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="ship_city"
                label="Shipping City"
                name="ship_city"
                autoComplete="ship_city"
                value={shippingDetails.ship_city || ""}
                onChange={handleShippingDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="ship_pin"
                label="Shipping PIN"
                name="ship_pin"
                autoComplete="ship_pin"
                value={shippingDetails.ship_pin || ""}
                onChange={handleShippingDetailsChange}
              />
            </Grid>
          </Grid>
        </Box>
      );
    case 3:
      return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="contact_person"
                label="Contact Person"
                name="contact_person"
                autoComplete="contact_person"
                value={contactPersonDetails.contact_person || ""}
                onChange={handleContactPersonDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone_1"
                label="Phone 1"
                name="phone_1"
                autoComplete="phone_1"
                value={contactPersonDetails.phone_1 || ""}
                onChange={handleContactPersonDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="mobile"
                label="Mobile"
                name="mobile"
                autoComplete="mobile"
                value={contactPersonDetails.mobile || ""}
                onChange={handleContactPersonDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={contactPersonDetails.email || ""}
                onChange={handleContactPersonDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="website"
                label="Website"
                name="website"
                autoComplete="website"
                value={contactPersonDetails.website || ""}
                onChange={handleContactPersonDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="cin"
                label="CIN"
                name="cin"
                autoComplete="cin"
                value={contactPersonDetails.cin || ""}
                onChange={handleContactPersonDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="user_name"
                label="User Name"
                name="user_name"
                autoComplete="user_name"
                value={contactPersonDetails.user_name || ""}
                onChange={handleContactPersonDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="user_email"
                label="User Email"
                name="user_email"
                autoComplete="user_email"
                value={contactPersonDetails.user_email || ""}
                onChange={handleContactPersonDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={contactPersonDetails.password || ""}
                onChange={handleContactPersonDetailsChange}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                autoComplete="confirm-password"
                value={contactPersonDetails.confirmPassword || ""}
                onChange={handleContactPersonDetailsChange}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="user_mobile"
                label="User Mobile Number"
                name="user_mobile"
                type="number"
                autoComplete="user_mobile"
                value={contactPersonDetails.user_mobile || ""}
                onChange={handleContactPersonDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="dob"
                label="User Date of Birth"
                name="dob"
                type="date"
                autoComplete="dob"
                value={contactPersonDetails.dob || ""}
                onChange={handleContactPersonDetailsChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      );
    default:
      return "Unknown step";
  }
};


  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Typography variant="h6">All steps completed</Typography>
            ) : (
              <>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Container>
      </>
    </ThemeProvider>
  );
}
