import React from 'react';
import ReactDomServer from 'react-dom/server';
import Home from './components/Home/Home.jsx';
import express from 'express';
import Styled from './components/Styled/Styled.jsx';

const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  let css = new Set();
  let inserted = {};

  function insertCss(...styles) {
    styles.forEach(function (style) {
      const [[moduleId, _, __], ___, ____] = style._getContent();

      if (!inserted[moduleId]) {
        css.add(style._getCss());
        inserted[moduleId] = true;
      }
    });
  }

  let body = ReactDomServer.renderToStaticMarkup(
    <Styled insertCss={insertCss}>
      <Home />
    </Styled>
  );

  res.send(`<style>${[...css].join('')}</style>${body}`);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
