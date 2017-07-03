var React = require('react');
var ReactDomServer = require('react-dom/server');
const express = require('express');
const app = express();

class Page extends React.Component {
  render() {
    return React.createElement('div', {}, 'hello world');
  }
}

app.get('/', function (req, res) {
  res.send(ReactDomServer.renderToStaticMarkup(React.createElement(Page)));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
