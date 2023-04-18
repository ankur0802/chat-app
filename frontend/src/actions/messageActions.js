import { messageFail, messageRequest, messageSuccess, clearErrors } from '../store/slices/messageSlice'
import {sendmessageFail, sendmessageRequest, sendmessageSuccess} from '../store/slices/sendmsgSlice'
import axios from 'axios'



//all chats 
export const getallmessages = (chatId) => async (dispatch) =>{

    try {
     
        dispatch(messageRequest())


        const {data} = await axios.get(`/api/messages/${chatId}`)


        dispatch(messageSuccess(data))
        


    } catch (error) {
        dispatch(messageFail(error.response.data.message))
        
    }
}




//sending message
export const sendmsg = (sendingData) => async (dispatch) =>{

    try {
        dispatch(sendmessageRequest())

        const config = {headers: {'Content-Type': 'application/json'}}

        const {data} = await axios.post(`/api/messages`, sendingData, config)


        dispatch(sendmessageSuccess(data))
        


    } catch (error) {
        dispatch(sendmessageFail(error.response.data.message))
        
    }
}




// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(clearErrors());
}
