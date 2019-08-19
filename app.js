const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const expressHBS = require("express-handlebars");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
    return res.sendStatus(204);
  }

  return next();
});

app.use("/admin", adminRoutes.router);
app.use(userRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { docTitle: "Pagen Not Found!", path: '' });
});

app.listen(3000);
