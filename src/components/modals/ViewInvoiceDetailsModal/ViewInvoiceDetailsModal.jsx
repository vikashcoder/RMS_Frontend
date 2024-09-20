import { Modal, Tooltip } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import './ViewInvoiceDetailsModal.css'
import { useNavigate } from 'react-router-dom';
import html2canvas from "html2canvas"

const ViewInvoiceDetailsModal = ({invoice, children}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { shop } = useSelector(state=>state.shop);
    const navigate = useNavigate();

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

  return (
    <>
    <Tooltip title="View">
    {children && <div className='view-btn' onClick={handleOpen}>{children}</div>}
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
            <button className='success-button' onClick={handleBillPrint} >Print Bill</button>
            <button className='success-button' onClick={()=>navigate(`/invoices/paid/${invoice._id}`)} >Send Bill</button>
            <button onClick={handleClose} className='close-button'>Close</button>
          </div>
        </div>
    </div>
    </Modal>
  </>
  )
}

export default ViewInvoiceDetailsModal