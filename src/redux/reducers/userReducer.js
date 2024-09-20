import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { user:{} },
    reducers: {
        loginRequest(state,action){
            state.userLoading = true;
            state.isAuthenticated = false;
        },
        loginSuccess(state,action){
            state.userLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.data.user;
            state.userMessage = action.payload.userMessage;
        },
        loginFail(state,action){
            state.userLoading = false;
            state.isAuthenticated = false;
            state.userError = action.payload;
        },

        signupRequest(state,action){
            state.userLoading = true;
        },
        signupSuccess(state,action){
            state.userLoading = false;
            state.userMessage = action.payload.message;
        },
        signupFail(state,action){
            state.userLoading = false;
            state.userError = action.payload;
        },

        loadUserRequest(state,action){
            state.userLoading = true;
            state.isAuthenticated = false;
        },
        loadUserSuccess(state,action){
            state.userLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loadUserFail(state,action){
            state.userLoading = false;
            state.isAuthenticated = false;
            state.user = {}
            state.userError = action.payload;
        },

        logoutRequest(state,action){
            state.userLoading = true;
        },
        logoutSuccess(state,action){
            state.userLoading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.userMessage = action.payload;
        },
        logoutFail(state,action){
            state.userLoading = false;
            state.userError = action.payload;
        },

        OTPVerificationRequest(state,action){
            state.userLoading = true;
        },
        OTPVerificationSuccess(state,action){
            state.userLoading = false;
            state.userMessage = action.payload.message
        },
        OTPVerificationFail(state,action){
            state.userLoading = false;
            state.userError = action.payload;
        },

        updateAvatarRequest(state,action){
            state.userLoading = true;
        },
        updateAvatarSuccess(state,action){
            state.userLoading = false;
            state.user = action.payload.data.user
            state.userMessage = action.payload.message
        },
        updateAvatarFail(state,action){
            state.userLoading = false;
            state.userError = action.payload;
        },
        updatePasswordRequest(state,action){
            state.userLoading = true;
        },
        updatePasswordSuccess(state,action){
            state.userLoading = false;
            state.userMessage = action.payload.message;
        },
        updatePasswordFail(state,action){
            state.userLoading = false;
            state.userError = action.payload;
        },

        forgotPasswordRequest(state,action){
            state.userLoading = true;
        },
        forgotPasswordSuccess(state,action){
            state.userLoading = false;
            state.userMessage = action.payload.message;
        },
        forgotPasswordFail(state,action){
            state.userLoading = false;
            state.userError = action.payload;
        },

        resetPasswordRequest(state,action){
            state.userLoading = true;
            state.isAuthenticated = false
        },
        resetPasswordSuccess(state,action){
            state.user = action.payload.data.user
            state.userMessage = action.payload.message;
            state.isAuthenticated = true
            state.userLoading = false;
            state.isChanged = true;
        },
        resetPasswordFail(state,action){
            state.userLoading = false;
            state.userError = action.payload;
            state.isAuthenticated = false
        },

        clearError(state,action){
            state.userError = null;
        },
        clearMessage(state,action){
            state.userMessage = null;
        }
    }
})

export default userSlice.reducer;

export const { 
    loginRequest,
    loginSuccess, 
    loginFail,
    signupRequest,
    signupSuccess,
    signupFail, 
    loadUserRequest, 
    loadUserSuccess, 
    loadUserFail, 
    logoutRequest, 
    logoutSuccess, 
    logoutFail, 
    OTPVerificationRequest,
    OTPVerificationSuccess,
    OTPVerificationFail,
    updateAvatarRequest,
    updateAvatarSuccess,
    updateAvatarFail,
    updatePasswordRequest, 
    updatePasswordSuccess, 
    updatePasswordFail, 
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail, 
    clearError, 
    clearMessage 
} = userSlice.actions;
