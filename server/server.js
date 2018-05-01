const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'..','public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected');

    socket.on('disconnect',()=>{
        console.log('Disconnecter dari server');
    });

    // socket.emit('pesanBaru',{
    //     dari:'fadli@tes.com',
    //     text:'ini textnya',
    //     dibuat:5654987451
    // });

    socket.on('buatPesan',(pesanBaru)=>{
        console.log('Pesan Baru : ',pesanBaru);
        io.emit('pesanBaru',{
            dari:pesanBaru.dari,
            text:pesanBaru.text,
            dibuat:5654987451
        });
    })
});


server.listen(port,()=>{
    console.log(`Start pada port : ${port}`);
});



