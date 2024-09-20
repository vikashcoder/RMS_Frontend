import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import './Shops.css'
import { clearErrors, clearMessages, getMyShop, getMyShops } from '../../redux/actions/shopAction';
import EditIcon from '@mui/icons-material/Edit';
import shopLogo from '../../assets/store.png'
import logo from "../../assets/logo.svg"
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { employeeOfShop, logout } from '../../redux/actions/userAction';
import AddShopModal from '../../components/modals/AddShopModal/AddShopModal';
import toast from 'react-hot-toast';
import EditShopDetailsModal from '../../components/modals/EditShopDetailsModal/EditShopDetailsModal';
import MetaData from '../../components/ui/MetaData/MetaData';

const Shops = () => {
  const navigate = useNavigate();
  const { user, userLoading } = useSelector(state=> state.user);
  const { shops, shop, shopMessage, shopError, shopLoading } = useSelector(state=>state.shop)
  const dispatch = useDispatch();

  const handleClick = (shop) => {
    dispatch(getMyShop(shop?._id))
  }
    
    useEffect(()=>{
      if(user?.role === "WAITER"){
        dispatch(employeeOfShop());
      }else if(user?.role === "OWNER"){ 
        dispatch(getMyShops());
      }
    },[dispatch,user,shop,shopMessage,shopError])

    useEffect(()=>{
      if(shopError){
        toast.error(shopError);
        dispatch(clearErrors());
      }
      if(shopMessage){
          toast.success(shopMessage);
          dispatch(clearMessages());
      }
      
  },[dispatch,shopError,shopMessage])
    
    useEffect(()=>{
      if(user?.role === "OWNER" && shop?._id){
        navigate(`/orders/order/${shop?.name}/${shop?._id}`)
      }
  },[shop,navigate,user])

  return (
    <>
    <MetaData title={'SHOPS'} />
      {user && user.role === "OWNER" ? 
      <main className='shop-container-main'>
      <div className='shop-container-header'>
          <h1>My Shops</h1>
        </div>
      <div class="shop-container">
    {shops && shops.map((s,i)=>(
      <div key={i} className="shop-box">
      <div className="shop-image">
        <img src={shopLogo} alt='shop-logo' />
      </div>
      <EditShopDetailsModal shop={s} className="edit-icon">
        <EditIcon />
      </EditShopDetailsModal>
      <div className="shop-info">
        <h2>{s.name}</h2>
        <p>Address : {s.address.line1} {s.address.line2} {s.address.pincode} {s.address.state}</p>
        <button onClick={()=>handleClick(s)} >{shopLoading ? <div className='loader'></div>:"Get in Shop"}</button>
      </div>
    </div>
    ))}
    <AddShopModal className="shop-box">
      <span><pre>Add Shop</pre></span>
    </AddShopModal>
    </div>
      </main>
      :
      <main className='qr-order'>
        <div className='qr-order-container'>
            <div className='qr-order-container-header'>
                <img src={logo} alt='Logo' />
                <h1>{shop && shop.name}</h1>
            </div>
            <h1>Welcome</h1>
            <Link to={`/employee/tables/${shop._id}`} className='qr-order-container-button'>
                <LocalDiningIcon /> Order now
            </Link>
            <button onClick={()=>dispatch(logout())}>{userLoading ?<span className='loader'></span>:" Logout"}</button>
        </div>
    </main>}
    </>
  )
}

export default Shops