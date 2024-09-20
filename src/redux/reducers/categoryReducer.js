import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: { category:{} },
    reducers: {
        addCategoryRequest(state,action){
            state.categoryLoading = true;
        },
        addCategorySuccess(state,action){
            state.categoryLoading = false;
            state.categoryMessage = action.payload.message;
        },
        addCategoryFail(state,action){
            state.categoryLoading = false;
            state.categoryError = action.payload;
        },

        deleteCategoryRequest(state,action){
            state.categoryLoading = true
        },
        deleteCategorySuccess(state,action){
            state.categoryLoading = false;
            state.categoryMessage = action.payload.message;
        },
        deleteCategoryFail(state,action){
            state.categoryLoading = false;
            state.categoryError = action.payload;
        },

        allCategoryRequest(state,action){
            state.categoryLoading = true;
            state.categories = [];
        },
        allCategorySuccess(state,action){
            state.categoryLoading = false;
            state.categories = action.payload.data.categories;
        },
        allCategoryFail(state,action){
            state.categoryLoading = false;
            state.categoryError = action.payload;
        },
        updateCategoryRequest(state,action){
            state.categoryLoading = true;
        },
        updateCategorySuccess(state,action){
            state.categoryLoading = false;
            state.categoryMessage = action.payload.message;
        },
        updateCategoryFail(state,action){
            state.categoryLoading = false;
            state.categoryError = action.payload;
        },

        clearError(state,action){
            state.categoryError = null;
        },
        clearMessage(state,action){
            state.categoryMessage = null;
        }
    }
})

export default categorySlice.reducer;

export const { 
    addCategoryRequest,
    addCategorySuccess,
    addCategoryFail, 
    deleteCategoryRequest,
    deleteCategorySuccess,
    deleteCategoryFail, 
    updateCategoryRequest, 
    updateCategorySuccess, 
    updateCategoryFail, 
    allCategoryRequest,
    allCategorySuccess,
    allCategoryFail,
    clearError, 
    clearMessage 
} = categorySlice.actions;
