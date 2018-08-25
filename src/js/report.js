// $(document).ready(() => {
//   $('select').formSelect();
// });
let map;
const getUserId = document.querySelector('#dni');
const getServices = document.querySelector('#service');
const getCompanyService = document.querySelector('#companyService');
const signalContainer = document.querySelector('#signalContainer');
const getSignal = document.querySelector('#signal');
const submit = document.querySelector('#submit');
const getObservation = document.querySelector('#observation');
const radioButton = document.getElementsByName('customRadio');

firebase.database().ref('/service/').on('value', snapshot => {
  snapshot.forEach(element => {
    getServices.innerHTML += `
        <option value="${element.key}">${element.val().service_name}</option>
      `;
  });
});

firebase.database().ref('/operator/').on('value', snapshot => {
  getServices.addEventListener('change', () => {
    getCompanyService.innerHTML = '<option value="" disabled selected>Elige una opción</option>';
    if (getServices.value === '-LKe2uS-Go3sI_lQ2tZI') {
      snapshot.forEach(element => {
        if (element.key === '-LKe3Se1I-QAR7-4oTga' || element.key === '-LKe3VxBId5kCsk5gf-9' || element.key === '-LKe3Xrp0nw1D4fhxQry' || element.key === '-LKe3ZChA0ImL4nAHGwB' || element.key === '-LKe3_YJI8hscD7yT6Ja')
          getCompanyService.innerHTML += `
          <option value="${element.key}">${element.val().operator_name}</option>
        `;
      });
    } else if (getServices.value === '-LKe30srkZEH4drbijm7') {
      snapshot.forEach(element => {
        if (element.key === '-LKe3Se1I-QAR7-4oTga' || element.key === '-LKe3VxBId5kCsk5gf-9' || element.key === '-LKe3Xrp0nw1D4fhxQry' || element.key === '-LKe3ZChA0ImL4nAHGwB' || element.key === '-LKe3cJvIH1sYk_XKoyF' || element.key === '-LKe3cJvIH1sYk_XKoyF')
          getCompanyService.innerHTML += `
          <option value="${element.key}">${element.val().operator_name}</option>
        `;
      });
    } else if (getServices.value === '-LKe33kSAYcRFP3u_NZt') {
      snapshot.forEach(element => {
        if (element.key === '-LKe3Se1I-QAR7-4oTga' || element.key === '-LKe3VxBId5kCsk5gf-9' || element.key === '-LKe3iSFo_iSTsW-rJua')
          getCompanyService.innerHTML += `
          <option value="${element.key}">${element.val().operator_name}</option>
        `;
      });
    } else if (getServices.value === '-LKe37KN7Nh8C77wnvkD') {
      snapshot.forEach(element => {
        if (element.key === '-LKe3Se1I-QAR7-4oTga' || element.key === '-LKe3VxBId5kCsk5gf-9' || element.key === '-LKe3Xrp0nw1D4fhxQry')
          getCompanyService.innerHTML += `
          <option value="${element.key}">${element.val().operator_name}</option>
        `;
      });
    } else if (getServices.value === '-LKe38j7cBa00iEZe41u') {
      snapshot.forEach(element => {
        if (element.key === '-LKe3Se1I-QAR7-4oTga' || element.key === '-LKe3VxBId5kCsk5gf-9' || element.key === '-LKe3Xrp0nw1D4fhxQry' || element.key === '-LKe3ZChA0ImL4nAHGwB' || element.key === '-LKe3cJvIH1sYk_XKoyF' || element.key === '-LKe3cJvIH1sYk_XKoyF')
          getCompanyService.innerHTML += `
          <option value="${element.key}">${element.val().operator_name}</option>
        `;
      });
    }
  })
});

firebase.database().ref('/signal/').on('value', snapshot => {
  getServices.addEventListener('change', () => {
    getSignal.innerHTML = '';
    if (getServices.value === '-LKe30srkZEH4drbijm7') {
      signalContainer.style.display = 'block';
      snapshot.forEach(element => {
        getSignal.innerHTML += `
        <div class="form-check">
          <input type="radio" id="${element.key}" name="customRadio" class=form-check-input">
          <label class="form-check-label" for="customRadio1">${element.val().signal_name}</label>
        </div>`;
      });

    } else {
      signalContainer.style.display = 'none';
    }
  })
})

initMap = () => {
  navigator.geolocation.getCurrentPosition((pos) => {

    latitude = pos.coords.latitude;
    longitude = pos.coords.longitude;

    const pyrmont = new google.maps.LatLng(latitude, longitude);

    map = new google.maps.Map(document.getElementById("map"), {
      center: pyrmont,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.roadmap
    });

    infowindow = new google.maps.InfoWindow();

    createMarker(pyrmont)
    submitReport(latitude, longitude)
  });
}

const submitReport = (latitude, longitude) => {
  submit.addEventListener('click', () => {
    if (getSignal.style.display === 'none') {
      writeNewReport(getUserId.value, getServices.value, getCompanyService.value, '', getObservation.value, latitude, longitude)
    } else {
      for (const i in radioButton) {
        if (radioButton[i].checked) {
          writeNewReport(getUserId.value, getServices.value, getCompanyService.value, radioButton[i], getObservation.value, latitude, longitude)
        }
      }
    }
    setTimeout(() => {
      window.location.href = 'successful.html';
    }, 1000)
  })
}

const createMarker = (pyrmont) => {
  new google.maps.Marker({
    map: map,
    position: pyrmont,
  });
}
