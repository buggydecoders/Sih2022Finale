const Message = require('./models/Message');

module.exports = function Socket(io) {

    const createMessage = async (sender,recipient,type,content)=>{
       const createdMessage = new Message({from : sender, to : recipient,type,content });
       const savedInstance = await createdMessage.save();
       return savedInstance
    }


  io.on("connection", (socket) => {
    const id = socket.handshake.query.id;
    socket.join(id);
    console.log("SOMEONE JOINED " + id);

    socket.on(
      "send-message",
      ({ recipients, type, content, createdAt, roomId, sender }) => {
          createMessage(sender,recipients[0], type,content);
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
