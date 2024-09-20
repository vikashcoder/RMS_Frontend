import { createSlice } from "@reduxjs/toolkit";

const areaSlice = createSlice({
    name: "area",
    initialState: { area:{} },
    reducers: {
        addAreaRequest(state,action){
            state.areaLoading = true;
        },
        addAreaSuccess(state,action){
            state.areaLoading = false;
            state.areaMessage = action.payload.message;
        },
        addAreaFail(state,action){
            state.areaLoading = false;
            state.areaError = action.payload;
        },

        deleteAreaRequest(state,action){
            state.areaLoading = true
        },
        deleteAreaSuccess(state,action){
            state.areaLoading = false;
            state.areaMessage = action.payload.message;
        },
        deleteAreaFail(state,action){
            state.areaLoading = false;
            state.areaError = action.payload;
        },

        allAreaRequest(state,action){
            state.areaLoading = true;
            state.areas = [];
        },
        allAreaSuccess(state,action){
            state.areaLoading = false;
            state.areas = action.payload.data.areas;
        },
        allAreaFail(state,action){
            state.areaLoading = false;
            state.areaError = action.payload;
        },
        updateAreaRequest(state,action){
            state.areaLoading = true;
        },
        updateAreaSuccess(state,action){
            state.areaLoading = false;
            state.areaMessage = action.payload.message;
        },
        updateAreaFail(state,action){
            state.areaLoading = false;
            state.areaError = action.payload;
        },

        clearError(state,action){
            state.areaError = null;
        },
        clearMessage(state,action){
            state.areaMessage = null;
        }
    }
})

export default areaSlice.reducer;

export const { 
    addAreaRequest,
    addAreaSuccess,
    addAreaFail, 
    deleteAreaRequest,
    deleteAreaSuccess,
    deleteAreaFail, 
    updateAreaRequest, 
    updateAreaSuccess, 
    updateAreaFail, 
    allAreaRequest,
    allAreaSuccess,
    allAreaFail,
    clearError, 
    clearMessage 
} = areaSlice.actions;
