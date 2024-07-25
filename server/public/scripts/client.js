console.log('js');

function getKoalas() {
  console.log('in getKoalas');
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
  const koalaTransfer = document.getElementById(`readyForTransferIn`).value
  const koalaNote = document.getElementById(`notesIn`).value
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
  }).then ((response) =>{
    getKoalas()
    document.getElementById(`nameIn`).value = ``
    document.getElementById(`ageIn`).value = ``
    document.getElementById(`ageIn`).value = ``
    document.getElementById(`readyForTransferIn`).value
    document.getElementById(`notesIn`).value = ``
  }).catch((error) =>{
    console.log(`Error in POST /koalas response: `, error)
  })
}

function renderKoalas(koalas) {
  let viewKoalasTable = document.getElementById('viewKoalas');
  viewKoalasTable.innerHTML = '';

  for (let koala of koalas) {
    viewKoalasTable.innerHTML += `
  <tr>
    <td id=koalaName${koala.id} contenteditable="true">${koala.name}</td>
    <td id=koalaAge${koala.id} contenteditable="true">${koala.age}</td>
    <td id=koalaColor${koala.id} contenteditable="true">${koala.favorite_color}</td>
    <td>${koala.ready_to_transfer}</td>
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
  `
  }
};

function transferChange(koalaId) {
  axios({
    method: 'PUT',
    url: `/koalas/${koalaId}`,
    data: {transfer: 'true'}
  })
    .then((response) => {
      getKoalas();
    })
    .catch((error) => {
      console.log('transferChange() error:', error);
    })
};

function deleteKoalas(koalaId) {
  axios({
    method: `DELETE`,
    url: `/koalas/${koalaId}`,

  }).then ((response) =>{
    console.log(`Delete in koalas response: `, response)
    getKoalas()
  }).catch((error) => {
    console.log('Error in Delete koalas response: ', error)
  })
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
   }).then((response) =>{
    getKoalas()
   }).catch((error) =>{
    console.log(`Error in PATCH updateKoala: `, error)
   })
}
getKoalas();
