module.exports = (req) => {
  // Buttons for user click to filter DATA follow status
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "active",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  if (req.query.status) {
    // CHANGE CLASS active
    filterStatus.forEach((item) => {
      if (item.status == req.query.status) {
        item.class = "active";
      } else {
        item.class = "";
      }
    });
  }

  return filterStatus;
};
