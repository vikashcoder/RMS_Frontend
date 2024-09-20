import React, { useEffect } from 'react'
import PageHeading from '../../../components/ui/pageHeading/pageHeading'
import AddCategoryModal from '../../../components/modals/AddCategoryModal/AddCategoryModal'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationModal from '../../../components/modals/ConfirmationModal/ConfirmationModal';
import { Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { clearErrors, clearMessages, deleteCategory, getCategories } from '../../../redux/actions/categoryAction';
import EditCategoryDetailsModal from '../../../components/modals/EditCategoryDetailsModal/EditCategoryDetailsModal';
import { useNavigate, useParams } from 'react-router-dom';
import TableLoader from '../../../components/ui/Loader/TableLoader/TableLoader';
import MetaData from '../../../components/ui/MetaData/MetaData';

const Categories = () => {

  const { categories, categoryLoading, categoryError, categoryMessage } = useSelector((state)=>state.category);

  const{ shop } = useSelector(state=>state.shop)
  const{ user } = useSelector(state=>state.user)

const {shopId , shopName} = useParams();
const navigate = useNavigate();

const dispatch = useDispatch();

const approveHandler = (id) => {
  dispatch(deleteCategory(id,shop._id));
}

useEffect(()=>{
  dispatch(getCategories(shop._id))
},[dispatch,shop._id,categoryError,categoryMessage])

useEffect(()=>{
  if(categoryError){
      toast.error(categoryError);
      dispatch(clearErrors());
    }
  if(categoryMessage){
      toast.success(categoryMessage);
      dispatch(clearMessages());
  }
  
},[dispatch,categoryError,categoryMessage])

useEffect(()=>{
  if((shopId.toString() !== shop?._id.toString()) || (shopName.toString() !==shop?.name.toString()) || shop?.ownerId.toString() !== user._id.toString()){
      navigate("/404")
  }
},[navigate,shopId,shopName,shop,user])

  return (
       <main>
        <MetaData title={'FOOD CATEGORIES'} />
       <PageHeading 
        heading={"Category"} 
        subHeading={"To View and add categories"} 
        button={<AddCategoryModal buttonIcon={<AddCircleOutlineIcon/>} buttonText={"Add Category"} />}
        tooltip={"Add Category"}
         />

         <div className='right-page-middle'>
           <div className='right-page-content'>
           <div className='right-page-content-viewBy' style={{padding:"30px 0"}}>
                    <Tooltip title="Refresh"><RefreshIcon onClick={()=>dispatch(getCategories(shop._id))} /></Tooltip>
                </div>
              {categoryLoading ?
              <TableLoader column={6} />
              :
              <>
              <div className='right-page-content-grid' style={categories?.length === 0 ?{justifyContent:"center", alignItems:"center"}:{}}>
                {categories?.length > 0 ?
                <>
                  {categories?.map((a,i)=>(
                     <div className='table-grid' style={{width:"150px"}} key={i}>
                     <h3>{a.name}</h3>
                     <p style={{fontSize:"12px"}}>{a.noOfItems} Items</p>
                     <span>
                             <EditCategoryDetailsModal category={a}><EditIcon /></EditCategoryDetailsModal>
                             <ConfirmationModal heading={"Confirmation"} subHeading={"Are you sure to delete this Area and tables related to this area"} data={a} confirmationHandler={approveHandler} > <DeleteIcon /> </ConfirmationModal>
                     </span>
                 </div>
                  ))}
                </>
                :
                <h1>No Categories</h1>}
              </div>
              </>}
            </div>
         </div>
    </main>
  )
}

export default Categories