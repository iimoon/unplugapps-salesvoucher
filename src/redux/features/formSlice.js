import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vr_no: 0,
  vr_date: new Date().toISOString().split('T')[0],
  ac_name: '',
  ac_amt: 0,
  status: 'A',
};

const formSlice = createSlice({
  name: 'form', 
  initialState,
  reducers: {
    setFormData: (state, action) => {
        const { name, value } = action.payload;
        state[name] = value;
        console.log('Updating form data with:', action.payload);
    },
    resetForm:(state)=>{
      return {...initialState};
    },
    setAcAmt:(state,action) =>{
      state.ac_amt = action.payload;
    }
  },
});

export const { setFormData,setAcAmt } = formSlice.actions; 
export default formSlice.reducer; 
