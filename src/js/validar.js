const getUserId = document.querySelector('#dni');
const getEmail = document.querySelector('#email');
const getCel = document.querySelector('#cell');
const getServices = document.querySelector('#service');
const getObservation = document.querySelector('#observation');


firebase.database().ref('/service/').on('value', snapshot => {
  snapshot.forEach(element => {
    getServices.innerHTML += `
        <option value="${element.key}">${element.val().service_name}</option>
      `;
  });
});




const submit= document.querySelector('#submit');



submit.addEventListener('click',()=>{

const documentInvalid = document.querySelector('#documentInvalid');

if (!dni.value || !/^([0-9]{8,9})*$/.test(dni.value)) {
    documentInvalid.style.display = 'block';

  } else if (!!dni.value && /^([0-9]{8,9})*$/.test(dni.value)) {
    documentInvalid.style.display = 'none';


  }

  dni.addEventListener('keyup', () => {
    documentInvalid.style.display = "none";

    writeNewContact(getUserId.value,getEmail.value,getCel.value,getServices.value,getObservation.value)

    	  setTimeout(() => {
    window.location.href = 'successfulC.html';
  }, 1000)

  });

	


})




