"use client";
import React from "react";
import Checkout from "./Checkout"; 
import styles from "./payment.module.css";
const PaymentPage = () => {
  return (
    <div style={{height: "80vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Checkout /> {/* Render the Checkout component */}
    </div>
  );
};

export default PaymentPage;