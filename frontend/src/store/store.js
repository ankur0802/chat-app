import { configureStore } from '@reduxjs/toolkit'
import chatSlice from './slices/chatSlice';
import messageSlice from './slices/messageSlice';
import allchatSlice from './slices/mychatsSlice';
import notificationSlice from './slices/notificationSlice';
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
        notification:notificationSlice.reducer,
 
    }
})

export default store;