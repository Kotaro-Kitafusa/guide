$(document).ready(function() {

  function successPos(pos){
    var location = document.createElement('p');
    location.innerHTML = `<p class = "location">緯度: ${pos.coords.latitude}</p>
    <p class = "location">経度: ${pos.coords.longitude}</p>`;
    var mwi = document.querySelector('.map-wrapper__in')
    mwi.appendChild(location);
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