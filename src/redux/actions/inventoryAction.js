import axios from 'axios';
import {
  getInventoryRequest,
  getInventorySuccess,
  getInventoryFail,
  addInventoryRequest,
  addInventorySuccess,
  addInventoryFail,
  updateInventoryRequest,
  updateInventorySuccess,
  updateInventoryFail,
  deleteInventoryRequest,
  deleteInventorySuccess,
  deleteInventoryFail,
  clearError,
  clearMessage
} from '../reducers/inventoryReducer';
import { server } from '../store';

export const getInventory = (q = "",shopId, inventoryStatus = "", currentPage = 1) => async (dispatch) => {
  try {
    dispatch(getInventoryRequest());

    const token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
  };
    let link = `${server}/inventories/get-inventory/${shopId}?q=${q}&page=${currentPage}`;

    if(inventoryStatus){
        link = `${server}/inventories/get-inventory/${shopId}?q=${q}&page=${currentPage}&page=${currentPage}&status=${inventoryStatus}`;
    }

    const { data } = await axios.get(link,config);

    dispatch(getInventorySuccess(data));

  } catch (error) {
    dispatch(getInventoryFail(error.response.data.message));
  }
};


export const addInventory = (inventoryData, shopId) => async (dispatch) => {
  try {
    dispatch(addInventoryRequest());

    const token = localStorage.getItem("Access-Token");

    const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, withCredentials: true };

    const { data } = await axios.post(`${server}/inventories/add-item/${shopId}`, inventoryData,config);

    dispatch(addInventorySuccess(data));

  } catch (error) {
    dispatch(addInventoryFail(error.response.data.message));
  }
};

export const updateInventory = (inventoryId, inventoryData,shopId) => async (dispatch) => {
  try {
    dispatch(updateInventoryRequest());

    const token = localStorage.getItem("Access-Token");

    const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, withCredentials: true };

    const { data } = await axios.put(`${server}/inventories/update-item/${inventoryId}/${shopId}`, inventoryData,config);

    dispatch(updateInventorySuccess(data));
  } catch (error) {
    dispatch(updateInventoryFail(error.response.data.message));
  }
};

export const deleteInventory = (inventoryItemId, shopId) => async (dispatch) => {
  try {
      dispatch(deleteInventoryRequest());

      const token = localStorage.getItem("Access-Token");

      const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, withCredentials: true };

      const { data } = await axios.delete(`${server}/inventories/delete-item/${inventoryItemId}/${shopId}`,config);

      dispatch(deleteInventorySuccess(data));
      
  } catch (error) {
      dispatch(deleteInventoryFail(error.response.data.message));
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch(clearError());
};

export const clearMessages = () => (dispatch) => {
  dispatch(clearMessage());
};
