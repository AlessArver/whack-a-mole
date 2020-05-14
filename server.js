const path = require("path");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

app.use("/imgs", express.static(`${__dirname}/assets/imgs`));
app.use("/sounds", express.static(`${__dirname}/assets/sounds`));
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/public", "index.html"));
});
app.listen(PORT);
console.log(`Server started on port: ${PORT}`);
console.log(`${__dirname}/assets/imgs`);
