import React, { useEffect, useState } from 'react'
import './Order.css'
import PageHeading from '../../../components/ui/pageHeading/pageHeading';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Tooltip } from '@mui/material';
import { orderType } from '../../../constanst';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { getTables } from '../../../redux/actions/tableAction';
import { getCategories } from '../../../redux/actions/categoryAction';
import { getItems } from '../../../redux/actions/itemAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import ViewCartModal from '../../../components/modals/ViewCartModal/ViewCartModal';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import PlaceOrderModal from '../../../components/modals/PlaceOrderModal/PlaceOrderModal';
import { useNavigate, useParams } from 'react-router-dom';
import TableLoader from '../../../components/ui/Loader/TableLoader/TableLoader';
import MetaData from '../../../components/ui/MetaData/MetaData';

const Order = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [orderTableNo, setOrderTableNo] = useState("");
  const [selectedOrderType, setSelectedOrderType] = useState("DINEIN")
  const [newOrder, setNewOrder] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [paymentCounter, setPaymentCounter] = useState(0);
  const [itemCounter, setItemCounter] = useState(0);
  const [categoryId, setCategoryId] = useState("")  
  const [mealType, setMealType] = useState("");
  const [searchBoxValue, setSearchBoxValue] = useState("");
  // eslint-disable-next-line
  const [isStar, setIsStar] = useState("")
  
  const itemSearch = (value) => {
    setSearchBoxValue(value)
  }

  const { shop } = useSelector(state=>state.shop);
  const { tableLoading, tables } = useSelector(state=>state.table);
  const { items, itemLoading } = useSelector((state)=>state.item)
  const { categories } = useSelector((state)=>state.category);
  const { user } = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shopId, shopName } = useParams();

// const [showItems, setShowItems] = useState([items && items]);

// const kot = [
//   {tokenNo: "#3241AE",
//   orderValue: "1234",
//   isexpire: "false",
//   status enum
//  ItemsId [array] fk
//    tableId objectId fk
//  shopId ObjectId fk
//  specialRequest string}
// ]

const handleNewOrder = () => {
  setNewOrder(true);
  setCartItems([]);
}

const handleCartItemsChange = (c,p,i) =>{
  setCartItems(c)
  setPaymentCounter(p)
  setItemCounter(i)
}

const handlePushCartItems = (i) => {

  if(cartItems.length > 0){
      const item = cartItems.filter((c)=>{
          return c.foodItemId === i._id
      })
      
      if(item.length > 0){
          
          const index = cartItems.findIndex((c)=>{return c.foodItemId === i._id})
          cartItems[index].qty += 1;
          setPaymentCounter(paymentCounter+i.price);
          setItemCounter(itemCounter+1);
          setCartItems([...cartItems])
      }
      else{
          const object = {
              foodItemId : i._id,
              name : i.name,
              price : i.price,
              qty : 1
          }
          setPaymentCounter(paymentCounter+i.price);
          setItemCounter(itemCounter+1);
          setCartItems([...cartItems,object])
      }
      
  }
  else{
      const object = {
          foodItemId : i._id,
          name : i.name,
          price : i.price,
          qty : 1
      }
      setPaymentCounter(i.price);
      setItemCounter(itemCounter+1);
      setCartItems([...cartItems,object])
      
  }
}

const handlePopCartItems = (e,i) => {
      e.preventDefault();
  if(cartItems.length > 0){
    const item = cartItems.filter((c)=>{
      return c.foodItemId === i._id
    })

    if(item.length > 0){
      const index = cartItems.findIndex((c)=>{return c.foodItemId === i._id})
      if(cartItems[index].qty === 1){
        deleteCartItems(i);
        setPaymentCounter(paymentCounter - i.price);
        setItemCounter(itemCounter - 1);
        return;
      }
      cartItems[index].qty -= 1;
      setPaymentCounter(paymentCounter - i.price.qty)
      setItemCounter(itemCounter - 1);
      setCartItems([...cartItems])
    }
    else{
      return;
    }
    
  }
  else{
    return;
  }

}

