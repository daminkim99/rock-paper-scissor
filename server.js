const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

//function that creates the aiPick for RPS 
const compRPS = {
  pick: function () {
    const aiPick = Math.floor(Math.random() * 3);
    if (aiPick == 0) {
      return "rock";
    } else if (aiPick == 1) {
      return "paper";
    } else {
      return "scissor";
    }
  }
};


const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }
  // else if (page == '/otherpage') {
  //   fs.readFile('otherpage.html', function(err, data) {
  //     res.writeHead(200, {'Content-Type': 'text/html'});
  //     res.write(data);
  //     res.end();
  //   });
  // }
  // else if (page == '/otherotherpage') {
  //   fs.readFile('otherotherpage.html', function(err, data) {
  //     res.writeHead(200, {'Content-Type': 'text/html'});
  //     res.write(data);
  //     res.end();
  //   });
  // }

  // Victory at last!!!
  // sike it got me again, user pick keeps coming back as rock :facepalm:
  // score figured out, got the user pick to work
  // win conditions aren't coming back correctly
  // it was a typo on my part, I had scissors instead of scissor
  // broke it again but I found the issue it needed to be ['userPick'] not [userPick].

  // Victory conditional
  else if (page == '/api') {
    const query = url.parse(req.url).query;
    const params = querystring.parse(query);
    const userPick = params['userPick'];
    const aiPick = compRPS.pick();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    let result; 
    
    // if satements for the RPS game
    if ((userPick == "rock" && aiPick == "scissor") || (userPick === 'paper' && aiPick === 'rock') || (userPick === 'scissor' && aiPick === 'paper')) {
      result = 'You Win';
    } else if (userPick === aiPick) {
      result = 'You Tied';
    } else {
      result = 'You Lose';
    }
    const response = {
      userPick: userPick,
      aiPick: aiPick,
      result: result
    };
    console.log('userPick:', userPick, 'aiPick:', aiPick);
    res.end(JSON.stringify(response));
  }

  // if('student' in params){
  //   if(params['student']== 'leon'){
  //     res.writeHead(200, {'Content-Type': 'application/json'});
  //     const objToJson = {
  //       name: "leon",
  //       status: "Boss Man",
  //       currentOccupation: "Baller"
  //     }
  //     res.end(JSON.stringify(objToJson));
  //   }//student = leon
  //   else if(params['student'] != 'leon'){
  //     res.writeHead(200, {'Content-Type': 'application/json'});
  //     const objToJson = {
  //       name: "unknown",
  //       status: "unknown",
  //       currentOccupation: "unknown"
  //     }
  //     res.end(JSON.stringify(objToJson));
  //   }//student != leon
  // }//student if
  //else if
  else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      res.end();
    });
  } else {
    figlet('404!!', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
