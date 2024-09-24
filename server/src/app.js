const express = require('express');
const cors = require('cors');
const path = require('path');
const api = require('./api/api');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api', (req, res) => {
  res.send(
    '<img src="https://media2.giphy.com/media/f8ywYgttpGzzVPH5AO/giphy.gif?cid=ecf05e47zd958hp1rx6cz4bwymznj7xl8tekya4zdes62aai&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="crying-cowboy-emoji">'
  );
});

app.use('/api', api);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
