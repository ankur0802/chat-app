
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import Home from '../src/components/Home/Home'
import Chat from '../src/components/Chat/Chat'

function App() {
  return (
    <div className='App' >
    <ChakraProvider>
 
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/chats' element={<Chat/>} />
      </Routes>
    </Router>
  
    </ChakraProvider>
    </div>
 
  );
}

export default App;
