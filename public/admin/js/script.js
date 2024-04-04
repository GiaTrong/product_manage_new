// BUTTON STATSUS
const btnStatus = document.querySelectorAll("[button-status]");

let url = new URL(window.location.href);

if (btnStatus.length > 0) {
  btnStatus.forEach((item) => {
    item.addEventListener("click", () => {
      const status = item.getAttribute("button-status");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href
    });
  });
}
// END BUTTON STATSUS
