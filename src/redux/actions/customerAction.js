import { addCustomerFail, addCustomerRequest, addCustomerSuccess, allCustomerFail, allCustomerRequest, allCustomerSuccess, clearError, clearMessage, deleteCustomerFail, deleteCustomerRequest, deleteCustomerSuccess, updateCustomerFail, updateCustomerRequest, updateCustomerSuccess } from "../reducers/customerReducer";
import { server } from "../store";
import axios from "axios";

// Get All Customers
export const getCustomers = (q = "",shopId,currentPage=1) => async (dispatch) => {
    try {
      dispatch(allCustomerRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
      }
  
      let link = `${server}/customers/get-customers/${shopId}?q=${q}&page=${currentPage}`;

      const { data } = await axios.get(link,config);
  
      dispatch(allCustomerSuccess(data));
    } catch (error) {
      dispatch(allCustomerFail(error.response.data.message));
    }
};

//Add Customer
export const addCustomer = (customerData,shopId) => async (dispatch) => {
  try {
    dispatch(addCustomerRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
  };

    const { data } = await axios.post(`${server}/customers/add-customer/${shopId}`,
    customerData,
    config
    );

    dispatch(addCustomerSuccess(data));
  } catch (error) {
    dispatch(addCustomerFail(error.response.data.message));
  }
};

//Delete Customer
export const deleteCustomer = (customerId,shopId) => async (dispatch) => {
  try {
    dispatch(deleteCustomerRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
  };

    const { data } = await axios.delete(`${server}/customers/delete-customer/${customerId}/${shopId}`,
    config
    );

    dispatch(deleteCustomerSuccess(data));
  } catch (error) {
    dispatch(deleteCustomerFail(error.response.data.message));
  }
};

// Edit Customer
export const editCustomer = (customerData, customerId, shopId) => async (dispatch) => {
  try {
    dispatch(updateCustomerRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json", 
      'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
}

    const { data } = await axios.put(`${server}/customers/edit-customer/${customerId}/${shopId}`, customerData, config);

    dispatch(updateCustomerSuccess(data));
  } catch (error) {
    dispatch(updateCustomerFail(error.response.data.message));
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