import { createContext, useContext, useState } from "react";

const ChatContext = createContext(null);

const ChatProvider = ({Children})=>{

    const [user, setUser]= useState()

    return <ChatContext.Provider value={{user, setUser}} >
             {Children}
        </ChatContext.Provider>

}

 export const ChatState = ()=>{
    return useContext(ChatContext)
 }

export default ChatProvider;