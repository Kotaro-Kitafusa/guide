$(document).ready(function() {
  if($('#map').length){
    var myLatLng;
    var map;
    let marker;
    var markerData = [];
    var infoWindow;
    var contentString = [];
    var markerLatLng;
    var pilot_id;

    function initMap(){
      mapOptions = { zoom: 15};
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      marker = new google.maps.Marker({
        map: map,
        zIndex:1
        });
    }
    initMap();

    function buildPilotsList(pilot){

    }

    function showPilotsList(pilot) {
      for (var i =0; i < pilot.length; i++){
        var insertHTML = buildPilotsList(pilot[i]);
        $(".active-list-pilots").append(insertHTML);
      }
    }

    function makePilotsMarker(pilot, pilot_id, pilotName, pilotLatLng, markerLatLng){
      marker[pilot_id] = new google.maps.Marker({
        zIndex:1,
        map: map
      });
      marker[pilot_id].setPosition(markerLatLng);
        marker[pilot_id].setValues({
          type: "point",
          pilot_id: pilot_id,
          name: pilotName,
          latlng: pilotLatLng,
          isShown: true
        });
      //動的に追加されたmarkerをクリックできるようにする
        google.maps.event.addListener(marker[pilot_id], "click", function(){
          console.log(this.get("name"), this.get("latlng"));
          console.log(this);
        });
    }

    // アクティブ状態のパイロットのピンを立てる
    function showPilots(pilot){
      // Pilot情報を元にmarkerを立てる記述
      for (let i = 0; i < pilot.length; i++) {
        pilot_id = pilot[i].pilot_id
        markerLatLng = new google.maps.LatLng({lat: pilot[i].lat, lng: pilot[i].lng}); // 緯度経度のデータ作成
        let pilotLatLng = [pilot[i].lat, pilot[i].lng];
        let pilotName = pilot[i].name;

        if(!marker[pilot_id]){
          makePilotsMarker(pilot, pilot_id, pilotName, pilotLatLng, markerLatLng)
          } else if(marker[pilot_id].get("pilot_id") == pilot_id && marker[pilot_id].get("latlng").toString() !== pilotLatLng.toString()){
            marker[pilot_id].setMap(null);
            makePilotsMarker(pilot, pilot_id, pilotName, pilotLatLng, markerLatLng)
            console.log(marker[pilot_id].get("name"), marker[pilot_id].get("pilot_id"), marker[pilot_id].get("latlng"));
          }
      }
      //   //吹き出しの中身を生成
      //   contentString[i] = `
      //     <div id = "content" data-pilot-id = ${pilot[i].id}"
      //       <p> Hello World </p>
      //     </div>
      //     `
      //   infoWindow[i] = new google.maps.InfoWindow({
      //     content: contentString[i]
      //   });
      }

      function showInfoWindows(pilot){
        // console.log(pilot);
      }

    // パイロットを探すボタンクリックで待機中のガイドの緯度経度を取得し表示
    // $("#find_pilots").on('click', function(e){
    //   $.ajax({
    //     url: "/map/find_guides",
    //     type: "GET",
    //     data: "",
    //     dataType: 'json',
    //   })
    //   .done(function(pilot){
    //     showPilots(pilot)
    //   })
    //   .fail(function(){
    //     console.log('Failed!');
    //   })
    // })

    //２点間の距離を計算する
    // function calcDistance(){
    //   console.log('hel');
    // }
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

      function setPilotsMarker(){
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
      }


      function centerMap(pos){
        myLatLng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
        map.setCenter(myLatLng);
        map.setZoom(12);
        marker.setPosition(myLatLng);
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;
        saveCurrentLocation(lat, lng)
        // setPilotsMarker()
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
        setInterval(setPilotsMarker, 5000);
      }
      else {
        alert('nope');
      }
  }
});
