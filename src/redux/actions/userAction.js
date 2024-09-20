import axios from "axios";
import { server } from "../store";
import { OTPVerificationFail, OTPVerificationRequest, OTPVerificationSuccess, clearError, clearMessage, forgotPasswordFail, forgotPasswordRequest, forgotPasswordSuccess, loadUserFail, loadUserRequest, loadUserSuccess, loginFail, loginRequest, loginSuccess, logoutFail, logoutRequest, logoutSuccess, resetPasswordFail, resetPasswordRequest, resetPasswordSuccess, signupFail, signupRequest, signupSuccess, updateAvatarFail, updateAvatarRequest, updateAvatarSuccess, updatePasswordFail, updatePasswordRequest, updatePasswordSuccess } from "../reducers/userReducer";
import { myShopFail, myShopRequest, myShopSuccess } from "../reducers/shopReducer";

//Login owner
export const loginOwner = (email,phoneNo,password) => async (dispatch) => {
    try {
      dispatch(loginRequest());
  
      const config = { 
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    };
  
      const { data } = await axios.post(`${server}/users/login-owner`,
      { email , phoneNo, password },
      config
      );
  
      dispatch(loginSuccess(data));
      localStorage.setItem("Access-Token",data.data.accessToken);
      localStorage.setItem("Refresh-Token",data.data.refreshToken);
    } catch (error) {
      dispatch(loginFail(error.response.data.message));
    }
};

//Login owner
export const signupOwner = (userData) => async (dispatch) => {
  try{
    dispatch(signupRequest());

  let token = localStorage.getItem("Access-Token");

  const config = { headers: { 
    "Content-Type": "multipart/form-data",
    'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
};

  const { data } = await axios.post(`${server}/users/register-owner`,
  userData,
  config
  );

  dispatch(signupSuccess(data));
} catch (error) {
  dispatch(signupFail(error.response.data.message));
}
}


//Login Employee
export const loginEmployee = (email,phoneNo,saleId,password) => async (dispatch) => {
    try {
      dispatch(loginRequest());
  
      const config = { 
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    };
  
      const { data } = await axios.post(`${server}/employees/login-employee`,
      { email , phoneNo, saleId,password },
      config
      );
  
      dispatch(loginSuccess(data));
      dispatch(myShopSuccess(data))
      localStorage.setItem("Access-Token",data.data.accessToken);
      localStorage.setItem("Refresh-Token",data.data.refreshToken);
    } catch (error) {
      dispatch(loginFail(error.response.data.message));
    }
};

//Login Employee
export const employeeOfShop = () => async (dispatch) => {
    try {
      dispatch(myShopRequest());

      let token = localStorage.getItem("Access-Token");
  
      const config = { 
        headers: { 
            "Content-Type": "application/json", 
            'Authorization': `Bearer ${token}` 
        },
        withCredentials: true
    };
  
      const { data } = await axios.get(`${server}/employees/employeeOf`,
      config
      );
  
      dispatch(myShopSuccess(data));
    } catch (error) {
      dispatch(myShopFail(error.response.data.message));
    }
};

// //Add member
// export const addMember = (userData) => async (dispatch) => {
//   try {
//     dispatch(addMemberRequest());

//     let token = localStorage.getItem("Access-Token");

//     const config = { headers: { 
//       "Content-Type": "multipart/form-data",
//       'Authorization': `Bearer ${token}` 
//     },
//     withCredentials: true
//   };

//     const { data } = await axios.post(`${server}/users/register`,
//     userData,
//     config
//     );

//     dispatch(addMemberSuccess(data));
//   } catch (error) {
//     dispatch(addMemberFail(error.response.data.message));
//   }
// };

//Verify user
export const verifyUser = (otp,token) => async (dispatch) => {
  try {
    dispatch(OTPVerificationRequest());

    const config = { headers: { 
      "Content-Type": "application/json",
    },
    withCredentials: true
   };

    const { data } = await axios.put(`${server}/users/verify-user/${token}`,
    {otp},
    config
    );

    dispatch(OTPVerificationSuccess(data));
  } catch (error) {
    dispatch(OTPVerificationFail(error.response.data.message));
  }
};

//LoadUser
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    let token = localStorage.getItem("Access-Token");

    const config = {
      headers: {
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
  }

    const { data } = await axios.get(`${server}/users/current-user`,
    config
    );

    dispatch(loadUserSuccess(data.data.user));
  } catch (error) {
    console.log(error)
    dispatch(loadUserFail(error.response.data.message));
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {

    dispatch(logoutRequest());

    let token = localStorage.getItem("Access-Token");

    const config = {
      headers: {
        'Authorization': `Bearer ${token}` 
      },
      withCredentials: true
  }
      
    const { data } = await axios.get(`${server}/users/logout`,
    config
    );

    dispatch(logoutSuccess(data.message));
    localStorage.setItem("Access-Token","");
    localStorage.setItem("Refresh-Token","");

  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};

//Update Avatar
export const updateAvatar = (userData) => async (dispatch) => {
  try {
    dispatch(updateAvatarRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
    "Content-Type": "multipart/form-data",
    'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
  };

    const {data}  = await axios.put(`${server}/users/update-avatar`,
   userData,
    config,
    );


    dispatch(updateAvatarSuccess(data));
  } catch (error) {
    dispatch(updateAvatarFail(error.response.data.message));
  }
};

//Update Peofile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(updateAvatarRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
    "Content-Type": "multipart/form-data",
    'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
  };

    const {data}  = await axios.put(`${server}/users/update-profile`,
   userData,
    config,
    );


    dispatch(updateAvatarSuccess(data));
  } catch (error) {
    dispatch(updateAvatarFail(error.response.data.message));
  }
};


// Change Password
export const updatePassword = (userData) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());

    let token = localStorage.getItem("Access-Token");

    const config = { headers: { 
      "Content-Type": "application/json", 
      'Authorization': `Bearer ${token}` 
  },
  withCredentials: true
}

    const { data } = await axios.put(`${server}/users/change-password`, userData, config);

    dispatch(updatePasswordSuccess(data));
  } catch (error) {
    dispatch(updatePasswordFail(error.response.data.message));
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`${server}/users/forgot-password`, {email}, config);

    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
};

// Reset Password
export const resetPassword = (formData,token) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${server}/users/reset-password/${token}`,
      formData,
      config
    );

    dispatch(resetPasswordSuccess(data));
    localStorage.setItem("Access-Token",data.data.accessToken);
    localStorage.setItem("Refresh-Token",data.data.refreshToken);
  } catch (error) {
    dispatch(resetPasswordFail(error.response.data.message));
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