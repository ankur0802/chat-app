import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


function Protected({ isAuthenticated, children }) {

  const {Loading, user} = useSelector((state)=>state.user)

  if(Loading===false){
    if (isAuthenticated === false) {
      return <Navigate to="/" replace />
    }
    
    return children
  }

  
}
export default Protected