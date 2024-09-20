import React, { useState } from 'react'
import { Modal, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { editCategory } from '../../../redux/actions/categoryAction';

const EditCategoryDetailsModal = ({category,children}) => {
  
  const [name, setName] = useState(category && category.name);
  // eslint-disable-next-line
  const [priority, setPriority] = useState(category && category.priority || 0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const { categoryLoading } = useSelector((state)=>state.category);

 const { shop } = useSelector(state=>state.shop)

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name",name.toUpperCase().trim())
    formData.append("priority",priority)

    dispatch(editCategory(formData,category._id,shop._id));

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
            <p>Edit Category</p>
            <p>To Edit Category with name, priority of viewing</p>
        </div>
        <div className='modal-content'>
            <form onSubmit={submitHandler}>
                <div>
                    <p>Name</p>
                    <input type="text" onChange={(e)=>(setName(e.target.value))} value={name}/>
                </div>
                <div>
                    <p>Priority</p>
                    <input type="number" onChange={(e)=>(setPriority(e.target.value)) } value={priority} />
                </div>
                <button type='submit' className='success-button'>{categoryLoading?<span className='loader'></span>:"Update"}</button>
            </form>

            <button onClick={handleClose} className='close-button'>Close</button>
        </div>
    </div>
    </Modal>
  </>
  )
}

export default EditCategoryDetailsModal