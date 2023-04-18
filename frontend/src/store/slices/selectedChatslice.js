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
   
     
  },
});
export const { selectChatFail, selectChatSuccess } =
selectedChatSlice.actions;

export default selectedChatSlice;
