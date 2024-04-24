const Role = require("../../models/roles.model");

const systemConfig = require("../../config/system");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };

    const records = await Role.find(find);

    res.render("admin/pages/roles/index.pug", {
      pageTitle: "Danh sách nhóm quyền",
      records: records,
    });
  } catch (error) {
    console.log("Err in role.controller.js");
  }
};

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create.pug", {
    pageTitle: "Tạo quyền",
  });
};

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  const record = new Role(req.body);

  await record.save();

  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

// [GET] /admin/roles/edit
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      _id: id,
      deleted: false,
    };

    const data = await Role.findOne(find);

    res.render("admin/pages/roles/edit.pug", {
      pageTitle: "Chỉnh sửa",
      data: data,
    });
  } catch (error) {
    // console.log("Err in /admin/roles/edit");
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};

// [PATCH] /admin/roles/editPost
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);

    await Role.updateOne({ _id: id }, req.body);

    req.flash("success", "Update nhóm quyền thành công");

    res.redirect(`back`);
    // res.send("oke")
  } catch (error) {
    console.log(error)
    req.flash("error", "Update nhóm quyền thất bại");
  }
};
