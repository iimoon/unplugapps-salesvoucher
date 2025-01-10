import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addRow,
  updateRow,
  removeRow,
  setItemName,
} from "../redux/features/detailsSlice";
import { fetchItems } from "../redux/features/itemSlice";
import styles from "./styles/details.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Details = () => {
  const details = useSelector((state) => state.details.details);
  const items = useSelector((state) => state.items.items);
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  
  const handleChange = (index, field, value) => {
    const updatedValue =
      field === "qty" || field === "rate" ? parseFloat(value) || 0 : value;

    dispatch(updateRow({ index, field, value: updatedValue }));
  };

  
  const handleRemoveRow = (index) => {
    dispatch(removeRow(index));
  };

  
  const handleItemSelect = (index, itemCode) => {
    const selectedItem = items.find((item) => item.item_code === itemCode);
    if (selectedItem) {
      dispatch(
        setItemName({
          index,
          itemCode: selectedItem.item_code,
          itemName: selectedItem.item_name,
        })
      );
    }
  };

  
  const totalAmount = details.reduce((total, row) => {
    const rowTotal = row.qty && row.rate ? row.qty * row.rate : 0;
    return total + rowTotal;
  }, 0);

  return (
    <div>
      <div className={styles.headerSection}>
        <h2>Details</h2>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {details.map((row, index) => (
            <tr key={index}>
              <td>{row.sr_no}</td>
              <td>
                <select
                  value={row.item_code}
                  onChange={(e) => handleItemSelect(index, e.target.value)}
                >
                  <option value="">Select Item</option>
                  {items.map((item) => (
                    <option key={item.item_code} value={item.item_code}>
                      {item.item_code}
                    </option>
                  ))}
                </select>
              </td>
              <td>{row.item_name}</td>
              <td>
                <input
                  type="text"
                  value={row.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.qty}
                  onChange={(e) => handleChange(index, "qty", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.rate}
                  onChange={(e) => handleChange(index, "rate", e.target.value)}
                />
              </td>
              <td>{row.qty && row.rate ? row.qty * row.rate : 0}</td>
              <td>
                <button style={{background:'red'}}onClick={() => handleRemoveRow(index)}>
                  <FontAwesomeIcon icon={faTrash} />
                   Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6" className={styles.totalLabel}>
              Total:
            </td>
            <td>{totalAmount}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Details;
