import React, { useEffect, useState } from 'react'
import PageHeading from '../../../components/ui/pageHeading/pageHeading';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Pagination, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
// import DownloadIcon from '@mui/icons-material/Download';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';
import { transactionMode } from '../../../constanst';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, clearMessages, getInvoices } from '../../../redux/actions/invoiceAction';
import toast from 'react-hot-toast';
import ViewInvoiceDetailsModal from '../../../components/modals/ViewInvoiceDetailsModal/ViewInvoiceDetailsModal';
import TableLoader from '../../../components/ui/Loader/TableLoader/TableLoader';
import MetaData from '../../../components/ui/MetaData/MetaData';

const Invoice = () => {
    const [paymentMode, setPaymentMode] = useState("");
    // const [activeTab, setActiveTab] = useState("all");
    const [searchValue, setSearchValue] = useState("");
    const [page,setPage] = useState(1);
    const { shop } = useSelector(state=>state.shop);
    const { user } = useSelector(state=>state.user);
    const { invoices, invoiceLoading, invoiceMessage, invoiceError, resultPerPage, invoiceFilteredCount } = useSelector(state=>state.invoice);

    // const [startValue, setStartValue] = useState(dayjs(shop&&shop.createdAt.split("T")[0]));
    // const [endValue, setEndValue] = useState(dayjs(Date.now()));

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const { shopId,shopName, q } = useParams();

    const invoiceSearch = (value) => {
      setSearchValue(value);
      if(value === ""){
        return
      }
      if(value.length > 0){
          navigate(`/invoices/invoice/${shop.name}/${shop._id}/${value.trim()}`)
        }
        else{
          navigate(`/invoices/invoice/${shop.name}/${shop._id}`)
      }
    }

    const resetHandler = () => {
      dispatch(getInvoices("",shop._id,1,""))
      setSearchValue("");
      setPaymentMode("");
      navigate(`/invoices/invoice/${shop.name}/${shop._id}`)
    }

    const onPageChange = (event, value) => {
      setPage(value);
    };

    // const dateRangeSorting = (tab) => {
    //   console.log(tab)
    //   setActiveTab(tab)

    //   const now = new Date();
    //   const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    //   const startOfYesterday = new Date(new Date().setDate(now.getDate() - 1));
    //   const startOfLastWeek = new Date(now.setDate(now.getDate() - 7));
    //   const startOfLastMonth = new Date(now.setMonth(now.getMonth() - 1));

    //   if(tab === "today"){
    //     setSearchValue(startOfDay);
    //     setEndValue(new Date())
    //   }
    // }

    useEffect(()=>{
      dispatch(getInvoices(q,shopId,page,paymentMode));
    },[dispatch,q,page,shopId,invoiceMessage,invoiceError,paymentMode]);

    // const viewingDays = ["ALL","TODAY","YESTERDAY","LAST WEEK","LAST MONTH","CUSTOM"]

    useEffect(()=>{
      if((shopId?.toString() !== shop?._id?.toString()) || (shopName?.toString() !==shop?.name?.toString()) || shop?.ownerId?.toString() !== user._id?.toString()){
          navigate("/404")
      }
    },[navigate,shopId,shopName,shop,user])

    useEffect(()=>{
      if(invoiceError){
        toast.error(invoiceError);
        dispatch(clearErrors());
      }
      if(invoiceMessage){
          toast.success(invoiceMessage);
          dispatch(clearMessages());
      }
      
  },[dispatch,invoiceError,invoiceMessage])

  return (
    <main>
      <MetaData title={'INVOICES'} />
        <PageHeading 
        heading={"Invoices"} 
        subHeading={"To View and add invoices"} 
        placeholder={"by name or invoiceNo or email"}
        searchHandler={invoiceSearch}
        tooltip={"Add Invoice"}
         /> 
         <div className='right-page-middle' style={{gap:"10px"}}>
            <div>
                {/* <div className='right-page-middle-category' >
                    <div className='right-page-middle-category-items'>
                    {viewingDays.map((m,i)=>(
                    <li key={i} onClick={(e)=>{dateRangeSorting(m.toLowerCase())}} className={activeTab === m.toLowerCase() ? "category-active-tab" : ""} ><pre>{m}</pre></li>
                ))}
                   {activeTab === "custom" && <span>    
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                label="From"
                                value={startValue && startValue}
                                onChange={(startValue)=>{setStartValue(startValue)}}
                                />
                                <p> - </p>
                                <DatePicker 
                                value={endValue && endValue}
                                label="To"
                                onChange={(endValue)=>{setEndValue(endValue)}}
                                />
                            </LocalizationProvider>
                        </span>}
                    </div>
                </div> */}
            </div>

            <div className='right-page-content'>
            <div className='right-page-content-viewBy'>
            <form>
      <Tooltip title="Sort by Payment Mode">
      <select
        style={{width:"130px"}}
        value={paymentMode}
        onChange={(e)=>setPaymentMode(e.target.value)}
      >
        <option value="">Payment Mode </option>
        {transactionMode.map((t,i)=>(
        <option key={i} value={t}>{t}</option>
            
        ))}
      </select>
      </Tooltip>
    </form>
                    {/* <Tooltip title="Downnload"><DownloadIcon /></Tooltip> */}
                    <Tooltip title="Refresh"><RefreshIcon onClick={resetHandler} /></Tooltip>
                </div>
            </div>
            {(searchValue || paymentMode) && <div className='showing-result'>
                        <p>Showing Result for : Invoices {paymentMode.length !== 0 &&  ` in ${paymentMode} payment mode ${searchValue}`}</p>
                      </div>}
            {invoiceLoading ?
              <TableLoader column={6} />
              :
              <>
                <div className='right-page-content-row'>
                    {invoices?.length > 0 ?
                        <>
                            <table className='table'>
                                <thead>
                                  <tr>
                                    <th><pre>Invoice No</pre></th>
                                    <th><pre>Customer</pre></th>
                                    {<th>Amount</th>}
                                    <th><pre>Total Items</pre></th>
                                    <th><pre>Invoice Date</pre></th>
                                    <th><pre>Payment Mode</pre></th>
                                    <th><pre>Action</pre></th>
                                  </tr>
                                </thead>
                                <tbody>
                                    {
                                    invoices?.map((c,index)=>(
                                      <tr key={index}>
                                        <td>{c?.invoiceNo}</td>
                                        <td>{c?.customerId?.phoneNo}</td>
                                        {<td><pre>{c.totalPayment}</pre></td>}
                                        <td>{c.totalItems}</td>
                                        <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                                        <td>{c.paymentMode}</td>
                                        <td>
                                            <ViewInvoiceDetailsModal invoice={c}><VisibilityIcon /></ViewInvoiceDetailsModal>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                                </table>
                        </>
                        :
                        <h1>No Invoices</h1>
                    }
                </div>
        {invoiceFilteredCount > resultPerPage && 
          (<div className='right-page-middle-footer'>
          <Pagination 
          count={Math.ceil(invoiceFilteredCount / resultPerPage)}
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

export default Invoice