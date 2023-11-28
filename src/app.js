const express = require("express");
const applyMiddleWare = require("./middlewares/applyMiddleware");
const connectDB = require("./db/connectDB");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

const authenticationRoutes = require("./routes/authentication");

const districtsRoutes = require("./routes/districts");
const upuzilaRoutes = require("./routes/upuzilas");
const userRoutes = require("./routes/users/user");
const donationRoutes = require("./routes/DonationReqs");
const blogRoutes = require("./routes/blogs");

applyMiddleWare(app);

app.use(authenticationRoutes);
app.use(districtsRoutes);
app.use(upuzilaRoutes);
app.use(userRoutes);
app.use(donationRoutes);
app.use(blogRoutes);

app.get("/health", (req, res) => {
  res.send("Blood Donation Server is Running");
});

app.all("*", (req, res, next) => {
  const error = new Error(`the requested url is invalid :[${req.err}]`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

const main = async () => {
  await connectDB();
  app.listen(port, (req, res) => {
    console.log(`Blood Donation Server running on this port: ${port}`);
  });
};

main();
