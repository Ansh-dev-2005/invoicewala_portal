import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signIn } from "../action/user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import useState from "react";
import { tr } from "date-fns/locale";
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

export default function SignIn() {
     const [deferredPrompt, setDeferredPrompt] = React.useState(null);
     const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


     React.useEffect(() => {
       const handler = (e) => {
         e.preventDefault();
         setDeferredPrompt(e);
         setOpen(true); // Show the alert
       };

       window.addEventListener("beforeinstallprompt", handler);

       return () => {
         window.removeEventListener("beforeinstallprompt", handler);
       };
     }, []);

     const handleInstallClick = () => {
       if (deferredPrompt) {
         deferredPrompt.prompt();
         deferredPrompt.userChoice.then((choiceResult) => {
           if (choiceResult.outcome === "accepted") {
             console.log("User accepted the install prompt");
           } else {
             console.log("User dismissed the install prompt");
           }
           setDeferredPrompt(null);
           setOpen(false); // Hide the alert
         });
       }
     };

     const handleClose = (event, reason) => {
       if (reason === "clickaway") {
         return;
       }
       setOpen(false);
     };

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const Username = data.get("username");
    const Password = data.get("password");
    const org_short_name = data.get("org_short_name");
    setLoading(true); // Start loading

    try {
      const response = await signIn({ Username, Password, org_short_name });

      if (response.status === 200) {
        await sessionStorage.setItem("Token", response.data.token);
        await login(response.data.token); // Call the login function to update authentication state
        // alert("Login Successful");
        navigate("/"); // Redirect to a protected route
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign in
          </Typography>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
              Install our app for a better experience!
              <Button color="inherit" size="small" onClick={handleInstallClick}>
                Install
              </Button>
            </Alert>
          </Snackbar>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="org_short_name"
              label="Organization Short Name"
              type="text"
              id="org_short_name"
              autoComplete="organization"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading} // Disable button when loading
            >
              {loading ? <CircularProgress size={24} /> : "Sign In"} 
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
