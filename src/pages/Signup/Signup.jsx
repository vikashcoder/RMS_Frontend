import React, { useEffect, useState } from 'react'
import loginLogo from '../../assets/login-logo.png'
import logo from '../../assets/logo.svg'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { clearErrors, login } from '../../redux/actions/userAction';
import toast from 'react-hot-toast';
import { clearErrors, clearMessages, signupOwner } from '../../redux/actions/userAction';
import MetaData from '../../components/ui/MetaData/MetaData';
// import MetaData from "../../components/MetaData/MetaData"
// import InitialLoader from '../../components/Loader/InitialLoader/InitialLoader';

const Signup = () => {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [avatar, setAvatar] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { userError,userLoading,userMessage } = useSelector((state)=>state.user)

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault()

    if(password !== confirmPassword){
        return toast.error("password not matching")
    }

    if(avatar===""){
      return toast.error("Avatar required")
    }

    const formData = new FormData();

    formData.append("name",name);
    formData.append("email",email.trim());
    formData.append("phoneNo",phoneNo.trim());
    formData.append("line1",line1);
    formData.append("line2",line2);
    formData.append("pincode",pincode);
    formData.append("password",password)
    formData.append("state",state);
    formData.append("avatar",avatar);

    dispatch(signupOwner(formData));

  }


useEffect(()=>{
    if(userError){
        toast.error(userError);
        dispatch(clearErrors());
    }
    if(userMessage){
      toast.success("Verification Mail Sent");
      dispatch(clearMessages());
      navigate("/login")
    }
},[dispatch,userError,userMessage,navigate])

  return (
    <>
    <MetaData title={`SIGNUP`} />
    {/* {userLoading ? <InitialLoader />
    : */}
    <div className='login-page'>
        <div className='login-left'>
          <img width="700" src={loginLogo} alt='Login-page' />
        </div>
        <div className='login-right'>
          <div className='login-content'>
            <div className='login-heading'>
              <img src={logo} alt="logo" />
              <h5>Restura</h5>
            </div>
            <div className='login-subheading'>
              <h6>Welcome to Restura!</h6>
              <p>Please sign-up to our service</p>
            </div>
            <form className='login-form' onSubmit={submitHandler}>
                <div className='login-email'>
                    <input type="text" onChange={(e)=>(setName(e.target.value)) } value={name} placeholder='Your Name' />
              </div>
                <div className='login-email'>
                    <input type="email" onChange={(e)=>(setEmail(e.target.value)) } value={email} placeholder='Your Email' />
              </div>
                <div className='login-email'>
                    <input type="number" onChange={(e)=>(setPhoneNo(e.target.value)) } value={phoneNo} placeholder='Your Phone No' />
              </div>
                <div className='login-email'>
                    <input type="text" onChange={(e)=>(setLine1(e.target.value)) } value={line1} placeholder='Address Line 1' />
              </div>
                <div className='login-email'>
                    <input type="text" onChange={(e)=>(setLine2(e.target.value)) } value={line2} placeholder='Address Line 2' />
              </div>
                <div className='login-email'>
                    <input type="number" onChange={(e)=>(setPincode(e.target.value)) } value={pincode} placeholder='Pincode' />
              </div>
                <div className='login-email'>
                    <input type="text" onChange={(e)=>(setState(e.target.value)) } value={state} placeholder='State' />
              </div>
                <div className='login-email'>
                    <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} placeholder='Avatar' />
              </div>
               <div className='login-password'>
                    <input style={{marginBottom: "0px"}} type={showPassword ? "text" : "password"} onChange={(e)=>(setPassword(e.target.value)) } value={password} placeholder='Password' required={true} />
                    {!showPassword ? <VisibilityOffIcon onClick={()=>{setShowPassword(!showPassword)}} /> : <VisibilityIcon onClick={()=>{setShowPassword(!showPassword)}}/>}
              </div>
               <div className='login-password'>
                    <input style={{marginBottom: "0px"}} type={showPassword ? "text" : "password"} onChange={(e)=>(setConfirmPassword(e.target.value)) } value={confirmPassword} placeholder='Confirm Password' required={true} />
                    {!showConfirmPassword ? <VisibilityOffIcon onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}} /> : <VisibilityIcon onClick={()=>{setShowPassword(!showPassword)}}/>}
              </div>
             <button type='submit' className='login-button'>{userLoading ? <span className="loader"></span> :"Signup"}</button>
             <Link to='/login'>Already have an account!!</Link>
            </form>
          </div>
        </div>
    </div>  
    {/* } */}
    </>
  )
}

export default Signup