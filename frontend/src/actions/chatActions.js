import { chatFail, chatRequest, chatSuccess, clearErrors , selectedChatFail, selectedChatRequest, selectedChatSuccess, notificatioFail, notificationRequest, notificationSuccess } from '../store/slices/chatSlice'
import axios from 'axios'

// one to one chat 
export const oneChat = (userId) => async (dispatch) =>{
    try {
        
        dispatch(chatRequest())

        const config = {headers: {'Content-Type': 'application/json'}}

        const {data} = await axios.post(`/api/chat`, {userId}, config)
        console.log(data);
 
        dispatch(chatSuccess(data))
        


    } catch (error) {
        dispatch(chatFail(error.response.data.message))
        
    }
}