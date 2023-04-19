import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
    Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  Badge,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProfileModel from "./ProfileModel";
import axios from 'axios'
import Chatloading from "./Chatloading";
import UserListItem from "../UserAvatar/UserListItem";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { oneChat, selectChat } from "../../actions/chatActions";
import { getSender } from "../../config/ChatLogics";
import { notifi } from "../../actions/notificationAction";



const SideDrawer = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast()

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user } = useSelector(
    (state) => state.user
  );

  const { notification } = useSelector((state) => state.notification);

  


  const { isOpen, onOpen, onClose } = useDisclosure()

  const handelSearch = async()=>{
    if(!search){
        toast({
            title:'Please enter something in search',
            status:'warning',
            duration:5000,
            isClosable:true,
            position:'top-left'
        })
    }

    try {
        setLoading(true)

        const config = {headers: {'Content-Type': 'multipart/form-data'}}
        
        const {data} = await axios.get(`/api/user?search=${search}`, config)
        setLoading(false)

        setSearchResult(data)
        
    } catch (error) {
        toast({
            title:'Error occured',
            description:'failed to load the search result',
            status:'error',
            duration:5000,
            isClosable:true,
            position:'top-left'
        })
        
    }

  }

  const accessChat = async(userId)=>{

    try {
      setLoadingChat(true)

      dispatch(oneChat(userId))

      setLoadingChat(false)
      onClose()
      
    } catch (error) {

      toast({
        title:'Error fetching the chat',
        description: error.message,
        status:'error',
        duration:5000,
        isClosable:true,
        position:'top-left'
    })
    }

  }


  const logoutHandler = ()=>{

    dispatch(logout())
    localStorage.clear('token')
    toast({
      title:'Logout successfull',
      status:'success',
      duration:5000,
      isClosable:true,
      position:'top-left'
  })
    navigate('/')

  }

  return (
    <>
      <Box
        display="flex"onClose
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost"  onClick={onOpen}>
            <FaSearch />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search user
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sansonClose">
          Chat-App
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            <Badge colorScheme='red' variant='solid' mr='1' >{notification.length}</Badge>
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && 'No new Messages'}
              {notification.map(notif => (
                <MenuItem key={notif._id} onClick={()=>{
                  dispatch(selectChat(notif.chat));
                  let newnotification = notification.filter((n)=> n !== notif)
                  dispatch(notifi(newnotification))

                }}>
                  {notif.chat.isGroupChat?`New Message in ${notif.chat.chatName}`:`New Message From ${getSender(user, notif.chat.users)}`}

                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon = {<ChevronDownIcon/>}>
          
                <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic} />
              
            </MenuButton>
            <MenuList>
             <ProfileModel user={user}>
                <MenuItem >My Profile</MenuItem>
                </ProfileModel>
                <MenuDivider/>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>
                    Search Users
                </DrawerHeader>

                <DrawerBody>
                <Box display='flex' pb={2}>
                    <Input 
                        placeholder="search by name or email"
                        mr={2}
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                    />
                    <Button onClick={handelSearch} >Go</Button>
                </Box>

                {loading? (<Chatloading/>):(
                  searchResult?.map(user => (
                    <UserListItem 
                     key={user._id}
                     user={user}
                     handleFunction={()=>accessChat(user._id)}
                    />
                  ))
                )}

                {loadingChat && <Spinner ml='auto' display='flex' />}

            </DrawerBody>

            </DrawerContent>

        </Drawer>

    </>
  );
};

export default SideDrawer;
