const express = require('express');
const path = require('path');
const http = require('http');
const statusCodes = http.STATUS_CODES;
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 8000;
app.use(express.static(path.join(__dirname, '../../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/mainPage.html'));
});

app.get('/html', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/json', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.json'));
});

app.get('/uuid', (req, res) => {
  const newId = uuidv4();
  const uuidAnswer = { uuid: newId };
  res.send(JSON.stringify(uuidAnswer));
});

app.get('/status_code/:code', (req, res) => {
  const codex = req.params.code;
  if (!codex) {
    res.send('ENTER A CODE WHOSE RESPONSE YOU WANT TO SEE');
  } else if (statusCodes[codex]) {
    res.sendStatus(codex);
  } else {
    res.sendStatus(400);
  }
});

app.get('/delay/:delay', (req, res) => {
  const delayInShowing = req.params.delay;
  if (!delayInShowing) {
    res.end('ENTER A TIME FOR DELAY IN URL');
  } else {
    setTimeout(
      () => {
        res.sendStatus(200);
      },
      Number(delayInShowing) * 1000
    );
  }
});

app.get('*', (req, res) => {
  res.sendStatus(400);
});

app.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});
