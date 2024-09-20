import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Sidecar from '../../components/ui/Sidecar/Sidecar';
import Navbar from '../../components/ui/Navbar/Navbar';
import Items from './Items/Items'
import Categories from './Categories/Categories'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useSelector } from 'react-redux';

const ItemsLayout = () => {
  const [sidebarMobileview, setSidebarMobileview] = useState(false)
  const [activeTab, setActiveTab] = useState("item");

  const { pathname } = useLocation();

  useEffect(()=>{
    const uri = pathname.split("/");
    setActiveTab(uri[2]);
    window.scrollTo(0, 0);

  },[activeTab,pathname]);

  const { shop } = useSelector(state=>state.shop)

  const listOfTabs = [
    {
        title: "Item",
        link: `/items/item/${shop.name}/${shop._id}`
    },
    {
        title: "Category",
        link: `/items/category/${shop.name}/${shop._id}`
    }
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
           {activeTab === "item" ? <Items/> : <Categories />}
         </div>
     
     
     </main>

     <div className='sidecar-right-arrow' style={sidebarMobileview?{left:"205px"}:{}} onClick={()=>{setSidebarMobileview(!sidebarMobileview)}}>
       {sidebarMobileview?<KeyboardArrowLeftIcon />:<KeyboardArrowRightIcon />}
     </div>
    </div>
 </>
  )
}

export default ItemsLayout