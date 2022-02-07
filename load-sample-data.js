require("dotenv").config();
const productModel = require("./models/product-model");
const products = require("./sample-data");
const establishMongoConnection = require("./db/connect");

const initiateSampleDataLoad = async () => {
  try {
    await establishMongoConnection(process.env.MONGO_CLUSTER_URI);
    const deleteAckw = await productModel.deleteMany();
    const insertAckw = await productModel.create(products);
    console.log("🎉 Sample data loaded successfully.");
    process.exit(0);
  } catch (err) {
    console.log(`⚠️ Sample Data Load failed with error : ${err}`);
    process.exit(1);
  }
};

initiateSampleDataLoad();
