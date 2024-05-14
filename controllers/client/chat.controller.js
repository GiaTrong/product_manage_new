const Chat = require("../../models/chat.model");
const User = require("../../models/users.model");

// [GET] /chat/
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id; // lấy bên authen
  const fullName = res.locals.user.fullName;

  // socketIO
  // sự kiện  => khi có người đăng nhập vào
  // on: cứ mỗi lần => load lại trang là kết nối mới
  // once: kết nối 1 LẦN DUY NHẤT khi vào
  _io.once("connection", (socket) => {
    // lắng nghe sự kiện bên client gửi sang
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      const chat = new Chat({
        user_id: userId,
        content: content,
      });

      await chat.save();

      // trả về data cho client
      _io.emit("SERVER_RETURN_MESSAGE", {
        fullName: fullName,
        userId: userId,
        content: content,
      });
    });

    //  CLIENT_SEND_TYPING
    socket.on("CLIENT_SEND_TYPING", (type) => {
      socket.broadcast.emit("SERVER_RETURN_TYPING", {
        userId: userId,
        fullName: fullName,
        type: type,
      });
    });
  });

  // lấy ra tất cả data
  const chats = await Chat.find({
    deleted: false,
  });

  for (const chat of chats) {
    const infoUser = await User.findOne({ _id: chat.user_id }).select(
      "fullName"
    );

    chat.infoUser = infoUser;
  }

  res.render("client/pages/chat/index.pug", {
    pageTitle: "Trang chu",
    chats: chats,
  });
};
