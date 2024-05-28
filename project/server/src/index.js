require("dotenv/config");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { authRoute, productRoute, profileRoute } = require("./routes")
const path = require("path");
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json())


app.use(
  cors({
    origin: [
      process.env.WHITELISTED_DOMAINS &&
      process.env.WHITELISTED_DOMAINS.split(","),
    ],
  })
);

app.get("/test", (req, res) => {
  res.send("Hello World!");
})

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/profile", profileRoute);

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Route Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

// const db = require("./database");
// db.sequelize.sync({ alter: true });



app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`Listening on port ${PORT}`);
  }
});