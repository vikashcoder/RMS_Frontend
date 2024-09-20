import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, verifyUser } from '../../redux/actions/userAction';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../../components/ui/MetaData/MetaData';

const VerifyUser = () => {
  const [OTP, setOTP] = useState("")

  const { userMessage, userError, userLoading} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    if(OTP===""){
      return toast.error("Please enter the OTP");
    }
    
    dispatch(verifyUser(OTP.trim(),token))
    setOTP("");

  }

  useEffect(()=>{
    if(userMessage){
      navigate("/login");
    }
    if(userError){
        toast.error(userError);
        dispatch(clearErrors());
    }
},[dispatch,userError,userMessage,navigate]);

  return (
    <>
    <MetaData title={`VERIFY USER`} />
    {/* {userLoading ? <InitialLoader />
    : */}
    <div className='login-page' style={{justifyContent: "center" , alignItems: "center"}}>
    <div className='login-right' style={{ borderRadius: "10px" , boxShadow: "#bebebe9c 3px 2px 13px 0px"}}>
      <div className='login-content'>
        <div className='login-subheading'>
          <h6>Verify User</h6>
          <p>Please Enter the verification OTP</p>
        </div>
        <form className='login-form' onSubmit={submitHandler}>
          <div className='login-email'>
                <input type="text" onChange={(e)=>(setOTP(e.target.value)) } value={OTP} placeholder='OTP' required={true} />
          </div>
          <button type='submit' className='login-button'>{userLoading ? <span className='loader'></span>:"Verify"}</button>
        </form>
      </div>
    </div>
</div>
{/* } */}
    </>
  )
}

export default VerifyUser