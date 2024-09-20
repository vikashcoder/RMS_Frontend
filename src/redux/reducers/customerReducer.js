import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
    name: "customer",
    initialState: { customer:{} },
    reducers: {
        addCustomerRequest(state,action){
            state.customerLoading = true;
        },
        addCustomerSuccess(state,action){
            state.customerLoading = false;
            state.customerMessage = action.payload.message;
        },
        addCustomerFail(state,action){
            state.customerLoading = false;
            state.customerError = action.payload;
        },

        deleteCustomerRequest(state,action){
            state.customerLoading = true
        },
        deleteCustomerSuccess(state,action){
            state.customerLoading = false;
            state.customerMessage = action.payload.message;
        },
        deleteCustomerFail(state,action){
            state.customerLoading = false;
            state.customerError = action.payload;
        },

        allCustomerRequest(state,action){
            state.customerLoading = true;
            state.customers = [];
        },
        allCustomerSuccess(state,action){
            state.customerLoading = false;
            state.customers = action.payload.data.customers;
            state.resultPerPage = action.payload.data.resultPerPage;
            state.customerFilteredCount =  action.payload.data.customerFilteredCount;
        },
        allCustomerFail(state,action){
            state.customerLoading = false;
            state.customerError = action.payload;
        },
        updateCustomerRequest(state,action){
            state.customerLoading = true;
        },
        updateCustomerSuccess(state,action){
            state.customerLoading = false;
            state.customerMessage = action.payload.message;
        },
        updateCustomerFail(state,action){
            state.customerLoading = false;
            state.customerError = action.payload;
        },

        clearError(state,action){
            state.customerError = null;
        },
        clearMessage(state,action){
            state.customerMessage = null;
        }
    }
})

export default customerSlice.reducer;

export const { 
    addCustomerRequest,
    addCustomerSuccess,
    addCustomerFail, 
    deleteCustomerRequest,
    deleteCustomerSuccess,
    deleteCustomerFail, 
    updateCustomerRequest, 
    updateCustomerSuccess, 
    updateCustomerFail, 
    allCustomerRequest,
    allCustomerSuccess,
    allCustomerFail,
    clearError, 
    clearMessage 
} = customerSlice.actions;
