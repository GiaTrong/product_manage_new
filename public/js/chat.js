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

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");

  // tạo thẻ div
  const div = document.createElement("div");

  // check màn hình của user xem có phải chính mình gửi hay không
  let fullName = "";
  if (myId == data.userId) {
    div.classList.add("inner-outgoing");
  } else {
    div.classList.add("inner-incoming");
    fullName = `<div class="inner-name">${data.fullName}</div>`;
  }

  // add thêm đoạn code html vào trong thẻ div
  div.innerHTML = `
 ${fullName}
  <div class="inner-content">${data.content}</div>
  `;

  // cho thẻ cha nó 1 đoạn chat (div) mới
  body.appendChild(div);

  // khi gửi đi vẫn phải cho thằng scroll xuống dưới cùng
  body.scrollTop =  body.scrollHeight
});
// END SERVER_RETURN_MESSAGE

// SCROLL CHAT TO BUTTON
const bodyChat = document.querySelector(".chat .inner-body");
if(bodyChat) {
  bodyChat.scrollTop =  bodyChat.scrollHeight;  // thuộc tính để cho thằng có scroll cách bên trên bao nhiêu
}
// END SCROLL CHAT TO BUTTON
