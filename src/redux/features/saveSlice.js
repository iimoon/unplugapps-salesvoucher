// src/redux/features/saveSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the async thunk for saving data
export const saveData = createAsyncThunk(
  "save/saveData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/header/multiple", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to save data: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the save slice with reducers
const saveSlice = createSlice({
  name: "save",
  initialState: {
    status: "idle",  // loading, succeeded, failed
    error: null,     // To hold error messages if any
    data: null,      // To store the response from the save operation
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveData.pending, (state) => {
        state.status = "loading"; // While the request is in progress
      })
      .addCase(saveData.fulfilled, (state, action) => {
        state.status = "succeeded"; // When the save operation is successful
        state.data = action.payload; // Save the API response
      })
      .addCase(saveData.rejected, (state, action) => {
        state.status = "failed"; // When the request fails
        state.error = action.payload; // Store the error message
      });
  },
});

export default saveSlice.reducer;
