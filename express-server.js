const express = require("express");
const app = express();
const path = require("path");

app.get("/download", (req, res) => {
  const { file } = req.query;
  const filePath = path.join(__dirname, file);
  res.download(filePath);
});

app.listen(3003, () => {
  console.log("Server started on port 3003");
});
