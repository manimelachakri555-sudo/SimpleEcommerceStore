const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
dotenv.config();

const app = express();
app.get("/hello", (req, res) => {
  res.send("HELLO FROM SERVER");
});
app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);
app.use("/api/users", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/api/test", (req, res) => {
  res.send("API test works");
});
console.log("Dashboard route loaded");
app.get("/", (req, res) => {
  res.send("Welcome Chakri!");
});

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error:");
    console.log(err);
  });