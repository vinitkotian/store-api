const mongoose = require("mongoose");

const establishMongoConnection = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("🎉 Mongo cluster connection successful.");
  } catch (err) {
    console.log(`⚠️ Db connecton error: ${err}`);
  }
};

module.exports = establishMongoConnection;
