const path = require("path");
const express = require("express");

const app = express();

const PORT = 8080;

app.use(express.static(__dirname + '/public'));
app.set("port", process.env.PORT || 8080);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
app.listen(PORT);
