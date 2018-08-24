// $(document).ready(() => {
//   $('select').formSelect();
// });
let map;
const getUserId = document.querySelector('#dni');
const getServices = document.querySelector('#services');
const getCompanyService = document.querySelector('#companyService');


firebase.database().ref('/operator/').on('value', snapshot => {
  getServices.addEventListener('change', () => {
    if (getServices.value === 'service1') {
      snapshot.forEach(element => {
        console.log(element.key)  
        const optionElements = document.createElement('option');
        optionElements.textContent = element.val().operator_name;
        getCompanyService.appendChild(optionElements);
      });
    }
  })
  // console.log(snapshot)
});


// const putCompany = (serviceId) => {


// }

const initMap = () => {
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
    // writeNewReport(getUserId.v alue, 'id_service', 'id_operator', 'id_signal_type', 'observation', latitude, longitude)

  });
}

const createMarker = (pyrmont) => {
  new google.maps.Marker({
    map: map,
    position: pyrmont,
  });
}
