require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const establishMongoConnection = require("./db/connect");
const productRouter = require("./routes/product-routes");
const handleErrors = require("./middlewares/error-handler");

app.use("/store-api/V1-0-0/products", productRouter);
app.use(handleErrors);

const port = process.env.PORT || 3000;
const main = async () => {
  try {
    await establishMongoConnection(process.env.MONGO_CLUSTER_URI);
    app.listen(port, () => {
      console.log(`🎉 Server is up and listening on port ${port}.`);
    });
  } catch (err) {
    console.log(`⚠️ Error encountered : ${err}`);
  }
};

main();
