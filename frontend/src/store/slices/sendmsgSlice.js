import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sendedmsg: [],
};

const sendmessageSlice = createSlice({
  name: "sendedmsg",
  initialState,
  reducers: {
    sendmessageRequest(state, action) {
      state.Loading = true;
    },
    sendmessageSuccess(state, action) {
      
      state.Loading = false;
      state.sendedmsg = action.payload;
     
    },
    sendmessageFail(state, action) {
      state.Loading = false;
      state.sendedmsg = null;
      state.error = action.payload;
    },
    clearErrors(state,action){
        state.error=null;
    },
     
  },
});
export const { sendmessageFail, sendmessageRequest, sendmessageSuccess, clearErrors} =
sendmessageSlice.actions;

export default sendmessageSlice;
