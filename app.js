const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoose = require("mongoose");

const User = require("./models/user");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("627475a6c5854cbfdc2e2111")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://Shiyu:Dayu19990519@cluster0.oehei.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    // const user = new User({
    //   username: "Shiyu",
    //   email: "dayu19990519@gmail.com",
    //   cart: {
    //     items: [],
    //   },
    // });
    // user.save();
    app.listen(3000);
  })
  .catch((err) => console.log(err));
