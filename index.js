import React from 'react';
import ReactDomServer from 'react-dom/server';
import Home from './components/Home.jsx';
import express from 'express';

const app = express();

app.get('/', function (req, res) {
  res.send(ReactDomServer.renderToStaticMarkup(<Home />));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
