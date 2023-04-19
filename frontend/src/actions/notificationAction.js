
import {  notificationFail, notificationSuccess} from "../store/slices/notificationSlice";


//selecting chat
export const notifi = (setNotification) => async (dispatch) =>{
    try {
        
        dispatch(notificationSuccess(setNotification))  

    } catch (error) {
        dispatch(notificationFail(error.response.data.message))
        
    }
}
