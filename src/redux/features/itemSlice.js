import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await fetch("/item");
  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }
  const data = await response.json();
  console.log("Response from ITEM_API:", data); 
  return data;
});


const initialState = {
  formData:{
    items: [],
    status: "idle",
    error: null,
  },
  details:[],
  status:"idle",
  error:null
};


const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Fixed the comma issue
      });
  },
});

export default itemSlice.reducer;
