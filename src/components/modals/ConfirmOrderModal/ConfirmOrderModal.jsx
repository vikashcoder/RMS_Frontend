import React, { useState } from 'react'
import { Modal, Tooltip } from '@mui/material'
import { useSelector } from 'react-redux';

const ConfirmOrderModal = ({heading, subHeading, confirmationHandler,data, children}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { orderLoading } = useSelector((state)=>state.order);

  function submitHandler(e){
      e.preventDefault();
      confirmationHandler(data._id);
  }
  return (<>
    <Tooltip title="Delete">
    {children && <button onClick={handleOpen} className='delete-btn'>{children}</button>}
    </Tooltip>
    <Modal
    open={open}
    onClose={handleClose}
    >
         <div className='modal'>
        <div className='modal-heading'>
            <p>{heading}</p>
            <p>{subHeading}</p>
        </div>
        <div className='modal-content'>
            <div className='modal-button-group'>
            <button onClick={submitHandler} className='success-button' >{orderLoading?<span className='loader'></span>:"Confirm"}</button>
            <button onClick={handleClose} className='close-button'>Close</button>
            </div>

        </div>
    </div>
    </Modal>
  </>
  )
}

export default ConfirmOrderModal