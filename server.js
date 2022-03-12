const express = require("express");
const path = require("path");

const app = express();

const imagePath = "~/public/error-404.png";

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.use("/user", (req, res, next) => {
  res.show("forbidden.html");
});

app.use(express.static(path.join(__dirname, "/public")));

app.get(["/", "/home"], (req, res) => {
  res.show("index.html");
});

app.get("/about", (req, res) => {
  res.show("about.html");
});

app.use((req, res) => {
  if (res.status(404)) {
    res.show("404.html");
  }
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
