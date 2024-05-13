// CLIENT_SEND_MESSAGE
const formsendData = document.querySelector(".chat .inner-form");
if (formsendData) {
  formsendData.addEventListener("submit", (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    if (content) {
      // emit events: sự kiện trả về hoặc gửi đi của socketIO
      // socket ấy ở trong file socket.js
      socket.emit("CLIENT_SEND_MESSAGE", content);
      e.target.content.value = "";
    }
  });
}
// END CLIENT_SEND_MESSAGE
