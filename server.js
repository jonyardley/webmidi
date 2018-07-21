const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const composers = require("./composers");

const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

io.on("connection", socket => {
  console.log("Time to tune up!");

  const composer = composers[Math.floor(Math.random() * composers.length)];
  socket.emit("composerName", {
    message: composer
  });

  socket.on("note", function(note) {
    console.log("play", note);
    io.emit("note", note);
  });
});

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});