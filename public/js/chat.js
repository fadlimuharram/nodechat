
var socket = io();
var formattedTIme = function(data){
    return moment(data.createdAt).format('h:mm a');
};
var param = $.deparam(window.location.search);

socket.on('connect',function(){
    //console.log('Koneksi Berhasil');
    socket.emit('join',param,function(error){
        if(error){
            alert(error);
            window.location.href = '/';
        }else{
            console.log('No Error');
        }
    });
});

socket.on('updateUserList',function(users){
    var ol = $('<ol></ol>');
    users.forEach(function(user){
        ol.append($('<li></li>').text(user));
    });
    $('#daftarUser').html(ol);
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
        text:$('[name=pesan]').val()
    },function(e){
        alert(e);
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

