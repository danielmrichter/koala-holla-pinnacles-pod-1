console.log('js');
const form = document.getElementById('koala-form');
let nameIn = document.getElementById('nameIn');
let ageIn = document.getElementById('ageIn');
let colorIn = document.getElementById('colorIn');
let readyforTransferIn = document.getElementById('readyForTransferIn');
let notesIn = document.getElementById('notesIn');
let valid = true;

function getKoalas() {
  console.log('in getKoalas');
  // axios call to server to get koalas
  axios({
    method: 'GET',
    url: '/koalas'
  }).then(function (response) {
    console.log('getKoalas() response', response.data);
    renderKoalas(response.data);
  }).catch(function (error) {
    console.log('error in GET', error);
  });
}; // end getKoalas

function saveKoala() {
  // console.log('in saveKoala');
  // axios call to server to get koalas
  const koalaName = document.getElementById(`nameIn`).value
  const koalaAge = document.getElementById(`ageIn`).value
  const koalaColor = document.getElementById(`colorIn`).value
  const koalaTransfer = readyforTransferIn.options[readyforTransferIn.selectedIndex].value
  const koalaNote = document.getElementById(`notesIn`).value

  console.log('koalaTransfer is:', koalaTransfer)

  if (!isValidForm(koalaName, koalaAge, koalaColor, koalaTransfer, koalaNote)) {
    return;
  }


  let koalatoSubmit = {
    koalaName: koalaName,
    koalaAge: koalaAge,
    koalaColor: koalaColor,
    koalaTransfer: koalaTransfer,
    koalaNote: koalaNote
  }

  axios({
    method: `POST`,
    url: `/koalas`,
    data: koalatoSubmit
  }).then((response) => {
    getKoalas()
    document.getElementById(`nameIn`).value = ``
    document.getElementById(`ageIn`).value = ``
    document.getElementById(`ageIn`).value = ``
    document.getElementById(`readyForTransferIn`).value
    document.getElementById(`notesIn`).value = ``
  }).catch((error) => {
    console.log(`Error in POST /koalas response: `, error)
  })
}

function renderKoalas(koalas) {
  let viewKoalasTable = document.getElementById('viewKoalas');
  viewKoalasTable.innerHTML = '';

  for (let koala of koalas) {
    let transferStatus;

    if (koala.ready_to_transfer) {
      transferStatus = 'Yes';
    } else {
      transferStatus = "No";
    }

    viewKoalasTable.innerHTML += (`
  <tr>
    <td>${koala.name}</td>
    <td>${koala.age}</td>
    <td>${koala.favorite_color}</td>
    <td>${transferStatus}</td>
    <td>${koala.notes}</td>
    <td>
      <button onclick="transferChange(${koala.id})">Ready For Transfer</button>
    </td>
    <td>
      <button onClick="deleteKoalas(${koala.id})">Delete</button>
    </td>
  </tr>
  `)
  }
};

function transferChange(koalaId) {
  axios({
    method: 'PUT',
    url: `/koalas/${koalaId}`,
    data: { transfer: 'true' }
  })
    .then((response) => {
      getKoalas();
    })
    .catch((error) => {
      console.log('transferChange() error:', error);
    })
};


getKoalas();

function deleteKoalas(koalaId) {
  axios({
    method: `DELETE`,
    url: `/koalas/${koalaId}`,

  }).then((response) => {
    console.log(`Delete in koalas response: `, response)
    getKoalas()
  }).catch((error) => {
    console.log('Error in Delete koalas response: ', error)
  })
}

function isValidForm(name, age, color, transfer, notes) {
  let result = true;
  nameIn.classList.remove('error');
  ageIn.classList.remove('error');
  colorIn.classList.remove('error');
  readyforTransferIn.classList.remove('error');
  notesIn.classList.remove('error');

  errorValidation.innerText = " ";

  if (name.length === 0) {
    nameIn.classList.add('error');
    result = false;
  }
  if (age.length === 0) {
    ageIn.classList.add('error');
    result = false;
  }
  if (color.length === 0) {
    colorIn.classList.add('error');
    result = false;
  }
  if (transfer === 'default') {
    readyforTransferIn.classList.add('error');
    result = false;
  }
  if (notes.length === 0) {
    notesIn.classList.add('error');
    result = false;
  }

  if (!result) {
    errorValidation.innerHTML += `
    <p>Please complete required fields!</p>`;
  }

if (!Number(age)) {
  ageIn.classList.add('error');
    result = false;
}

  return result;
}
