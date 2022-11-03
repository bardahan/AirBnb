// MONGODB url is in /server/model/model.js

const express = require("express");
const morgen = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const app = express();

const PORT = 3000;

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(morgen("tiny"));

app.use(bodyparser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/video", express.static(path.resolve(__dirname, "assets/video")));
app.use("/img", express.static(path.resolve(__dirname, "assets/images")));

app.use("/", require("./server/routes/routes")(io));

io.on("connection", (socket) => {
  console.log(socket.id);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