const itemReduceHandler = (i) => {
  const index = cartItems.findIndex((c)=>{return c.foodItemId === i.foodItemId})
  if(cartItems[index].qty === 1){
    deleteCartItems(i,paymentCounter - i.price)
    return;
  }
  cartItems[index].qty -= 1;
  setItemCounter(itemCounter - 1);
  setPaymentCounter(paymentCounter - i.price)
  setCartItems([...cartItems])
}

const itemIncreaseHandler = (i) => {
  const index = cartItems.findIndex((c)=>{return c.foodItemId === i.foodItemId})
  cartItems[index].qty += 1;
      setPaymentCounter(paymentCounter + i.price);
      setItemCounter(itemCounter + 1)
      setCartItems([...cartItems])
}

const deleteCartItems = (item) => {

  setPaymentCounter(paymentCounter - (item.qty * item.price))
  setCartItems(cartItems.filter((c)=>{return item.foodItemId !== c.foodItemId}))
  setItemCounter(itemCounter -item.qty)


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
   setCategoryId(id)
  }
})

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

const resetHandler = () => {
  dispatch(getItems("",shop._id,"",true,"",""))
  setSearchBoxValue("")
  setActiveTab("ALL")
  setMealType("")
  setCategoryId("")
}

const handleOrderPlaced = () => {
  setOrderTableNo("");
  setNewOrder(false);
  setCartItems([]);
  setItemCounter(0)
  setPaymentCounter(0)
}

useEffect(()=>{
  if(newOrder && orderTableNo === ""){
    dispatch(getTables("",shop._id))
  }
  if(orderTableNo !== ""){
    dispatch(getItems(searchBoxValue,shop._id,mealType,true,"",categoryId))
  }
  
},[shop,newOrder,dispatch,categoryId,mealType,orderTableNo,searchBoxValue,isStar])

useEffect(()=>{
  if(newOrder && orderTableNo === ""){
  dispatch(getCategories(shop._id))
  }
},[dispatch,shop._id,newOrder,orderTableNo])

