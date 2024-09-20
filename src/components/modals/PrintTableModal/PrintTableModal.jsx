import React, { useEffect, useRef, useState } from 'react'
import './PrintTableModal.css'
import { Modal, Tooltip } from '@mui/material'
import logo from '../../../assets/logo.svg'
import QRCode from 'qrcode'
import { frontend } from '../../../constanst'
import html2canvas from "html2canvas"
import { useSelector } from 'react-redux'

const PrintTableModal = ({table,children}) => {

  const [src, setSrc] = useState("")
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const qrRef = useRef();

  const { shop } = useSelector(state=>state.shop);

// eslint-disable-next-line
const generateQR = async (text) => {
  try {
    setSrc(await QRCode.toDataURL(text))
  } catch (err) {
    console.error(err)
  }
}

const handleQrDownload = async () => {
  if (qrRef.current) {
    const canvas = await html2canvas(qrRef.current);
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = `tableNo-${table.name}-details.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

  useEffect(()=>{
    generateQR(`${frontend}/${shop?._id}/${table?.name}`)
  },[generateQR,shop,table.name])

  return (<>
    <Tooltip title="Print">
    {children && <div onClick={handleOpen} className='print-btn'>{children}</div>}
    </Tooltip>
    <Modal
    open={open}
    onClose={handleClose}
    >
        <>
        <div className='modal' style={{width:"500px"}}>
        <div className='modal-heading'>
            <p>Print Table</p>
            <p>To Edit Book with name, seats, shape</p>
        </div>
        <div className='modal-content'>
          <div className='modal-print-url tab-view' ref = {qrRef}>
            <header>
            <img src={logo} alt='logo' />
            <h1>restura.</h1>
            </header>
            <span>
              <h1>Scan to Place Order</h1>
            </span>
            <h3>Table No. {table.name}</h3>
            <h2>{shop.name}</h2>
            <a href={`${frontend}/${shop?._id}/${table?.name}`} className='qr-img'>
              <img src={src} alt="qrcode" />
            </a>
            <p>Please Open Google Lens to scan the code</p>
          </div>
    <div className='mobile-view'>
      <h1>View on Desktop</h1>
    </div>
        <div className='modal-button-group'>
            <button className='success-button tab-view' onClick={handleQrDownload} >Download</button>
            <button onClick={handleClose} className='close-button'>Close</button>
          </div>
        </div>
    </div>
        </>
    </Modal>
  </>
  )
}

export default PrintTableModal