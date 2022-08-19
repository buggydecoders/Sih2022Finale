const Room = require('../models/Room');
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync');
const User =require('../models/User');
const Message = require('../models/Message');


exports.fetchRoom = catchAsync(async (req, res, next) => {
    let {user1,user2} = req.body;
    if (!user1 || !user2) return next(new AppError("Please give two valid users", 400));
    const isUsers = await User.find({_id : {"$in" : [user1,user2]}});
    if (isUsers.length<2) return next(new AppError("Users were not found!", 404))
    let isRoom = await Room.find({users : {"$in" : [user1]}}).populate('users').populate('lastMessage');
    isRoom = isRoom.filter(r=>{
        if (r.users[0].id===user2 || r.users[1].id===user2) return r;
    })
    if (isRoom.length===0) isRoom = false;
    else isRoom = isRoom[0];

    if (isRoom) return res.json({
        status : true,
        isNew : false,
        room : isRoom,
    });
    const newRoom = new Room({
        users : [user1,user2]
    });

    const savedNewRoom = await newRoom.save();
    let roomPopulated = await Room.findById(savedNewRoom.id).populate('users').populate('lastMessage');
    res.json({
        status : true,
        isNew : false,
        room : roomPopulated
    });
});


exports.fetchRooms = catchAsync(async(req,res,next)=>{
    const allRooms = await Room.find({users : {"$in" : [req.user.id]}}).populate('users').populate('lastMessage');
    res.json({
        status : true,
        rooms : allRooms
    })
});


exports.fetchMessagesByRoom = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    // console.log(id);
    const messages = await Message.find({room : id}).populate('from').populate('to');
    res.json({
        status : true,
        room : id,
        messages : messages
    });
})
