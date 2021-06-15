const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const publicdirectorypath = path.join(__dirname, "../public");

app.use(express.static(publicdirectorypath));

app.listen(port, () => {
  console.log("Listening to server");
});
