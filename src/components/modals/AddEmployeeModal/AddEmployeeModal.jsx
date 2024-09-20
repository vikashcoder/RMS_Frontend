import React, { useState } from 'react'
import { addEmployee } from '../../../redux/actions/employeeAction';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@mui/material';

const AddEmployeeModal = ({buttonIcon,buttonText}) => {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [salary, setSalary] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false)};

  const dispatch = useDispatch();
  const { shop } = useSelector(state=>state.shop)
  const { employeeLoading } = useSelector((state) => state.employee);

  const submitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData();

    formData.append("name",name);
    formData.append("email",email.trim());
    formData.append("phoneNo",phoneNo.trim());
    formData.append("line1",line1);
    formData.append("line2",line2);
    formData.append("pincode",pincode);
    formData.append("salary",salary)
    formData.append("state",state);

    dispatch(addEmployee(formData,shop._id));

    setName("");
    setEmail("");
    setPhoneNo("");
    setLine1("");
    setLine2("");
    setPincode("");
    setSalary("");
    setState("");

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
            <p>Add Employee</p>
            <p>To Add Employee with name, phoneNo, Email, address</p>
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
                    <p>Salary</p>
                    <input type="number" onChange={(e)=>(setSalary(e.target.value)) } value={salary} />
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
                    <input type="number" onChange={(e)=>(setPincode(e.target.value)) } value={pincode} required={true} />
                </div>
                <div>
                    <p>State</p>
                    <input type="text" onChange={(e)=>(setState(e.target.value)) } value={state} required={true} />
                </div>
                <button type='submit' className='success-button'>{employeeLoading ? <div className="loader"></div>:"ADD"}</button>
            </form>

            <button onClick={handleClose} className='close-button'>Close</button>
        </div>
    </div>
    </Modal>
    </>
  )
}

export default AddEmployeeModal