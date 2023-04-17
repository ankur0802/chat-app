const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const Errorhandler = require("../utils/errorhandler");

// sending messages 
exports.sendMessage = catchAsyncErrors(async(req, res, next)=>{

    const { content, chatId } = req.body;
    

    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
    let newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
  
    try {
      let message = await Message.create(newMessage);
  
      message = await message.populate("sender", "name pic");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });
  
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
      
  
      res.json(message);

    } catch (error) {
      
      return next(new Errorhandler(error.message , 400))
    }
    
})

// get all messages 
exports.allMessages = catchAsyncErrors(async(req, res, next)=>{

    try {
        const messages = await Message.find({ chat: req.params.chatId })
          .populate("sender", "name pic email")
          .populate("chat");
        res.json(messages);
      } catch (error) {
          return next(new Errorhandler(error.message , 400))
      }

})