$(document).ready(function() {

  // function changeNickname(userId){
  //   var userId = userId;
  //   var nickname = "Kartman";
  //   $.ajax({
  //     url: "/map/change_pilot_nickname",
  //     type: "PATCH",
  //     data: {nickname: nickname},
  //     dataType: 'json',
  //   })
  //   .done(function(nickname){
  //     console.log(`successfully changed a username as ${nickname.nickname}`);
  //   })
  //   .fail(function(){
  //     console.log('Failed!');
  //   })
  // }

  function saveCurrentLocation(lat, lng){
    // console.log(lat, lng)
    var lat = lat;
    var lng = lng;
    $.ajax({
      url: "/map/change_pilot_location",
      type: "PATCH",
      data: {lat: lat, lng:lng},
      dataType: 'json',
    })
    .done(function(location){
      console.log(`successfully changed userlodation as ${location.lat}, ${location.lat}`);
    })
    .fail(function(){
      console.log('Failed!');
    })
  }

  function successPos(pos){
    var lat = pos.coords.latitude;
    var lng = pos.coords.longitude;
    var location = document.querySelector('.show-lati-and-long');
    location.innerHTML = `<p class = "location">緯度: ${pos.coords.latitude}</p>
    <p class = "location">経度: ${pos.coords.longitude}</p>`;
    var mwi = document.querySelector('.map-wrapper__in');
    mwi.appendChild(location);
    saveCurrentLocation(lat, lng);
  }
  function errorPos(err){
    console.log(err.message);
  }
  // check this out for options
  // https://stackoverflow.com/questions/16202077/high-accuracy-geolocation-html5
  // , timeout:5000
  // maximumAge:10000,
  enableHighAccuracy: true
  var posOptions = {enableHighAccuracy: false, timeout: 5000, maximumAge: Infinity }

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(successPos, errorPos, posOptions);
  }
  else {
    console.log('it dosent work');
    alert('nope');
  }
});