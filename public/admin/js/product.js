// CHANGE STATUS
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus) {
  const formChangeStatus = document.querySelector("#form-change-status");
  if (formChangeStatus) {
    const path = formChangeStatus.getAttribute("data-path");
    buttonChangeStatus.forEach((btn) => {
      btn.addEventListener("click", () => {
        const statusCurrent = btn.getAttribute("data-status");
        const id = btn.getAttribute("data-id");

        let statusChange = statusCurrent == "active" ? "inactive" : "active";

        const action = path + `/${statusChange}/${id}?_method=PATCH`;

        formChangeStatus.action = action;

        formChangeStatus.submit();
      });
    });
  }
}
// END CHANGE STATUS

// DELETE ITEM
const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  if (formDeleteItem) {
    const path = formDeleteItem.getAttribute("data-path");

    buttonsDelete.forEach((btn) => {
      btn.addEventListener("click", () => {
        const isConfirm = confirm(
          "Bạn có chắc chắn muốn xóa sản phẩm này không"
        );

        if (isConfirm) {
          const id = btn.getAttribute("data-id");

          formDeleteItem.action = path + `/${id}?_method=DELETE`;

          formDeleteItem.submit();
        }
      });
    });
  }
}
// END DELETE ITEM

// RESTORE
const buttonRestore = document.querySelectorAll("[button-restore]");
console.log(buttonRestore);
if (buttonRestore) {
  buttonRestore.forEach((item) => {
    const formRestore = document.querySelector("#form-restore-item");

    item.addEventListener("click", (e) => {
      const id = item.getAttribute("data-id");
      // console.log(id)
      const formPath = formRestore.getAttribute("data-path");
      formRestore.action = `${formPath}/${id}?_method=PATCH`;

      formRestore.submit();
    });
  });
}
// END RESTORE

// DELETE HARD
const buttonsDeleteHard = document.querySelectorAll("[button-delete-hard]");
// console.log(buttonsDeleteHard)
if (buttonsDeleteHard) {
  buttonsDeleteHard.forEach((item) => {
    const formPath = document.querySelector("#form-delete-item-hard");

    item.addEventListener("click", (e) => {
      // DELETE OR NOT
      const confirmDelete = confirm(
        "Bạn có chắc chắn là xóa sản phẩm này không.\nBạn không thể hoàn tất hành động này."
      );

      if (confirmDelete) {
        // GIVE DATA
        const id = item.getAttribute("data-id");
        // CHANGE ACTION => give ID item
        formPath.action = `${formPath.getAttribute(
          "data-path"
        )}/${id}?_method=DELETE`;

        formPath.submit();
      }
    });
  });
}
// END DELETE HARD
