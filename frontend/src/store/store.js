import { configureStore } from '@reduxjs/toolkit'
import chatSlice from './slices/chatSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
    reducer:{
 
        user:userSlice.reducer,
        chats:chatSlice.reducer,
 
    }
})

export default store;