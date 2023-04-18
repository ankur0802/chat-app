import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allmessages: [],
};

const messageSlice = createSlice({
  name: "allmessages",
  initialState,
  reducers: {
    messageRequest(state, action) {
      
      state.Loading = true;
     
    },
    messageSuccess(state, action) {
      state.Loading = false;
      state.allmessages = action.payload;
  
     
    },
    messageFail(state, action) {
      state.Loading = false;
      state.allmessages = null;
      state.error = action.payload;
    },
    clearErrors(state,action){
        state.error=null;
    },
     
  },
});
export const { messageFail, messageRequest, messageSuccess, clearErrors} =
messageSlice.actions;

export default messageSlice;
