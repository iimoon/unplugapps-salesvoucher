import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./styles/printpage.module.css";

const PrintPage = () => {
  const details = useSelector((state) => state.details.details);
  const formData = useSelector((state) => state.form);

  useEffect(() => {
    window.print(); 
  }, []);

  return (
    <div>
      <div className={styles.headerSection}>
        <h1>Sales Voucher</h1>
      </div>

      <div>
        <h2>Header Information</h2>
        <table className={styles.headerTable}>
          <thead>
            <tr>
              <th>Voucher No</th>
              <th>Voucher Date</th>
              <th>Account Name</th>
              <th>Account Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formData.vr_no}</td>
              <td>{formData.vr_date}</td>
              <td>{formData.ac_name}</td>
              <td>{formData.ac_amt}</td>
              <td>{formData.status}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h2>Details</h2>
        <table className={styles.detailsTable}>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item, index) => (
              <tr key={index}>
                <td>{item.sr_no}</td>
                <td>{item.item_code}</td>
                <td>{item.item_name}</td>
                <td>{item.description}</td>
                <td>{item.qty}</td>
                <td>{item.rate}</td>
                <td>{item.qty * item.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.totalSection}>
        <h3>Total: {details.reduce((acc, item) => acc + item.qty * item.rate, 0)}</h3>
      </div>
    </div>
  );
};

export default PrintPage;
