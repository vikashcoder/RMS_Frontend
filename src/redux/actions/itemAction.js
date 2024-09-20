import { addItemFail, addItemRequest, addItemSuccess, allItemFail, allItemRequest, allItemSuccess, clearError, clearMessage, deleteItemFail, deleteItemRequest, deleteItemSuccess, updateItemFail, updateItemRequest, updateItemSuccess } from "../reducers/itemReducer";
import { server } from "../store";
import axios from "axios";

// Get All Items
export const getItems = (q = "",shopId,mealType="",isAvailable="",isStar="",categoryId="") => async (dispatch) => {
    try {
      dispatch(allItemRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
      }
  
      let link = `${server}/items/getMyItems/${shopId}?q=${q}`;
      // 1. Only mealType is present
if (mealType !== "" && isAvailable === "" && isStar === "" && categoryId === "") {
    link = `${server}/items/getMyItems/${shopId}?q=${q}&mealType=${mealType}`;
}
// 2. Only isAvailable is present
else if (mealType === "" && isAvailable !== "" && isStar === "" && categoryId === "") {
    link = `${server}/items/getMyItems/${shopId}?q=${q}&isAvailable=${isAvailable}`;
}
// 3. Only isStar is present
else if (mealType === "" && isAvailable === "" && isStar !== "" && categoryId === "") {
    link = `${server}/items/getMyItems/${shopId}?q=${q}&isStar=${isStar}`;
}
// 4. Only categoryId is present
else if (mealType === "" && isAvailable === "" && isStar === "" && categoryId !== "") {
    link = `${server}/items/getMyItems/${shopId}?q=${q}&categoryId=${categoryId}`;
}
// 5. mealType and isAvailable are present
else if (mealType !== "" && isAvailable !== "" && isStar === "" && categoryId === "") {
    link = `${server}/items/getMyItems/${shopId}?q=${q}&mealType=${mealType}&isAvailable=${isAvailable}`;
}
// 6. mealType and isStar are present
else if (mealType !== "" && isAvailable === "" && isStar !== "" && categoryId === "") {
    link = `${server}/items/getMyItems/${shopId}?q=${q}&mealType=${mealType}&isStar=${isStar}`;
}
// 7. mealType and categoryId are present
else if (mealType !== "" && isAvailable === "" && isStar === "" && categoryId !== "") {
    link = `${server}/items/getMyItems/${shopId}?q=${q}&mealType=${mealType}&categoryId=${categoryId}`;
}
// 8. isAvailable and isStar are present
else if (mealType === "" && isAvailable !== "" && isStar !== "" && categoryId === "") {
    link = `${server}/items/getMyItems/${shopId}?q=${q}&isAvailable=${isAvailable}&isStar=${isStar}`;
}
// 9. isAvailable and categoryId are present
else if (mealType === "" && isAvailable !== "" && isStar === "" && categoryId !== "") {
    link = `${server}/items/getMyItems/${shopId}?q=${q}&isAvailable=${isAvailable}&categoryId=${categoryId}`;
}
// 10. isStar and categoryId are present
else if (mealType === "" && isAvailable === "" && isStar !== "" && categoryId !== "") {
    link = `${server}/items/getMyItems/${shopId}?q=${q}&isStar=${isStar}&categoryId=${categoryId}`;
}
// 11. mealType, isAvailable, and isStar are present
else if (mealType !== "" && isAvailable !== "" && isStar !== "" && categoryId === "") {
    link = `${server}/items/getMyItems/${shopId}?q=${q}&mealType=${mealType}&isAvailable=${isAvailable}&isStar=${isStar}`;
}
// 12. mealType, isAvailable, and categoryId are present
else if (mealType !== "" && isAvailable !== "" && isStar === "" && categoryId !== "") {
    link = `${server}/items/getMyItems/${shopId}?q=${q}&mealType=${mealType}&isAvailable=${isAvailable}&categoryId=${categoryId}`;
}
// 13. mealType, isStar, and categoryId are present
else if (mealType !== "" && isAvailable === "" && isStar !== "" && categoryId !== "") {
    link = `${server}/items/getMyItems/${shopId}?q=${q}&mealType=${mealType}&isStar=${isStar}&categoryId=${categoryId}`;
}
// 14. isAvailable, isStar, and categoryId are present
else if (mealType === "" && isAvailable !== "" && isStar !== "" && categoryId !== "") {
    link = `${server}/items/getMyItems/${shopId}?q=${q}&isAvailable=${isAvailable}&isStar=${isStar}&categoryId=${categoryId}`;
}
// 15. All fields are present
else if (mealType !== "" && isAvailable !== "" && isStar !== "" && categoryId !== "") {
    link = `${server}/items/getMyItems/${shopId}?q=${q}&mealType=${mealType}&isAvailable=${isAvailable}&isStar=${isStar}&categoryId=${categoryId}`;
}


      const { data } = await axios.get(link,config);
  
      dispatch(allItemSuccess(data));
    } catch (error) {
      dispatch(allItemFail(error.response.data.message));
    }
};

//Add Item
export const addItem = (itemData,shopId) => async (dispatch) => {
  try {
    dispatch(addItemRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
  };

    const { data } = await axios.post(`${server}/items/add-item/${shopId}`,
    itemData,
    config
    );

    dispatch(addItemSuccess(data));
  } catch (error) {
    dispatch(addItemFail(error.response.data.message));
  }
};

//Delete Item
export const deleteItem = (itemId,shopId) => async (dispatch) => {
  try {
    dispatch(deleteItemRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
  };

    const { data } = await axios.delete(`${server}/items/delete-item/${itemId}/${shopId}`,
    config
    );

    dispatch(deleteItemSuccess(data));
  } catch (error) {
    dispatch(deleteItemFail(error.response.data.message));
  }
};

// Edit Item
export const editItem = (itemData, itemId, shopId) => async (dispatch) => {
  try {
    dispatch(updateItemRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json", 
      'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
}

    const { data } = await axios.put(`${server}/items/edit-item/${itemId}/${shopId}`, itemData, config);

    dispatch(updateItemSuccess(data));
  } catch (error) {
    dispatch(updateItemFail(error.response.data.message));
  }
};

// Edit Item Category
export const editItemCategory = (categoryId, itemId, shopId) => async (dispatch) => {
  try {
    dispatch(updateItemRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json", 
      'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
}

    const { data } = await axios.put(`${server}/items/edit-itemCategory/${itemId}/${shopId}`, {categoryId}, config);

    dispatch(updateItemSuccess(data));
  } catch (error) {
    dispatch(updateItemFail(error.response.data.message));
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