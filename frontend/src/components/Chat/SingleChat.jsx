import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import "./styles.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import { useEffect, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "../miscellaneous/ProfileModel";
import ScrollableChat from "./ScrollableChat";
import Lottie from "lottie-react";
import animationData from "../../animations/typing.json";

import io from "socket.io-client";
import UpdateGroupChatModal from "../miscellaneous/UpdateGroupChatModal";
import { useSelector, useDispatch } from "react-redux";
import { getallmessages } from "../../actions/messageActions";
import axios from "axios";
import { notifi } from "../../actions/notificationAction";
import { selectChatReset } from "../../store/slices/selectedChatslice";
import { useNavigate } from 'react-router-dom';

const ENDPOINT = "http://localhost:4000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

const SingleChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();


  const dispatch = useDispatch();
  const navigate = useNavigate();


  // dispatch(notifi(notification))

  const { user } = useSelector((state) => state.user);
  const { selectedChat } = useSelector((state) => state.selectedChat);

  const { allmessages } = useSelector((state) => state.allmessages);
  const { notification } = useSelector((state) => state.notification);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    await setMessages(allmessages);

    setLoading(false);

    socket.emit("join chat", selectedChat._id);
  };

  useEffect(() => {
    if (selectedChat) {
      const chatId = selectedChat._id;

      dispatch(getallmessages(chatId));
    }
  }, [selectedChat, dispatch]);

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const myForm = new FormData();

        myForm.append("content", newMessage);
        myForm.append("chatId", selectedChat._id);

        const config = { headers: { "Content-Type": "application/json" } };
        setLoading(true);

        const { data } = await axios.post(`/api/messages`, myForm, config);

        setNewMessage("");

        setMessages([...messages, data]);

        setLoading(false);

        socket.emit("new message", data);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat, allmessages]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
       
    
      if (
        !selectedChatCompare || // if selectedChat is not selected or doesn't match current selectedChat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          dispatch(notifi([newMessageRecieved, ...notification]))
          // setNotification([newMessageRecieved, ...notific]);
          // setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => {
                dispatch(selectChatReset())
                navigate('/')
              }}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal fetchMessages={fetchMessages} />
                </>
              ))}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
                
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
               {istyping ? (
                <div>
                   <Lottie
                    animationData={animationData} 
                     
                    style={{ marginBottom: 15, marginLeft: 0, width:70}}
                   />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start Chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
