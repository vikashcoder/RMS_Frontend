import React, { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { clearErrors, resetPassword } from '../../redux/actions/userAction';
import MetaData from '../../components/ui/MetaData/MetaData';

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { user, userError, userLoading } =useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      return toast.error("Passwords not matched");
    }

    const formData = new FormData();

    formData.append("password",password.trim());
    formData.append("confirmPassword",confirmPassword.trim());

    dispatch(resetPassword(formData,token));

    setPassword("");
    setConfirmPassword("");

  }

  useEffect(()=>{
    if(userError){
      toast.error(userError)
      dispatch(clearErrors());
    }
    if(user.name){
        navigate("/member/dashboard")
    }
},[dispatch,navigate,userError,user]);

  return (
    <>
      <MetaData title={`RESET PASSWORD`} />
      {/* {userLoading ? <InitialLoader />
    : */}
      <div className='login-page' style={{justifyContent: "center" , alignItems: "center"}}>
      <div className='login-right' style={{ borderRadius: "10px" , boxShadow: "#bebebe9c 3px 2px 13px 0px"}}>
        <div className='login-content'>
          <div className='login-subheading'>
            <h6>Reset Password</h6>
            <p>Please reset your password</p>
          </div>
          <form className='login-form' onSubmit={submitHandler}>
          <div className='login-password' >
                    <input style={{ marginBottom: "0px"}} type={showPassword ? "text" : "password"} onChange={(e)=>(setPassword(e.target.value)) } value={password} placeholder='Password' required={true} />
                    {!showPassword ? <VisibilityOffIcon onClick={()=>{setShowPassword(!showPassword)}} /> : <VisibilityIcon onClick={()=>{setShowPassword(!showPassword)}}/>}
              </div>
          <div className='login-password'>
                    <input style={{ marginBottom: "0px"}} type={showConfirmPassword ? "text" : "password"} onChange={(e)=>(setConfirmPassword(e.target.value)) } value={confirmPassword} placeholder='Confirm Password' required={true} />
                    {!showConfirmPassword ? <VisibilityOffIcon onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}} /> : <VisibilityIcon onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}}/>}
              </div>
            <button type='submit' className='login-button'>{userLoading?<span className='loader'></span>:"Reset"}</button>
          </form>
        </div>
      </div>
  </div>
  {/* } */}
  </>
  )
}

export default ResetPassword