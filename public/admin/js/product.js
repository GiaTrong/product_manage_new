// CHANGE STATUS
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if(buttonChangeStatus) {
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path")
    buttonChangeStatus.forEach(btn => {
        btn.addEventListener("click", () => {
            const statusCurrent = btn.getAttribute("data-status")
            const id = btn.getAttribute("data-id")

            let statusChange = statusCurrent == "active" ? "inactive" : "active";

            const action = path + `/${statusChange}/${id}?_method=PATCH`;

            formChangeStatus.action = action

            formChangeStatus.submit();
        })
    })
}
// END CHANGE STATUS