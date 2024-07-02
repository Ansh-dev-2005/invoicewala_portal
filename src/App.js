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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        {/* Sales Routes */}
        <Route path="/Sales/Invoice" element={<Invoice />} />
        <Route path="/Sales/Invoice-Generate" element={<SalesInvoiceForm />} />
        {/* Items Routes */}
        <Route path="/Items" element={<Items />} />
        <Route path="/items/hsn" element={<Hsn />} />
        <Route path="items/category" element={<Category />} />
        <Route path="Items/Add-Items" element={<ItemsForm />} />
        <Route path="Items/:id" element={<Single_item />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
