import { configureStore } from '@reduxjs/toolkit'
import chatSlice from './slices/chatSlice';
import allchatSlice from './slices/mychatsSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
    reducer:{
 
        user:userSlice.reducer,
        chats:chatSlice.reducer,
        allChats:allchatSlice.reducer,
 
    }
})

export default store;