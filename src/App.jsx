import React from "react";
import "./app.css";
import SalesPage from "./page/SalesPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrintPage from "./page/PrintPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<SalesPage />} />
          <Route path="/print" element={<PrintPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
