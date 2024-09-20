import React, { useEffect, useState } from 'react'
import PageHeading from '../../../components/ui/pageHeading/pageHeading'
import AddItemModal from '../../../components/modals/AddItemModal/AddItemModal'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { Switch, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationModal from '../../../components/modals/ConfirmationModal/ConfirmationModal';
import RefreshIcon from '@mui/icons-material/Refresh';
// import DownloadIcon from '@mui/icons-material/Download';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, clearMessages, deleteItem, editItem, getItems } from '../../../redux/actions/itemAction';
import { getCategories } from '../../../redux/actions/categoryAction';
import EditItemDetailsModal from '../../../components/modals/EditItemDetailsModal/EditItemDetailsModal';
import TableLoader from '../../../components/ui/Loader/TableLoader/TableLoader';
import MetaData from '../../../components/ui/MetaData/MetaData';

const Items = () => {

  const [activeTab, setActiveTab] = useState("ALL");
  const [gridView, setGridView] = useState(true);    
  const [mealType, setMealType] = useState("");
  const [available, setAvailable] = useState("");
  const [isStar, setIsStar] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [searchValue, setSearchValue] = useState("");

  const { categories } = useSelector((state)=>state.category);
  const { items , itemLoading, itemError, itemMessage } =useSelector((state) => state.item)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shopId,shopName, q } = useParams();

  const{ shop } = useSelector(state=>state.shop)
  const{ user } = useSelector(state=>state.user)
  
  const approveHandler = (id) => {
    dispatch(deleteItem(id,shop._id));
}

  const itemSearch = (value) => {
    setSearchValue(value);
    if(value === ""){
      return
    }
    if(value.length > 0){
        navigate(`/items/item/${shop.name}/${shop._id}/${value.trim()}`)
      }
      else{
        navigate(`/items/item/${shop.name}/${shop._id}`)
    }
  }

  const categorySorting = ((tab,id) => {
    setActiveTab(tab);
    if(tab === "ALL"){
        setIsStar("");
        setCategoryId("");
    }
    else if(tab === "STARRED"){
      setIsStar(true);
      setCategoryId("");
    }
    else{
     setIsStar("");
     setCategoryId(id)
    }
  })

const resetHandler = () => {
  setSearchValue("");
  setActiveTab("ALL")
  setMealType("")
  setAvailable("")
  setCategoryId("")
  setIsStar("")
  navigate(`/items/item/${shop.name}/${shop._id}`)
}

  const changeStarStatus = (t) => {
    const formData = new FormData();

    formData.append("isStar",!t.isStar);

    dispatch(editItem(formData,t._id,shop._id))
  }

  const changeAvailbilityStatus = (t) => {
    const formData = new FormData();

    formData.append("isAvailable",!t.isAvailable);

    dispatch(editItem(formData,t._id,shop._id))
  }

  const handleChangeMealType = (value) => {
    if(value === "VEG" && mealType === "VEG"){
      setMealType("")
    }
    else if (value === "NONVEG" && mealType === "NONVEG"){
      setMealType("")
    }
    else{
      setMealType(value)
    }

  }

  useEffect(()=>{
    dispatch(getItems(q,shop._id,mealType,available,isStar,categoryId))
  },[dispatch,shop._id,q,itemMessage,itemError,mealType,available,isStar,categoryId])

  useEffect(()=>{
    dispatch(getCategories(shop._id))
  },[dispatch,shop._id])

useEffect(()=>{
    if(itemError){
      toast.error(itemError);
      dispatch(clearErrors());
    }
    if(itemMessage){
        toast.success(itemMessage);
        dispatch(clearMessages());
    }
    
},[dispatch,itemError,itemMessage])

useEffect(()=>{
  if((shopId.toString() !== shop?._id.toString()) || (shopName.toString() !==shop?.name.toString()) || shop?.ownerId.toString() !== user._id.toString()){
      navigate("/404")
  }
},[navigate,shopId,shopName,shop,user])

  return (
    <main>
      <MetaData title={'FOOD ITEMS'} />
        <PageHeading 
        heading={"Items"} 
        subHeading={"To View and add items"} 
        placeholder={"by items or short code"}
        searchHandler={itemSearch}
        button={<AddItemModal buttonIcon={<AddCircleOutlineIcon/>} buttonText={"Add Item"} />}
        tooltip={"Add Item"}
         />

         <div className='right-page-middle'>
            <div>
            <div className='right-page-middle-category'>
                {categories && categories?.length > 0 && <div className='right-page-middle-category-items'>
                    <li onClick={(e)=>{categorySorting("ALL")}} className={activeTab === "ALL" ? "category-active-tab" : ""} ><pre>ALL</pre></li>
                    <li onClick={(e)=>{categorySorting("STARRED")}} className={activeTab === "STARRED" ? "category-active-tab" : ""} ><pre>STARRED</pre></li>
                    {categories.map((m,i)=>(
                    <li key={i} onClick={(e)=>{categorySorting(m.name.toLowerCase(),m._id)}} className={activeTab === m.name.toLowerCase() ? "category-active-tab" : ""} ><pre>{m.name}</pre></li>
                ))}
                </div>}
            </div>
            </div>

            <div className='right-page-content'>
                <div className='right-page-content-viewBy'>
                <form>
      <Tooltip title="Sort by Availablity">
      <select
        value={available}
        onChange={(e)=>setAvailable(e.target.value)}
      >
        <option value="">Availabity</option>
        <option value="true">Available</option>
        <option value="false">Not Available</option>
      </select>
      </Tooltip>
    </form>
                      {<span onClick={()=>handleChangeMealType("VEG")}>
                        <div style={mealType === "VEG" ? {backgroundColor: "var(--green)"} : {}}></div>
                        <p>Veg</p>
                      </span>}
                      { <span onClick={()=>handleChangeMealType("NONVEG")}>
                        <div style={mealType === "NONVEG" ? {backgroundColor: "var(--red)"} : {}}></div>
                        <p><pre>Non Veg</pre></p>
                      </span>}
                    {/* <Tooltip title="Downnload"><DownloadIcon /></Tooltip> */}
                    <Tooltip title="Refresh"><RefreshIcon onClick={resetHandler} /></Tooltip>
                    <p><pre>View by</pre> </p>
                    <div>
                    <Tooltip title="Grid"><GridViewIcon onClick={()=>setGridView(true)} style={gridView ? {color: "var(--violet)"} : {}} /></Tooltip>
                    <Tooltip title="Row"><TableRowsIcon onClick={()=>setGridView(false)} style={gridView ? {} : {color: "var(--violet)"}} /></Tooltip>
                    </div>
                </div>
                      {activeTab && <div className='showing-result'>
                        <p>Showing Result for : {activeTab.toUpperCase()} {available===true && "available"} {available===false && "not available"} {mealType && mealType} Items {searchValue && searchValue}</p>
                      </div>}
                {itemLoading ?
                <TableLoader column={6} />
                :
                <>
                {gridView ? 
                <div className='right-page-content-grid' style={items?.length === 0 ? {justifyContent:"center", alignItems:"center"}:{}}>
                    {items?.length > 0 ?
                        <>
                            {items.map((t,i)=>(
                                <div className='table-grid' key={i} style={t.shape === "CIRCLE" ? {borderRadius:"100%"}:{}}>
                                    <h3>{t.name}</h3>
                                    <p>{t.categoryId.name}</p>
                                    <p><pre>&#8377; {t.price}</pre></p>
                                    <span>
                                            <EditItemDetailsModal item={t}><EditIcon style={{fontSize: "10px"}} /></EditItemDetailsModal>
                                            <ConfirmationModal heading={"Confirmation"} subHeading={"Are you sure to delete this item"} data={t} confirmationHandler={approveHandler}><DeleteIcon style={{fontSize: "10px"}} /></ConfirmationModal>
                                    </span>
                                </div>
                            ))}
                        </>
                        :
                        <h1>No Items</h1>
                    }
                </div>
                :
                <div className='right-page-content-row'>
                    {items?.length > 0 ?
                        <>
                            <table className='table'>
                                <thead>
                                  <tr>
                                    <th><pre>Item</pre></th>
                                    {categories.length > 0 && <th>Category</th>}
                                    <th><pre>Price</pre></th>
                                    <th><pre>Short Code</pre></th>
                                    <th>Star</th>
                                    <th>Avaiable</th>
                                    <th><pre>Action</pre></th>
                                  </tr>
                                </thead>
                                <tbody>
                                    {
                                    items.map((t,index)=>(
                                      <tr key={index}>
                                        <td><pre style={{display:"flex", gap:"3px",alignItems:"center"}}><div style={t.mealType === "VEG" ? {height:"10px", width:"10px",borderRadius:"100%", backgroundColor:"var(--darkgreen)"}:{height:"10px", width:"10px",borderRadius:"100%", backgroundColor:"var(--red)"}}></div>{t.name}</pre></td>
                                        {categories.length > 0 && <td><pre>{t.categoryId.name}</pre></td>}
                                        <td>
                                       <pre> &#8377; {t.price}</pre>
                                        </td>
                                        <td>{t.shortCode}</td>
                                        <td onClick={()=>changeStarStatus(t)}>{t.isStar ? <StarIcon style={{fontSize:"20px",color:"var(--violet)"}} /> : <StarBorderIcon style={{fontSize:"20px",color:"var(--darkgrey)"}} /> }</td>
                                        <td><Switch size="small" checked={t.isAvailable} onChange={()=>changeAvailbilityStatus(t)} /></td>
                                        <td>
                                            <EditItemDetailsModal item={t}><EditIcon /></EditItemDetailsModal>
                                            <ConfirmationModal heading={"Confirmation"} subHeading={"Are you sure to delete this item"} data={t} confirmationHandler={approveHandler}><DeleteIcon /></ConfirmationModal>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                                </table>
                        </>
                        :
                        <h1>No Items</h1>
                    }
                </div>}</>}
            </div>
         </div>
    </main>
  )
}

export default Items