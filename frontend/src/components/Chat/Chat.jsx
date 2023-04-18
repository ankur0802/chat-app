import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SideDrawer from '../miscellaneous/SideDrawer'
import ChatBox from './ChatBox'
import MyChats from './MyChats'
import { allChatss } from '../../actions/chatActions'

const Chat = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { user } = useSelector(
    (state) => state.user
  );



  const { allChats } = useSelector(
    (state) => state.allChats
  );

  

  useEffect(() => {
    if(user){
      dispatch(allChatss(user._id))
    }
  
  }, [ user, navigate,dispatch])
  

  
  return (
    <div style={{width: '100%'}}>
      {user && <SideDrawer/>}

      <Box display='flex' justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>

    </div>
  )
}

export default Chat