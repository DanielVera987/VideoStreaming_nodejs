'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public/`));

app.get('/', (req, res) => {
  res.redirect('index.html');
});

http.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

io.on('connection', (socket) => {
  console.log('New Connection');

  socket.on('stream', (image) => {
    socket.broadcast.emit('stream', image);
  });
});