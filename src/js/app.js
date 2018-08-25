let map;
let infowindow;

const filterTelephony = document.querySelector('#filterTelephony');
const filterInternet = document.querySelector('#filterInternet');
const filterTvPaga = document.querySelector('#filterTvPaga');

initMap = () => {
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
    // console.log(element.val())
    const position = new google.maps.LatLng(element.val().latitude, element.val().longitude);
    if (element.val().id_service === '-LKe2uS-Go3sI_lQ2tZI') {
      createMarker(position, 'img/markers/internetfijo.png')
    } else if (element.val().id_service === '-LKe30srkZEH4drbijm7') {
      if (element.val().id_signal_type === '-LKjlc5yO8S2hu2kP05N') {
        createMarker(position, 'img/markers/internetmovil2g.png')
      } else if (element.val().id_signal_type === '-LKjldEcN2gNkuV7h-As') {
        createMarker(position, 'img/markers/internetmovil3g.png')
      } else if (element.val().id_signal_type === '-LKjlg7lXM71XNmj0X_5') {
        createMarker(position, 'img/markers/internetmovil4g.png')
      }
    } else if (element.val().id_service === '-LKe33kSAYcRFP3u_NZt') {
      createMarker(position, 'img/markers/tvpaga.png')
    } else if (element.val().id_service === '-LKe37KN7Nh8C77wnvkD') {
      createMarker(position, 'img/markers/telefoniafija.png')
    } else if (element.val().id_service === '-LKe38j7cBa00iEZe41u') {
      createMarker(position, 'img/markers/telefoniamovil.png')
    }
  });
})

const createMarker = (position, ico) => {
  new google.maps.Marker({
    map: map,
    icon: ico,
    position: position
  });
}

filterTelephony.addEventListener('click', () => {

  let placesSearched = places.filter(filterPlaces);
})
filterInternet.addEventListener('click', () => {

})
filterTvPaga.addEventListener('click', () => {

})

firebase.database().ref('/report/').on('value', snapshot => {
  snapshot.forEach(element => {
    // console.log(element.val())
    function filterPlaces(places) {
      return places === element.val().id_service;
    }
  });
})
