import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, clearMessages, generateKot } from '../../../redux/actions/orderAction';
import toast from 'react-hot-toast';

const PlaceOrderModal = ({children, cartItems, orderTableNo, paymentCounter, itemCounter, kotType, shopId, orderPlaced, shopName }) => {
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { user } = useSelector(state => state.user);
    const { orderError, orderMessage, orderLoading } = useSelector(state => state.order)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        if(user._id){
            dispatch(generateKot(cartItems,orderTableNo,name,phoneNo,paymentCounter,itemCounter,kotType,shopId,user._id))

        } else {
            dispatch(generateKot(cartItems,orderTableNo,name,phoneNo,paymentCounter,itemCounter,kotType,shopId))
        }
    }
    
    useEffect(()=>{
        if(orderError){
            toast.error(orderError);
            dispatch(clearErrors());
        }
        if(orderMessage){
            toast.success(orderMessage);
            if(user?.role === "WAITER"){
                navigate("/shops")
            }
            else if(user?.role === "OWNER"){
                navigate(`/orders/manage/${shopName}/${shopId}`)
            }
            else{
                navigate(`/orders/qr/${shopId}/${orderTableNo}`)
            }
            dispatch(clearMessages()); 
        }
        
    },[dispatch,orderError,orderMessage,navigate,shopId,user,orderPlaced,orderTableNo,shopName])

  return (
    <>
        {children && <button className='success-button' onClick={handleOpen} >{children}</button>}

        <Modal
    open={open}
    onClose={handleClose}
    >
        <div className='modal'>
        <div className='modal-heading'>
            <p>Customer Details</p>
        </div>
        <div className='modal-content' style={{width: "90%"}}>
        <form onSubmit={submitHandler}>
                <div>
                    <p>Name</p>
                    <input type="text" onChange={(e)=>(setName(e.target.value))} value={name}/>
                </div>
                <div>
                    <p>Phone No</p>
                    <input type="number" onChange={(e)=>(setPhoneNo(e.target.value)) } value={phoneNo}/>
                </div>
                <button type='submit' className='success-button'>{orderLoading?<span className='loader'></span>:"Place Order"}</button>
            </form>
            <button onClick={handleClose} className='close-button'>Order More</button>
        </div>
    </div>
    </Modal>
    </>
  )
}

export default PlaceOrderModal