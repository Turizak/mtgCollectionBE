const express = require("express");
const dotenv = require("dotenv");
const routes = require("./src/routes");
const app = express();

app.use(express.json());

dotenv.config();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", routes);

app.listen(process.env.PORT, () => console.log(`app is listening on port ${process.env.PORT}`));
