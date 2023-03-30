document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  const userPick = document.querySelector("#userName").value;
  //request to the server the fetch  
  const res = await fetch(`/api?student=${userName}`)
  const data = await res.json()

  console.log(data);
  document.querySelector("#personName").textContent = data.name
  document.querySelector("#personStatus").textContent = data.status
  document.querySelector("#personOccupation").textContent = data.currentOccupation
}