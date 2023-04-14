import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import {login, clearError} from '../../actions/userActions'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Loader from '../miscellaneous/Loader';


const Login = () => {

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const { error, Loading, isAuthenticated  } = useSelector(
    (state) => state.user
  );

    const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  

  const submitHandler= (e)=>{
    e.preventDefault();
    dispatch(login(email, password))
  }


  useEffect(()=>{
    if(error){
      toast({
        title: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      dispatch(clearError())
      
    }
    
    if(isAuthenticated){
    
     
      navigate('/chats')
    }
    

  },[dispatch, error, navigate, isAuthenticated, toast])

  return (

    <>
    {Loading? (<Loader/>):(
         <VStack spacing="10px">
         <FormControl id="email" isRequired>
           <FormLabel>Email Address</FormLabel>
           <Input
             value={email}
             type="email"
             placeholder="Enter Your Email Address"
             onChange={(e) => setEmail(e.target.value)}
           />
         </FormControl>
         <FormControl id="password" isRequired>
           <FormLabel>Password</FormLabel>
           <InputGroup size="md">
             <Input
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               type={show ? "text" : "password"}
               placeholder="Enter password"
             />
             <InputRightElement width="4.5rem">
               <Button h="1.75rem" size="sm" onClick={handleClick}>
                 {show ? "Hide" : "Show"}
               </Button>
             </InputRightElement>
           </InputGroup>
         </FormControl>
         <Button
           colorScheme="blue"
           width="100%"
           style={{ marginTop: 15 }}
           onClick={submitHandler}
           isLoading={Loading}
         >
           Login
         </Button>
         <Button
           variant="solid"
           colorScheme="red"
           width="100%"
           onClick={() => {
             setEmail("guest@example.com");
             setPassword("123456");
           }}
         >
           Get Guest User Credentials
         </Button>
       </VStack>

    )}
    </>
   
 

  )
}

export default Login