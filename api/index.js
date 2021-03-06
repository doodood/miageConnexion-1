const http = require("http");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const mongooseConnection = require("./libs/mongoose");
const helpers = require("./helpers/utils");

global.rootDirname = __dirname;

mongooseConnection();
const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: "auth",
    saveUninitialized: true,
    resave: true
  })
);

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/private/**", (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).json({ message: "UnAuth" });
  }
  next();
});

require("./routes/auth")(app);
require("./routes/event")(app);

const port = process.env.PORT || 5000;

const server = http.createServer(app).listen(port, () => {
  console.log(`[INFO] Server is listening on port: ${port}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("[INFO] Server close");
    process.exit(0);
  });
});
