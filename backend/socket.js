const Message = require("./models/Message");
const Room = require('./models/Room');


module.exports = function Socket(io) {
  const createMessage = async (sender, recipient, type, content, roomId) => {
    const createdMessage = new Message({
      from: sender,
      to: recipient,
      type,
      content,
      room: roomId,
    });
    const savedInstance = await createdMessage.save();
    const updatedRoom  = await Room.findByIdAndUpdate(roomId,{lastMessage : savedInstance._id});

    return savedInstance;
  };

  io.on("connection", (socket) => {
    const id = socket.handshake.query.id;
    socket.join(id);
    console.log("SOMEONE JOINED " + id);
    socket.on(
      "send-message",
      ({ recipients, type, content, createdAt, roomId, sender }) => {
        console.log(recipients);
        //sending message to recipients
        recipients.forEach((recipient) => {
          socket.broadcast.to(recipient._id).emit("receive-message", {
            from : sender,
            to : recipient,
            type,
            room : roomId,
            content,
            createdAt,
          });
        });
        createMessage(sender._id, recipients[0]._id, type, content, roomId);
      }
    );

    socket.on('send-notification', ({ recipients, sender, type, roomId})=>{
      console.log('Got notification', recipients,sender,type,roomId);
      recipients.forEach((recipient) => {
        socket.broadcast.to(recipient).emit("recieve-notification", {
          sender : sender,
          reciever : recipient,
          type,
          roomId,
        });
      });
    })

    // socket.on("disconn")
  });
};
