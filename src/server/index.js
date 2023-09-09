const http = require('http');
const { v4: uuidv4 } = require('uuid');
const readData = require('./util/readData');
const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
  const urlByParts = req.url.split('/');
  //FOR HTML
  if (req.url === '/html') {
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(readData('src/client/index.html'));
  }

  //FOR JSON
  else if (req.url === '/json') {
    res.setHeader('Content-Type', 'json');
    res.writeHead(200);
    res.end(readData('src/client/index.json'));
  }

  //FOR UUID
  else if (req.url === '/uuid') {
    res.setHeader('Content-Type', 'text');
    res.writeHead(200);
    const newId = uuidv4();
    const uuidAnswer = { uuid: newId };
    res.end(JSON.stringify(uuidAnswer));
  }

  //statusCode
  else if (urlByParts[1] === `status_code`) {
    res.setHeader('Content-Type', 'text');
    res.writeHead(200);
    const statusCodeMessage = http.STATUS_CODES[urlByParts[2]];
    if (!urlByParts[2]) {
      res.end('ENTER A CODE WHOSE RESPONSE YOU WANT TO SEE');
    } else {
      res.end(statusCodeMessage);
    }
  }

  //delayCode
  else if (urlByParts[1] === `delay`) {
    res.setHeader('Content-Type', 'text');
    res.writeHead(200);
    if (!urlByParts[2]) {
      res.end('ENTER A TIME FOR DELAY IN URL');
    } else {
      setTimeout(
        () => {
          res.end(http.STATUS_CODES[200]);
        },
        Number(urlByParts[2]) * 1000
      );
    }
  } else {
    res.setHeader('Content-Type', 'html');
    res.writeHead(200);
    res.end(readData('src/server/util/mainPage.html'));
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
