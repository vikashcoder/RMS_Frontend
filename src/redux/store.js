import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './reducers/themeReducer';
import areaSlice from './reducers/areaReducer'
import tableSlice from './reducers/tableReducer'
import categorySlice from './reducers/categoryReducer'
import itemSlice from './reducers/itemReducer'
import userSlice from './reducers/userReducer'
import shopSlice from './reducers/shopReducer'
import customerSlice from './reducers/customerReducer'
import orderSlice from './reducers/orderReducer'
import invoiceSlice from './reducers/invoiceReducer'
import inventorySlice from './reducers/inventoryReducer'
import employeeSlice from './reducers/employeeReducer'

const store = configureStore({
    reducer: {
        theme : themeSlice,
        area : areaSlice,
        table : tableSlice,
        category : categorySlice,
        item : itemSlice,
        user : userSlice,
        shop : shopSlice,
        customer : customerSlice,
        order : orderSlice,
        invoice : invoiceSlice,
        inventory : inventorySlice,
        employee : employeeSlice
    },
  });
  
export default store;
  
// export const server = "https://rms-server-1.onrender.com/api/v1";
export const server = "http://127.0.0.1:8000/api/v1";

