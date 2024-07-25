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
  console.log('in saveKoala');
  // axios call to server to get koalas

}

getKoalas();


function renderKoalas(koalas) {
  let viewKoalasTable = document.getElementById('viewKoalas');

  for (let koala of koalas) {
    viewKoalasTable.innerHTML += (`
  <tr>
    <td>${koala.name}</td>
    <td>${koala.age}</td>
    <td>${koala.favorite_color}</td>
    <td>${koala.ready_to_transfer}</td>
    <td>${koala.notes}</td>
    <td>
      <button onclick="">Ready For Transfer</button>
    </td>
    <td>
      <button onclick="">Delete</button>
    </td>
  </tr>
  `)
  }
}