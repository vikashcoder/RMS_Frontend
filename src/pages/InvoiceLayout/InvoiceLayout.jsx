import React, { useEffect, useState } from 'react'
import Invoice from './Invoice/Invoice';
import Sidecar from '../../components/ui/Sidecar/Sidecar';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/ui/Navbar/Navbar';
import { useSelector } from 'react-redux';

const InvoiceLayout = () => {
    const [sidebarMobileview, setSidebarMobileview] = useState(false)
    const [activeTab, setActiveTab] = useState("invoice");

    const { pathname } = useLocation();

    const { shop } = useSelector(state=>state.shop)

    const listOfTabs = [
        {
            title: "Invoice",
            link: `/invoices/invoice/${shop.name}/${shop._id}`
        }
    ]

  useEffect(()=>{
    const uri = pathname.split("/");
    setActiveTab(uri[2]);
    window.scrollTo(0, 0);

  },[activeTab,pathname]);

  return (
    <>
    <div className='app-layout'>
    <div className='layout-left' style={sidebarMobileview?{left:"0px"}:{}}>
    <Sidecar />
    </div>


     <main className='layout-right' onClick={()=>{setSidebarMobileview(false)}}>
         <Navbar listOfTabs={listOfTabs} activeTab={activeTab} />
         <div className='layout-right-main'>
           {activeTab === "invoice" && <Invoice />}
         </div>
     
     
     </main>

     <div className='sidecar-right-arrow' style={sidebarMobileview?{left:"205px"}:{}} onClick={()=>{setSidebarMobileview(!sidebarMobileview)}}>
       {sidebarMobileview?<KeyboardArrowLeftIcon />:<KeyboardArrowRightIcon />}
     </div>
    </div>
 </>
  )
}

export default InvoiceLayout