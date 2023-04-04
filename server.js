const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')
const PORT = 3001

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
  else if (page == '/images/rock.jpg') {
    fs.readFile('images/rock.jpg', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.write(data);
      res.end();
    })
  }
  else if (page == '/images/SSBUP.png') {
    fs.readFile('images/SSBUP.png', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.write(data);
      res.end();
    });
  }
  else if (page == '/images/paper.jpeg') {
    fs.readFile('images/paper.jpeg', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.write(data);
      res.end();
    });
  }
  else if (page == '/images/scissor.jpeg') {
    fs.readFile('images/scissor.jpeg', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.write(data);
      res.end();
    });
  }
  else if (page == '/images/vs.png') {
    fs.readFile('images/vs.png', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.write(data);
      res.end();
    });
  }
  else if (page == 'images/victory.gif') {
    fs.readFile('images/victory.gif', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'image/gif' });
      res.write(data);
      res.end();
    });
  }

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
      result = 'youWin';
    } else if (userPick === aiPick) {
      result = 'youTied';
    } else {
      result = 'youLose';
    }
    // object that is sent to the front end
    const response = {
      userPick: userPick,
      aiPick: aiPick,
      result: result
    };
    console.log('userPick:', userPick, 'aiPick:', aiPick, 'result', result);
    res.end(JSON.stringify(response));
  }

  else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function (err, data) {
      res.writeHead(200,{"Content-type" : "text/css"});
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

server.listen(process.env.PORT || PORT, ()=> {
  console.log(`server running on ports ${PORT}`)
});
