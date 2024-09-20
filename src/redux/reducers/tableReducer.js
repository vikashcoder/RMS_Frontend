import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
    name: "table",
    initialState: { table:{} },
    reducers: {
        addTableRequest(state,action){
            state.tableLoading = true;
        },
        addTableSuccess(state,action){
            state.tableLoading = false;
            state.tableMessage = action.payload.message;
        },
        addTableFail(state,action){
            state.tableLoading = false;
            state.tableError = action.payload;
        },

        deleteTableRequest(state,action){
            state.tableLoading = true
        },
        deleteTableSuccess(state,action){
            state.tableLoading = false;
            state.tableMessage = action.payload.message;
        },
        deleteTableFail(state,action){
            state.tableLoading = false;
            state.tableError = action.payload;
        },

        allTableRequest(state,action){
            state.tableLoading = true;
            state.tables = [];
        },
        allTableSuccess(state,action){
            state.tableLoading = false;
            state.tables = action.payload.data.tables;
        },
        allTableFail(state,action){
            state.tableLoading = false;
            state.tableError = action.payload;
        },
        updateTableRequest(state,action){
            state.tableLoading = true;
        },
        updateTableSuccess(state,action){
            state.tableLoading = false;
            state.tableMessage = action.payload.message;
        },
        updateTableFail(state,action){
            state.tableLoading = false;
            state.tableError = action.payload;
        },

        tableExistRequest(state,action){
            state.tableExistLoading = true;
        },
        tableExistSuccess(state,action){
            state.tableExistLoading = false;
            state.tableExist = true;
            state.shopName = action.payload.data.shopName;
        },
        tableExistFail(state,action){
            state.tableExistLoading = false;
            state.tableExist = false;
            state.tableError = action.payload;
        },

        clearError(state,action){
            state.tableError = null;
        },
        clearMessage(state,action){
            state.tableMessage = null;
        }
    }
})

export default tableSlice.reducer;

export const { 
    addTableRequest,
    addTableSuccess,
    addTableFail, 
    deleteTableRequest,
    deleteTableSuccess,
    deleteTableFail, 
    updateTableRequest, 
    updateTableSuccess, 
    updateTableFail, 
    allTableRequest,
    allTableSuccess,
    allTableFail,
    tableExistRequest,
    tableExistSuccess,
    tableExistFail,
    clearError, 
    clearMessage 
} = tableSlice.actions;
