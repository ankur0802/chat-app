import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allChats: [],
};

const allchatSlice = createSlice({
  name: "allchats",
  initialState,
  reducers: {
    allchatRequest(state, action) {
      
      state.Loading = true;
     
    },
    allchatSuccess(state, action) {
      state.Loading = false;
      state.allChats = action.payload;
  
     
    },
    allchatFail(state, action) {
      state.Loading = false;
      state.allChats = null;
      state.error = action.payload;
    },
    clearErrors(state,action){
        state.error=null;
    },
   
  
     
  },
});
export const { allchatFail, allchatRequest, allchatSuccess, clearErrors} =
allchatSlice.actions;

export default allchatSlice;

