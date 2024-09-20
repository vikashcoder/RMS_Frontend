import React, { useEffect, useState } from 'react'
import AddCustomerModal from '../../../components/modals/AddCustomerModal/AddCustomerModal'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PageHeading from '../../../components/ui/pageHeading/pageHeading';
import ConfirmationModal from '../../../components/modals/ConfirmationModal/ConfirmationModal';
import EditCustomerDetailsModal from '../../../components/modals/EditCustomerDetailsModal/EditCustomerDetailsModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Pagination, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
// import DownloadIcon from '@mui/icons-material/Download';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, clearMessages, deleteCustomer, getCustomers } from '../../../redux/actions/customerAction';
import toast from 'react-hot-toast';
import TableLoader from '../../../components/ui/Loader/TableLoader/TableLoader';
import MetaData from '../../../components/ui/MetaData/MetaData';

const Customer = () => {

    const [searchValue, setSearchValue] = useState("");
    const { customers, customerFilteredCount, resultPerPage ,customerLoading, customerError, customerMessage } =useSelector((state) => state.customer)
    const [page,setPage] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const { shopId,shopName, q } = useParams();

    const approveHandler = (id) => {
        dispatch(deleteCustomer(id,shop._id));
    }

    const { shop } = useSelector(state=>state.shop);
    const { user } = useSelector(state=>state.user);

    const customerSearch = (value) => {
        setSearchValue(value);
        if(value === ""){
          return
        }
        if(value.length > 0){
            navigate(`/customers/customer/${shop.name}/${shop._id}/${value.trim()}`)
          }
          else{
            navigate(`/customers/customer/${shop.name}/${shop._id}`)
        }
    }

    const resetHandler = () => {
      navigate(`/customers/customer/${shop.name}/${shop._id}`)
      setSearchValue("");
      setPage(1);
      dispatch(getCustomers(q,shop._id,1))
      }

    const onPageChange = (event, value) => {
        setPage(value);
      };

      useEffect(()=>{
        dispatch(getCustomers(q,shopId,page));
      },[dispatch,q,page,shopId,customerError,customerMessage]);

      useEffect(()=>{
        if((shopId.toString() !== shop?._id.toString()) || (shopName.toString() !==shop?.name.toString()) || shop?.ownerId.toString() !== user._id.toString()){
            navigate("/404")
        }
      },[navigate,shopId,shopName,shop,user])

      useEffect(()=>{
        if(customerError){
          toast.error(customerError);
          dispatch(clearErrors());
        }
        if(customerMessage){
            toast.success(customerMessage);
            dispatch(clearMessages());
        }
        
    },[dispatch,customerError,customerMessage])

  return (
    <main>
          <MetaData title={`CUSTOMERS`} />
        <PageHeading 
        heading={"Customers"} 
        subHeading={"To View and add customers"} 
        placeholder={"by name or phoneNo or email"}
        searchHandler={customerSearch}
        button={<AddCustomerModal buttonIcon={<AddCircleOutlineIcon/>} buttonText={"Add Customer"} />}
        tooltip={"Add Customer"}
         /> 
         <div className='right-page-middle' style={{gap:"10px"}}>
            <div className='right-page-content'>
            <div style={{marginTop:"10px"}} className='right-page-content-viewBy' >
                    {/* <Tooltip title="Downnload"><DownloadIcon /></Tooltip> */}
                    <Tooltip title="Refresh"><RefreshIcon onClick={resetHandler} /></Tooltip>
                </div>
            </div>
            {<div className='showing-result'>
                        <p>Showing Result for : {searchValue && searchValue}</p>
                </div>}
            {customerLoading ?
            <TableLoader column={6}/>
            :
            <>
            <div className='right-page-content-row'>
                    {customers?.length > 0 ?
                        <>
                            <table className='table'>
                                <thead>
                                  <tr>
                                    <th><pre>Customer Name</pre></th>
                                    <th><pre>Phone No</pre></th>
                                    <th><pre>Spending</pre></th>
                                    <th><pre>Last Visited</pre></th>
                                    <th><pre>Action</pre></th>
                                  </tr>
                                </thead>
                                <tbody>
                                    {
                                    customers.map((c,index)=>(
                                      <tr key={index}>
                                        <td>{c?.name}</td>
                                        <td>{c?.phoneNo}</td>
                                        <td><pre>Rs. {c.totalSpending}</pre></td>
                                        <td><pre>{c.lastVisited && new Date(c.lastVisited).toDateString()}</pre></td>
                                        <td>
                                            <EditCustomerDetailsModal customer={c}><EditIcon /></EditCustomerDetailsModal>
                                            <ConfirmationModal heading={"Confirmation"} subHeading={"Are you sure to delete this customer"} data={c} confirmationHandler={approveHandler}><DeleteIcon /></ConfirmationModal>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                                </table>
                        </>
                        :
                        <h1>No Customers</h1>
                    }
                </div>
        

        {customerFilteredCount > resultPerPage && 
          (<div className='right-page-middle-footer'>
          <Pagination 
          count={Math.ceil(customerFilteredCount / resultPerPage)}
          page={page}
          onChange={onPageChange}
          variant="outlined" shape="rounded"
          />
          </div>)
        }
            </>
        }

         </div>
    </main>
  )
}

export default Customer