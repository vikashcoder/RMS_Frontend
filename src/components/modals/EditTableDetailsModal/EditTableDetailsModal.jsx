import React, { useState } from 'react'
import './EditTableDetailsModal.css'
import { Modal, Tooltip } from '@mui/material'
import { tableShape } from '../../../constanst';
import { editTable, editTableArea } from '../../../redux/actions/tableAction';
import { useDispatch, useSelector } from 'react-redux';

const EditTableDetailsModal = ({table,children}) => {
  const [name, setName] = useState(table && table.name);
  const [areaId, setAreaId] = useState(table && table.areaId._id);
  const [noOfSeats, setNoOfSeats] = useState(table && table.noOfSeats);
  const [shape, setShape] = useState(table && table.shape);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const { areas } = useSelector((state)=>state.area);
  const { tableLoading } = useSelector((state)=>state.table);

  const { shop } = useSelector(state=>state.shop)

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name",name.trim())
    formData.append("areaId",areaId)
    formData.append("noOfSeats",noOfSeats)
    formData.append("shape",shape.trim())

    dispatch(editTable(formData,table._id,shop._id));
    dispatch(editTableArea(areaId,table._id,shop._id));
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
            <p>Edit Table</p>
            <p>To Edit Book with name, seats, shape</p>
        </div>
        <div className='modal-content'>
            <form onSubmit={submitHandler}>
                <div>
                    <p>Table No</p>
                    <input type="text" onChange={(e)=>(setName(e.target.value))} value={name} />
                </div>
                <div>
                    <p>No of Seats</p>
                    <input type="number" onChange={(e)=>(setNoOfSeats(e.target.value)) } value={noOfSeats} />
                </div>
                <div>
                    <p>Select Area</p>
                     <select value={areaId} onChange={(e)=>(setAreaId(e.target.value))}>
                        <option value="" >Select Area</option>
                        {areas && areas.map((b,index)=>(
                        <option key={index} value={b._id} >{b.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <p>Select Shape</p>
                     <select value={shape} onChange={(e)=>(setShape(e.target.value))}>
                        <option value="" >Select Shape</option>
                        {tableShape && tableShape.map((b,index)=>(
                        <option key={index} value={b} >{b}</option>
                        ))}
                    </select>
                </div>
                <button type='submit' className='success-button'>{tableLoading?<span className='loader'></span>:"Update"}</button>
            </form>

            <button onClick={handleClose} className='close-button'>Close</button>
        </div>
    </div>
    </Modal>
  </>
  )
}

export default EditTableDetailsModal