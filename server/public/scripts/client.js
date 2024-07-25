console.log('js');

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
  }).catch((error) =>{
    console.log(`Error in POST /koalas response: `, error)
  })
}

function renderKoalas(koalas) {
  let viewKoalasTable = document.getElementById('viewKoalas');
  viewKoalasTable.innerHTML = '';

  for (let koala of koalas) {
    viewKoalasTable.innerHTML += (`
  <tr>
    <td>${koala.name}</td>
    <td>${koala.age}</td>
    <td>${koala.favorite_color}</td>
    <td>${koala.ready_to_transfer}</td>
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
    data: {transfer: 'true'}
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

  }).then ((response) =>{
    console.log(`Delete in koalas response: `, response)
    getKoalas()
  }).catch((error) => {
    console.log('Error in Delete koalas response: ', error)
  })
}

