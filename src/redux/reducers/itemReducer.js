import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name: "item",
    initialState: { item:{} },
    reducers: {
        addItemRequest(state,action){
            state.itemLoading = true;
        },
        addItemSuccess(state,action){
            state.itemLoading = false;
            state.itemMessage = action.payload.message;
        },
        addItemFail(state,action){
            state.itemLoading = false;
            state.itemError = action.payload;
        },

        deleteItemRequest(state,action){
            state.itemLoading = true
        },
        deleteItemSuccess(state,action){
            state.itemLoading = false;
            state.itemMessage = action.payload.message;
        },
        deleteItemFail(state,action){
            state.itemLoading = false;
            state.itemError = action.payload;
        },

        allItemRequest(state,action){
            state.itemLoading = true;
            state.items = [];
        },
        allItemSuccess(state,action){
            state.itemLoading = false;
            state.items = action.payload.data.items;
        },
        allItemFail(state,action){
            state.itemLoading = false;
            state.itemError = action.payload;
        },
        updateItemRequest(state,action){
            state.itemLoading = true;
        },
        updateItemSuccess(state,action){
            state.itemLoading = false;
            state.itemMessage = action.payload.message;
        },
        updateItemFail(state,action){
            state.itemLoading = false;
            state.itemError = action.payload;
        },

        clearError(state,action){
            state.itemError = null;
        },
        clearMessage(state,action){
            state.itemMessage = null;
        }
    }
})

export default itemSlice.reducer;

export const { 
    addItemRequest,
    addItemSuccess,
    addItemFail, 
    deleteItemRequest,
    deleteItemSuccess,
    deleteItemFail, 
    updateItemRequest, 
    updateItemSuccess, 
    updateItemFail, 
    allItemRequest,
    allItemSuccess,
    allItemFail,
    clearError, 
    clearMessage 
} = itemSlice.actions;
