import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notification: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {

    notificationSuccess(state,action){
      
      state.notification = action.payload;
      
    },
    notificationFail(state,action){

      state.notification = null;
      state.error = action.payload;
    },
    notificationReset(state,action){

      state.notification = null;
      
    },
   
     
  },
});
export const { notificationFail, notificationSuccess, notificationReset } =
notificationSlice.actions;

export default notificationSlice;
