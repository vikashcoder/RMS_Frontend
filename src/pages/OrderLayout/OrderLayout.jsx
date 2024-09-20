import React, { useEffect, useState } from 'react'
import './OrderLayout.css'
import Order from './Order/Order';
import { useLocation } from 'react-router-dom';
import Sidecar from '../../components/ui/Sidecar/Sidecar';
import Navbar from '../../components/ui/Navbar/Navbar';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ManageOrder from './ManageOrder/ManageOrder'
import TableView from './TableView/TableView';
import { useSelector } from 'react-redux';

const OrderLayout = () => {

    const [sidebarMobileview, setSidebarMobileview] = useState(false)
    const [activeTab, setActiveTab] = useState("order");
  
    const { pathname } = useLocation();
  
    useEffect(()=>{
      const uri = pathname.split("/");
      setActiveTab(uri[2]);
      window.scrollTo(0, 0);
  
    },[activeTab,pathname]);
  
    const { shop } = useSelector(state=>state.shop)
  
    const listOfTabs = [
      {
          title: "Order",
          link: `/orders/order/${shop.name}/${shop._id}`
      },
      {
          title: "Manage",
          link: `/orders/manage/${shop.name}/${shop._id}`
      },
      {
          title: "Table",
          link: `/orders/table/${shop.name}/${shop._id}`
      },
  ]

  return (
    <>
    <div className='app-layout'>
    <div className='layout-left' style={sidebarMobileview?{left:"0px"}:{}}>
    <Sidecar />
    </div>


     <main className='layout-right' onClick={()=>{setSidebarMobileview(false)}}>
         <Navbar listOfTabs={listOfTabs} activeTab={activeTab} />
         <div className='layout-right-main'>
           {activeTab === "order" && <Order/>} 
           {activeTab === "manage" && <ManageOrder /> }
           {activeTab === "table" && <TableView />}
         </div>
     
     
     </main>

     <div className='sidecar-right-arrow' style={sidebarMobileview?{left:"205px"}:{}} onClick={()=>{setSidebarMobileview(!sidebarMobileview)}}>
       {sidebarMobileview?<KeyboardArrowLeftIcon />:<KeyboardArrowRightIcon />}
     </div>
    </div>
 </>
  )
}

export default OrderLayout