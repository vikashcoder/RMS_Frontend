import React, { useEffect, useState } from 'react'
import './Table.css'
import PageHeading from '../../../components/ui/pageHeading/pageHeading'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTableModal from '../../../components/modals/AddTableModal/AddTableModal';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import EditTableDetailsModal from '../../../components/modals/EditTableDetailsModal/EditTableDetailsModal';
import ConfirmationModal from '../../../components/modals/ConfirmationModal/ConfirmationModal';
import PrintTableModal from '../../../components/modals/PrintTableModal/PrintTableModal';
import RefreshIcon from '@mui/icons-material/Refresh';
// import DownloadIcon from '@mui/icons-material/Download';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, clearMessages, deleteTable, getTables } from '../../../redux/actions/tableAction';
import toast from 'react-hot-toast';
import { getAreas } from '../../../redux/actions/areaAction';
import TableLoader from '../../../components/ui/Loader/TableLoader/TableLoader';
import MetaData from '../../../components/ui/MetaData/MetaData';

const Table = () => {

    const [activeTab, setActiveTab] = useState("ALL");
    const [gridView, setGridView] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    
    const { areas } = useSelector((state)=>state.area);
    const { tables , tableLoading, tableError, tableMessage } =useSelector((state) => state.table)
    const [showTables, setShowTables] = useState(tables && tables);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shopName ,shopId, q } = useParams();

    const { shop } = useSelector(state=>state.shop)
    const { user } = useSelector(state=>state.user)

    const approveHandler = (id) => {
        dispatch(deleteTable(id,shop._id));
    }

    const tableSearch = (value) => {
        setSearchValue(value);
    if(value === ""){
      return
    }
    if(value.length > 0){
        setActiveTab("ALL")
        navigate(`/tables/table/${shop.name}/${shop._id}/${value.trim()}`)
      }
      else{
        navigate(`/tables/table/${shop.name}/${shop._id}`)
    }
    }

    const areaSorting = (tab) => {
        setActiveTab(tab);
        if(tab === "ALL"){
            setShowTables(tables);
        }
        else{
            setShowTables(tables?.filter((t)=>{
                return tab === t?.areaId?.name.toLowerCase()
            }))
        }
    }

    const resetHandler = () => {
        dispatch(getTables(q,shop._id))
        setSearchValue("");
        setActiveTab("ALL")
        navigate(`/tables/table/${shop.name}/${shop._id}`)
    }

    useEffect(()=>{
        dispatch(getTables(q,shop._id))
        dispatch(getAreas(shop._id))
        setActiveTab("ALL")
      },[dispatch,shop._id,q,tableMessage,tableError])

    useEffect(()=>{
        setShowTables(tables)
    },[tables])

    useEffect(()=>{
        if(tableError){
          toast.error(tableError);
          dispatch(clearErrors());
        }
        if(tableMessage){
            toast.success(tableMessage);
            dispatch(clearMessages());
        }
        
    },[dispatch,tableError,tableMessage])

    useEffect(()=>{
        if((shopId.toString() !== shop?._id.toString()) || (shopName.toString() !==shop?.name.toString()) || shop?.ownerId.toString() !== user._id.toString()){
            navigate("/404")
        }
      },[navigate,shopId,shopName,shop,user])


  return (
    <main>
        <MetaData title={'TABLE'} />
        <PageHeading 
        heading={"Tables"} 
        subHeading={"To View and add tables"} 
        placeholder={"by tables or area"}
        searchHandler={tableSearch}
        button={<AddTableModal buttonIcon={<AddCircleOutlineIcon/>} buttonText={"Add Table"} />}
        tooltip={"Add Table"}
         />

         <div className='right-page-middle'>
            <div>
            <div className='right-page-middle-category'>
                {areas && areas.length > 0 && <div className='right-page-middle-category-items'>
                    <li onClick={(e)=>{areaSorting("ALL")}} className={activeTab === "ALL" ? "category-active-tab" : ""} ><pre>ALL</pre></li>
                    {areas.map((m)=>(
                    <li onClick={(e)=>{areaSorting(m.name.toLowerCase())}} className={activeTab === m.name.toLowerCase() ? "category-active-tab" : ""} ><pre>{m.name}</pre></li>
                ))}
                </div>}
            </div>
            </div>

            <div className='right-page-content'>
                <div className='right-page-content-viewBy'>
                    {/* <Tooltip title="Downnload"><DownloadIcon /></Tooltip> */}
                    <Tooltip title="Refresh"><RefreshIcon onClick={resetHandler} /></Tooltip>
                    <p>View by </p>
                    <div>
                    <Tooltip title="Grid"><GridViewIcon onClick={()=>setGridView(true)} style={gridView ? {color: "var(--violet)"} : {}} /></Tooltip>
                    <Tooltip title="Row"><TableRowsIcon onClick={()=>setGridView(false)} style={gridView ? {} : {color: "var(--violet)"}} /></Tooltip>
                    </div>
                </div>
                {activeTab && <div className='showing-result'>
                        <p>Showing Result for : Tables in {activeTab.toUpperCase()} area {searchValue && searchValue}</p>
                      </div>}
               {tableLoading ? 
                <TableLoader column={6} />
                :
                <>
                {gridView ? 
                <div className='right-page-content-grid' style={tables?.length === 0 ? {justifyContent:"center", alignItems:"center"}:{}}>
                    {showTables?.length > 0 ?
                        <>
                            {showTables.map((t,i)=>(
                                <div className={t.isEmpty ? 'table-grid' : 'table-grid table-nonEmpty'} key={i} style={t.shape === "CIRCLE" ? {borderRadius:"100%"}:{}}>
                                    <h3>{t.name}</h3>
                                    <p>{t.areaId.name}</p>
                                    <p>{t.noOfSeats} seats</p>
                                    <span>
                                            <EditTableDetailsModal table={t}><EditIcon style={{fontSize: "10px"}} /></EditTableDetailsModal>
                                            <ConfirmationModal heading={"Confirmation"} subHeading={"Are you sure to delete this table"} data={t} confirmationHandler={approveHandler}><DeleteIcon style={{fontSize: "10px"}} /></ConfirmationModal>
                                            <PrintTableModal table={t}><PrintIcon  style={{fontSize: "10px"}} /></PrintTableModal>
                                    </span>
                                </div>
                            ))}
                        </>
                        :
                        <h1>No Tables</h1>
                    }
                </div>
                :
                <div className='right-page-content-row'>
                    {showTables?.length > 0 ?
                        <>
                            <table className='table'>
                                <thead>
                                  <tr>
                                    <th><pre>Table No</pre></th>
                                    {areas.length > 0 && <th>Area</th>}
                                    <th><pre>No of Seats</pre></th>
                                    <th><pre>Action</pre></th>
                                  </tr>
                                </thead>
                                <tbody>
                                    {
                                    showTables.map((t,index)=>(
                                      <tr key={index}>
                                        <td>{t.name}</td>
                                        {areas.length > 0 && <td><pre>{t.areaId.name}</pre></td>}
                                        <td>{t.noOfSeats}</td>
                                        <td>
                                            <EditTableDetailsModal table={t} ><EditIcon /></EditTableDetailsModal>
                                            <ConfirmationModal heading={"Confirmation"} subHeading={"Are you sure to delete this table"} data={t} confirmationHandler={approveHandler}><DeleteIcon /></ConfirmationModal>
                                            <PrintTableModal table={t} ><PrintIcon /></PrintTableModal>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                                </table>
                        </>
                        :
                        <h1>No Tables</h1>
                    }
                </div>}
                </>}
            </div>
         </div>
    </main>
  )
}

export default Table