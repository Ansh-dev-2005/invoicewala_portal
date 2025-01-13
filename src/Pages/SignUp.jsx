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
import { orgisAvailable, signUp } from "../action/user";
import { Navigate, useNavigate } from "react-router-dom";
import { state } from "../constants/constant";
import { useState } from "react";
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
  const [shippingDetails, setShippingDetails] = useState({
    ship_address: "",
    ship_city: "",
    ship_pin: "",
  });
  const [contactPersonDetails, setContactPersonDetails] = useState({
    email: "",
    user_email: "",
  });
  const [emailError, setEmailError] = useState("");
const navigate = useNavigate();
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const [userEmailError, setuserEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContactPersonDetailsChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      if (!isValidEmail(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    } else if (name === "user_email") {
      if (!isValidEmail(value)) {
        setuserEmailError("Please enter a valid email address.");
      } else {
        setuserEmailError("");
      }
    }
    setContactPersonDetails({ ...contactPersonDetails, [name]: value });
  };
  const [isSameAsBilling, setIsSameAsBilling] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    // Assuming you have similar state for billing details
    bill_address: "",
    bill_city: "",
    bill_pin: "",
  });

  const handleShippingDetailsChange = (event) => {
    if (!isSameAsBilling) {
      const { name, value } = event.target;
      setShippingDetails({ ...shippingDetails, [name]: value });
    }
  };

  const handleCheckboxChange = (event) => {
    setIsSameAsBilling(event.target.checked);
    if (event.target.checked) {
      // Copy billing details to shipping details
      setShippingDetails({
        ship_address: billingDetails.bill_address,
        ship_city: billingDetails.bill_city,
        ship_pin: billingDetails.bill_pin,
      });
    }
  };

  const [gstinError, setGstinError] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);

  React.useEffect(() => {
    console.log(validateGSTIN("29ABCDE1234FZ1")); // true
  }, []);
  const validateGSTIN = (gstin) => {
    console.log(gstin);

    const pattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9]Z[A-Z0-9]$/;
    return pattern.test(gstin);
  };
  React.useEffect(() => {
    if (isTyping) return; // Skip validation if the user is still typing
    const isValidGSTIN = validateGSTIN(companyDetails.gstin);
    const value = companyDetails.gstin;
    if (isValidGSTIN) {
      const stateCode = value.slice(0, 2); // Extract state code from GSTIN
      // console.log(stateCode);
      const gstState = state.statecode.find((s) => s.code === stateCode)?.name;
      console.log(gstState);
      if (gstState) {
        setCompanyDetails((prevDetails) => ({
          ...prevDetails,
          gst_state: gstState, // Automatically set the state
          gst_state_code: stateCode,
          // name: value,
        }));
      }
    }
    setGstinError(
      isValidGSTIN || !companyDetails.gstin ? "" : "Invalid GSTIN format"
    );
  }, [companyDetails.gstin, isTyping]);

const handleCompanyDetailsChange = async (event) => {
  const { name, value } = event.target;

  if (name === "short_name") {
    const capitalizedValue = value.toUpperCase().slice(0, 5); // Capitalize and limit to 5 chars
    setCompanyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: capitalizedValue,
    }));
    // check if the name is available
    if (capitalizedValue.length === 5) {
      try {
        const data = await orgisAvailable(capitalizedValue);
        if (data.status === 200) {
          alert("Short Name is available");
        } else if (data.status === 400) {
          alert("Short Name is not available");
          setCompanyDetails((prevDetails) => ({
            ...prevDetails,
            short_name: "",
          }));
        }
      } catch (error) {
        console.error("Error checking short name availability:", error);
      }
    }
  } else if (name === "gstin") {
    setIsTyping(true); // Set isTyping to true when the user starts typing

    // Clear GST State and Code if GSTIN is empty
    if (!value) {
      setCompanyDetails((prevDetails) => ({
        ...prevDetails,
        gstin: "",
        gst_state: "",
        gst_state_code: "",
      }));
    } else {
      setCompanyDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  } else {
    // Handle other fields normally
    setCompanyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }
};


  const handleBlur = () => {
    setIsTyping(false); // Set isTyping to false when the input field loses focus
  };
  const handleBillingDetailsChange = (event) => {
    const { name, value } = event.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handleNext = () => {
    // set feilds to null automatically
    // verify the fields are not empty

    if (activeStep === 0) {
      if (
        !companyDetails.name ||
        !companyDetails.short_name ||
        !companyDetails.gstin ||
        !companyDetails.gst_state ||
        !companyDetails.gst_state_code ||
        !companyDetails.gst_reg_date
      ) {
        alert("Please fill all the fields");
        return;
      }
    }
    if (activeStep === 1) {
      if (
        !billingDetails.bill_address ||
        !billingDetails.bill_city ||
        !billingDetails.bill_pin
      ) {
        alert("Please fill all the fields");
        return;
      }
    }
    if (activeStep === 2) {
      if (!isSameAsBilling) {
        if (
          !shippingDetails.ship_address ||
          !shippingDetails.ship_city ||
          !shippingDetails.ship_pin
        ) {
          alert("Please fill all the fields");
          return;
        }
      }
    }

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
    const moredata = {
      active: "True",
    };

    const mergedData = {
      ...companyDetails,
      ...billingDetails,
      ...shippingDetails,
      ...contactPersonDetails,
      ...moredata,
    };
    try {
      setLoading(true);
      const response = await signUp(mergedData);
      
       if (response.status === 201) {
         alert("User created successfully");
         navigate("/login"); // Use navigate function to redirect to login page
       } else {
         console.log(response);
       }
      
    } catch (error) {
      console.error("Error during sign up:", error);
      alert(error.message);
    } finally{
      setLoading(false);
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
                  fullWidth
                  id="gstin"
                  label="GSTIN"
                  name="gstin"
                  autoComplete="gstin"
                  value={companyDetails.gstin || ""}
                  onBlur={handleBlur}
                  onChange={handleCompanyDetailsChange}
                  error={!!gstinError}
                  helperText={gstinError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputProps={{
                    readOnly: true,
                  }}
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
                  fullWidth
                  inputProps={{
                    readOnly: true,
                  }}
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
                  fullWidth
                  type="date"
                  id="gst_reg_date"
                  label="GST Registration Date"
                  name="gst_reg_date"
                  autoComplete="gst_reg_date"
                  // shrink true
                  InputLabelProps={{ shrink: true }}
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
                  type="number"
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
              {/* Existing fields */}
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
                  disabled={isSameAsBilling}
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
                  disabled={isSameAsBilling}
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
                  disabled={isSameAsBilling}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isSameAsBilling}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Shipping address is the same as billing address"
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 3:
        return (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
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
                  type="number"
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
                  type="number"
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
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={contactPersonDetails.email || ""}
                  onChange={handleContactPersonDetailsChange}
                  error={!!emailError}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  
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
                  type="email"
                  error={!!userEmailError}
                  helperText={userEmailError}
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
                  InputLabelProps={{ shrink: true }}
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
            {loading ? "Loading..." : "Submit"}
              
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
                  {activeStep !== steps.length - 1 && (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Container>
      </>
    </ThemeProvider>
  );
}
