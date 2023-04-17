import {   selectedChatFail, selectedChatRequest, selectedChatSuccess, notificatioFail, notificationRequest, notificationSuccess, groupFail, groupRequest, groupSuccess } from '../store/slices/chatSlice'
import {allchatFail, allchatRequest, allchatSuccess} from '../store/slices/mychatsSlice'
import axios from 'axios'

// one to one chat 
export const oneChat = (userId) => async (dispatch) =>{
    try {
        
        dispatch(selectedChatRequest())

        const config = {headers: {'Content-Type': 'application/json'}}

        const {data} = await axios.post(`/api/chat`, {userId}, config)
        console.log(data);
 
        dispatch(selectedChatSuccess(data))
        


    } catch (error) {
        dispatch(selectedChatFail(error.response.data.message))
        
    }
}


//all chats 
export const allChatss = (userId) => async (dispatch) =>{
    try {
        
        dispatch(allchatRequest())

        const config = {headers: {'Content-Type': 'application/json'}}

        const {data} = await axios.get(`/api/chat`, {userId}, config)
       
 console.log(data);
        dispatch(allchatSuccess(data))
        


    } catch (error) {
        dispatch(allchatFail(error.response.data.message))
        
    }
}



//creating group chat 
export const groupChat = ({name, users}) => async (dispatch) =>{
    try {
        
        dispatch(groupRequest())

        const config = {headers: {'Content-Type': 'application/json'}}

        const {data} = await axios.post(`/api/chat/group`, {name, users}, config)
       
 
        dispatch(groupRequest(data))
        


    } catch (error) {
        dispatch(groupFail(error.response.data.message))
        
    }
}

