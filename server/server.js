const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'..','public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
var {Users} = require('./utils/users');

var users = new Users;

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected');

    

    socket.on('buatPesan',(pesanBaru, callback)=>{
        console.log('Pesan Baru : ',pesanBaru);
        io.emit('pesanBaru',generateMessage(pesanBaru.from,pesanBaru.text));
        callback('ini dari server');
    });

    socket.on('buatLokasiPesan',(cords)=>{
        io.emit('pesanLokasiBaru',generateLocationMessage('User',cords.latitude,cords.longitude));
    })

    socket.on('join',(param,callback)=>{
        if(!isRealString(param.name) || !isRealString(param.room)){
            callback('Nama dan room name tidak boleh kosong');
        }
        socket.join(param.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,param.name,param.room);

        io.to(param.room).emit('updateUserList',users.getUserList(param.room));
        socket.emit('selamatDatang',generateMessage('Admin','Selamat Datang, Anda Bergabung Dengan Chat Kami'));
        socket.broadcast.to(param.room).emit('selamatDatang',generateMessage('Admin',`${param.name} Bergabung dalam chat`));
        callback();
    });

    socket.on('disconnect',()=>{
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('pesanBaru',generateMessage('Admin',`${user.name} sudah keluar`));
        }
    });


});


server.listen(port,()=>{
    console.log(`Start pada port : ${port}`);
});



