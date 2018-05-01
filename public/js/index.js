var socket = io();

socket.on('connect',function(){
    console.log('Koneksi Berhasil');

    socket.emit('buatPesan',{
        untuk: 'tes@tes.com',
        text:'hallo'
    });
});

socket.on('disconnect',function(){
    console.log('Disconnecter dari server');
});

socket.on('pesanBaru',function(data){
    console.log('Pesan Baru : ',data);
});