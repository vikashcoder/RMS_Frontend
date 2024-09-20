import { addCategoryFail, addCategoryRequest, addCategorySuccess, allCategoryFail, allCategoryRequest, allCategorySuccess, clearError, clearMessage, deleteCategoryFail, deleteCategoryRequest, deleteCategorySuccess, updateCategoryFail, updateCategoryRequest, updateCategorySuccess } from "../reducers/categoryReducer";
import { server } from "../store";
import axios from "axios";


// Get All Category
export const getCategories = (shopId) => async (dispatch) => {
    try {
      dispatch(allCategoryRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
      }
  
      let link = `${server}/categories/getMyCategories/${shopId}`;

      const { data } = await axios.get(link,config);
  
      dispatch(allCategorySuccess(data));
    } catch (error) {
      dispatch(allCategoryFail(error.response.data.message));
    }
};

//Add Category
export const addCategory = (categoryData,shopId) => async (dispatch) => {
  try {
    dispatch(addCategoryRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
  };

    const { data } = await axios.post(`${server}/categories/add-category/${shopId}`,
    categoryData,
    config
    );

    dispatch(addCategorySuccess(data));
  } catch (error) {
    dispatch(addCategoryFail(error.response.data.message));
  }
};

//Delete Category
export const deleteCategory = (categoryId,shopId) => async (dispatch) => {
  try {
    dispatch(deleteCategoryRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
  };

    const { data } = await axios.delete(`${server}/categories/delete-category/${categoryId}/${shopId}`,
    config
    );

    dispatch(deleteCategorySuccess(data));
  } catch (error) {
    dispatch(deleteCategoryFail(error.response.data.message));
  }
};

// Edit Category
export const editCategory = (categoryData, categoryId, shopId) => async (dispatch) => {
  try {
    dispatch(updateCategoryRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json", 
      'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
}

    const { data } = await axios.put(`${server}/categories/edit-category/${categoryId}/${shopId}`, categoryData, config);

    dispatch(updateCategorySuccess(data));
  } catch (error) {
    dispatch(updateCategoryFail(error.response.data.message));
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
