import React, { useEffect, useState } from 'react'
import logo from "../../assets/logo.svg"
import { useDispatch, useSelector } from 'react-redux'
import { getTables } from '../../redux/actions/tableAction';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TableLoader from '../../components/ui/Loader/TableLoader/TableLoader';
import MetaData from '../../components/ui/MetaData/MetaData';

const WaiterTable = () => {
    const [searchBoxValue, setSearchBoxValue] = useState("");
    const [showSearchBar, setShowSearchBar] = useState(false);
    const { shop } = useSelector(state=>state.shop);
    const { tables, tableLoading } = useSelector(state=>state.table);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const resetHandler = () => {
        dispatch(getTables("",shop._id));
        setSearchBoxValue("");
    }

    useEffect(()=>{
        dispatch(getTables(searchBoxValue,shop._id))
    },[shop,dispatch,searchBoxValue])

  return (
    <main className='open-order'>
        <MetaData title={"ORDERS"} />
        <header className='open-order-header'>
            <nav className='open-order-nav'>
                <span className='open-order-nav-logo'>
                    <img src={logo} alt='logo' />
                    <p><pre>{shop.name}</pre></p>
                </span>
                <span className='open-order-nav-search-bar'>
                <form>
                        {showSearchBar && <input type='text' placeholder='Search for table' onChange={(e)=>{setSearchBoxValue(e.target.value)}} value={searchBoxValue} />}
                        <SearchRoundedIcon onClick={()=>setShowSearchBar(!showSearchBar)}  />
                    </form>
                </span>
            </nav>
            <div className='open-order-view' style={{justifyContent:"flex-end"}}>
                <span className='open-order-view-sort'>
                    <Tooltip title="Refresh"><RefreshIcon onClick={resetHandler} /></Tooltip>
                </span>
            </div>
         </header>
        {
        tableLoading ?
        <TableLoader column={5} />
        :
        <div className='right-page-content-grid' style={tables?.length === 0 ? {justifyContent:"center", alignItems:"center"}:{paddingTop:"20px"}}>
                    {tables?.length > 0 ?
                        <>
                            {tables.map((t,i)=>(
                                <div onClick={()=>navigate(`/orders/dine-in/${t.shopId}/${t.name}`)} className={t.isEmpty ? 'table-grid' : 'table-grid table-nonEmpty'} key={i} style={t.shape === "CIRCLE" ? {borderRadius:"100%"}:{}}>
                                    <h3>{t.name}</h3>
                                    <p>{t.areaId.name}</p>
                                    <p>{t.noOfSeats} seats</p>
                                </div>
                            ))}
                        </>
                        :
                        <h1>No Tables</h1>
                    }
                </div>
                }
         </main>
  )
}

export default WaiterTable