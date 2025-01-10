import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../redux/features/formSlice";
import styles from "./styles/header.module.css";

const Header = () => {
  const dispatch = useDispatch();

  const details = useSelector((state) => state.details.details);
  const acAmt = details.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  
  
  const header = useSelector((state) => state.form);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    const updatedValue = name === "ac_amt" || name === "vr_no" ? parseFloat(value) : value;
    dispatch(setFormData({ name, value: updatedValue }));
  };

  
  useEffect(() => {
    dispatch(setFormData({ name: "ac_amt", value: acAmt }));
  }, [acAmt, dispatch]);

  return (
    <div>
      <div className={styles.headerSection}>
        <h1>Header</h1>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.inputContainer}>
          <label htmlFor="vr_no">Vr No:</label>
          <input
            type="number"
            name="vr_no"
            id="vr_no"
            placeholder="Voucher Number"
            value={header.vr_no}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="vr_date">Vr Date:</label>
          <input
            type="date"
            name="vr_date"
            id="vr_date"
            value={header.vr_date}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="status">Status:</label>
          <select
            name="status"
            id="status"
            value={header.status}
            onChange={handleChange}
          >
            <option value="A">Active</option>
            <option value="I">Inactive</option>
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="ac_name">Ac Name:</label>
          <input
            type="text"
            name="ac_name"
            id="ac_name"
            placeholder="Account Name"
            value={header.ac_name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="ac_amt">Vr Amount:</label>
          <input
            type="number"
            name="ac_amt"
            id="ac_amt"
            placeholder="Voucher Amount"
            value={header.ac_amt}
            readOnly 
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
