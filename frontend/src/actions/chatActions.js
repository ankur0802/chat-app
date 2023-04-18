import {   selectedChatFail, selectedChatRequest, selectedChatSuccess, notificatioFail, notificationRequest, notificationSuccess} from '../store/slices/chatSlice'
import {allchatFail, allchatRequest, allchatSuccess, groupchatFail, groupchatRequest, groupchatSuccess} from '../store/slices/mychatsSlice'
import {selectChatFail, selectChatSuccess} from '../store/slices/selectedChatslice'
import axios from 'axios'

// one to one chat 
export const oneChat = (userId) => async (dispatch) =>{
    try {
        
        dispatch(selectedChatRequest())

        const config = {headers: {'Content-Type': 'application/json'}}

        const {data} = await axios.post(`/api/chat`, {userId}, config)
      
 
        dispatch(selectedChatSuccess(data))
        


    } catch (error) {
        dispatch(selectedChatFail(error.response.data.message))
        
    }
}


//all chats 
export const allChatss = () => async (dispatch) =>{

    try {
     
        dispatch(allchatRequest())


        const {data} = await axios.get(`/api/chat`)


        dispatch(allchatSuccess(data))
        


    } catch (error) {
        dispatch(allchatFail(error.response.data.message))
        
    }
}



//creating group chat 
export const groupChat = (name, users) => async (dispatch) =>{
    try {
        
        dispatch(groupchatRequest())

        const config = {headers: {'Content-Type': 'application/json'}}

        const {data} = await axios.post(`/api/chat/group`, {name, users}, config)
       
 
        dispatch(groupchatSuccess(data))
        


    } catch (error) {
        dispatch(groupchatFail(error.response.data.message))
        
    }
}



//selecting chat
export const selectChat = (setSelectedchat) => async (dispatch) =>{
    try {
        
        dispatch(selectChatSuccess(setSelectedchat))  

    } catch (error) {
        dispatch(selectChatFail(error.response.data.message))
        
    }
}



