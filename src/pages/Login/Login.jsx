import React, { useEffect, useState } from 'react'
import './Login.css'
import loginLogo from '../../assets/login-logo.png'
import logo from '../../assets/logo.svg'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { clearErrors, login } from '../../redux/actions/userAction';
import toast from 'react-hot-toast';
import { clearErrors, clearMessages, loginEmployee, loginOwner } from '../../redux/actions/userAction';
import MetaData from '../../components/ui/MetaData/MetaData';
// import MetaData from "../../components/MetaData/MetaData"
// import InitialLoader from '../../components/Loader/InitialLoader/InitialLoader';

const Login = () => {
  const [auth, setAuth] = useState("")
  const [waiterCred, setWaiterCred] = useState("")
  const [ownerCred, setOwnerCred] = useState("");
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { user,userError,isAuthenticated,userLoading,userMessage } = useSelector((state)=>state.user)
  const { shop } = useSelector(state=>state.shop)

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();
    if(auth === "OWNER"){
      dispatch(loginOwner(ownerCred.trim(),ownerCred.trim(),password.trim().trim()));
    }
    else if(auth === "WAITER"){
      dispatch(loginEmployee(waiterCred.trim(),waiterCred.trim(),waiterCred.trim(),password.trim()))
    }

  }

  useEffect(()=>{
    if(isAuthenticated){
      if(user.role === "OWNER"){
        navigate("/shops");
      }
      else if(user.role === "WAITER"){
        navigate(`/employee/tables/${shop._id}`)
      }
    }
}
,[isAuthenticated,navigate,user,shop])

useEffect(()=>{
    if(userError){
        toast.error(userError);
        dispatch(clearErrors());
    }
    if(userMessage){
      toast.success(userMessage);
      dispatch(clearMessages());
    }
}
,[dispatch,userError,userMessage])

  return (
    <>
    <MetaData title={`LOGIN`} />
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
              <p>Please sign-in to your dashboard</p>
            </div>
            <form className='login-form' onSubmit={submitHandler}>
              <div className='login-through'>
                <p>Login as</p>
                <select value={auth} onChange={(e)=>(setAuth(e.target.value))}>
                        <option value="" >Select</option>
                        <option value="OWNER" >OWNER</option>
                        <option value="WAITER" >WAITER</option>
                </select>
              </div>
              { auth === "OWNER" && <div className='login-email'>
                    <input type="text" onChange={(e)=>(setOwnerCred(e.target.value)) } value={ownerCred} placeholder='Email or Phone No' />
              </div>}
             { auth === "WAITER" && <div className='login-registrationNo'>
                    <input type="text" onChange={(e)=>(setWaiterCred(e.target.value)) } value={waiterCred} placeholder='Email, Phone No, saleId'/>
              </div>}
              { auth !== "" && <div className='login-password'>
                    <input type={showPassword ? "text" : "password"} onChange={(e)=>(setPassword(e.target.value)) } value={password} placeholder='Password' required={true} />
                    {!showPassword ? <VisibilityOffIcon onClick={()=>{setShowPassword(!showPassword)}} /> : <VisibilityIcon onClick={()=>{setShowPassword(!showPassword)}}/>}
                <Link to='/user/forgot-password' >Forgot Password?</Link>
              </div>}
             {auth !== "" &&  <button type='submit' className='login-button'>{userLoading ? <span className="loader"></span> :"Login"}</button>}
             <Link to='/signup'>Click here to register yourself!!</Link>
            </form>
          </div>
        </div>
    </div>  
    {/* } */}
    </>
  )
}

export default Login