import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
    name: "item",
    initialState: { invoice:{} },
    reducers: {
       generateInvoiceLoading(state,action){
        state.invoiceLoading = true;
       },
       generateInvoiceSuccess(state,action){
        state.invoiceLoading = false;
        state.invoice = action.payload.data.invoice
       },
       generateInvoiceFail(state,action){
        state.invoiceLoading = false;
        state.invoiceError = action.payload
       },

       paidInvoiceLoading(state,action){
        state.invoiceLoading = true;
       },
       paidInvoiceSuccess(state,action){
        state.invoiceLoading = false;
        state.invoiceMessage = action.payload.message
       },
       paidInvoiceFail(state,action){
        state.invoiceLoading = false;
        state.invoiceError = action.payload
       },
       allInvoicesLoading(state,action){
        state.invoiceLoading = true;
       },
       allInvoicesSuccess(state,action){
        state.invoiceLoading = false;
        state.invoices = action.payload.data.invoices;
        state.resultPerPage = action.payload.data.resultPerPage;
        state.invoiceFilteredCount =  action.payload.data.invoiceFilteredCount;
       },
       allInvoicesFail(state,action){
        state.invoiceLoading = false;
        state.invoiceError = action.payload
       },
       singleInvoiceRequest(state,action){
        state.invoiceLoading = true
       },
       singleInvoiceSuccess(state,action){
        state.invoiceLoading = false
        state.invoice = action.payload.data.invoice
       },
       singleInvoiceFail(state,action){
        state.invoiceLoading = false;
        state.invoiceError = action.payload
       },
        clearError(state,action){
            state.invoiceError = null;
        },
        clearMessage(state,action){
            state.invoiceMessage = null;
        }
    }
})

export default invoiceSlice.reducer;

export const { 
    generateInvoiceLoading,
    generateInvoiceSuccess,
    generateInvoiceFail,
    paidInvoiceLoading,
    paidInvoiceSuccess,
    paidInvoiceFail,
    allInvoicesLoading,
    allInvoicesSuccess,
    allInvoicesFail,
    singleInvoiceRequest,
    singleInvoiceSuccess,
    singleInvoiceFail,
    clearError, 
    clearMessage 
} = invoiceSlice.actions;
