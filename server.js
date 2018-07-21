const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const composers = require("./composers");
const instruments = require("./lib/instruments");

const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const randomItem = collection =>
  collection[Math.floor(Math.random() * collection.length)];

let orchestraReady = false;

io.on("connection", socket => {
  const composer = composers[Math.floor(Math.random() * composers.length)];
  const instrument = randomItem(instruments);
  socket.emit("composerName", {
    composer: composer,
    ready: orchestraReady,
    instrument,
    notes: instrument.notes.sort(() => 0.5 - Math.random()).slice(0, 9)
  });

  socket.on("playNote", note => {
    console.log("playNote", note);
    io.emit("playNote", note);
  });

  socket.on("stopNote", note => {
    console.log("stopNote", note);
    io.emit("stopNote", note);
  });

  socket.on("ready", ready => {
    orchestraReady = ready;
    io.emit("ready", orchestraReady);
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
