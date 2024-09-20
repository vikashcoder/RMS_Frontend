import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: { order:{} },
    reducers: {
        generateKotRequest(state,action){
            state.orderLoading = true;
        },
        generateKotSuccess(state,action){
            state.orderLoading = false;
            state.orderMessage = action.payload.message;
        },
        generateKotFail(state,action){
            state.orderLoading = false;
            state.orderError = action.payload;
        },

        deleteOrderRequest(state,action){
            state.orderLoading = true
        },
        deleteOrderSuccess(state,action){
            state.orderLoading = false;
            state.orderMessage = action.payload.message;
        },
        deleteOrderFail(state,action){
            state.orderLoading = false;
            state.orderError = action.payload;
        },

        allOrderRequest(state,action){
            state.orderLoading = true;
            state.kots = [];
        },
        allOrderSuccess(state,action){
            state.orderLoading = false;
            state.kots = action.payload.data.kots;
        },
        allOrderFail(state,action){
            state.orderLoading = false;
            state.orderError = action.payload;
        },
        requestedOrderRequest(state,action){
            // state.orderLoading = true;
            state.requestedKots = [];
        },
        requestedOrderSuccess(state,action){
            // state.orderLoading = false;
            state.requestedKots = action.payload.data.kots;
        },
        requestedOrderFail(state,action){
            // state.orderLoading = false;
            state.orderError = action.payload;
        },
        updateOrderRequest(state,action){
            state.orderLoading = true;
        },
        updateOrderSuccess(state,action){
            state.orderLoading = false;
            state.orderMessage = action.payload.message;
        },
        updateOrderFail(state,action){
            state.orderLoading = false;
            state.orderError = action.payload;
        },

        orderExistRequest(state,action){
            state.orderExistLoading = true;
        },
        orderExistSuccess(state,action){
            state.orderExistLoading = false;
            state.orderExist = true;
            state.shopName = action.payload.data.shopName;
        },
        orderExistFail(state,action){
            state.orderExistLoading = false;
            state.orderExist = false;
            state.orderError = action.payload;
        },

        clearError(state,action){
            state.orderError = null;
        },
        clearMessage(state,action){
            state.orderMessage = null;
        }
    }
})

export default orderSlice.reducer;

export const { 
    generateKotRequest,
    generateKotSuccess,
    generateKotFail, 
    deleteOrderRequest,
    deleteOrderSuccess,
    deleteOrderFail, 
    updateOrderRequest, 
    updateOrderSuccess, 
    updateOrderFail, 
    allOrderRequest,
    allOrderSuccess,
    allOrderFail,
    requestedOrderRequest,
    requestedOrderSuccess,
    requestedOrderFail,
    orderExistRequest,
    orderExistSuccess,
    orderExistFail,
    clearError, 
    clearMessage 
} = orderSlice.actions;
