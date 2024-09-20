import React, { useState } from 'react'
import Sidecar from '../../components/ui/Sidecar/Sidecar'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ToogleMode from "../../components/ui/ToogleMode/ToogleMode"
const Dashboard = () => {
  const [sidebarMobileview, setSidebarMobileview] = useState(false)
  return (
    <>
    <div className='app-layout'>
    <div className='layout-left' style={sidebarMobileview?{left:"0px"}:{}}>
    <Sidecar />
    </div>
     <main className='layout-right' onClick={()=>{setSidebarMobileview(false)}}>
         Dashboard
         <ToogleMode />
     </main>

     <div className='sidecar-right-arrow' style={sidebarMobileview?{left:"205px"}:{}} onClick={()=>{setSidebarMobileview(!sidebarMobileview)}}>
       {sidebarMobileview?<KeyboardArrowLeftIcon />:<KeyboardArrowRightIcon />}
     </div>
    </div>
 </>
  )
}

export default Dashboard