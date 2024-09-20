import { addShopFail, addShopRequest, addShopSuccess, allShopFail, allShopRequest, allShopSuccess, clearError, clearMessage, myShopFail, myShopRequest, myShopSuccess, updateShopFail, updateShopRequest, updateShopSuccess } from "../reducers/shopReducer";
import { server } from "../store";
import axios from "axios";

// // Get All Tables
// export const getTables = (q = "",shopId) => async (dispatch) => {
//     try {
//       dispatch(allTableRequest());
  
//       let token = localStorage.getItem("Access-Token");
  
//       const config = { headers: { 
//         'Authorization': `Bearer ${token}` 
//       },
//       withCredentials: true
//       }
  
//       let link = `${server}/tables/getMyTables/${shopId}?q=${q}`;

//       const { data } = await axios.get(link,config);
  
//       dispatch(allTableSuccess(data));
//     } catch (error) {
//       dispatch(allTableFail(error.response.data.message));
//     }
// };

//Add Shop
export const addShop = (shopData) => async (dispatch) => {
  try {
    dispatch(addShopRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
  };

    const { data } = await axios.post(`${server}/shops/add-shop`,
    shopData,
    config
    );

    dispatch(addShopSuccess(data));
  } catch (error) {
    dispatch(addShopFail(error.response.data.message));
  }
};

// //Delete Table
// export const deleteTable = (tableId,shopId) => async (dispatch) => {
//   try {
//     dispatch(deleteTableRequest());

//     let token = localStorage.getItem("Access-Token");

//     const config = { headers: { 
//       "Content-Type": "application/json",
//       'Authorization': `Bearer ${token}` 
//     },
//     withCredentials: true
//   };

//     const { data } = await axios.delete(`${server}/tables/delete-table/${tableId}/${shopId}`,
//     config
//     );

//     dispatch(deleteTableSuccess(data));
//   } catch (error) {
//     dispatch(deleteTableFail(error.response.data.message));
//   }
// };

// // Edit Table
// export const editTable = (tableData, tableId, shopId) => async (dispatch) => {
//   try {
//     dispatch(updateTableRequest());

//     let token = localStorage.getItem("Access-Token");

//     const config = { headers: { 
//       "Content-Type": "application/json", 
//       'Authorization': `Bearer ${token}` 
//   },
//   withCredentials: true
// }

//     const { data } = await axios.put(`${server}/tables/edit-table/${tableId}/${shopId}`, tableData, config);

//     dispatch(updateTableSuccess(data));
//   } catch (error) {
//     dispatch(updateTableFail(error.response.data.message));
//   }
// };

// Edit Table Shop
export const editShop = (shopData, shopId) => async (dispatch) => {
  try {
    dispatch(updateShopRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json", 
      'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
}

    const { data } = await axios.put(`${server}/shops/edit-shop/${shopId}`, shopData, config);

    dispatch(updateShopSuccess(data));
  } catch (error) {
    dispatch(updateShopFail(error.response.data.message));
  }
};

export const getMyShops = () => async (dispatch) => {
  try {
    dispatch(allShopRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json", 
      'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
}

    const { data } = await axios.get(`${server}/shops/getMyShops`,config);

    dispatch(allShopSuccess(data));
    
  } catch (error) {
    dispatch(allShopFail(error.response.data.message));
  }
};

export const getMyShop = (shopId) => async (dispatch) => {
  try {
    dispatch(myShopRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json", 
      'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
}

    const { data } = await axios.get(`${server}/shops/getMyShop/${shopId}`,config);

    dispatch(myShopSuccess(data));

  } catch (error) {
    dispatch(myShopFail(error.response.data.message));
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