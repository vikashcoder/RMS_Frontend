import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { INVENTORY_QUANTITY_TYPES } from '../../../constanst';
import { addInventory } from '../../../redux/actions/inventoryAction';

const AddInventoryModal = ({ buttonIcon, buttonText }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityType, setQuantityType] = useState(""); 

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false)};

  const dispatch = useDispatch();
  const { inventoryLoading } = useSelector((state) => state.inventory);


  const { shop } = useSelector(state=>state.shop)

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !quantity || !quantityType) {
      return toast.error("Please fill all the fields");
    }

    const formData = new FormData();

    formData.append("name",name.trim())
    formData.append("quantity",quantity.trim())
    formData.append("quantityType",quantityType)

    dispatch(addInventory(formData, shop._id));

    setName("");
    setQuantity("");
    setQuantityType(""); 
  };

  return (
    <>
      <button className='page-heading-add-button' onClick={handleOpen}>
        <p><pre>{buttonText}</pre></p>
        {buttonIcon}
      </button>
      <Modal open={open} onClose={handleClose}>
        <div className='modal'>
          <div className='modal-heading'>
            <p>Add Inventory</p>
            <p>Fill in the details below to add a new inventory item</p>
          </div>
          <div className='modal-content'>
            <form onSubmit={submitHandler}>
              <div>
                <p>Name</p>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} required={true} />
              </div>
              <div>
                <p>Quantity</p>
                <input type="number" onChange={(e) => setQuantity(e.target.value)} value={quantity} required={true} />
              </div>
              <div>
                <p>Quantity Unit</p>
                <select onChange={(e) => setQuantityType(e.target.value)} value={quantityType} required={true}>
                  <option value="">Select Quantity Unit</option>
                  {INVENTORY_QUANTITY_TYPES.map((type,i) => (
                    <option key={i} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <button type='submit' className='success-button'>{inventoryLoading ? <div className='loader'></div> :"ADD"}</button>
            </form>
            <button onClick={handleClose} className='close-button'>Close</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddInventoryModal;
