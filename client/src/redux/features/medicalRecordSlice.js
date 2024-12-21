// redux/slices/medicalRecordSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../environment/environment";

// Async thunk to handle adding a new medical record
export const addMedicalRecord = createAsyncThunk(
  "medicalRecord/addMedicalRecord",
  async (recordData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/medical-records/add`,
        recordData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  medicalRecords: [],
  loading: false,
  error: null,
  successMessage: "",
};

// Slice
export const medicalRecordSlice = createSlice({
  name: "medicalRecord",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMedicalRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "";
      })
      .addCase(addMedicalRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.medicalRecords.push(action.payload.data); // Add new record to the state
      })
      .addCase(addMedicalRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add medical record";
      });
  },
});

export const { resetStatus } = medicalRecordSlice.actions;
