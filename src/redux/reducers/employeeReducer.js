import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
    name: "employee",
    initialState: { employee:{} },
    reducers: {
        addEmployeeRequest(state,action){
            state.employeeLoading = true;
        },
        addEmployeeSuccess(state,action){
            state.employeeLoading = false;
            state.employeeMessage = action.payload.message;
        },
        addEmployeeFail(state,action){
            state.employeeLoading = false;
            state.employeeError = action.payload;
        },

        deleteEmployeeRequest(state,action){
            state.employeeLoading = true
        },
        deleteEmployeeSuccess(state,action){
            state.employeeLoading = false;
            state.employeeMessage = action.payload.message;
        },
        deleteEmployeeFail(state,action){
            state.employeeLoading = false;
            state.employeeError = action.payload;
        },

        allEmployeeRequest(state,action){
            state.employeeLoading = true;
            state.employees = [];
        },
        allEmployeeSuccess(state,action){
            state.employeeLoading = false;
            state.employees = action.payload.data.employees;
        },
        allEmployeeFail(state,action){
            state.employeeLoading = false;
            state.employeeError = action.payload;
        },
        updateEmployeeRequest(state,action){
            state.employeeLoading = true;
        },
        updateEmployeeSuccess(state,action){
            state.employeeLoading = false;
            state.employeeMessage = action.payload.message;
        },
        updateEmployeeFail(state,action){
            state.employeeLoading = false;
            state.employeeError = action.payload;
        },

        clearError(state,action){
            state.employeeError = null;
        },
        clearMessage(state,action){
            state.employeeMessage = null;
        }
    }
})

export default employeeSlice.reducer;

export const { 
    addEmployeeRequest,
    addEmployeeSuccess,
    addEmployeeFail, 
    deleteEmployeeRequest,
    deleteEmployeeSuccess,
    deleteEmployeeFail, 
    updateEmployeeRequest, 
    updateEmployeeSuccess, 
    updateEmployeeFail, 
    allEmployeeRequest,
    allEmployeeSuccess,
    allEmployeeFail,
    clearError, 
    clearMessage 
} = employeeSlice.actions;
