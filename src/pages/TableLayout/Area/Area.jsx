import React, { useEffect } from 'react'
import PageHeading from '../../../components/ui/pageHeading/pageHeading'
import AddAreaModal from '../../../components/modals/AddAreaModal/AddAreaModal'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditAreaDetailsModal from '../../../components/modals/EditAreaDetailsModal/EditAreaDetailsModal';
import ConfirmationModal from '../../../components/modals/ConfirmationModal/ConfirmationModal';
import { Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, clearMessages, getAreas } from '../../../redux/actions/areaAction';
import toast from 'react-hot-toast';
import { deleteArea } from "../../../redux/actions/areaAction.js"
import { useNavigate, useParams } from 'react-router-dom';
import TableLoader from '../../../components/ui/Loader/TableLoader/TableLoader';
import MetaData from '../../../components/ui/MetaData/MetaData';

const Area = () => {

const { areas, areaLoading, areaError, areaMessage } = useSelector((state)=>state.area);

const {shopId , shopName} = useParams();
const navigate = useNavigate();

const { shop } = useSelector(state=>state.shop)
const { user } = useSelector(state=>state.user)

const dispatch = useDispatch();

const approveHandler = (id) => {
  dispatch(deleteArea(id,shop._id));
}

useEffect(()=>{
  dispatch(getAreas(shop._id))
},[dispatch,shop._id,areaError,areaMessage])

useEffect(()=>{
  if(areaError){
      toast.error(areaError);
      dispatch(clearErrors());
    }
  if(areaMessage){
      toast.success(areaMessage);
      dispatch(clearMessages());
  }
  
},[dispatch,areaError,areaMessage])

useEffect(()=>{
  if((shopId.toString() !== shop?._id.toString()) || (shopName.toString() !==shop?.name.toString()) || shop?.ownerId.toString() !== user._id.toString()){
      navigate("/404")
  }
},[navigate,shopId,shopName,shop,user])


  return (
    <main>
      <MetaData title={'AREA'} />
       <PageHeading 
        heading={"Areas"} 
        subHeading={"To View and add areas of tables"} 
        button={<AddAreaModal buttonIcon={<AddCircleOutlineIcon/>} buttonText={"Add Area"} />}
        tooltip={"Add Table"}
         />

         <div className='right-page-middle'>
           <div className='right-page-content'>
           <div className='right-page-content-viewBy' style={{padding:"30px 0"}}>
                    <Tooltip title="Refresh"><RefreshIcon onClick={()=>dispatch(getAreas(shop._id))} /></Tooltip>
                </div>
              {areaLoading ? 
              <TableLoader column={6} />
              :
              <>
              <div className='right-page-content-grid' style={areas?.length === 0 ?{justifyContent:"center", alignItems:"center"}:{}}>
                {areas?.length > 0 ?
                <>
                  {areas?.map((a,i)=>(
                     <div className='table-grid' style={{width:"150px"}} key={i}>
                     <h3>{a.name}</h3>
                     <p style={{fontSize:"12px"}}>{a.noOfTables} tables</p>
                     <span>
                             <EditAreaDetailsModal area={a}><EditIcon /></EditAreaDetailsModal>
                             <ConfirmationModal heading={"Confirmation"} subHeading={"Are you sure to delete this Area and tables related to this area"} data={a} confirmationHandler={approveHandler} > <DeleteIcon /> </ConfirmationModal>
                 
                     </span>
                 </div>
                  ))}
                </>
                :
                <h1>No Areas</h1>}
              </div>
              </>}
            </div>
         </div>
    </main>
  )
}

export default Area