useEffect(()=>{
  if((shopId.toString() !== shop?._id.toString()) || (shopName.toString() !==shop?.name.toString()) || shop?.ownerId.toString() !== user._id.toString()){
      navigate("/404")
  }
},[navigate,shopId,shopName,shop,user])

  return (
    <main>
      <MetaData title={'ORDERS'} />
        <PageHeading 
        heading={"Orders"} 
        subHeading={"To View and add orders"} 
        placeholder={"by items or short code"}
        searchHandler={itemSearch}
         />

<div className='right-page-middle' style={newOrder ? {} : {justifyContent:"center", alignItems:"center",height:"300px"}}>
            {newOrder ?
            <>
            {orderTableNo ? 
            <>
            <div>
            <div className='right-page-middle-category'>
                {categories && categories.length > 0 && <div className='right-page-middle-category-items'>
                    <li onClick={(e)=>{categorySorting("ALL")}} className={activeTab === "ALL" ? "category-active-tab" : ""} ><pre>ALL</pre></li>
                    {<li onClick={(e)=>{categorySorting("STARRED")}} className={activeTab === "STARRED" ? "category-active-tab" : ""} ><pre>STARRED</pre></li>}
                    {categories.map((m,i)=>(
                    <li key={i} onClick={(e)=>{categorySorting(m.name.toLowerCase(),m._id)}} className={activeTab === m.name.toLowerCase() ? "category-active-tab" : ""} ><pre>{m.name}</pre></li>
                ))}
                </div>}
            </div>
            </div>

            <div className='order-laptop' style={{display:"flex",width:"100%", gap:"5px"}}>
            <div className='right-page-content' style={{flex:"2"}}>
                <div className='right-page-content-viewBy'>
                {<span onClick={()=>handleChangeMealType("VEG")}>
                        <div style={mealType === "VEG" ? {backgroundColor: "var(--green)"} : {}}></div>
                        <p>Veg</p>
                      </span>}
                      { <span onClick={()=>handleChangeMealType("NONVEG")}>
                        <div style={mealType === "NONVEG" ? {backgroundColor: "var(--red)"} : {}}></div>
                        <p><pre>Non Veg</pre></p>
                      </span>}
                    <Tooltip title="Refresh"><RefreshIcon onClick={resetHandler} /></Tooltip>
                </div>
                {itemLoading ?
                <TableLoader column={5} />
                :
                <div className='right-page-content-grid' style={items?.length === 0 ? {justifyContent:"center", alignItems:"center"}:{}}>
                    {items?.length > 0 ?
                        <>
                            {items.map((t,i)=>(
                                <div className='table-grid' style={{cursor:"pointer", justifyContent:"center", alignItems:"center"}} key={i} onClick={()=>handlePushCartItems(t)} onContextMenu={(event)=>handlePopCartItems(event,t)}>
                                    <h3>{t.name}</h3>
                                    <p style={{fontSize: "12px", fontWeight: "500"}}>Rs. {t.price}</p>
                                </div>
                            ))}
                        </>
                        :
                        <h1>No Items</h1>
                    }
                </div>}
            </div>
            <div className='right-page-order' style={newOrder ? {} : {justifyContent:"center",alignItems:"center"}} >
          
              <>
            <Tooltip title="Table No">
                 <select
                   value={orderTableNo}
                   onChange={(e)=>setOrderTableNo(e.target.value)}
                 >
                   <option value="">Select Table no</option>
                   {tables.map((t,i)=>(
                   <option key={i} value={t.name}>Table No. {t.name}</option>

                   ))}
                 </select>
              </Tooltip>
              {orderTableNo !== "" && 
              <>
              <span className='right-page-order-type'>
                    {orderType.map((m,i)=>(
                      <li key={i} className={selectedOrderType === m ? 'active-order-type-tab' : ""} onClick={()=>setSelectedOrderType(m)}><pre>{m}</pre></li>
                    ))}
              </span>
              <div className='right-page-order-table'>
                    <table>
                      <thead>
                        <th>Items</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Action</th>
                      </thead>
                      <tbody>
                        {cartItems.length > 0 && cartItems.map((c,i)=>(
                          <tr key={i}>
                            <td>{c.name}</td>
                            <td><div><Tooltip title="Deduct"><RemoveIcon onClick={()=>itemReduceHandler(c)} /></Tooltip>{c.qty}<Tooltip title="Add"><AddIcon onClick={()=>itemIncreaseHandler(c)} /></Tooltip></div></td>
                            <td>{c.price}</td>
                            <td><Tooltip title="delete"><DeleteForeverIcon onClick={()=>deleteCartItems(c)} style={{color:"var(--red)"}} /></Tooltip></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
              </div>
              {cartItems.length > 0 && <div className='right-page-order-payment'>
                      <span>
                        <pre><p>Total Payment ({itemCounter} items)</p></pre>
                        <pre><p>Rs. {paymentCounter}</p></pre>
                      </span>
                      <div className='payment-btn'>
                          <PlaceOrderModal cartItems={cartItems} orderTableNo={orderTableNo} paymentCounter={paymentCounter} itemCounter={itemCounter} kotType={selectedOrderType} shopId={shop._id} orderPlaced={handleOrderPlaced} shopName={shop.name} >Proceed</PlaceOrderModal>
                          <button>PRINT</button>
                      </div>
              </div>}
              </>
              }
            </>
              
          
            </div>
            </div>
            <div className='order-mobile'>
            <div className='open-order-view' style={{width:"95%"}}>
                <span className='open-order-view-tableNo'>
                <TableRestaurantIcon />
                <p>{orderTableNo}</p>
                {user && <button onClick={()=>setOrderTableNo("")}>All Tables</button>}
                </span>
                <span className='open-order-view-sort'>
                {<span onClick={()=>handleChangeMealType("VEG")}>
                        <div style={mealType === "VEG" ? {backgroundColor: "var(--green)"} : {}}></div>
                        <p>Veg</p>
                      </span>}
                      { <span onClick={()=>handleChangeMealType("NONVEG")}>
                        <div style={mealType === "NONVEG" ? {backgroundColor: "var(--red)"} : {}}></div>
                        <p><pre>Non Veg</pre></p>
                      </span>}
                    <Tooltip title="Refresh"><RefreshIcon onClick={resetHandler} /></Tooltip>
                </span>
            </div>
            <span className='right-page-order-type'>
                    {orderType.map((m,i)=>(
                      <li key={i} className={selectedOrderType === m ? 'active-order-type-tab' : ""} onClick={()=>setSelectedOrderType(m)}><pre>{m}</pre></li>
                    ))}
              </span>
            {itemLoading ?
                <TableLoader column={6} />
                :
            <div className='open-order-content'>
            {items && items.length >0 ?
            <>
               {items?.map((item,index)=>(
                 <div key={index} class="food-item-row">
                 <div class="food-item-image">
                   <KebabDiningIcon />
                 </div>
                 <div className="food-item-details">
                   <h4><span className={item.mealType === "VEG" ? "veg-logo" : "non-veg-logo"}></span> {item.name}</h4>
                   <p className="food-item-price">Rs. {item.price}</p>
                 </div>
                 { cartItems.filter((c)=>{
                return c.foodItemId === item._id
            }).length === 0
             ? 
                 <button className="add-to-cart-btn" onClick={()=>handlePushCartItems(item)}>Add to Cart</button>
                 :
              <div className="quantity-selector">
                  <button className="minus-btn"onClick={(e)=>handlePopCartItems(e,item)}>−</button>
                  <span className="quantity-display" >{cartItems.find((c)=>{return c.foodItemId === item._id}).qty}</span>
                  <button className="plus-btn" onClick={()=>handlePushCartItems(item)}>+</button>
                </div>}
               </div>
               ))}
            </>
            :
            <h1>No items</h1>    
        }
         </div>}
         <div className={cartItems.length > 0 ? "cart-popup active" : "cart-popup"}>
              <div className="cart-popup-details">
                <ShoppingCartIcon className="cart-popup-logo" />
                <div className="cart-popup-info">
                  <h4>Cart Summary</h4>
                  <p>{itemCounter} Items in cart</p>
                  <p>Rs. {paymentCounter}</p>
                </div>
              </div>
              <ViewCartModal handleCartItemsChange={handleCartItemsChange} paymentCounter={paymentCounter} itemCounter={itemCounter} orderTableNo={orderTableNo} cartItems={cartItems} shopId={shop._id} shopName={shop.name}>View Cart</ViewCartModal>
            </div>
            </div>
            </>
            :
            <>
                     {tableLoading ?
                     <TableLoader column={6} />
                     :
                     <div className='right-page-content-grid' style={tables?.length === 0 ? {justifyContent:"center", alignItems:"center"}:{paddingTop:"20px"}}>
                    {tables?.length > 0 ?
                        <>
                            {tables.map((t,i)=>(
                                <div onClick={()=>setOrderTableNo(t.name)} className={t.isEmpty ? 'table-grid' : 'table-grid table-nonEmpty'} key={i} style={t.shape === "CIRCLE" ? {borderRadius:"100%"}:{}}>
                                    <h3>{t.name}</h3>
                                    <p>{t.areaId.name}</p>
                                    <p>{t.noOfSeats} seats</p>
                                </div>
                            ))}
                        </>
                        :
                        <h1>No Tables</h1>
                    }
                </div>}
            </>
            }
            </>
            :
            <><button onClick={handleNewOrder} className='new-order-btn'>New Order</button></>
            }
         </div>
    </main>
  )
}

export default Order