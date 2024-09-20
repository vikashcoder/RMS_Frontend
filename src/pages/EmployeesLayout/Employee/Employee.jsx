import React, { useEffect, useState } from 'react'
import AddEmployeeModal from '../../../components/modals/AddEmployeeModal/AddEmployeeModal'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PageHeading from '../../../components/ui/pageHeading/pageHeading';
import ConfirmationModal from '../../../components/modals/ConfirmationModal/ConfirmationModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
// import DownloadIcon from '@mui/icons-material/Download';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, clearMessages, deleteEmployee, getEmployees } from '../../../redux/actions/employeeAction';
import toast from 'react-hot-toast';
import EditEmployeeDetailsModal from '../../../components/modals/EditEmployeeDetailsModal/EditEmployeeDetailsModal';
import TableLoader from '../../../components/ui/Loader/TableLoader/TableLoader';
import MetaData from '../../../components/ui/MetaData/MetaData';

const Employee = () => {

    const [searchValue, setSearchValue] = useState("");

    const { shop } = useSelector(state=>state.shop);
    const { user } = useSelector(state=>state.user);

    const { shopId,shopName, q } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const approveHandler = (id) => {
        dispatch(deleteEmployee(id,shop._id));
    }

    const employeeSearch = (value) => {
        setSearchValue(value);
        if(value === ""){
          return
        }
        if(value.length > 0){
            navigate(`/employees/employee/${shop.name}/${shop._id}/${value.trim()}`)
          }
          else{
            navigate(`/employees/employee/${shop.name}/${shop._id}`)
        }
    }

    const { employees, employeeLoading, employeeMessage, employeeError } = useSelector(state=>state.employee)

    const resetHandler = () => {
        navigate(`/employees/employee/${shop.name}/${shop._id}`)
        setSearchValue("");
        dispatch(getEmployees("",shopId));
      };

      useEffect(() => {
        dispatch(getEmployees(q,shopId));
      }, [dispatch, q, shopId ,employeeMessage,employeeError]);
    
      useEffect(()=>{
        if((shopId.toString() !== shop?._id.toString()) || (shopName.toString() !==shop?.name.toString()) || shop?.ownerId.toString() !== user._id.toString()){
            navigate("/404")
        }
      },[navigate,shopId,shopName,shop,user])
    
    useEffect(()=>{
        if(employeeError){
          toast.error(employeeError);
          dispatch(clearErrors());
        }
        if(employeeMessage){
            toast.success(employeeMessage);
            dispatch(clearMessages());
        }
        
    },[dispatch,employeeError,employeeMessage])

  return (
    <main>
        <MetaData title={'EMPLOYEES'} />
        <PageHeading 
        heading={"Employees"} 
        subHeading={"To View and add employees"} 
        placeholder={"by name or phoneNo or email"}
        searchHandler={employeeSearch}
        button={<AddEmployeeModal buttonIcon={<AddCircleOutlineIcon/>} buttonText={"Add Employee"} />}
        tooltip={"Add Employee"}
         /> 
         <div className='right-page-middle' style={{gap:"10px"}}>
            <div>
                <div className='right-page-middle-category' >
                </div>
            </div>

            <div className='right-page-content'>
            <div className='right-page-content-viewBy'>
                    {/* <Tooltip title="Downnload"><DownloadIcon /></Tooltip> */}
                    <Tooltip title="Refresh"><RefreshIcon onClick={resetHandler}/></Tooltip>
                </div>
            </div>
            {searchValue && <div className='showing-result'>
                        <p>Showing Result for : {searchValue}</p>
                </div>}
            {employeeLoading ? 
            <TableLoader column={6} />
            :
            <div className='right-page-content-row'>
                    {employees?.length > 0 ?
                        <>
                            <table className='table'>
                                <thead>
                                  <tr>
                                    <th><pre>Sale Id</pre></th>
                                    <th><pre>Employee Name</pre></th>
                                    {<th>Email</th>}
                                    <th><pre>Phone No</pre></th>
                                    <th><pre>Status</pre></th>
                                    <th><pre>Joining Date</pre></th>
                                    <th><pre>Salary</pre></th>
                                    <th><pre>Salary Date</pre></th>
                                    <th><pre>Action</pre></th>
                                  </tr>
                                </thead>
                                <tbody>
                                    {
                                    employees?.map((c,index)=>(
                                      <tr key={index}>
                                        <td>{c.saleId}</td>
                                        <td>{c.name}</td>
                                        {<td><pre>{c.email}</pre></td>}
                                        <td>{c.phoneNo}</td>
                                        <td>{c.status}</td>
                                        <td>{new Date(c.dateOfJoining).toLocaleDateString()}</td>
                                        <td><pre>Rs. {c.salary ? c.salary : "0"}</pre></td>
                                        <td>{c.salaryReceived && new Date(c.salaryReceived).toLocaleDateString()}</td>
                                        <td>
                                            <EditEmployeeDetailsModal employee={c}><EditIcon /></EditEmployeeDetailsModal>
                                            <ConfirmationModal heading={"Confirmation"} subHeading={"Are you sure to delete this employee"} data={c} confirmationHandler={approveHandler}><DeleteIcon /></ConfirmationModal>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                                </table>
                        </>
                        :
                        <h1>No Employees</h1>
                    }
                </div>}
         </div>
    </main>
  )
}

export default Employee