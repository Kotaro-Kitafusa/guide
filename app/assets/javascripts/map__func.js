$(document).ready(function() {
  if($('#map').length){
    var myLatLng;
    var map;
    var marker;

    function initMap(){
      mapOptions = { zoom: 15};
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      marker = new google.maps.Marker({
        map: map,
        zIndex:1
        });
    }
    initMap();

    // パイロットを探すボタンクリックで待機中のガイドの緯度経度を取得し表示
    $("#find_pilots").on('click', function(e){
      console.log('you clicked #find_pilots');
      $.ajax({
        url: "/map/find_guides",
        type: "GET",
        data: "",
        dataType: 'json',
      })
      .done(function(pilot){
        pilot.forEach( function(p){
          console.log(`id: ${p.id}, lat: ${p.lat}, lng: ${p.lng}`)
        });
      })
      .fail(function(){
        console.log('Failed!');
      })
    })
    function calcDistance(){
      console.log('hel');
    }

      function saveCurrentLocation(lat, lng){
        console.log(lat,lng);
        var lat = lat;
        var lng = lng;
        $.ajax({
          url: "/map/change_pilot_location",
          type: "PATCH",
          data: {lat: lat, lng:lng},
          dataType: 'json',
        })
        .done(function(location){
          console.log(`successfully changed userlocation as ${location.lat}, ${location.lng}`);
        })
        .fail(function(){
          console.log('Failed!');
        })
      }

      function centerMap(pos){
        myLatLng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
        map.setCenter(myLatLng);
        map.setZoom(16);
        marker.setPosition(myLatLng);
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;
        saveCurrentLocation(lat, lng)
      }

      // function successPos(pos){
      //   var lat = pos.coords.latitude;
      //   var lng = pos.coords.longitude;
      //   navigator.geolocation.watchPosition(centerMap);
      //   saveCurrentLocation(lat, lng);
      // }
      function errorPos(err){
        console.log(err.message);
      }
      // check this out for options
      // https://stackoverflow.com/questions/16202077/high-accuracy-geolocation-html5
      var posOptions = {enableHighAccuracy: false, timeout: 150000, maximumAge: 10000 }

      if(navigator.geolocation){
        navigator.geolocation.watchPosition(centerMap, errorPos, posOptions);
      }
      else {
        alert('nope');
      }
  }
});
