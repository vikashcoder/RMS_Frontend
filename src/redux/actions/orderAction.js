import { allOrderFail, allOrderRequest, allOrderSuccess, clearError, clearMessage, generateKotFail, generateKotRequest, generateKotSuccess, requestedOrderFail, requestedOrderRequest, requestedOrderSuccess, updateOrderFail, updateOrderRequest, updateOrderSuccess } from "../reducers/orderReducer";
import { server } from "../store";
import axios from "axios";

export const generateKot = (cartItems, tableNo, customerName, customerPhoneNo, orderValue, totalOrderItems,kotType,shopId, userId) => async (dispatch) => {
    try {
        dispatch(generateKotRequest());

        let link = `${server}/orders/new-order/${shopId}`;

        if(userId){
            link = `${server}/orders/new-order/${shopId}?userId=${userId}`;
        }
        const { data } = await axios.post(link,
        {
            cartItems,
            tableNo,
            orderValue,
            totalOrderItems,
            kotType,
            customerName,
            customerPhoneNo
        }
        );
    
        dispatch(generateKotSuccess(data));
      } catch (error) {
        dispatch(generateKotFail(error.response.data.message));
      }
}

export const getKots = (q="",status,kotType,shopId) => async (dispatch) => {
    try {
        dispatch(allOrderRequest());
    
        let token = localStorage.getItem("Access-Token");
    
        const config = { headers: { 
          'Authorization': `Bearer ${token}` 
        },
        withCredentials: true
        }
    
        let link = `${server}/orders/get-kots/${shopId}?q=${q}`;

        if(status !== "" && kotType === ""){
            link = `${server}/orders/get-kots/${shopId}?q=${q}&status=${status}`;
        }
        else if(status === "" && kotType !== ""){
            link = `${server}/orders/get-kots/${shopId}?q=${q}&kotType=${kotType}`;
        }
  
        const { data } = await axios.get(link,config);
    
        dispatch(allOrderSuccess(data));
      } catch (error) {
        dispatch(allOrderFail(error.response.data.message));
      }
}

export const getRequestedKots = (shopId) => async (dispatch) => {
    try {
        dispatch(requestedOrderRequest());
    
        let token = localStorage.getItem("Access-Token");
    
        const config = { headers: { 
          'Authorization': `Bearer ${token}` 
        },
        withCredentials: true
        }
    
        let link = `${server}/orders/get-kots/${shopId}?status=REQUESTED`;
  
        const { data } = await axios.get(link,config);
    
        dispatch(requestedOrderSuccess(data));
      } catch (error) {
        dispatch(requestedOrderFail(error.response.data.message));
      }
}

export const confirmOrder = (kotId,shopId) => async (dispatch) => {
    try {
        dispatch(updateOrderRequest());
    
        let token = localStorage.getItem("Access-Token");
    
        const config = { headers: { 
          'Authorization': `Bearer ${token}` 
        },
        withCredentials: true
        }
    
        let link = `${server}/orders/confirm-kot/${kotId}/${shopId}`;
  
        const { data } = await axios.put(link,{},config);
    
        dispatch(updateOrderSuccess(data));
      } catch (error) {
        dispatch(updateOrderFail(error.response.data.message));
      }
}

export const rejectOrder = (kotId,shopId) => async (dispatch) => {
    try {
        dispatch(updateOrderRequest());
    
        let token = localStorage.getItem("Access-Token");
    
        const config = { headers: { 
          'Authorization': `Bearer ${token}` 
        },
        withCredentials: true
        }
    
        let link = `${server}/orders/reject-kot/${kotId}/${shopId}`;
  
        const { data } = await axios.delete(link,config);
    
        dispatch(updateOrderSuccess(data));
      } catch (error) {
        dispatch(updateOrderFail(error.response.data.message));
      }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch(clearError());
};

//Clearing Message
export const clearMessages = () => async (dispatch) => {
  dispatch(clearMessage());
};