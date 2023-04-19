import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChat: {},
};

const selectedChatSlice = createSlice({
  name: "selectedChat",
  initialState,
  reducers: {

    selectChatSuccess(state,action){
      
      state.selectedChat = action.payload;
      
    },
    selectChatFail(state,action){

      state.selectedChat = null;
      state.error = action.payload;
    },
    selectChatReset(state,action){

      state.selectedChat = null;
      
    },
   
     
  },
});
export const { selectChatFail, selectChatSuccess, selectChatReset } =
selectedChatSlice.actions;

export default selectedChatSlice;
