import React from 'react';
import ReactDomServer from 'react-dom/server';
import Home from './components/Home/Home.jsx';
import express from 'express';
import Styled from './components/Styled/Styled.jsx';

const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  let css = new Set();

  function insertCss(...styles) {
    styles.forEach(function (style) {
      css.add(style._getCss());
    });
  }

  let body = ReactDomServer.renderToStaticMarkup(
    <Styled insertCss={insertCss}>
      <Home />
    </Styled>
  );

  let html = `
    <style>${[...css].join('')}</style>
    ${body}
  `;

  res.send(html);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
