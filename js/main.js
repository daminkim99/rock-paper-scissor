document.querySelector('#clickMe').addEventListener('click', makeReq)

// object that holds the image urls
const imageUrls = {
  rock: 'images/rock.jpg',
  paper: 'images/paper.jpeg',
  scissor: 'images/scissor.jpeg',
  youWin: 'https://media.giphy.com/media/lnlAifQdenMxW/giphy.gif',
  youLose: 'https://media.giphy.com/media/nYogYgSmIJaIo/giphy-downsized-large.gif',
  youTied: 'https://media.giphy.com/media/pGun9dgMQwSgSzryHp/giphy.gif'
}




async function makeReq(){
  //gets the value of the userPick 
  const userPick = document.querySelector("input[name=userpick]:checked").value;
  
  //request to the server the fetch  
  // const res = await fetch(`/api?pick=${userPick}`)
 
  //this fetches the ai pick for RPS 

  const res = await fetch(`https://nice-erin-cormorant-sock.cyclic.app/api?userPick=${userPick}`)
  const data = await res.json()
  //console logs the ai pick data  
  console.log(data);

  // this is the code that changes the images on the page
  document.querySelector(".userpicks").src = imageUrls[data.userPick]
  document.querySelector(".aipick").src = imageUrls[data.aiPick]
  document.querySelector("#result").src = imageUrls[data.result]

 
}