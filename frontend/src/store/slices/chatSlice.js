import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: {},
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    chatRequest(state, action) {
      
      state.Loading = true;
     
    },
    chatSuccess(state, action) {
      state.Loading = false;
      state.chats = action.payload;
  
     
    },
    chatFail(state, action) {
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
export const { chatRequest, chatSuccess, chatFail, clearErrors, selectedChatFail, selectedChatRequest, selectedChatSuccess, notificatioFail, notificationRequest, notificationSuccess} =
chatSlice.actions;

export default chatSlice;
