const mongoose = require("mongoose");

module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connect success");
  } catch (error) {
    console.log("connect false");

    await mongoose.connect(`mongodb://localhost:27017/product-managenent`);

  }
};
