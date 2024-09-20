
import { createSlice } from '@reduxjs/toolkit';

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: { inventory:{} },
  reducers: {
    getInventoryRequest(state) {
      state.inventoryLoading = true;
    },
    getInventorySuccess(state, action) {
      state.inventoryLoading = false;
      state.inventoryItems = action.payload.data.inventories;
      state.resultPerPage = action.payload.data.resultPerPage;
      state.inventoryFilteredCount =  action.payload.data.inventoryFilteredCount;
    },
    getInventoryFail(state, action) {
      state.inventoryLoading = false;
      state.inventoryError = action.payload;
    },
    addInventoryRequest(state) {
      state.inventoryLoading = true;
    },
    addInventorySuccess(state, action) {
      state.inventoryLoading = false;
      state.inventoryMessage = action.payload.message;
    },
    addInventoryFail(state, action) {
      state.inventoryLoading = false;
      state.inventoryError = action.payload;
    },
    updateInventoryRequest(state) {
      state.inventoryLoading = true;
    },
    updateInventorySuccess(state, action) {
      state.inventoryLoading = false;
      state.inventoryMessage = action.payload.message;
    },
    updateInventoryFail(state, action) {
      state.inventoryLoading = false;
      state.inventoryError = action.payload;
    },
    deleteInventoryRequest(state) {
      state.inventoryLoading = true;
    },
    deleteInventorySuccess(state, action) {
      state.inventoryLoading = false;
      state.inventoryMessage = action.payload.message;
    },
    deleteInventoryFail(state, action) {
      state.inventoryLoading = false;
      state.inventoryError = action.payload;
    },
    clearError(state) {
      state.inventoryError = null;
    },
    clearMessage(state) {
      state.inventoryMessage = null;
    },
  },
});

export default inventorySlice.reducer;

export const {
  getInventoryRequest,
  getInventorySuccess,
  getInventoryFail,
  updateInventoryRequest,
  updateInventorySuccess,
  updateInventoryFail,
  deleteInventoryRequest,
  deleteInventorySuccess,
  deleteInventoryFail,
  addInventoryRequest,
  addInventorySuccess,
  addInventoryFail,
  clearError,
  clearMessage,
} = inventorySlice.actions;
