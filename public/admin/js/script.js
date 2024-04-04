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
