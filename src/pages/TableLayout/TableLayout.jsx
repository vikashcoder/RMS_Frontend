import React, { useEffect, useState } from 'react'
import './TableLayout.css'
import Sidecar from '../../components/ui/Sidecar/Sidecar'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Navbar from '../../components/ui/Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import Table from './Table/Table';
import Area from './Area/Area';
import { useSelector } from 'react-redux';

const TableLayout = () => {

  const [sidebarMobileview, setSidebarMobileview] = useState(false)
  const [activeTab, setActiveTab] = useState("table");

  const { pathname } = useLocation();

  useEffect(()=>{
    const uri = pathname.split("/");
    setActiveTab(uri[2]);
    window.scrollTo(0, 0);

  },[activeTab,pathname]);

  const { shop } = useSelector(state=>state.shop)

  const listOfTabs = [
    {
        title: "Table",
        link: `/tables/table/${shop.name}/${shop._id}`
    },
    {
        title: "Area",
        link: `/tables/area/${shop.name}/${shop._id}`
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
              {activeTab === "table" ? <Table/> : <Area />}
            </div>
        
        
        </main>

        <div className='sidecar-right-arrow' style={sidebarMobileview?{left:"205px"}:{}} onClick={()=>{setSidebarMobileview(!sidebarMobileview)}}>
          {sidebarMobileview?<KeyboardArrowLeftIcon />:<KeyboardArrowRightIcon />}
        </div>
       </div>
    </>
  )
}

export default TableLayout