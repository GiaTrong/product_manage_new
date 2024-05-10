// PAGINATION
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
  let url = new URL(window.location.href);

  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      //   console.log(page);

      url.searchParams.set("page", page);

      // câu lệnh chuyển hướng
      window.location.href = url.href;
    });
  });
}
// END PAGINATION

// SHOW ALERT
const showAlert = document.querySelector("[show-alert]");
console.log(showAlert);

if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  const closeAlert = showAlert.querySelector("[close-alert]");
  if (closeAlert) {
    showAlert.addEventListener("click", () => {
      showAlert.classList.add("alert-hidden");
    });
  }
}

// END SHOW ALERT

// PREVIEW IMAGE
const uploadImage = document.querySelector("[upload-image-input]");

if (uploadImage) {
  const uploadImagePreview = document.querySelector("[upload-image-preview]");

  uploadImage.addEventListener("change", (e) => {
    const file = e.target.files[0];
    console.log(file)

    if(file) {
      uploadImagePreview.src = URL.createObjectURL(file)
    }
  })
}
// END PREVIEW IMAGE
