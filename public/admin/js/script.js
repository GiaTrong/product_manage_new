let url = new URL(window.location.href);

// BUTTON STATSUS
const btnStatus = document.querySelectorAll("[button-status]");
if (btnStatus.length > 0) {
  btnStatus.forEach((item) => {
    item.addEventListener("click", () => {
      const status = item.getAttribute("button-status");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    });
  });
}
// END BUTTON STATSUS

// SEARCH
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    //
    const keyword = e.target.elements.keyword.value;

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}
// END SEARCH

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

// CHECKBOX MULTI
const checkBoxMulti = document.querySelector("[checkbox-multi]");
if (checkBoxMulti) {
  const inputCheckAll = checkBoxMulti.querySelector("input[name='checkall']");
  const inputId = checkBoxMulti.querySelectorAll("input[name='id']");

  // LOGIC FOR  inputCheckAll
  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      // CHECKED FOR ALL INPUT
      inputId.forEach((item) => {
        item.checked = true;
      });
    } else {
      // UNCHECKED FOR ALL INPUT
      inputId.forEach((item) => {
        item.checked = false;
      });
    }
  });

  // LOGIC FOR inputId
  inputId.forEach((input) => {
    input.addEventListener("click", () => {
      // "input[name='id']:checked": Lấy ra những thằng inputId đã được check
      const countChecked = checkBoxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;

      // NẾU TẤT CẢ INPUTID CHECKED => inputCheckAll: checked = true
      if (countChecked == inputId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// END CHECKBOX MULTI

// FROM CHANGE-MULTI
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkBoxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = checkBoxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    const typeChange = e.target.elements.type.value;
    console.log(typeChange);

    switch (typeChange) {
      case "active":
        changeMultiStatus(inputChecked);
        break;
      case "inactive":
        changeMultiStatus(inputChecked);
        break;
      case "delete-all":
        const isConfirm = confirm("Bạn có chắc chắn muốn xóa hết không");
        if (isConfirm) {
          changeMultiStatus(inputChecked);
        }
        break;
      default:
        break;
    }
  });
}

// FUNCTION changeMultiStatus
function changeMultiStatus(inputChecked) {
  // Lấy những thằng ID đã được check ra và biến nó thành 1 string => sublmit
  if (inputChecked.length > 0) {
    // 1 mảng để lưu các id của sp muốn thay đổi
    let ids = [];
    const inputIds = formChangeMulti.querySelector("input[name='ids']");
    //
    inputChecked.forEach((input) => {
      const id = input.value;
      ids.push(id);
    });

    // biến từ mảng về thành string
    inputIds.value = ids.join(", ");

    // submit form
    formChangeMulti.submit();
  } else {
    alert("Vui lòng chọn ít nhất 1 bản ghi");
  }
}
// END FUNCTION changeMultiStatus
// END FROM CHANGE-MULTI
