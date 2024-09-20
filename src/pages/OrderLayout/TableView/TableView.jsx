import React, { useEffect } from 'react'
import PageHeading from '../../../components/ui/pageHeading/pageHeading'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTables } from '../../../redux/actions/tableAction';
import { Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import PrintTableBillModal from '../../../components/modals/PrintTableBillModal/PrintTableBillModal';
import { clearMessages } from '../../../redux/actions/invoiceAction';
import toast from 'react-hot-toast';
import TableLoader from '../../../components/ui/Loader/TableLoader/TableLoader';
import MetaData from '../../../components/ui/MetaData/MetaData';

const TableView = () => {
  const { tables , tableLoading, tableError, tableMessage } =useSelector((state) => state.table)
  const { invoiceMessage } =useSelector((state) => state.invoice)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shopName ,shopId, q } = useParams();

  const { shop } = useSelector(state=>state.shop)
  const { user } = useSelector(state=>state.user)

  const resetHandler = () => {
      dispatch(getTables(q,shop._id))
  }

  useEffect(()=>{
      dispatch(getTables(q,shop._id))
    },[dispatch,shop._id,q,tableMessage,tableError,invoiceMessage])

  useEffect(()=>{
      if((shopId.toString() !== shop?._id.toString()) || (shopName.toString() !==shop?.name.toString()) || shop?.ownerId.toString() !== user._id.toString()){
          navigate("/404")
      }
    },[navigate,shopId,shopName,shop,user])

    useEffect(()=>{
        if(invoiceMessage){
          toast.success(invoiceMessage)
          dispatch(clearMessages());
        }
        
      },[dispatch,invoiceMessage])
  return (
    <main>
        <MetaData title={'TABLE VIEW'} />
        <PageHeading 
        heading={"Tables"} 
        subHeading={"To View and orders in tables"}
        tooltip={"Add Table"}
         />

         <div className='right-page-middle'>

            <div className='right-page-content'>
                <div className='right-page-content-viewBy'>
                    <Tooltip title="Refresh"><RefreshIcon onClick={resetHandler} /></Tooltip>
                </div>
               {tableLoading ? 
                <TableLoader column={6} />
                :
                <>
                <div className='right-page-content-grid' style={tables?.length === 0 ? {justifyContent:"center", alignItems:"center"}:{}}>
                    {tables?.length > 0 ?
                        <>
                            {tables?.map((t,i)=>(
                                <PrintTableBillModal table={t} className={t.isEmpty ? 'table-grid' : 'table-grid table-nonEmpty'} key={i} style={t.shape === "CIRCLE" ? {borderRadius:"100%"}:{}}>
                                    <h3>{t.name}</h3>
                                    <p>{t.areaId.name}</p>
                                    <p>{t.noOfSeats} seats</p>
                                </PrintTableBillModal>
                            ))}
                        </>
                        :
                        <h1>No Tables</h1>
                    }
                </div>
                </>}
            </div>
         </div>
    </main>
  )
}

export default TableView