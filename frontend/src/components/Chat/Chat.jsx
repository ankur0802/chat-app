import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import SideDrawer from '../miscellaneous/SideDrawer'
import ChatBox from './ChatBox'
import MyChats from './MyChats'

const Chat = () => {

  const user = {
    name:"Ankur",
    email:"ankur@gmail.com",
    pic:"http://res.cloudinary.com/di4mo62zm/image/upload/v1681292108/tvbreq4xxxvfgmmpfgzf.jpg"

}

const [fetchAgain, setFetchAgain] = useState(false)
  
  return (
    <div style={{width: '100%'}}>
      {user && <SideDrawer/>}

      <Box display='flex' justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
        {user && <MyChats fetchAgain={fetchAgain}/>}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>

    </div>
  )
}

export default Chat