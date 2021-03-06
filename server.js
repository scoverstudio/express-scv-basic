const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.engine("hbs", hbs());
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.use("/user", (req, res, next) => {
  res.render("forbidden");
});

app.get(["/", "/home"], (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact", { layout: "dark" });
});

app.get("/info", (req, res) => {
  res.render("info");
});

app.get("/history", (req, res) => {
  res.render("history");
});

app.get("/hello/:name", (req, res) => {
  res.render("hello", { name: req.params.name });
});

app.post(
  "/contact/send-message",
  upload.single("recfile"),
  function (req, res, next) {
    const { author, sender, title, message } = req.body;
    const file = req.file;

    if (author && sender && title && message && file) {
      res.render("contact", {
        isSent: true,
        layout: "dark",
        name: file.originalname,
      });
    } else {
      res.render("contact", { isError: true, layout: "dark" });
    }
  }
);

app.use((req, res) => {
  if (res.status(404)) {
    res.show("404");
  }
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
