var socket = io();

socket.on('connect',function(){
    console.log('Koneksi Berhasil');

    // socket.emit('buatPesan',{
    //     dari: 'tes@tes.com',
    //     text:'hallo'
    // },function(data){
    //     console.log(data);
    // });

});

socket.on('disconnect',function(){
    console.log('Disconnecter dari server');
});

socket.on('pesanBaru',function(data){
    console.log('Pesan Baru : ',data);
    var li = $('<li></li>').text(`${data.from} : ${data.text}`);
    $('#pesanData').append(li);
});

socket.on('selamatDatang',function(data){
    console.log(data);
    var li = $('<li></li>').text(`${data.from} : ${data.text}`);
    $('#pesanData').append(li);
});

$('#pesan-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('buatPesan',{
        from:'fadli',
        text:$('[name=pesan]').val()
    },function(){

    });
});

