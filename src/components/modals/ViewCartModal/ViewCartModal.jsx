import { Modal, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import './ViewCartModal.css'
import PlaceOrderModal from '../PlaceOrderModal/PlaceOrderModal';

const ViewCartModal = ({handleCartItemsChange, orderTableNo, cartItems,paymentCounter, itemCounter, children, shopId, shopName}) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showCartItems, setShowCartItems] = useState(cartItems && cartItems)

  const itemReduceHandler = (i) => {
    const index = showCartItems.findIndex((c)=>{return c.foodItemId === i.foodItemId})
    if(showCartItems[index].qty === 1){
      deleteCartItems(i,paymentCounter - i.price)
      return;
    }
    showCartItems[index].qty -= 1;
    handleCartItemsChange([...showCartItems],paymentCounter - i.price,itemCounter-1)
  }
  
  const itemIncreaseHandler = (i) => {
    const index = showCartItems.findIndex((c)=>{return c.foodItemId === i.foodItemId})
        showCartItems[index].qty += 1;
        handleCartItemsChange([...showCartItems],paymentCounter + i.price,itemCounter+1)
  }

  const deleteCartItems = (item) => {
    handleCartItemsChange(showCartItems.filter((c)=>{return item.foodItemId !== c.foodItemId}),paymentCounter - (item.qty * item.price),itemCounter-item.qty)
  }

  useEffect(()=>{
    setShowCartItems(cartItems)
    if(showCartItems.length === 0){
        handleClose()
    }
  },[cartItems,showCartItems])

  return (
    <>
        {children && <button onClick={handleOpen} className="cart-popup-button">{children}</button>}

        <Modal
    open={open}
    onClose={handleClose}
    >
        <div className='modal'>
        <div className='modal-heading'>
            <p>Your Cart</p>
            <p>To view, edit cart items</p>
        </div>
        <div className='modal-content' style={{width: "90%"}}>
        <div className='right-page-order-table' style={{borderRadius:"10px",padding:"10px"}}>
                    <table style={{paddingBottom: "20px", borderBottom: "2px solid var(--lightgrey2)"}}>
                      <thead>
                        <th>Items</th>
                        <th>Qty</th>
                        <th>Price</th>
                      </thead>
                      <tbody>
                        {showCartItems.length > 0 && showCartItems.map((c,i)=>(
                          <tr key={i}>
                            <td>{c.name}</td>
                            <td><div><Tooltip title="Deduct"><RemoveIcon onClick={()=>itemReduceHandler(c)} /></Tooltip>{c.qty}<Tooltip title="Add"><AddIcon onClick={()=>itemIncreaseHandler(c)} /></Tooltip></div></td>
                            <td>{c.price}</td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                    <span style={{display:"flex", alignItems:"center", justifyContent:"space-between",margin:"5px 0"}}>
                        <h3 style={{fontSize:"16px",fontWeight:"500", color:"var(--darkgrey2)"}}>Total Payment</h3>
                        <h3 style={{fontSize:"16px",fontWeight:"500", color:"var(--darkgrey2)"}}>Rs. {paymentCounter}</h3>
                    </span>
                    <div class="special-request">
                       <label>Special Request:</label>
                       <textarea rows="4" placeholder="Any preferences? (e.g., extra spicy, no onions)"></textarea>
                     </div>
              </div>

              <PlaceOrderModal cartItems={showCartItems} orderTableNo={orderTableNo} paymentCounter={paymentCounter} itemCounter={itemCounter} kotType={"DINEIN"} shopId={shopId} shopName={shopName}>Place Order</PlaceOrderModal>
            <button onClick={handleClose} className='close-button'>Order More</button>
        </div>
    </div>
    </Modal>
    </>
  )
}

export default ViewCartModal