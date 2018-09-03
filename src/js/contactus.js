const getUserId = document.querySelector('#dni');
const getEmail = document.querySelector('#email');
const getServices = document.querySelector('#service');
const getObservation = document.querySelector('#observation');
const documentInvalid = document.querySelector('#documentInvalid');
const emailInvalid = document.querySelector('#emailInvalid');
const reasonInvalid = document.querySelector('#reasonInvalid');
const submit = document.querySelector('#submit');
const checkbox = document.querySelector('#customControlValidation1');
const checkboxInvalid = document.querySelector('#checkboxInvalid');

firebase.database().ref('/service/').on('value', snapshot => {
  snapshot.forEach(element => {
    getServices.innerHTML += `
        <option value="${element.key}">${element.val().service_name}</option>
      `;
  });
});

submit.addEventListener('click', () => {

  if (!getUserId || !getEmail || !getObservation) {
    writeNewContact(getUserId.value, getEmail.value, getServices.value, getObservation.value)
    setTimeout(() => {
      window.location.href = 'successfulC.html';
    }, 1000)
  } else {
    if (!getUserId.value || !/^([0-9]{8,9})*$/.test(getUserId.value)) {
      documentInvalid.style.display = 'block';
    } else if (!!getUserId.value && /^([0-9]{8,9})*$/.test(getUserId.value)) {
      documentInvalid.style.display = 'none';
    }

    if (!getEmail.value || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(getEmail.value)) {
      emailInvalid.style.display = 'block';
    } else if (!!getEmail.value && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(getEmail.value)) {
      emailInvalid.style.display = 'none';
    }

    if (!getObservation.value) {
      reasonInvalid.style.display = 'block';
    } else if (!!getObservation.value) {
      reasonInvalid.style.display = 'none';
    }

    if (checkbox.checked === false) {
      checkboxInvalid.style.display = 'block';
    }
  }

})

getUserId.addEventListener('keyup', () => {
  documentInvalid.style.display = "none";
});
getEmail.addEventListener('keyup', () => {
  emailInvalid.style.display = "none";
});
getObservation.addEventListener('keyup', () => {
  reasonInvalid.style.display = "none";
});
checkbox.addEventListener('click', () => {
  if (checkbox.checked === true) {
    checkboxInvalid.style.display = "none";
  }
});
