import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Tooltip } from '@mui/material';
import { editCustomer } from '../../../redux/actions/customerAction';
import toast from 'react-hot-toast';

const EditCustomerDetailsModal = ({customer,children}) => {
  const [name, setName] = useState(customer && customer.name);
const [phoneNo, setPhoneNo] = useState(customer && customer.phoneNo);

const { shop } = useSelector(state=>state.shop)
const { customerLoading } = useSelector((state)=>state.customer);

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

  dispatch(editCustomer(formData,customer._id,shop._id));
}

  return (<>
    <Tooltip title="Edit">
    {children && <div onClick={handleOpen} className='edit-btn'>{children}</div>}
    </Tooltip>
    <Modal
    open={open}
    onClose={handleClose}
    >
        <div className='modal'>
        <div className='modal-heading'>
            <p>Edit Customer</p>
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
                <button type='submit' className='success-button'>{customerLoading?<span className='loader'></span>:"Update"}</button>
            </form>

            <button onClick={handleClose} className='close-button'>Close</button>
        </div>
    </div>
    </Modal>
  </>
  )
}

export default EditCustomerDetailsModal