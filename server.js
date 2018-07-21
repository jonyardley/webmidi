const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const composers = require("./composers");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

io.on("connection", socket => {
  console.log("Time to tune up!");

  const composer = composers[Math.floor(Math.random() * composers.length)];
  socket.emit("composerName", {
    message: composer
  });

  socket.on("note", function(note) {
    console.log(note);
    io.emit("note", note);
  });
});

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
