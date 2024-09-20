import React, { useEffect, useRef, useState } from 'react'
import './OpenInvoice.css'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleInvoice } from '../../redux/actions/invoiceAction'
import { Link, useParams } from 'react-router-dom'
import TableLoader from '../../components/ui/Loader/TableLoader/TableLoader'
import html2canvas from "html2canvas"
import MetaData from '../../components/ui/MetaData/MetaData'

const OpenInvoice = () => {
    const [ url, setUrl ] = useState("");
    const { invoice, invoiceLoading } = useSelector(state=>state.invoice)
    const { user } = useSelector(state=>state.user);
    const dispatch = useDispatch();

    const {invoiceId} = useParams()

    const invoiceRef = useRef();

    const handleInvoiceDownload = async () => {
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
      };

    useEffect(()=>{
        dispatch(getSingleInvoice(invoiceId));
        setUrl(window.location.href)
    },[dispatch,invoiceId])
  return (
    <main className='open-invoice'>
        <MetaData title={'YOUR BILL'} />
        {invoiceLoading ?
        <TableLoader column={6} />
            :
            <>
                <div className="modal-print-bill" ref={invoiceRef}>
            <div className="modal-print-bill-header">
                <h1>{invoice?.shopId?.name}</h1>
                <p>{invoice?.shopId?.address?.line1}, {invoice?.shopId?.address?.line2}, {invoice?.shopId?.address?.pincode}, {invoice?.shopId?.address?.state}</p>
                <p>Phone: {invoice?.shopId?.phoneNo}</p>
                <p>GSTIN: {invoice?.shopId?.gstIn}</p>
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
        {user._id && <div className='open-invoice-footer'>
        <div className='open-invoice-footer-button'>
        <button onClick={() => navigator.clipboard.writeText(url)}>Copy Link</button>
        <a href={`https://api.whatsapp.com/send?text=Hello, your bill for ${invoice?.shopId?.name} is ready. Please view it here: ${url}. Thank you!`} target="_blank" rel="noreferrer">Share on WhatsApp</a>
        <a href={`sms:?body=Hello, your bill is ready. Please view it here: ${url}. Thank you!`} >Send SMS</a>
        </div>
        
        <Link to="/shops">Back to home</Link>
        </div>}
        <div className='open-invoice-footer-button'>
            <button onClick={handleInvoiceDownload}>Download</button>
        </div>
            </>
        }
    </main>
  )
}

export default OpenInvoice