import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Home from "./Pages/Home";
import SignIn from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Invoice from "./Pages/Sales/Invoice";
import SalesInvoiceForm from "./Pages/Sales/Invoice_Form_gst";
import Items from "./Pages/Items/Items";
import Hsn from "./Pages/Items/Hsn";
import Category from "./Pages/Items/Category";
import ItemsForm from "./Pages/Items/ItemsForm";
import Single_item from "./Pages/Items/Single_item";
import Vendor from "./Pages/Vendor/Vendor";
import AddVendorForm from "./Pages/Vendor/VendorForm";
import ProtectedRoute from "./ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        {/* Sales Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/Sales/Invoice" element={<Invoice />} />
          <Route
            path="/Sales/Invoice-Generate"
            element={<SalesInvoiceForm />}
          />
          {/* Items Routes */}
          <Route path="/masters/Item" element={<Items />} />
          <Route path="/masters/hsn" element={<Hsn />} />
          <Route path="/masters/itemgroup" element={<Category />} />
          <Route path="/masters/Item/Add-Items" element={<ItemsForm />} />
          <Route path="/masters/Item/:id" element={<Single_item />} />
          {/* Vendor Routes */}
          <Route path="/masters/vendor" element={<Vendor />} />

          <Route
            path="/masters/vendor/Add-Vendor"
            element={<AddVendorForm />}
          />
          <Route path="/masters/vendor/:vendorId" element={<AddVendorForm />} />

          {/* Purchase Routes */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
