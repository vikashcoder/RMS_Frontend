import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PageHeading from '../../../components/ui/pageHeading/pageHeading';
import ConfirmationModal from '../../../components/modals/ConfirmationModal/ConfirmationModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Pagination, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
// import DownloadIcon from '@mui/icons-material/Download';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getInventory } from '../../../redux/actions/inventoryAction';
import { clearMessages } from '../../../redux/actions/inventoryAction';
import { clearErrors } from '../../../redux/actions/inventoryAction';
import { deleteInventory } from '../../../redux/actions/inventoryAction';
import AddInventoryModal from '../../../components/modals/AddInventoryModal/AddInventoryModal';
import EditInventoryDetailsModal from '../../../components/modals/EditInventoryDetailsModal/EditInventoryDetailsModal';
import TableLoader from '../../../components/ui/Loader/TableLoader/TableLoader';
import MetaData from '../../../components/ui/MetaData/MetaData';

const Inventory = () => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [availabilityStatus, setAvailabilityStatus] = useState("");

  const { inventoryItems, inventoryFilteredCount, inventoryLoading, inventoryError, inventoryMessage, resultPerPage } = useSelector((state) => state.inventory);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shopId,shopName, q } = useParams();

  const approveHandler = (id) => {
    dispatch(deleteInventory(id,shop._id));
}

const { shop } = useSelector(state=>state.shop);
const { user } = useSelector(state=>state.user);

  const inventorySearch = (value) => {
    setSearchValue(value);
    if(value === ""){
      return
    }
    if(value.length > 0){
        navigate(`/inventories/inventory/${shop.name}/${shop._id}/${value.trim()}`)
      }
      else{
        navigate(`/inventories/inventory/${shop.name}/${shop._id}`)
    }
  };

  const resetHandler = () => {
    navigate(`/inventories/inventory/${shop.name}/${shop._id}`)
    setSearchValue("");
    setAvailabilityStatus("");
    setPage(1);
    dispatch(getInventory("",shopId,"",1));
  };
  

  const onPageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(getInventory(q, shopId, availabilityStatus, page));
  }, [dispatch, q, page, shopId,availabilityStatus,inventoryMessage]);

  useEffect(()=>{
    if((shopId.toString() !== shop?._id.toString()) || (shopName.toString() !==shop?.name.toString()) || shop?.ownerId.toString() !== user._id.toString()){
        navigate("/404")
    }
  },[navigate,shopId,shopName,shop,user])

      useEffect(()=>{
        if(inventoryError){
          toast.error(inventoryError);
          dispatch(clearErrors());
        }
        if(inventoryMessage){
            toast.success(inventoryMessage);
            dispatch(clearMessages());
        }
        
    },[dispatch,inventoryError,inventoryMessage])

  return (
    <main>
      <MetaData title={'INVENTORY'} />
      <PageHeading
        heading={'Inventory'}
        subHeading={'To View and manage inventory items'}
        placeholder={'Search by name or category'}
        searchHandler={inventorySearch}
        button={<AddInventoryModal buttonIcon={<AddCircleOutlineIcon />} buttonText={'Add Inventory'} />}
        tooltip={'Add Inventory'}
      />

      <div className="right-page-middle" style={{ gap: '10px' }}>
        <div className="right-page-content">
          <div style={{ marginTop: '10px' }} className="right-page-content-viewBy">
 
          <form>
      <Tooltip title="Sort by Employee Status">
      <select
        value={availabilityStatus}
        onChange={(e)=>setAvailabilityStatus(e.target.value)}
      >
        <option value="">Avaiability</option>
        <option value="AVAILABLE">AVAILABLE</option>
        <option value="OUT_OF_STOCK">OUT OF STOCK</option>
      </select>
      </Tooltip>
    </form>
            {/* <Tooltip title="Download"><DownloadIcon /></Tooltip> */}
            <Tooltip title="Refresh"><RefreshIcon onClick={resetHandler} /></Tooltip>
          </div>
        </div>

        {searchValue && (
          <div className="showing-result">
            <p>Showing Result for: {searchValue}</p>
          </div>
        )}

        {inventoryLoading ? (
          <TableLoader column={6} />
        ) : 
         <> <div className="right-page-content-row">
         {inventoryItems?.length > 0 ? (
           <table className="table">
             <thead>
               <tr>
                 <th><pre>Item Name</pre></th>
                 <th><pre>Quantity</pre></th>
                 <th><pre>Status</pre></th>
                 <th><pre>Action</pre></th>
               </tr>
             </thead>
             <tbody>
               {inventoryItems?.map((item, index) => (
                 <tr key={index}>
                   <td>{item.name}</td>
                   <td><pre>{item.quantity} {item.quantityType}</pre></td>
                   <td>{item.status}</td>
                   <td>
                     <EditInventoryDetailsModal inventory={item}><EditIcon /></EditInventoryDetailsModal>
                     <ConfirmationModal
                       heading={'Confirmation'}
                       subHeading={'Are you sure to delete this inventory item?'}
                       data={item}
                       confirmationHandler={approveHandler}
                     >
                       <DeleteIcon />
                     </ConfirmationModal>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         ) : (
           <h1>No Inventory Items</h1>
         )}
       </div>
     

 {inventoryFilteredCount > resultPerPage && 
     (<div className='right-page-middle-footer'>
     <Pagination 
         count={Math.ceil(inventoryFilteredCount / resultPerPage)}
         page={page}
         onChange={onPageChange}
         variant="outlined" shape="rounded"
     />
     </div>)
     }</>
        }
      </div>
    </main>
  );
};

export default Inventory;
