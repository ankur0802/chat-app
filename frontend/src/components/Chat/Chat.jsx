import { Box } from '@chakra-ui/react'
import React from 'react'
import SideDrawer from '../miscellaneous/SideDrawer'
import ChatBox from './ChatBox'
import MyChats from './MyChats'

const Chat = () => {
  const user = true;
  return (
    <div style={{width: '100%'}}>
      {user && <SideDrawer/>}

      <Box display='flex' justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
        {user && <MyChats/>}
        {user && <ChatBox/>}
      </Box>

    </div>
  )
}

export default Chat