document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){
  //gets the value of the userPick 
  const userPick = document.querySelector("input[name=userpick]:checked").value;
  
  //request to the server the fetch  
  // const res = await fetch(`/api?pick=${userPick}`)
 
  //this fetches the ai pick for RPS 

  const res = await fetch(`/api?userPick=${userPick}`)
  const data = await res.json()
  //console logs the ai pick data  
  console.log(data);

  document.querySelector(".userpicks").textContent = data.userPick
  document.querySelector(".aipick").textContent = data.aiPick
  document.querySelector("#result").textContent = data.result
}