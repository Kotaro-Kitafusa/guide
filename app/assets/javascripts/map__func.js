// $(document).ready(function() {
$(window).load(function() {
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

      // function saveCurrentLocation(lat, lng){
      //   var lat = lat;
      //   var lng = lng;
      //   $.ajax({
      //     url: "/map/change_pilot_location",
      //     type: "PATCH",
      //     data: {lat: lat, lng:lng},
      //     dataType: 'json',
      //   })
      //   .done(function(location){
      //     console.log(`successfully changed userlocation as ${location.lat}, ${location.lng}`);
      //   })
      //   .fail(function(){
      //     console.log('Failed!');
      //   })
      // }

      function centerMap(pos){
        console.log(pos.coords.latitude,pos.coords.longitude);
        myLatLng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
        map.setCenter(myLatLng);
        map.setZoom(16);
        marker.setPosition(myLatLng);
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