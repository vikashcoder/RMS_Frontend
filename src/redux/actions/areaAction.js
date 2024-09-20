import { addAreaFail, addAreaRequest, addAreaSuccess, allAreaFail, allAreaRequest, allAreaSuccess, clearError, clearMessage, deleteAreaFail, deleteAreaRequest, deleteAreaSuccess, updateAreaFail, updateAreaRequest, updateAreaSuccess } from "../reducers/areaReducer";
import { server } from "../store";
import axios from "axios";

// Get All Areas
export const getAreas = (shopId) => async (dispatch) => {
    try {
      dispatch(allAreaRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
      }
  
      let link = `${server}/areas/getMyAreas/${shopId}`;

      const { data } = await axios.get(link,config);
  
      dispatch(allAreaSuccess(data));
    } catch (error) {
      dispatch(allAreaFail(error.response.data.message));
    }
};

//Add Area
export const addArea = (areaData,shopId) => async (dispatch) => {
  try {
    dispatch(addAreaRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
  };

    const { data } = await axios.post(`${server}/areas/add-area/${shopId}`,
    areaData,
    config
    );

    dispatch(addAreaSuccess(data));
  } catch (error) {
    dispatch(addAreaFail(error.response.data.message));
  }
};

//Delete Area
export const deleteArea = (areaId,shopId) => async (dispatch) => {
  try {
    dispatch(deleteAreaRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
  };

    const { data } = await axios.delete(`${server}/areas/delete-area/${areaId}/${shopId}`,
    config
    );

    dispatch(deleteAreaSuccess(data));
  } catch (error) {
    dispatch(deleteAreaFail(error.response.data.message));
  }
};

// Edit Area
export const editArea = (areaData, areaId, shopId) => async (dispatch) => {
  try {
    dispatch(updateAreaRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json", 
      'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
}

    const { data } = await axios.put(`${server}/areas/edit-area/${areaId}/${shopId}`, areaData, config);

    dispatch(updateAreaSuccess(data));
  } catch (error) {
    dispatch(updateAreaFail(error.response.data.message));
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
