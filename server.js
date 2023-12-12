const express = require("express");
const cors = require("cors");
const { ExpressPeerServer } = require("peer");
const app = express();

app.enable("trust proxy");
const isDev = app.settings.env === "development";
const url = isDev
  ? "http://localhost:3000"
  : "https://google-meet-clone-lac.vercel.app";
const PORT = process.env.PORT || 5050;
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
app.use(cors({ origin: url }));

const peerServer = ExpressPeerServer(server, {
  path: "/",
  corsOptions: { origin: url },
  port: PORT,
  key: "peerjs",
});

app.use("/", peerServer);

module.exports = app;
