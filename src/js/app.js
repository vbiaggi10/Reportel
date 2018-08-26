let map;
let infowindow;
let markers = [];

const filterTelephony = document.querySelector('#filterTelephony');
const filterInternet = document.querySelector('#filterInternet');
const filterTvPaga = document.querySelector('#filterTvPaga');
const noFilter = document.querySelector('#noFilter');
const dbReport = firebase.database().ref('/report/');

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
    paintMarker();
  });
}

const paintMarker = () => {
  dbReport.on('value', snapshot => {
    snapshot.forEach(element => {
      const position = new google.maps.LatLng(element.val().latitude, element.val().longitude);
      filterSignal(element, position) 
    })
  })
}

const createMarker = (observation, position, ico) => {
  let marker = new google.maps.Marker({
    map: map,
    icon: ico,
    position: position,
    animation: google.maps.Animation.BOUNCE,
    title: observation
  });
  markers.push(marker);
}

const filterSignal = (element, position) => {
  if (element.val().id_signal_type === '') {
    const src = 'img/markers/' + element.val().id_operator + '/' + element.val().id_service + '.png';
    createMarker(element.val().observation, position, src)
  } else {
    const src = 'img/markers/' + element.val().id_operator + '/' + element.val().id_service + element.val().id_signal_type + '.png';
    createMarker(element.val().observation, position, src)
  }
}

const deleteMarker = () => {
  for (removingMarkers in markers) {
    markers[removingMarkers].setMap(null);
  }
}

filterTelephony.addEventListener('click', () => {
  deleteMarker();
  dbReport.on('value', snapshot => {
    snapshot.forEach(element => {
      const position = new google.maps.LatLng(element.val().latitude, element.val().longitude);
      if (element.val().id_service === '-LKe38j7cBa00iEZe41u') {
        filterSignal(element, position) 
      } else if (element.val().id_service === '-LKe37KN7Nh8C77wnvkD') {
        filterSignal(element, position) 
      }
    })
  })
});

filterInternet.addEventListener('click', () => {
  deleteMarker();
  dbReport.on('value', snapshot => {
    snapshot.forEach(element => {
      const position = new google.maps.LatLng(element.val().latitude, element.val().longitude);
      if (element.val().id_service === '-LKe30srkZEH4drbijm7') {
        if (element.val().id_signal_type === '-LKjlc5yO8S2hu2kP05N') {
          filterSignal(element, position) 
        } else if (element.val().id_signal_type === '-LKjldEcN2gNkuV7h-As') {
          filterSignal(element, position) 
        } else if (element.val().id_signal_type === '-LKjlg7lXM71XNmj0X_5') {
          filterSignal(element, position) 
        }
      } else if (element.val().id_service === '-LKe2uS-Go3sI_lQ2tZI') {
        filterSignal(element, position) 
      }
    })
  })
})

filterTvPaga.addEventListener('click', () => {
  deleteMarker();
  dbReport.on('value', snapshot => {
    snapshot.forEach(element => {
      const position = new google.maps.LatLng(element.val().latitude, element.val().longitude);
      if (element.val().id_service === '-LKe33kSAYcRFP3u_NZt') {
        filterSignal(element, position) 
      }
    })
  })
})

noFilter.addEventListener('click', () => {
  deleteMarker();
  paintMarker();
})
