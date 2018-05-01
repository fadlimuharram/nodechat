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


    // socket.emit('pesanBaru',{
    //     dari:'fadli@tes.com',
    //     text:'ini textnya',
    //     dibuat:5654987451
    // });

    socket.emit('selamatDatang',{
        dari:'Admin',
        text:'Selamat Datang, Anda Bergabung Dengan Chat Kami',
        dibuat:new Date().getTime()
    });

    socket.broadcast.emit('selamatDatang',{
        dari:'Admin',
        text:'User Baru Bergabung Dalam Room Chat',
        dibuat:new Date().getTime()
    });

    socket.on('buatPesan',(pesanBaru)=>{
        console.log('Pesan Baru : ',pesanBaru);
        io.emit('pesanBaru',{
            dari:pesanBaru.dari,
            text:pesanBaru.text,
            dibuat:new Date().getTime()
        });
        // socket.broadcast.emit('pesanBaru',{
        //     dari:pesanBaru.dari,
        //     text:pesanBaru.text,
        //     dibuat:new Date().getTime()   
        // });
    });

    socket.on('disconnect',()=>{
        console.log('Disconnecter dari server');
    });

});


server.listen(port,()=>{
    console.log(`Start pada port : ${port}`);
});



