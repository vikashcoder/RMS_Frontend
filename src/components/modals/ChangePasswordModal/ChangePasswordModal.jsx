import React, { useEffect, useState } from 'react'
import './ChangePasswordModal.css'
import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { clearErrors, clearMessages, updatePassword } from '../../../redux/actions/userAction';

const ChangePasswordModal = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    const { userLoading, userError, userMessage } = useSelector((state)=>state.user)

    function submitHandler(e){
        e.preventDefault();
        if(oldPassword === "" || newPassword === "" || confirmPassword === ""){
            return toast.error("Please fill all the fields")
        }

        if(newPassword !== confirmPassword){
            return toast.error("Passwords not matching")
        }

        const formData = new FormData();

        formData.append("oldPassword",oldPassword.trim());
        formData.append("newPassword",newPassword.trim());

        dispatch(updatePassword(formData))

        setConfirmPassword("");
        setOldPassword("");
        setNewPassword("");
    }

    useEffect(()=>{
        if(userError){
            toast.error(userError);
            dispatch(clearErrors());
        }
        if(userMessage){
            toast.success(userMessage);
            dispatch(clearMessages());
            handleClose();
        }
    },[dispatch,userError,userMessage]);

  return (
    <>
    <li onClick={handleOpen}>Change Password</li>
    <Modal
    open={open}
    onClose={handleClose}>
        <div className='modal'>
            <div className='modal-heading'>
                <p>Change Password</p>
                <p>Are you sure to change your Passowrd?</p>
            </div>
            <div className='modal-content'>
                <form className='chnage-password-form' onSubmit={submitHandler}>
                    <div>
                        <p>Old Password</p>
                        <input type="password" onChange={(e)=>(setOldPassword(e.target.value))} value={oldPassword} />
                    </div>
                    <div>
                        <p>New Password</p>
                        <input type="password" onChange={(e)=>(setNewPassword(e.target.value)) } value={newPassword} />
                    </div>
                    <div>
                        <p>Confirm new Password</p>
                        <input type="password" onChange={(e)=>(setConfirmPassword(e.target.value)) } value={confirmPassword} />
                    </div>
                    <button type='submit' className='success-button'>{userLoading?<span className='loader'></span>:"CONFIRM"}</button>
                </form>

                <button onClick={handleClose} className='close-button'>Close</button>
            </div>
        </div>
    </Modal>
    </>
  )
}

export default ChangePasswordModal