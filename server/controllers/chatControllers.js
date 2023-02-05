
const Chat = require('../model/chatModel')
const asyncHandler = require('express-async-handler')
const User = require("../model/UserModel");
const accessChat = asyncHandler(async (req, res) => {

    const {userId}=req.body;

    if(!userId){
        res.status(400)
        throw new Error('UserId params not sent with request')
    }
    
    var isChat = await Chat.find({isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}}
            ,{users:{$elemMatch:{$eq:userId}}}
        ]}).populate("users","-password").populate("latestMessage")

isChat= await User.populate(isChat,{
    path:"latestMessage.sender",
    select:"name pic email"
})
if(isChat.length > 0){
    console.log("ehhehhehe");
    console.log(isChat[0])
    res.send(isChat[0])
}else{
   
   
    var chatData={
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id,userId]
    }

    try{
        const createdChat = await Chat.create(chatData)
        const Fullchat = await Chat.findOne({_id:createdChat._id}).populate("users","-password")
        res.status(200).send(Fullchat)
    }catch(error){
        res.status(400)
        throw new Error(error.message)
    }
}
})


module.exports = accessChat