// MUỐN CUSTOM CÁI ĐƯỜNG DẪN TỚI NƠI LƯU TRỮ + TÊN FILE
const multer = require("multer");

module.exports = () => {
  const storage = multer.diskStorage({
    // destination: là nơi mình lưu cái file ảnh
    destination: function (req, file, cb) {
      cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      // file.originName: là tên file mình tải lên
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });

  return storage;
};