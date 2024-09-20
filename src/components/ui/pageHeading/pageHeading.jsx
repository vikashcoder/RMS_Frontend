import React, { useState } from 'react'
import './PageHeading.css'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Tooltip } from '@mui/material';

const PageHeading = ({heading, subHeading, searchHandler, placeholder, button, tooltip }) => {
    const [searchBoxValue, setSearchBoxValue] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        searchHandler(searchBoxValue);
    }

  return (
    <div className='page-heading'>
        <div className='page-heading-left'>
                <p>{heading}</p>
                <p>{subHeading}</p>
        </div>
        <div className='page-heading-right'>
            {placeholder && <form className='page-heading-searchBox' onSubmit={submitHandler}>
                <input type='text' placeholder={`Search ${placeholder}`} onChange={(e)=>{setSearchBoxValue(e.target.value)}} value={searchBoxValue}/>
                <Tooltip title="Search">
                <SearchRoundedIcon onClick={submitHandler}  />
                </Tooltip>
            </form>}
            {button && <Tooltip title={tooltip}>{button}</Tooltip>}
        </div>
    </div>
  )
}

export default PageHeading