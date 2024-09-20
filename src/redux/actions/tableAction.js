import { addTableFail, addTableRequest, addTableSuccess, allTableFail, allTableRequest, allTableSuccess, clearError, clearMessage, deleteTableFail, deleteTableRequest, deleteTableSuccess, tableExistFail, tableExistRequest, tableExistSuccess, updateTableFail, updateTableRequest, updateTableSuccess } from "../reducers/tableReducer";
import { server } from "../store";
import axios from "axios";

// Get All Tables
export const getTables = (q = "",shopId) => async (dispatch) => {
    try {
      dispatch(allTableRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
      }
  
      let link = `${server}/tables/getMyTables/${shopId}?q=${q}`;

      const { data } = await axios.get(link,config);
  
      dispatch(allTableSuccess(data));
    } catch (error) {
      dispatch(allTableFail(error.response.data.message));
    }
};

//Add Table
export const addTable = (tableData,shopId) => async (dispatch) => {
  try {
    dispatch(addTableRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
  };

    const { data } = await axios.post(`${server}/tables/add-table/${shopId}`,
    tableData,
    config
    );

    dispatch(addTableSuccess(data));
  } catch (error) {
    dispatch(addTableFail(error.response.data.message));
  }
};

//Delete Table
export const deleteTable = (tableId,shopId) => async (dispatch) => {
  try {
    dispatch(deleteTableRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
  };

    const { data } = await axios.delete(`${server}/tables/delete-table/${tableId}/${shopId}`,
    config
    );

    dispatch(deleteTableSuccess(data));
  } catch (error) {
    dispatch(deleteTableFail(error.response.data.message));
  }
};

// Edit Table
export const editTable = (tableData, tableId, shopId) => async (dispatch) => {
  try {
    dispatch(updateTableRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json", 
      'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
}

    const { data } = await axios.put(`${server}/tables/edit-table/${tableId}/${shopId}`, tableData, config);

    dispatch(updateTableSuccess(data));
  } catch (error) {
    dispatch(updateTableFail(error.response.data.message));
  }
};

// Edit Table Area
export const editTableArea = (areaId, tableId, shopId) => async (dispatch) => {
  try {
    dispatch(updateTableRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json", 
      'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
}

    const { data } = await axios.put(`${server}/tables/edit-tableArea/${tableId}/${shopId}`, {areaId}, config);

    dispatch(updateTableSuccess(data));
  } catch (error) {
    dispatch(updateTableFail(error.response.data.message));
  }
};

export const tableExistInShop = (tableNo, shopId) => async (dispatch) => {
  try {
    dispatch(tableExistRequest());

    const { data } = await axios.get(`${server}/tables/table-exist/${tableNo}/${shopId}`);

    dispatch(tableExistSuccess(data));
  } catch (error) {
    dispatch(tableExistFail(error.response.data.message));
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