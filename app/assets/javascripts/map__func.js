$(document).ready(function() {
  if($('#map').length){
    var myLatLng;
    var map;
    var marker;
    var markerData = [];
    var infoWindow;
    var contentString = [];

    function initMap(){
      mapOptions = { zoom: 15};
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      marker = new google.maps.Marker({
        map: map,
        zIndex:1
        });
    }
    initMap();
    // アクティブ状態のパイロットのピンを立てる
    function showPilots(pilot){
      for (var i = 0; i < pilot.length; i++) {
        //吹き出しの中身を生成
        contentString[i] = `
          <div id = "content" data-pilot-id = ${pilot[i].id}"
            <p> Hello World </p>
          </div>
          `
        infoWindow[i] = new google.maps.InfoWindow({
          content: contentString[i]
        });

        markerLatLng = new google.maps.LatLng({lat: pilot[i].lat, lng: pilot[i].lng}); // 緯度経度のデータ作成
        marker[i] = new google.maps.Marker({
          position: markerLatLng, // マーカーを立てる位置を指定
          map: map, // マーカーを立てる地図を指定
        });
        marker[i].setValues({type: "point", id: pilot[i].id});
      }
      console.log(marker);
      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });
      // showInfoWindows(pilot)
      //  console.log((marker.typeof);
       //動的に追加されたmarkerをクリックできるようにする
      //  $(document).google.maps.event.addListener(marker, "click", function(){
      //   console.log('yo');
      //   console.log(this);
      //  });
      }

      function showInfoWindows(pilot){
        console.log(pilot);
      }
    // パイロットを探すボタンクリックで待機中のガイドの緯度経度を取得し表示
    $("#find_pilots").on('click', function(e){
      $.ajax({
        url: "/map/find_guides",
        type: "GET",
        data: "",
        dataType: 'json',
      })
      .done(function(pilot){
        showPilots(pilot)
      })
      .fail(function(){
        console.log('Failed!');
      })
    })
    function calcDistance(){
      console.log('hel');
    }

      function saveCurrentLocation(lat, lng){
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
        map.setZoom(14);
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
      var posOptions = {enableHighAccuracy: false, timeout: 150000, maximumAge: 1000 }

      if(navigator.geolocation){
        navigator.geolocation.watchPosition(centerMap, errorPos, posOptions);
      }
      else {
        alert('nope');
      }
  }
});
