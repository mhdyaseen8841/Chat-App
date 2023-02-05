const mongoose = require('mongoose')

const chatModel = mongoose.Schema(
    {
        chatName:{type:String,trim:true},

        idGroupChat:{type:Boolean,default:false},
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },],
        latestMessage:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message"
        },
        groupAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    }
    ,{
        timestamps:true,
    }
)

const chat =mongoose.model("Chat",chatModel)
export default chat
// chatName
// isGroupChat
// users
// latestMessage
// groupAdmin
