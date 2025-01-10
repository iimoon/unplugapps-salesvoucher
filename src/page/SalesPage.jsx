import React from "react";
import Header from "../Components/Header";
import Details from "../Components/Details";
import styles from "./styles/salespage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addRow } from "../redux/features/detailsSlice";
import { saveData } from "../redux/features/saveSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SalesPage() {
  const details = useSelector((state) => state.details.details);
  const formData = useSelector((state) => state.form);
  const dispatch = useDispatch();

  const handleAddRow = () => {
    dispatch(addRow());
  };

  const handleSave = async () => {
    if (!formData.vr_no || !formData.vr_date || !formData.ac_name) {
        toast.error("Please fill out all required fields in the header.");
        return;
      }
    
      
      const invalidDetails = details.some(
        (item) =>
          !item.item_name || !item.description || !item.qty || !item.rate
      );
    
      if (invalidDetails) {
        toast.error("Please fill out all required fields in the details.");
        return;
      }
    
    toast.info("Sending...");
    try {
      
      const combinedData = {
        header_table: {
          vr_no: formData.vr_no,
          vr_date: formData.vr_date,
          ac_name: formData.ac_name,
          ac_amt: formData.ac_amt, 
          status: formData.status,
        },
        detail_table: details.map((item) => ({
          vr_no: formData.vr_no,
          sr_no: item.sr_no,
          item_code: item.item_code,
          item_name: item.item_name,
          description: item.description,
          qty: item.qty,
          rate: item.rate,
        })),
      };

      
      const resultAction = await dispatch(saveData(combinedData));

      
      if (saveData.fulfilled.match(resultAction)) {
        toast.success("Data has been successfully saved!");
      } else {
        throw new Error("Failed to save data");
      }

      console.log("handle_save_data:", combinedData);
    } catch (error) {
      toast.error("Failed to save data. Please try again.");
      console.error("Error saving data:", error);
    }
  };

  const navigate = useNavigate();

  const handlePrint = () => {
    if (!formData.vr_no || !formData.vr_date || !formData.ac_name) {
        toast.error("Please fill out all required fields in the header.");
        return;
      }
    
      
      const invalidDetails = details.some(
        (item) =>
          !item.item_name || !item.description || !item.qty || !item.rate
      );
    
      if (invalidDetails) {
        toast.error("Please fill out all required fields in the details.");
        return;
      }
    navigate("/print"); 
  };

  return (
    <div>
      <div className={styles.headerSection}>
        <h1>Sales Voucher Manager</h1>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.componentContainer}>
          <Header />
          <div className={styles.detailsContainer}>
            <Details />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button>New</button>
          <button onClick={handleAddRow}>Insert</button>
          <button onClick={handleSave}>Save</button>
          <button onClick={handlePrint}>Print</button>
        </div>
      </div>
    </div>
  );
}

export default SalesPage;
