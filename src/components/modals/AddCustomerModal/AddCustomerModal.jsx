import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer } from '../../../redux/actions/customerAction';
import { Modal } from '@mui/material';

const AddCustomerModal = ({buttonIcon,buttonText}) => {

const [name, setName] = useState("");
const [phoneNo, setPhoneNo] = useState("");
const { shop } = useSelector(state=>state.shop)
const { customerLoading } = useSelector(state=>state.customer)

const dispatch = useDispatch();

const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const submitHandler = (e) => {
  e.preventDefault();

  if(name === "" || phoneNo === ""){
      return toast.error("Fill all the fields");
  }

  const formData = new FormData();

  formData.append("name",name.trim())
  formData.append("phoneNo",phoneNo.trim())

  dispatch(addCustomer(formData,shop._id));

  setName("");
  setPhoneNo("");
}

  return (
    <>
        <button onClick={handleOpen} className='page-heading-add-button'>
            <p><pre>{buttonText}</pre></p>
            {buttonIcon}
        </button>
        <Modal
    open={open}
    onClose={handleClose}
    >
        <div className='modal'>
        <div className='modal-heading'>
            <p>Add Customer</p>
            <p>To Add customer with name, phone No</p>
        </div>
        <div className='modal-content'>
            <form onSubmit={submitHandler}>
                <div>
                    <p>Name</p>
                    <input type="text" onChange={(e)=>(setName(e.target.value))} value={name} required={true} />
                </div>
                <div>
                    <p>Phone No</p>
                    <input type="number" onChange={(e)=>(setPhoneNo(e.target.value)) } value={phoneNo} required={true} />
                </div>
                <button type='submit' className='success-button'>{customerLoading ? <div className="loader"></div>:"ADD"}</button>
            </form>

            <button onClick={handleClose} className='close-button'>Close</button>
        </div>
    </div>
    </Modal>
    </>
  )
}

export default AddCustomerModal