let map;
let infowindow;
let markers = [];

const showButtons = document.querySelector('#showButtons');
const buttonsContainer = document.querySelector('.buttons-container');
const showLegend = document.querySelector('#showLegend');
const legendContainer = document.querySelector('.legend-container');
const filterTelephony = document.querySelector('#filterTelephony');
const filterInternet = document.querySelector('#filterInternet');
const filterTvPaga = document.querySelector('#filterTvPaga');
const noFilter = document.querySelector('#noFilter');
const dbReport = firebase.database().ref('/report/');
let countClickButtom = 0;
let countClickLegend = 0;


showButtons.addEventListener('click', () => {
  if (countClickButtom === 0) {
    buttonsContainer.style.display = 'block';
    countClickButtom = 1;
  } else {
    buttonsContainer.style.display = 'none';
    countClickButtom = 0;
  }
})
showLegend.addEventListener('click', () => {
  if (countClickLegend === 0) {
    legendContainer.style.display = 'block';
    countClickLegend = 1;
  } else {
    legendContainer.style.display = 'none';
    countClickLegend = 0;
  }
})

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
let service = '';
let operator = '';

const createMarker = (info, position, ico) => {
  // console.log(validateOperator(info))
  var contentString = `
  <div id="content">
    <h5 id="firstHeading" class="firstHeading">${validateService(info)}</h5>
    <h6 id="secondHeading" class="firstHeading">${validateOperator(info)}</h6>
    <div id="bodyContent">
      <p>${info.observation}</p>
      <p>${info.date}</p>
    </div>
  </div>`;

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  let marker = new google.maps.Marker({
    map: map,
    icon: ico,
    position: position,
    animation: google.maps.Animation.BOUNCE
  });
  markers.push(marker);


  marker.addListener('click', function () {
    infowindow.open(map, marker);
  });
}

const validateService = (info) => {
  if ('-LKe38j7cBa00iEZe41u' === info.id_service) {
    //telf movil  
    service = 'Telefonía móvil'
    return service;
  } else if ('-LKe37KN7Nh8C77wnvkD' === info.id_service) {
    //telf fijo
    service = 'Telefonía fijo'
    return service;
  } else if ('-LKe33kSAYcRFP3u_NZt' === info.id_service) {
    //tv paga
    service = 'Tv paga'
    return service;
  } else if ('-LKe30srkZEH4drbijm7' === info.id_service) {
    //inter movil
    service = 'Internet móvil'
    return service;
  } else if ('-LKe2uS-Go3sI_lQ2tZI' === info.id_service) {
    //inter fijo
    service = 'Internet fijo'
    return service;
  }
}

const validateOperator = (info) => {
  if ('-LKe3Se1I-QAR7-4oTga' === info.id_operator) {
    operator = 'Claro'
    return operator;
  } else if ('-LKe3VxBId5kCsk5gf-9' === info.id_operator) {
    operator = 'Movistar'
    return operator;
  } else if ('-LKe3Xrp0nw1D4fhxQry' === info.id_operator) {
    operator = 'Entel'
    return operator;
  } else if ('-LKe3ZChA0ImL4nAHGwB' === info.id_operator) {
    operator = 'Bitel'
    return operator;
  } else if ('-LKe3_YJI8hscD7yT6Ja' === info.id_operator) {
    operator = 'Olo'
    return operator;
  } else if ('-LKe3cJvIH1sYk_XKoyF' === info.id_operator) {
    operator = 'Tuento'
    return operator;
  } else if ('-LKe3iSFo_iSTsW-rJua' === info.id_operator) {
    operator = 'Direct TV'
    return operator;
  }
}

const filterSignal = (element, position) => {
  if (element.val().id_signal_type === '') {
    const src = 'img/markers/' + element.val().id_operator + '/' + element.val().id_service + '.png';
    createMarker(element.val(), position, src)
  } else {
    const src = 'img/markers/' + element.val().id_operator + '/' + element.val().id_service + element.val().id_signal_type + '.png';
    createMarker(element.val(), position, src)
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
