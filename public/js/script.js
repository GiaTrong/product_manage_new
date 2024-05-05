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