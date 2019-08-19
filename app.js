const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const expressHBS = require("express-handlebars");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/shop");
const four0fourController = require('./controllers/404')

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

app.use(four0fourController.get404);

app.listen(3000);
