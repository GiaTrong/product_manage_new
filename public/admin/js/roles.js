// PERMISSIONS
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");

  buttonSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    let permissions = [];

    const rows = tablePermissions.querySelectorAll("[data-name]");

    // console.log(rows);

    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");

      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value;
          permissions.push({
            id: id,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;

          // console.log(name)
          // console.log(index)
          // console.log(checked)
          // console.log("-----------")

          if (checked) {
            permissions[index].permissions.push(name);
          }
        });
      }
    });

    console.log(permissions);

    if (permissions.length > 0) {
      const formChangePermissions = document.querySelector(
        "#form-change-permissions"
      );
      const inputPermissions = formChangePermissions.querySelector(
        "input[name='permissions']"
      );

      inputPermissions.value = JSON.stringify(permissions);

      formChangePermissions.submit();
    }
  });
}
// END PERMISSIONS

// PERMISSIONS DATA DEFAULT
const dataRecords = document.querySelector("[data-record]");
if (dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-record"));

  records.forEach((record, index) => {
    const permissions = record.permissions;

    permissions.forEach((permission) => {
      // tìm ra cái hàm có cái data-name = permission
      // console.log(permission)
      // console.log(index)
      // console.log("________")

      const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
      const input = row.querySelectorAll("input")[index];
      
      input.checked = true;
    });
  });
}
// END PERMISSIONS DATA DEFAULT
