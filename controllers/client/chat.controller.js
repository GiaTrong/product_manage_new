// [GET] /chat/
module.exports.index = async (req, res) => {
  // socketIO
  _io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
  });

  res.render("client/pages/chat/index.pug", {
    pageTitle: "Trang chu",
  });
};
 