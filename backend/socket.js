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
    const updatedRoom  = Room.findByIdAndUpdate(roomId,{lastMessage : savedInstance._id});

    return savedInstance;
  };

  io.on("connection", (socket) => {
    const id = socket.handshake.query.id;
    socket.join(id);
    console.log("SOMEONE JOINED " + id);


    socket.on(
      "send-message",
      ({ recipients, type, content, createdAt, roomId, sender }) => {

        createMessage(sender, recipients[0], type, content, roomId);
        //sending message to recipients
        recipients.forEach((recipient) => {
          socket.broadcast.to(recipient).emit("receive-message", {
            sender: id,
            type,
            roomId,
            content,
            createdAt,
          });
        });
      }
    );
  });
};
