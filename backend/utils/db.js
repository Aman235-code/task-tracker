const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected");
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

module.exports = connectDb;
