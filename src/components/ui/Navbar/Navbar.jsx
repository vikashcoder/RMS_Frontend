import React, { useEffect } from 'react'
import './Navbar.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ToggleMode from '../ToogleMode/ToogleMode';
import { Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestedKots } from '../../../redux/actions/orderAction';

const Navbar = ({listOfTabs,activeTab}) => {

    const { shopId, shopName } = useParams();

const { requestedKots } = useSelector(state => state.order);
const { shop } = useSelector(state => state.shop);
const { user } = useSelector(state=>state.user);
const dispatch = useDispatch();
const navigate = useNavigate();

useEffect(()=>{
    const interval = setInterval(() => {
        dispatch(getRequestedKots(shop._id))
    }, 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line 
},[])

useEffect(()=>{
    if((shopId?.toString() !== shop?._id.toString()) || (shopName.toString() !==shop?.name.toString()) || shop?.ownerId.toString() !== user?._id.toString()){
        navigate("/404")
    }
  },[navigate,shopId,shopName,shop,user])

  return (
    <>
    <nav className='navbar'>
       <ul className='navbar-left'>
       {listOfTabs.map((m,i)=>
            <Link key={i} className={activeTab === m.title.toLowerCase() ? "nav-active-tab" : ""} to={m.link} >{m.title}</Link>
        )}
       </ul>
       <div className='navbar-right'>
            {requestedKots?.length > 0 && <div className='notify'></div>}
            <Tooltip title={"KOT Requested"}>
            <NotificationsActiveIcon onClick={()=>navigate(`/orders/manage/${shop.name}/${shop._id}`)} />
            </Tooltip>
            <Tooltip title={"Switch"}>
            <ToggleMode />
            </Tooltip>
            <Link to={`/orders/order/${shop.name}/${shop._id}`}><pre>New Order</pre></Link>
            {/* <Link to={`/orders/table/${shop.name}/${shop._id}`}><pre>Print Bill</pre></Link> */}
       </div>
    </nav>
    </>
  )
}

export default Navbar