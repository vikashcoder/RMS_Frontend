import React, { useEffect, useState } from 'react'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {useDispatch} from 'react-redux';
import { updateTheme } from '../../../redux/actions/themeAction';
import { Tooltip } from '@mui/material';

function ToggleMode() {
    const [isDarkMode, setDarkMode] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(updateTheme(isDarkMode ? 'dark' : 'light'));   
    },[dispatch,isDarkMode])

    return (
            <>
                <Tooltip title="Swicth-Mode">{!isDarkMode ? <WbSunnyIcon onClick={()=>setDarkMode(!isDarkMode)} className='icon' />
                : <DarkModeIcon onClick={()=>setDarkMode(!isDarkMode)} className='icon' />}</Tooltip>
            </>
    )
}
export default ToggleMode;