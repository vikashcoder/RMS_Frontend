import React, { useEffect, useState } from 'react'
import './OpenOrder.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
import { tableExistInShop } from '../../redux/actions/tableAction';
import { getCategories } from '../../redux/actions/categoryAction';
import { Tooltip } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import logo from "../../assets/logo.svg"
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import { getItems } from '../../redux/actions/itemAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ViewCartModal from '../../components/modals/ViewCartModal/ViewCartModal';
import TableLoader from '../../components/ui/Loader/TableLoader/TableLoader';
import MetaData from '../../components/ui/MetaData/MetaData';

const OpenOrder = () => {
    const [activeTab, setActiveTab] = useState("ALL");
    const [categoryId, setCategoryId] = useState("")  
    const [mealType, setMealType] = useState("");
    const { shopId, tableNo } = useParams();
    const navigate = useNavigate();
    const [searchBoxValue, setSearchBoxValue] = useState("");
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [paymentCounter, setPaymentCounter] = useState(0);
    const [itemCounter, setItemCounter] = useState(0);

    const { user } = useSelector(state=>state.user)
    const { items, itemLoading } = useSelector((state)=>state.item)
    const { categories } = useSelector((state)=>state.category);
    const{ shopName, tableExistLoading, tableExist} = useSelector((state)=>state.table);
    const dispatch = useDispatch();

    const categorySorting = ((tab,id) => {
        setActiveTab(tab);
        if(tab === "ALL"){
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
        dispatch(getItems("",shopId,"",true,"",""))
        setSearchBoxValue("")
        setActiveTab("ALL")
        setMealType("")
        setCategoryId("")
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

      const handlePopCartItems = (i) => {
      
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
            setPaymentCounter(paymentCounter - i.price)
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

      const deleteCartItems = (item) => {
        setPaymentCounter(paymentCounter - (item.qty * item.price))
        setCartItems(cartItems.filter((c)=>{return item._id !== c.foodItemId}))
      }

      const handleCartItemsChange = (c,p,i) =>{
        setCartItems(c)
        setPaymentCounter(p)
        setItemCounter(i)
      }

    useEffect(()=>{
                dispatch(getItems(searchBoxValue,shopId,mealType,true,"",categoryId))
    },[dispatch,shopId,mealType,categoryId,searchBoxValue])

    useEffect(()=>{
        dispatch(tableExistInShop(tableNo,shopId));
        dispatch(getCategories(shopId))
      },[dispatch,tableNo,shopId])
    
    useEffect(()=>{
        if(tableExist === false){
            navigate("/404")
        }
    },[tableExistLoading,tableExist,navigate])

  return (
    <main className='open-order'>
      <MetaData title={'ORDERS'} />
        <header className='open-order-header'>
            <nav className='open-order-nav'>
                <span className='open-order-nav-logo'>
                    <img src={logo} alt='logo' />
                    <p><pre>{shopName}</pre></p>
                </span>
                <span className='open-order-nav-search-bar'>
                    <form onSubmit={(e)=>e.preventDefault()}>
                        {showSearchBar && <input type='text' placeholder='Search for item' onChange={(e)=>{setSearchBoxValue(e.target.value)}} value={searchBoxValue} />}
                        <SearchRoundedIcon onClick={()=>setShowSearchBar(!showSearchBar)}  />
                    </form>
                </span>
            </nav>
            <div className='open-order-view'>
                <span className='open-order-view-tableNo'>
                <TableRestaurantIcon />
                <p>{tableNo}</p>
                {user?._id && <button onClick={()=>navigate(`/employee/tables/${shopId}`)}>All Tables</button>}
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
       <div className='right-page-middle'>
            <div>
            <div className='right-page-middle-category'>
                {categories && categories?.length > 0 && <div className='right-page-middle-category-items'>
                    <li onClick={(e)=>{categorySorting("ALL")}} className={activeTab === "ALL" ? "category-active-tab" : ""} ><pre>ALL</pre></li>
                    {categories.map((m,i)=>(
                    <li key={i} onClick={(e)=>{categorySorting(m.name.toLowerCase(),m._id)}} className={activeTab === m.name.toLowerCase() ? "category-active-tab" : ""} ><pre>{m.name}</pre></li>
                ))}
                </div>}
            </div>
            </div>
         </div>
         {activeTab && <div className='showing-result'>
                        <p>Showing Result for : {activeTab.toUpperCase()} {mealType && mealType} Items {searchBoxValue && searchBoxValue}</p>
                      </div>}
         </header>
         {itemLoading ?
         <TableLoader column={5} />
         :
         <div className='open-order-content'>
            {items && items.length >0 ?
            <>
               {items?.map((item,index)=>(
                 <div key={index} class="food-item-row">
                 <div className="food-item-image">
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
                  <button className="minus-btn"onClick={()=>handlePopCartItems(item)}>−</button>
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
              <ViewCartModal handleCartItemsChange={handleCartItemsChange} paymentCounter={paymentCounter} itemCounter={itemCounter} cartItems={cartItems} orderTableNo={tableNo} shopId={shopId}>View Cart</ViewCartModal>
            </div>
         </main>
  )
}

export default OpenOrder