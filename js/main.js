document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){
  //gets the value of the userPick 
  const userPick = document.querySelector("input[name=userpick]:checked").value;
  
  //request to the server the fetch  
  // const res = await fetch(`/api?pick=${userPick}`)

  //this fetches the ai pick for RPS 

  const res = await fetch(`/api`)
  const data = await res.json()
  //console logs the ai pick data  
  console.log(data);

  // document.querySelector("#personName").textContent = data.name
  // document.querySelector("#personStatus").textContent = data.status
  // document.querySelector("#personOccupation").textContent = data.currentOccupation
}