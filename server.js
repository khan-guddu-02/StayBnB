if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const connectDB = require("./config/db.js");
require("dotenv").config();
const app = require("./app");


const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    console.log("connected to db!");
    app.listen(PORT, () => {
      console.log(`server listening on port number ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error connecting to db");
    console.log(err);
  });