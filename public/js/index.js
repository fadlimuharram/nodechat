
var socket = io();

socket.on('connect',function(){
    console.log('Koneksi Berhasil');

});

socket.on('disconnect',function(){
    console.log('Disconnecter dari server');
});

socket.on('pesanBaru',function(data){
    var formattedTIme = moment(data.createdAt).format('h:mm a');
    console.log('Pesan Baru : ',data);
    var li = $('<li></li>').text(`${data.from} ${formattedTIme}: ${data.text}`);
    $('#pesanData').append(li);
});

socket.on('selamatDatang',function(data){
    var formattedTIme = moment(data.createdAt).format('h:mm a');
    console.log(data);
    var li = $('<li></li>').text(`${data.from} ${formattedTIme}: ${data.text}`);
    $('#pesanData').append(li);
});

socket.on('pesanLokasiBaru',function(data){
    var formattedTIme = moment(data.createdAt).format('h:mm a');
    var li = $('<li></li>').text(`${data.from} ${formattedTIme}: `);
    var a = $('<a target="_blank">Lokasi Saya</a>').attr('href',data.url);
    li.append(a);
    $('#pesanData').append(li);
})

$('#pesan-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('buatPesan',{
        from:'fadli',
        text:$('[name=pesan]').val()
    },function(){

    });
});

var lokasiBtn = $('#kirim-lokasi');

lokasiBtn.on('click',function(e){
    e.preventDefault();
    if(!navigator.geolocation){
        return alert('Geolaction tidak di support oleh browser anda');
    }

    navigator.geolocation.getCurrentPosition(function(posisi){
        socket.emit('buatLokasiPesan',{
            latitude:posisi.coords.latitude,
            longitude:posisi.coords.longitude
        });
    },function(error){
        console.log(error);
        alert(error.message);
    })
});

