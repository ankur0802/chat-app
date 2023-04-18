import { configureStore } from '@reduxjs/toolkit'
import chatSlice from './slices/chatSlice';
import messageSlice from './slices/messageSlice';
import allchatSlice from './slices/mychatsSlice';
import selectedChatSlice from './slices/selectedChatslice';
import sendmessageSlice from './slices/sendmsgSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
    reducer:{
 
        user:userSlice.reducer,
        chats:chatSlice.reducer,
        allChats:allchatSlice.reducer,
        allmessages:messageSlice.reducer,
        selectedChat:selectedChatSlice.reducer,
        sentmsg:sendmessageSlice.reducer,
 
    }
})

export default store;