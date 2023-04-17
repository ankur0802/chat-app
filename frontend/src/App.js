
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import Home from '../src/components/Home/Home'
import Chat from '../src/components/Chat/Chat'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import store from './store/store';
import { loadUser } from './actions/userActions';
import Protected from './Route/Procted';


function App() {

const { isAuthenticated, user } = useSelector(
  (state) => state.user
);

  const dispatch = useDispatch();

  useEffect(() => {

  store.dispatch(loadUser())
   
  }, [])
  


  return (
    <div className='App' >
    <ChakraProvider>
 
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/chats' element={
             <Protected isAuthenticated={isAuthenticated}>
             <Chat/>
           </Protected>
         } />
      </Routes>
    </Router>
  
    </ChakraProvider>
    </div>
 
  );
}

export default App;
