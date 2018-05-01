const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'..','public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var {generateMessage,generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected');

    socket.emit('selamatDatang',generateMessage('Admin','Selamat Datang, Anda Bergabung Dengan Chat Kami'));

    socket.broadcast.emit('selamatDatang',generateMessage('Admin','User Baru Bergabung Dalam Room Chat'));

    socket.on('buatPesan',(pesanBaru, callback)=>{
        console.log('Pesan Baru : ',pesanBaru);
        io.emit('pesanBaru',generateMessage(pesanBaru.from,pesanBaru.text));
        callback('ini dari server');
    });

    socket.on('buatLokasiPesan',(cords)=>{
        io.emit('pesanLokasiBaru',generateLocationMessage('User',cords.latitude,cords.longitude));
    })

    socket.on('disconnect',()=>{
        console.log('Disconnecter dari server');
    });

});


server.listen(port,()=>{
    console.log(`Start pada port : ${port}`);
});



