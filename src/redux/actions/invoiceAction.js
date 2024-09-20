import { allInvoicesFail, allInvoicesLoading, allInvoicesSuccess, clearError, clearMessage, generateInvoiceFail, generateInvoiceLoading, generateInvoiceSuccess, paidInvoiceFail, paidInvoiceLoading, paidInvoiceSuccess, singleInvoiceFail, singleInvoiceRequest, singleInvoiceSuccess } from "../reducers/invoiceReducer";
import { server } from "../store";
import axios from "axios";

// Generate Single Invoice
export const generateSingleInvoice = (kotId,shopId) => async (dispatch) => {
    try {
      dispatch(generateInvoiceLoading());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
      }
  
      let link = `${server}/invoices/single-invoice/${shopId}`;

      const { data } = await axios.post(link,{kotId},config);
  
      dispatch(generateInvoiceSuccess(data));
    } catch (error) {
      dispatch(generateInvoiceFail(error.response.data.message));
    }
};

// Generate Table Invoice
export const generateTableInvoice = (tableId,shopId) => async (dispatch) => {
    try {
      dispatch(generateInvoiceLoading());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
      }
  
      let link = `${server}/invoices/table-invoice/${shopId}`;

      const { data } = await axios.post(link,{tableId},config);
  
      dispatch(generateInvoiceSuccess(data));
    } catch (error) {
      dispatch(generateInvoiceFail(error.response.data.message));
    }
};

// Pay invoice
export const paidInvoice = (invoiceId,paymentMode,shopId) => async (dispatch) => {
    try {
      dispatch(paidInvoiceLoading());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
      }
  
      let link = `${server}/invoices/pay-invoice/${invoiceId}/${shopId}`;

      const { data } = await axios.put(link,{paymentMode},config);
  
      dispatch(paidInvoiceSuccess(data));
    } catch (error) {
      dispatch(paidInvoiceFail(error.response.data.message));
    }
};

// Get All Invoices
export const getInvoices = (q = "",shopId,currentPage=1,paymentMode="") => async (dispatch) => {
  try {
    dispatch(allInvoicesLoading());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
    }

    let link = `${server}/invoices/get-invoices/${shopId}?q=${q}&page=${currentPage}`;

    if(paymentMode !==""){
      link = `${server}/invoices/get-invoices/${shopId}?q=${q}&page=${currentPage}&paymentMode=${paymentMode}`;
    }

    const { data } = await axios.get(link,config);

    dispatch(allInvoicesSuccess(data));
  } catch (error) {
    dispatch(allInvoicesFail(error.response.data.message));
  }
};

// Get Single Invoice
export const getSingleInvoice = (invoiceId) => async (dispatch) => {
  try {
    dispatch(singleInvoiceRequest());

    let link = `${server}/invoices/get-invoice/${invoiceId}`;

    const { data } = await axios.get(link);

    dispatch(singleInvoiceSuccess(data));
  } catch (error) {
    dispatch(singleInvoiceFail(error.response.data.message));
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch(clearError());
};
  
//Clearing Message
export const clearMessages = () => async (dispatch) => {
    dispatch(clearMessage());
};
