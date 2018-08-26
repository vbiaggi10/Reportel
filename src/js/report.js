let map;
const getUserId = document.querySelector('#dni');
const getServices = document.querySelector('#service');
const getCompanyService = document.querySelector('#companyService');
const signalContainer = document.querySelector('#signalContainer');
const getSignal = document.querySelector('#signal');
const submit = document.querySelector('#submit');
const getObservation = document.querySelector('#observation');
const radioButton = document.getElementsByName('customRadio');
const documentInvalid = document.querySelector('#documentInvalid');
const serviceInvalid = document.querySelector('#serviceInvalid');
const company = document.querySelector('#companyService');
const companyInvalid = document.querySelector('#companyInvalid');
const signalInvalid = document.querySelector('#signalInvalid');
const getEmail = document.querySelector('#email');
const emailInvalid = document.querySelector('#emailInvalid');
const checkbox = document.querySelector('#customControlValidation1');
const checkboxInvalid = document.querySelector('#checkboxInvalid');

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
      signalContainer.setAttribute('display', 'block')
      snapshot.forEach(element => {
        getSignal.innerHTML += `
        <div class="form-check">
          <input type="radio" id="${element.key}" name="customRadio" class=form-check-input">
          <label class="form-check-label" for="customRadio1">${element.val().signal_name}</label>
        </div>`;
      });

    } else {
      signalContainer.style.display = 'none';
      signalContainer.setAttribute('display', 'none')
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
    validateReport(latitude, longitude)
  });
}
const submitReport = (latitude, longitude) => {
  if (signalContainer.getAttribute('display') === 'none') {
    writeNewReport(getUserId.value, getServices.value, getCompanyService.value, ' ', getObservation.value, latitude, longitude, getEmail.value)
  } else {
    radioButton.forEach(btn => {
      if (btn.checked) {
        writeNewReport(getUserId.value, getServices.value, getCompanyService.value, btn.getAttribute('id'), getObservation.value, latitude, longitude, getEmail.value)
      }
    })
  }
  sendMail(getEmail.value, getUserId.value)
  setTimeout(() => {
    window.location.href = 'successful.html';
  }, 2000)
}

const createMarker = (pyrmont) => {
  new google.maps.Marker({
    map: map,
    position: pyrmont,
  });
}


const validateReport = (latitude, longitude) => {
  submit.addEventListener('click', () => {
    const selectedService = getServices.options[getServices.selectedIndex].text;
    const selectedCompany = company.options[company.selectedIndex].text;

    if (!!getUserId.value && !!selectedService && !!selectedCompany && checkbox.checked && !!getEmail.value) {
      submitReport(latitude, longitude)
    } else {
      if (!getUserId.value || !/^([0-9]{8,9})*$/.test(getUserId.value)) {
        documentInvalid.style.display = 'block';
      } else if (!!getUserId.value && /^([0-9]{8,9})*$/.test(getUserId.value)) {
        documentInvalid.style.display = 'none';
      }

      if (selectedService === 'Elija una opción') {
        serviceInvalid.style.display = 'block';
      } else {
        serviceInvalid.style.display = 'none';
      }

      if (selectedCompany === 'Elija una opción') {
        companyInvalid.style.display = 'block';
      } else {
        companyInvalid.style.display = 'none';
      }
      /* for (const i in radioButton) {
        if (radioButton[i].checked) {
          signalInvalid.style.display = 'none';
        } else {
          signalInvalid.style.display = 'block';
        }
      } */

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(getEmail.value)) {
        emailInvalid.style.display = 'block';
      } else if (!!getEmail.value && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(getEmail.value)) {
        emailInvalid.style.display = 'none';
      }

      if (checkbox.checked === false) {
        checkboxInvalid.style.display = 'block';
      }

    }

  })

}

checkbox.addEventListener('click', () => {
  if (checkbox.checked == true) {
    checkboxInvalid.style.display = "none";
  }
});


getUserId.addEventListener('keyup', () => {
  documentInvalid.style.display = "none";
});

getEmail.addEventListener('keyup', () => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(getEmail.value)) {
    emailInvalid.style.display = 'none';
  }
});

getServices.addEventListener('change', () => {
  serviceInvalid.style.display = "none";
});

company.addEventListener('change', () => {
  companyInvalid.style.display = "none";
});

/* radioButton.forEach(btn => {
  btn.addEventListener('click', () => {
    signalInvalid.style.display = "none";
  })

}) */

const sendMail = (email, dni) => {
  $.ajax({
    type: 'POST',
    url: 'https://mandrillapp.com/api/1.0/messages/send.json',
    data: {
      'key': 'ZGiSDAUGJIgaCMIqm9ysPA',
      'message': {
        'from_email': 'vbiaggi10@laboratoria.la',
        'to': [{
          'email': email,
          'name': dni,
          'type': 'to'
        }],
        'autotext': 'true',
        'subject': '¡TU REPORTE SE REGISTRO CON EXITO!',
        'html': 'Tu reporte ha sido registrado en nuestra base de datos y te mantendremos al tanto de la solucion'
      }
    }
  }).done(function (response) {
    console.log(response); // if you're into that sorta thing
  });
}
