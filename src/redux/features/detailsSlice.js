// redux/features/detailsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const detailsSlice = createSlice({
  name: "details",
  initialState: {
    details: [],
  },
  reducers: {
    addRow: (state) => {
      state.details.push({
        sr_no: state.details.length + 1,
        item_code: "",
        item_name: "",
        description: "",
        qty: 0,
        rate: 0,
      });
    },
    //to be added?
    updateRow: (state, action) => {
      const { index, field, value } = action.payload;
      state.details[index][field] = value;
      if (field === "qty" || field === "rate") {
        state.details[index].amount = state.details[index].qty * state.details[index].rate;
      }
    },
    removeRow: (state, action) => {
      state.details.splice(action.payload, 1);
    },
    setItemName: (state, action) => {
      const { index, itemCode, itemName } = action.payload;
      state.details[index].item_code = itemCode;
      state.details[index].item_name = itemName;
    },
  },
});

export const { addRow, updateRow, removeRow, setItemName } = detailsSlice.actions;
export default detailsSlice.reducer;
