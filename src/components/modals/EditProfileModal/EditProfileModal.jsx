import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../redux/actions/userAction';
import { Modal } from '@mui/material';

const EditProfileModal = ({children, user}) => {
    const [name, setName] = useState(user && user?.name);
    const [phoneNo, setPhoneNo] = useState(user && user?.phoneNo);
    const [email, setEmail] = useState(user && user?.email);
    const [line1, setLine1] = useState(user && user?.address?.line1);
    const [line2, setLine2] = useState(user && user?.address?.line2);
    const [pincode, setPincode] = useState(user && user?.address?.pincode);
    const [state, setState] = useState(user && user?.address?.state);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { userLoading } = useSelector(state=>state.user);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name",name);
        formData.append("email",email);
        formData.append("phoneNo",phoneNo);
        formData.append("line1",line1);
        formData.append("line2",line2);
        formData.append("pincode",pincode);
        formData.append("state",state);

        dispatch(updateProfile(formData));

    }

  return (
    <>
    {children && <li onClick={handleOpen}>{children}</li>}
    <Modal
    open={open}
    onClose={handleClose}
    >
        <div className='modal'>
        <div className='modal-heading'>
            <p>Profile</p>
            <p>To view/edit profile</p>
        </div>
        <div className='modal-content'>
            <form onSubmit={submitHandler}>
                <div>
                    <p>Name</p>
                    <input type="text" onChange={(e)=>(setName(e.target.value))} value={name} required={true} />
                </div>
                <div>
                    <p>Email</p>
                    <input type="email" onChange={(e)=>(setEmail(e.target.value))} value={email} required={true} />
                </div>
                <div>
                    <p>Phone No</p>
                    <input type="number" onChange={(e)=>(setPhoneNo(e.target.value)) } value={phoneNo} required={true} />
                </div>
                <div>
                    <p>Address Line 1</p>
                    <input type="text" onChange={(e)=>(setLine1(e.target.value)) } value={line1} required={true} />
                </div>
                <div>
                    <p>Address Line 2</p>
                    <input type="text" onChange={(e)=>(setLine2(e.target.value)) } value={line2} required={true} />
                </div>
                <div>
                    <p>Pincode</p>
                    <input type="text" onChange={(e)=>(setPincode(e.target.value)) } value={pincode} required={true} />
                </div>
                <div>
                    <p>State</p>
                    <input type="text" onChange={(e)=>(setState(e.target.value)) } value={state} required={true} />
                </div>
                <button type='submit' className='success-button'>{userLoading ? <div className='loader'></div> :"Update"}</button>
            </form>

            <button onClick={handleClose} className='close-button'>Close</button>
        </div>
    </div>
    </Modal>
   </>
  )
}

export default EditProfileModal