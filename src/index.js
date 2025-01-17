import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";


ReactDOM.render(
  <AuthProvider>
   
      <App />
  </AuthProvider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();

