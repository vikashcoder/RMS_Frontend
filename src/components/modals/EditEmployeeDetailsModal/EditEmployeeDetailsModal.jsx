import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editEmployee } from '../../../redux/actions/employeeAction';
import { Modal, Tooltip } from '@mui/material';

const EditEmployeeDetailsModal = ({employee, children}) => {
    const [name, setName] = useState(employee && employee.name);
    const [phoneNo, setPhoneNo] = useState(employee && employee.phoneNo);
    const [email, setEmail] = useState(employee && employee.email);
    const [line1, setLine1] = useState(employee && employee.address.line1);
    const [line2, setLine2] = useState(employee && employee.address.line2);
    const [pincode, setPincode] = useState(employee && employee.address.pincode);
    const [state, setState] = useState(employee && employee.address.state);
    const [salary, setSalary] = useState(employee && employee.salary);
    const [salaryReceived, setSalaryReceived] = useState((employee && employee.salaryReceived) || "");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false)};

    const { shop } = useSelector(state=>state.shop)
    const { employeeLoading } = useSelector(state=>state.employee)

    const dispatch = useDispatch();

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
        formData.append("salaryReceived",salaryReceived);
    
        dispatch(editEmployee(formData,employee._id,shop._id));
    
      }

  return (
    <>
    <Tooltip title="Edit">
    {children && <div onClick={handleOpen} className='edit-btn'>{children}</div>}
    </Tooltip>
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
                    <p>Salary Received On</p>
                    <input type="date" onChange={(e)=>(setSalaryReceived(e.target.value)) } value={salaryReceived} />
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
                <button type='submit' className='success-button'>{employeeLoading ? <div className='loader'></div> :"Submit"}</button>
            </form>

            <button onClick={handleClose} className='close-button'>Close</button>
        </div>
    </div>
    </Modal>
  </>
  )
}

export default EditEmployeeDetailsModal