import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

// scrollTop
const scrollTop = () => {
  const body = document.querySelector(".chat .inner-body");
  // khi gửi đi vẫn phải cho thằng scroll xuống dưới cùng
  body.scrollTop = body.scrollHeight;
};
// END scrollTop

//  SHOW TYPING
var timeOut;
const showTyping = () => {
  socket.emit("CLIENT_SEND_TYPING", "show");

  clearTimeout(timeOut);

  // cứ sau 3s nếu ngta ko gõ => hidden
  timeOut = setTimeout(() => {
    socket.emit("CLIENT_SEND_TYPING", "hidden");
  }, 5000);
};
// END SHOW TYPING

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
      // khi ấn gửi => typing bị xóa đi
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }
  });
}
// END CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");
  const boxTyping = document.querySelector(".inner-list-typing");

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
  body.insertBefore(div, boxTyping);
  //
  scrollTop();
});
// END SERVER_RETURN_MESSAGE

// SCROLL CHAT TO BUTTON
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight; // thuộc tính để cho thằng có scroll cách bên trên bao nhiêu
}
// END SCROLL CHAT TO BUTTON

// EMOJI PICKER
const emojiPicker = document.querySelector("emoji-picker");

if (emojiPicker) {
  const inputChat = document.querySelector(
    ".chat .inner-form input[name = 'content']"
  );

  emojiPicker.addEventListener("emoji-click", (event) => {
    const icon = event.detail.unicode;
    // console.log(icon)
    inputChat.value = inputChat.value + icon;
    // người dùng chèn icon => showTyping()
    showTyping();

    // khi người dùng bắt đầu chat => showTyping()
    inputChat.addEventListener("keyup", (e) => {
      showTyping();
    });
  });
}
// END EMOJI PICKER

// ẨN HIỆN EMOJI
const buttonIcon = document.querySelector(".button-icon");
// console.log(buttonIcon)
if (buttonIcon) {
  const tooltip = document.querySelector(".tooltip");
  Popper.createPopper(buttonIcon, tooltip);

  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown");
  };
}
// END ẨN HIỆN EMOJI


// SERVER_RETURN_TYPING
const innerListTyping = document.querySelector(".chat .inner-list-typing");
if (innerListTyping) {
  socket.on("SERVER_RETURN_TYPING", (data) => {
    // console.log(data);

    if (data.type == "show") {
      // check xem cái typing nó tồn tại chưa => chỉ nên xuất hiện 1 lần mỗi ông
      const existTying = innerListTyping.querySelector(
        `.box-typing[user-id='${data.userId}']`
      );

      if (!existTying) {
        const boxTyping = document.createElement("div");
        boxTyping.classList.add("box-typing");
        boxTyping.setAttribute("user-id", data.userId);

        boxTyping.innerHTML = `
            <div class="inner-name">${data.fullName}</div>
            <div class="inner-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          `;

        innerListTyping.appendChild(boxTyping);

        scrollTop();
      }
    } else {
      const boxTypingRemove = innerListTyping.querySelector(
        `[user-id='${data.userId}']`
      );

      if (boxTypingRemove) {
        innerListTyping.removeChild(boxTypingRemove);
      }
    }
  });
}

// END SERVER_RETURN_TYPING
