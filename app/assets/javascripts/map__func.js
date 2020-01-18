$(document).ready(function() {

  function changeNickname(userId){
    var userId = userId;
    var nickname = "Kartman";
    $.ajax({
      url: "/map/change_pilot_nickname",
      type: "PATCH",
      data: {nickname: nickname},
      dataType: 'json',
    })
    .done(function(nickname){
      console.log(`successfully changed a username as ${nickname.nickname}`);
    })
    .fail(function(){
      console.log('your dumb');
    })
  }

  function saveCurrentLocation(lat, long){
    var userId = Number($('.userid').text());
    changeNickname(userId);
  }

  function successPos(pos){
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    var location = document.createElement('p');
    location.innerHTML = `<p class = "location">緯度: ${pos.coords.latitude}</p>
    <p class = "location">経度: ${pos.coords.longitude}</p>`;
    var mwi = document.querySelector('.map-wrapper__in');
    mwi.appendChild(location);
    saveCurrentLocation(lat, long);
  }
  function errorPos(err){
    console.log(err.message);
  }
  // check this out for options
  // https://stackoverflow.com/questions/16202077/high-accuracy-geolocation-html5
  var posOptions = { enableHighAccuracy: true }

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(successPos, errorPos, posOptions);
  }
  else {
    console.log('it dosent work');
  }
});