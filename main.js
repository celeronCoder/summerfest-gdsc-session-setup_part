const express = require("express");

const app = express();

app.get("/", function (req, res) {
  return res.send({ message: "Hello World!!!!!!!!!!" });
});

app.listen(8000, () => console.log("The server started at port 8000"));
