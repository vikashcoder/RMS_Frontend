import { addEmployeeFail, addEmployeeRequest, addEmployeeSuccess, allEmployeeFail, allEmployeeRequest, allEmployeeSuccess, clearError, clearMessage, deleteEmployeeFail, deleteEmployeeRequest, deleteEmployeeSuccess, updateEmployeeFail, updateEmployeeRequest, updateEmployeeSuccess } from "../reducers/employeeReducer";
import { server } from "../store";
import axios from "axios";

// Get All Employees
export const getEmployees = (q = "",shopId) => async (dispatch) => {
    try {
      dispatch(allEmployeeRequest());
  
      let token = localStorage.getItem("Access-Token");
  
      const config = { headers: { 
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
      }
  
      let link = `${server}/employees/get-employee/${shopId}?q=${q}`;

      const { data } = await axios.get(link,config);
  
      dispatch(allEmployeeSuccess(data));
    } catch (error) {
      dispatch(allEmployeeFail(error.response.data.message));
    }
};

//Add Employee
export const addEmployee = (employeeData,shopId) => async (dispatch) => {
  try {
    dispatch(addEmployeeRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
  };

    const { data } = await axios.post(`${server}/employees/register-employee/${shopId}`,
    employeeData,
    config
    );

    dispatch(addEmployeeSuccess(data));
  } catch (error) {
    dispatch(addEmployeeFail(error.response.data.message));
  }
};

//Delete Employee
export const deleteEmployee = (employeeId,shopId) => async (dispatch) => {
  try {
    dispatch(deleteEmployeeRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
  };

    const { data } = await axios.delete(`${server}/employees/delete-employee/${employeeId}/${shopId}`,
    config
    );

    dispatch(deleteEmployeeSuccess(data));
  } catch (error) {
    dispatch(deleteEmployeeFail(error.response.data.message));
  }
};

// Edit Employee
export const editEmployee = (employeeData, employeeId, shopId) => async (dispatch) => {
  try {
    dispatch(updateEmployeeRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json", 
      'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
}

    const { data } = await axios.put(`${server}/employees/edit-employee/${employeeId}/${shopId}`, employeeData, config);

    dispatch(updateEmployeeSuccess(data));
  } catch (error) {
    dispatch(updateEmployeeFail(error.response.data.message));
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