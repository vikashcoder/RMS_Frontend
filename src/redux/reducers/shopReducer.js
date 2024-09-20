import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
    name: "shop",
    initialState: { shop:{} },
    reducers: {
        addShopRequest(state,action){
            state.shopLoading = true;
        },
        addShopSuccess(state,action){
            state.shopLoading = false;
            state.shopMessage = action.payload.message;
        },
        addShopFail(state,action){
            state.shopLoading = false;
            state.shopError = action.payload;
        },

        shopNull(state,action){
            state.shop = {}
        },

        // deleteShopRequest(state,action){
        //     state.shopLoading = true
        // },
        // deleteShopSuccess(state,action){
        //     state.shopLoading = false;
        //     state.shopMessage = action.payload.message;
        // },
        // deleteShopFail(state,action){
        //     state.shopLoading = false;
        //     state.shopError = action.payload;
        // },

        myShopRequest(state,action){
            state.shopLoading = true;
        },
        myShopSuccess(state,action){
            state.shopLoading = false;
            state.shop = action.payload.data.shop;
        },
        myShopFail(state,action){
            state.shopLoading = false;
            state.shopError = action.payload;
        },
        allShopRequest(state,action){
            state.shopLoading = true;
            state.shops = [];
        },
        allShopSuccess(state,action){
            state.shopLoading = false;
            state.shops = action.payload.data.shops;
        },
        allShopFail(state,action){
            state.shopLoading = false;
            state.shopError = action.payload;
        },
        updateShopRequest(state,action){
            state.shopLoading = true;
        },
        updateShopSuccess(state,action){
            state.shopLoading = false;
            state.shopMessage = action.payload.message;
        },
        updateShopFail(state,action){
            state.shopLoading = false;
            state.shopError = action.payload;
        },

        clearError(state,action){
            state.shopError = null;
        },
        clearMessage(state,action){
            state.shopMessage = null;
        }
    }
})

export default shopSlice.reducer;

export const { 
    addShopRequest,
    addShopSuccess,
    addShopFail, 
    shopNull,
    // deleteShopRequest,
    // deleteShopSuccess,
    // deleteShopFail, 
    updateShopRequest, 
    updateShopSuccess, 
    updateShopFail, 
    allShopRequest,
    allShopSuccess,
    allShopFail,
    myShopRequest,
    myShopSuccess,
    myShopFail,
    clearError, 
    clearMessage 
} = shopSlice.actions;
