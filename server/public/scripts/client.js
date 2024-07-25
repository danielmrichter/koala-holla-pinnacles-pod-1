console.log('js');

function getKoalas() {
  console.log('in getKoalas');
  // axios call to server to get koalas

} // end getKoalas

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

getKoalas();

