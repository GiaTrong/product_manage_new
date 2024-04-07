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

// DELETE ITEM
const buttonsDelete = document.querySelectorAll("[button-delete]");
if(buttonsDelete) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path")

    buttonsDelete.forEach(btn => {
        btn.addEventListener('click', () => {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không");
            
            if(isConfirm) {
                const id = btn.getAttribute("data-id");

                formDeleteItem.action = path + `/${id}?_method=DELETE`

                formDeleteItem.submit();
            }
        })
    })
} 
// END DELETE ITEM
