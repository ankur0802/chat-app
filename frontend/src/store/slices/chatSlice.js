import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: {},
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    allchatRequest(state, action) {
      
      state.Loading = true;
     
    },
    allchatSuccess(state, action) {
      state.Loading = false;
      state.chats = action.payload;
  
     
    },
    allchatFail(state, action) {
      state.Loading = false;
      state.chats = null;
      state.error = action.payload;
    },
    groupRequest(state, action) {
      
      state.Loading = true;
     
    },
    groupSuccess(state, action) {
      state.Loading = false;
      state.chats = action.payload;
  
     
    },
    groupFail(state, action) {
      state.Loading = false;
      state.chats = null;
      state.error = action.payload;
    },
    clearErrors(state,action){
        state.error=null;
    },
   
    selectedChatRequest(state,action){
        state.Loading = true;
       
    },
    selectedChatSuccess(state,action){
        state.Loading = false;
      state.selectedChat = action.payload;
      
    },
    selectedChatFail(state,action){
        state.Loading = false;
      state.selectedChat = null;
      state.error = action.payload;
    },
    notificationRequest(state,action){
        state.Loading = true;
    
    },
  
    notificationSuccess(state,action){
      state.Loading = false;
      state.notification = action.payload;
      
       
    },
    notificatioFail(state,action){
        state.Loading = false;
      state.error = action.payload;
    },
     
  },
});
export const { allchatFail, allchatRequest, allchatSuccess, clearErrors, selectedChatFail, selectedChatRequest, selectedChatSuccess, notificatioFail, notificationRequest, notificationSuccess , groupFail, groupRequest, groupSuccess } =
chatSlice.actions;

export default chatSlice;
