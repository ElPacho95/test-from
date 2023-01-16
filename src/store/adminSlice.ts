import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface IData {
  username?: string;
  password?: string;
}

interface AdminState {
  data: IData[];
  loading: boolean;
  error: any;
}

const initialState: AdminState = {
  data: [],
  loading: false,
  error: "",
};

export const signIn = createAsyncThunk(
  "log/in",
  async (admin: IData, thunkAPI) => {
    try {
      const { data } = await axios.post("http://localhost:3000/data", admin);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default adminSlice.reducer;
