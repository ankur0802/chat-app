const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Chat = require('../models/chatModel');
const User = require("../models/userModel");
const Errorhandler = require("../utils/errorhandler");

// One to one chat 
exports.accessChat = catchAsyncErrors(async(req, res, next)=>{

    const {userId} = req.body;
    if(!userId){
        
        return res.sendStatus(400).json({
            message:'userId params not sent with request'
        });
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {users: { $elemMatch: { $eq: req.user._id}}},
            {users: { $elemMatch: { $eq: userId}}},
        ]
    })
     .populate('users', '-password')
       .populate('latestMessage');

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name pic email'
    });

    if(isChat.length > 0){
        res.send(isChat[0]);
    }else{
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }

        try{
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                'users',
                '-password'
            )

            res.status(200).send(FullChat);
        }catch(error){
            return next( new Errorhandler(error.message, 400)) 
        }

    }

})

// fetcg all chats for particular user 
exports.fetchChats = catchAsyncErrors(async(req, res, next)=>{
    try{
        Chat.find({users: {$elemMatch: { $eq: req.user._id}}})
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
        .populate('users', '-password')
        .populate('latestMessage')
        .sort({updatedAt: -1})
        .then(async(results)=>{
         results = await User.populate(results, {
             path: "latestMessage.sender",
             select: "name, pic, email"
         })
         res.status(200).send(results)
         
        })
       

    }catch(error){
        return next( new Errorhandler(error.message, 400)) 
    }

  
      

})

// creating group chat 
exports.createGroupChat = catchAsyncErrors(async(req, res, next)=>{

    if(!req.body.users || !req.body.name){
        return next(new Errorhandler('Please fill all the fields', 400))
    }
    
    // let users = JSON.parse(req.body.users);
    let users = req.body.users
   
    users.push(req.user)

    if(users.length < 2){
        return next( new Errorhandler('more than 2 users are required to form a group chat', 400))
    }
   
     const groupChat = await Chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
     })
     
     const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
       .populate('users', '-password')
       .populate('groupAdmin', '-password')

       res.status(200).json(fullGroupChat)
   
})


// rename group 
exports.renameGroup = catchAsyncErrors(async(req, res, next)=>{

    const {chatId, chatName} = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName:chatName }, {new: true})
       .populate('users', "-password")
       .populate('groupAdmin', "-password")

    if(!updatedChat){
        return next(new Errorhandler('Chat not found', 404))
    }else{
        res.status(200).json(updatedChat)
    }

})

// add user to group 
exports.addToGroup = catchAsyncErrors(async(req, res, next)=>{

    const {chatId, userId} = req.body;

    const added = await Chat.findByIdAndUpdate(chatId, {$push: {users: userId}}, {new:true})
       .populate('users', '-password')
       .populate('groupAdmin', '-password')

       if(!added){
        return next(new Errorhandler('Chat not found', 404))
    }else{
        res.status(200).json(added)
    }
})

// remove from group 
exports.removeFromGroup = catchAsyncErrors(async(req, res ,next)=>{

    const {chatId, userId} = req.body;

    const removed = await Chat.findByIdAndUpdate(chatId, {$pull: {users: userId}}, {new:true})
       .populate('users', '-password')
       .populate('groupAdmin', '-password')

       if(!removed){
        return next(new Errorhandler('Chat not found', 404))
    }else{
        res.status(200).json(removed)
    }

})
