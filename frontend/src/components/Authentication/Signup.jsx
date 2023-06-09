import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {register} from '../../actions/userActions'
import Loader from '../miscellaneous/Loader';


const Signup = () => {

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const { error, Loading, isAuthenticated  } = useSelector(
    (state) => state.user
  );

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('pic', pic);
    dispatch(register(myForm))
   
  };
 

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
   
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "di4mo62zm");
      fetch("https://api.cloudinary.com/v1_1/di4mo62zm/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
         
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  }


  useEffect(()=>{
  
    
    if(isAuthenticated){
    
      navigate('/chats')
    }
    

  },[dispatch, error, navigate, isAuthenticated, toast])


  return (
    <>
      {Loading? (<Loader/>):(

<VStack spacing="5px">
<FormControl id="first-name" isRequired>
  <FormLabel>Name</FormLabel>
  <Input
    placeholder="Enter Your Name"
    onChange={(e) => setName(e.target.value)}
  />
</FormControl>
<FormControl id="email" isRequired>
  <FormLabel>Email Address</FormLabel>
  <Input
    type="email"
    placeholder="Enter Your Email Address"
    onChange={(e) => setEmail(e.target.value)}
  />
</FormControl>
<FormControl id="password" isRequired>
  <FormLabel>Password</FormLabel>
  <InputGroup size="md">
    <Input
      type={show ? "text" : "password"}
      placeholder="Enter Password"
      onChange={(e) => setPassword(e.target.value)}
    />
    <InputRightElement width="4.5rem">
      <Button h="1.75rem" size="sm" onClick={handleClick}>
        {show ? "Hide" : "Show"}
      </Button>
    </InputRightElement>
  </InputGroup>
</FormControl>
<FormControl id="password" isRequired>
  <FormLabel>Confirm Password</FormLabel>
  <InputGroup size="md">
    <Input
      type={show ? "text" : "password"}
      placeholder="Confirm password"
      onChange={(e) => setConfirmpassword(e.target.value)}
    />
    <InputRightElement width="4.5rem">
      <Button h="1.75rem" size="sm" onClick={handleClick}>
        {show ? "Hide" : "Show"}
      </Button>
    </InputRightElement>
  </InputGroup>
</FormControl>
<FormControl id="pic">
  <FormLabel>Upload your Picture</FormLabel>

  <Input
    type="file"
    p={1.5}
    accept="image/*"
    onChange={(e) => postDetails(e.target.files[0])}
  />
</FormControl>
<Button
  colorScheme="blue"
  width="100%"
  style={{ marginTop: 15 }}
  onClick={submitHandler}
  isLoading={picLoading}
>
  Sign Up
</Button>
</VStack>
  )}
    </>
  );
};

export default Signup;
