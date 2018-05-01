
var socket = io();
var formattedTIme = function(data){
    return moment(data.createdAt).format('h:mm a');
};

socket.on('connect',function(){
    console.log('Koneksi Berhasil');

});

socket.on('disconnect',function(){
    console.log('Disconnecter dari server');
});

socket.on('pesanBaru',function(data){

    var template = $('#pesanTemplate').html();
    var html = Mustache.render(template,{
        text:data.text,
        from:data.from,
        time : formattedTIme(data)
    });
    $('#pesanData').append(html);

});

socket.on('selamatDatang',function(data){
    var template = $('#pesanTemplate').html();
    var html = Mustache.render(template,{
        text:data.text,
        from:data.from,
        time : formattedTIme(data)
    });
    $('#pesanData').append(html);
});

socket.on('pesanLokasiBaru',function(data){
    var template = $('#pesanLokasiTemplate').html();
    var html = Mustache.render(template,{
        url:data.url,
        from:data.from,
        time : formattedTIme(data)
    });
    $('#pesanData').append(html);
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

