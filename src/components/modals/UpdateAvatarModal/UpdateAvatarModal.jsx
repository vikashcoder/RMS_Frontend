import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, clearMessages, updateAvatar } from '../../../redux/actions/userAction';

const UpdateAvatarModal = ({children}) => {
    const [avatar, setAvatar] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { userError,userLoading, userMessage } = useSelector((state)=>state.user)

    const dispatch = useDispatch();

    function submitHandler(e){
        e.preventDefault();
        if(avatar===""){
            return toast.error("Please select a file")
        }
        const formData = new FormData();

        formData.append("avatar",avatar);

        dispatch(updateAvatar(formData));

        setAvatar("");
    }

    useEffect(()=>{
        if(userError){
            toast.error(userError);
            dispatch(clearErrors());
        }
        if(userMessage){
            dispatch(clearMessages());
        }
    },[dispatch,userError,userMessage]);

  return (
    <>
    <li onClick={handleOpen}>{children}</li>

    <Modal
    open={open}
    onClose={handleClose}>
        <div className='modal'>
            <div className='modal-heading'>
                <p>Update Avatar</p>
                <p>To Update your Profile Avatar</p>
            </div>
            <div className='modal-content'>
                <form onSubmit={submitHandler}>
                    <div>
                        <p>Select a file</p>
                        <input type="file"
                            accept="image/*"
                            onChange={(e) => setAvatar(e.target.files[0])}
                            />
                    </div>
                    <button type='submit' className='success-button'>{userLoading?<span className='loader'></span>:"Update"}</button>
                </form>

                <button onClick={handleClose} className='close-button'>Close</button>
            </div>
        </div>
    </Modal>
    </>
  )
}

export default UpdateAvatarModal