const getUserId = document.querySelector('#dni');
const documentInvalid = document.querySelector('#documentInvalid');

if (!dni.value || !/^([0-9]{8,9})*$/.test(dni.value)) {
    documentInvalid.style.display = 'block';
  } else if (!!dni.value && /^([0-9]{8,9})*$/.test(dni.value)) {
    documentInvalid.style.display = 'none';
  }

  dni.addEventListener('keyup', () => {
    documentInvalid.style.display = "none";
  });