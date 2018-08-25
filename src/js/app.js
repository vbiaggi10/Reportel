// Map
let map;
let infowindow;
var markers = [];
// let placesList = document.querySelector('.places-list');
// placesList.innerHTML = '';
// const searchPlaces = document.querySelector('#search');

function initMap() {
  navigator.geolocation.getCurrentPosition(function (pos) {

    latitude = pos.coords.latitude;
    longitude = pos.coords.longitude;

    let pyrmont = new google.maps.LatLng(latitude, longitude);

    map = new google.maps.Map(document.getElementById("map"), {
      center: pyrmont,
      zoom: 14.5,
      mapTypeId: google.maps.MapTypeId.roadmap
    });

  });
}

firebase.database().ref('/report/').on('value', snapshot => {
  snapshot.forEach(element => {
	console.log(element.val())
    const position = new google.maps.LatLng(element.val().latitude, element.val().longitude);

    createMarker(position)
  });
})


function createMarker(position) {
  new google.maps.Marker({
    map: map,
    position: position
  });
}
