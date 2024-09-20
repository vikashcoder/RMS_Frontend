import { Modal } from '@mui/material';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addArea } from '../../../redux/actions/areaAction';

const AddAreaModal = ({buttonIcon,buttonText}) => {

  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const { areaLoading } = useSelector((state)=>state.area);

  const { shop } = useSelector(state=>state.shop)

  const submitHandler = (e) => {
    e.preventDefault();

    if(name === ""){
        return toast.error("Fill all the fields");
    }

    const formData = new FormData();

    formData.append("name",name.trim())
    formData.append("priority",priority)

    dispatch(addArea(formData,shop._id));

    setName("");
    setPriority("");
  }

  return (
    <>
        <button className='page-heading-add-button' onClick={handleOpen}>
            <p><pre>{buttonText}</pre></p>
            {buttonIcon}
        </button>
        <Modal
    open={open}
    onClose={handleClose}
    >
        <div className='modal'>
        <div className='modal-heading'>
            <p>Add Area</p>
            <p>To Add Area with name, priority of viewing</p>
        </div>
        <div className='modal-content'>
            <form onSubmit={submitHandler}>
                <div>
                    <p>Name</p>
                    <input autoFocus={true} type="text" onChange={(e)=>(setName(e.target.value))} value={name} required={true} />
                </div>
                <div>
                    <p>Priority</p>
                    <input type="number" onChange={(e)=>(setPriority(e.target.value)) } value={priority}/>
                </div>
                <button type='submit' className='success-button'>{areaLoading ? <div className="loader"></div>:"ADD"}</button>
            </form>

            <button onClick={handleClose} className='close-button'>Close</button>
        </div>
    </div>
    </Modal>
    </>
  )
}

export default AddAreaModal