import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearMessages, generateTableInvoice, paidInvoice } from '../../../redux/actions/invoiceAction';
import { Modal, Tooltip } from '@mui/material';
import { billPaymentMode } from '../../../constanst';
import toast from 'react-hot-toast';
import html2canvas from "html2canvas"
import TableLoader from '../../ui/Loader/TableLoader/TableLoader';

const PrintTableBillModal = ({table, children, className, style}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const handleOnClick = () => {
        if(table?.isEmpty){
            return toast.error("No current order in this table")
        }
      handleOpen();
      dispatch(generateTableInvoice(table._id,shop._id));
    }
  
    const { shop } = useSelector(state=>state.shop);
    const { invoice, invoiceLoading, invoiceMessage } = useSelector(state=>state.invoice);
    const dispatch = useDispatch();
  
    const invoiceRef = useRef();
    const handleBillPrint =async () => {
        if (invoiceRef.current) {
            const canvas = await html2canvas(invoiceRef.current);
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `invoiceNo-${invoice?.invoiceNo}-details.png`;
        
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
    }
  
    useEffect(()=>{
      if(invoiceMessage){
        dispatch(clearMessages());
      }
    },[dispatch,invoiceMessage])
    return (
      <>
            <Tooltip title="Print">
              {children && <div className={className} style={style} onClick={handleOnClick}>{children}</div>}
            </Tooltip>
            <Modal
      open={open}
      onClose={handleClose}
      >
          <div className='modal' style={{width:"500px"}}>
          <div className='modal-heading'>
              <p>Print Bill</p>
              <p>To print Bill of this Order</p>
          </div>
          <div className='modal-content'>
          {invoiceLoading ? 
          <TableLoader column={3} />
          :
          <>
          <div className="modal-print-bill" ref={invoiceRef}>
      <div className="modal-print-bill-header">
          <h1>{shop?.name}</h1>
          <p>{shop.address.line1}, {shop.address.line2}, {shop.address.pincode}, {shop.address.state}</p>
          <p>Phone: {shop?.phoneNo}</p>
          <p>GSTIN: {shop?.gstIn}</p>
      </div>
  
      <div class="modal-print-bill-middle">
          <p><strong>Bill No:</strong> #{invoice?.invoiceNo}</p>
          <p><strong>Date:</strong> <span> {new Date(invoice?.createdAt).toLocaleString()}</span></p>
          {invoice?.customerId && <p><strong>Customer Phone:</strong> <span>{invoice?.customerId.phoneNo}</span></p>}
      </div>
  
      <div className="modal-print-bill-items">
          <table>
              <thead>
                  <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                  </tr>
              </thead>
              <tbody>
                  {invoice?.items?.map((item,i)=>
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>Rs.{item.price}</td>
                    </tr>
                  )}
              </tbody>
          </table>
      </div>
  
      <div className="modal-print-bill-payment">
          <span><strong>Total Amount({invoice?.totalItems} items)</strong></span>
          <span><strong>Rs. {invoice?.totalPayment}</strong></span>
      </div>
  
      <div className="modal-print-bill-footer" >
          <p>Thank you for dining with us!</p>
          <p>Visit Again!</p>
      </div>
  </div>
          <div className='modal-button-group'>
              <PaidBillModal invoiceId={invoice?._id} >Paid</PaidBillModal>
              <button className='success-button' onClick={handleBillPrint} >Print Bill</button>
              <button onClick={handleClose} className='close-button'>Close</button>
            </div>
            </>
}
          </div>
      </div>
      </Modal>
      </>
    )
  }
  
  export default PrintTableBillModal
  
  
  
  
  function PaidBillModal({invoiceId,children}) {
    const[paymentMode, setPaymentMode] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    const{ shop } = useSelector(state=>state.shop)
    const{ invoiceLoading } = useSelector(state=>state.invoice)
    const dispatch = useDispatch();
  
    const handlePaidBill = (e) => {
      e.preventDefault();
      if(paymentMode === ""){
        return toast.error("Select Payment mode")
      }
      dispatch(paidInvoice(invoiceId,paymentMode,shop._id));
    }
  
    return (
      <>
        <button onClick={handleOpen} className="success-button" >{children}</button>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <div className='modal' style={{width:"500px"}}>
          <div className='modal-heading'>
              <p>Print Kot</p>
              <p>To print Kot of this Order</p>
          </div>
          <div className='modal-content'>
          <form onSubmit={handlePaidBill}>
                  <div>
                      <p>Select Payment Mdoe</p>
                       <select value={paymentMode} onChange={(e)=>(setPaymentMode(e.target.value))}>
                          <option value="" >Select Mode</option>
                          {billPaymentMode && billPaymentMode.map((b,index)=>(
                          <option key={index} value={b} >{b}</option>
                          ))}
                      </select>
                  </div>
                  <button type='submit' className='success-button'>{invoiceLoading?<span className='loader'></span>:"Paid"}</button>
              </form>
              <button onClick={handleClose} className='close-button'>Close</button>
          </div>
      </div>
        </Modal>
      </>
    );
  }