console.log('js');
const form = document.getElementById('koala-form');
let nameIn = document.getElementById('nameIn');
let ageIn = document.getElementById('ageIn');
let colorIn = document.getElementById('colorIn');
let readyforTransferIn = document.getElementById('readyForTransferIn');
let requiredEl = document.getElementById('required-el');
let updateSuccess = document.getElementById('update-success');
let valid = true;

function getKoalas() {
  console.log("in getKoalas");
  // axios call to server to get koalas
  axios({
    method: 'GET',
    url: '/koalas'
  }).then(function (response) {
    console.log('getKoalas() response', response.data);
    allKoalas = response.data;
    renderKoalas(allKoalas);
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

  if (!isValidForm(koalaName, koalaAge, koalaColor, koalaTransfer)) {
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
    .then((response) => {
      getKoalas();
      document.getElementById(`nameIn`).value = ``;
      document.getElementById(`ageIn`).value = ``;
      document.getElementById(`ageIn`).value = ``;
      document.getElementById(`readyForTransferIn`).value;
      document.getElementById(`notesIn`).value = ``;
    })
    .catch((error) => {
      console.log(`Error in POST /koalas response: `, error);
    });
}

function renderKoalas(koalas) {
  let viewKoalasTable = document.getElementById("viewKoalas");
  viewKoalasTable.innerHTML = "";

  for (let koala of koalas) {

    let transferStatus;

    if (koala.ready_to_transfer) {
      transferStatus = 'Yes';
    } else {
      transferStatus = "No";
    }

    viewKoalasTable.innerHTML += `
  <tr>
    <td id=koalaName${koala.id} contenteditable="true">${koala.name}</td>
    <td id=koalaAge${koala.id} contenteditable="true">${koala.age}</td>
    <td id=koalaColor${koala.id} contenteditable="true">${koala.favorite_color}</td>
    <td>${transferStatus}</td>
    <td id=koalaNotes${koala.id} contenteditable="true">${koala.notes}</td>
    <td>
      <button onclick="transferChange(${koala.id})">Ready For Transfer</button>
    </td>
    <td>
      <button onClick="deleteKoalas(${koala.id})">Delete</button>
    </td>
    <td>
      <button onClick="updateKoala(${koala.id})">Update Info</button>
    </td>
  </tr>
  `;
  }
}

function transferChange(koalaId) {
  axios({
    method: "PUT",
    url: `/koalas/${koalaId}`,
    data: { transfer: 'true' }

  })
    .then((response) => {
      getKoalas();
    })
    .catch((error) => {
      console.log("transferChange() error:", error);
    });
}

function deleteKoalas(koalaId) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios({
        method: `DELETE`,
        url: `/koalas/${koalaId}`,
      })
        .then(
          (response) =>
            getKoalas(),
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            }),
        )
        .catch((error) => {
          console.log("Error in Delete koalas response: ", error);
        });
    }
  });
}

let allKoalas = [];
document.getElementById('filterInput').addEventListener('input', function () {
  const filterValue = this.value.toLowerCase();
  const filteredKoalas = allKoalas.filter(koala =>
    koala.name.toLowerCase().includes(filterValue) ||
    koala.age.toString().toLowerCase().includes(filterValue) ||
    koala.favorite_color.toLowerCase().includes(filterValue) ||
    koala.ready_to_transfer.toString().toLowerCase().includes(filterValue) ||
    koala.notes.toLowerCase().includes(filterValue)
  );
  renderKoalas(filteredKoalas);
});
function updateKoala(koalaId) {
  let newKoalaName = document.getElementById(`koalaName${koalaId}`).innerText
  let newKoalaAge = document.getElementById(`koalaAge${koalaId}`).innerText
  let newKoalaColor = document.getElementById(`koalaColor${koalaId}`).innerText
  let newKoalaNote = document.getElementById(`koalaNotes${koalaId}`).innerText
  let updateObj = {
    newKoalaName: newKoalaName,
    newKoalaAge: newKoalaAge,
    newKoalaColor: newKoalaColor,
    newKoalaNote: newKoalaNote
  }
  console.log(`Koala update info to PATCH:`, updateObj)
  axios({
    method: `PATCH`,
    url: `/koalas/${koalaId}`,
    data: updateObj
  }).then((response) => {
    getKoalas();

    updateSuccess.innerHTML = `
    <p class="full">ℹ️ ${newKoalaName} has been updated successfully!</p><button onclick="removeAlert(event)">Remove Alert</button>
    `;

    updateSuccess.style.display = "flex";
    updateSuccess.style.flexDirection = "row";

  }).catch((error) => {
    console.log(`Error in PATCH updateKoala: `, error)
  })
}

function isValidForm(name, age, color, transfer) {
  let result = true;
  nameIn.classList.remove('error');
  ageIn.classList.remove('error');
  colorIn.classList.remove('error');
  readyforTransferIn.classList.remove('error');
  notesIn.classList.remove('error');
  requiredEl.style.display = 'block';

  errorValidation.innerText = '';

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

  if (!result) {
    errorValidation.innerHTML += `
    <p>Please complete required fields!</p>`;
    requiredEl.style.display = 'none';
  }

  if (!Number(age)) {
    ageIn.classList.add('error');
    result = false;
  }

  return result;
}

function removeAlert(event) {
  updateSuccess.style.display = "none";
}

getKoalas();
