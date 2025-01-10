import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


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


const saveSlice = createSlice({
  name: "save",
  initialState: {
    status: "idle", 
    error: null,     
    data: null,     
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveData.pending, (state) => {
        state.status = "loading"; 
      })
      .addCase(saveData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload; 
      })
      .addCase(saveData.rejected, (state, action) => {
        state.status = "failed"; 
        state.error = action.payload; 
      });
  },
});

export default saveSlice.reducer;
