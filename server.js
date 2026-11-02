const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

const players = new Map();
const realms = [
  { name: "Phàm Nhân", need: 0 },
  { name: "Luyện Khí", need: 100 },
  { name: "Trúc Cơ", need: 500 },
  { name: "Kim Đan", need: 1500 },
  { name: "Nguyên Anh", need: 4000 },
  { name: "Hóa Thần", need: 10000 },
  { name: "Độ Kiếp", need: 25000 },
  { name: "Chân Tiên", need: 60000 }
];

function realmFor(qi) {
  let result = realms[0];
  for (const realm of realms) {
    if (qi >= realm.need) result = realm;
  }
  return result.name;
}

function publicPlayer(p) {
  return {
    id: p.id,
    name: p.name,
    qi: p.qi,
    realm: realmFor(p.qi),
    cultivating: p.cultivating
  };
}

function broadcastState() {
  const leaderboard = [...players.values()]
    .map(publicPlayer)
    .sort((a, b) => b.qi - a.qi)
    .slice(0, 50);
  io.emit("world:update", leaderboard);
}

io.on("connection", (socket) => {
  socket.on("player:join", (rawName) => {
    const name = String(rawName || "Đạo hữu").trim().slice(0, 18) || "Đạo hữu";
    const existing = players.get(socket.id);
    players.set(socket.id, {
      id: socket.id,
      name,
      qi: existing ? existing.qi : 0,
      cultivating: true,
      lastTick: Date.now()
    });
    socket.emit("player:ready", publicPlayer(players.get(socket.id)));
    broadcastState();
  });

  socket.on("player:cultivate", () => {
    const p = players.get(socket.id);
    if (!p) return;
    p.qi += 10;
    broadcastState();
    socket.emit("player:gain", { amount: 10, qi: p.qi, realm: realmFor(p.qi) });
  });

  socket.on("player:toggle", () => {
    const p = players.get(socket.id);
    if (!p) return;
    p.cultivating = !p.cultivating;
    broadcastState();
  });

  socket.on("disconnect", () => {
    players.delete(socket.id);
    broadcastState();
  });
});

// Người chơi đang bật ngồi tu nhận 1 linh khí mỗi giây.
setInterval(() => {
  let changed = false;
  for (const p of players.values()) {
    if (p.cultivating) {
      p.qi += 1;
      changed = true;
    }
  }
  if (changed) broadcastState();
}, 1000);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Ngồi Tu Online đang chạy tại http://localhost:${PORT}`);
});
