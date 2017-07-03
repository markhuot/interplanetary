After reading Dan's excellent article on [Stealing Your Way to Original Designs](http://danmall.me/articles/stealing-your-way-to-original-designs/) I felt compelled to bring his design to life. I've been using React a lot, personally, and was looking for a good reason to dive a bit deeper. This seemed like the perfect excuse. My goal was simply to end up with a copy of Dan's PSD in HTML. There were no other requirements. Wherever this took me, was fine.

## Starting out

To start, I took a stab at some basic requirements,

```bash
$ mkdir ~/Sites/interplanetary
$ cd ~/Sites/interplanetary
$ yarn init
$ yarn add react react-dom webpack express babel
```

Wild guesses, yes, but safe enough. Next up was setting up a basic Webpack config. I probably could have used a boilerplate for all of this but I prefer to do it myself so I have some idea what's going on. My first pass at the Webpack config looked like this,

```javascript
var path = require('path');

module.exports = {
  "entry": "./index.js",
  "output": {
    "filename": "bundle.js"
  }
};
```

After making `index.js` and running `yarn webpack` I now have a `bundle.js`, so Webpack is working. At this point I'm still not sure _exactly_ what I need Webpack for but I'm guessing I'm going to pull in some CSS via `require` statments, so I set it up first. Next up was to put something inside `index.js`.

## Rendering React

First up was rendering out some HTML. I love me some progressive enhancement/web apps, so I wanted to use `react-dom/server`'s `renderToString` method. So, I threw the following into `index.js` to start,

```javascript
var React = require('react');
var ReactDomServer = require('react-dom/server');

class Page extends React.Component {
  render() {
    return React.createElement('div', {}, 'hello world');
  }
}

console.log(ReactDomServer.renderToStaticMarkup(React.createElement(Page)));
```

Running that with `yarn webpack && node bundle.js` gave me,

```html
<div>hello world</div>
```

Yes! That's exactly what I need so far. Next up I needed to get it into a browser with something like [Express](https://expressjs.com), as my web server.

## A Web Server

I took the [Hello world](https://expressjs.com/en/starter/hello-world.html) example from the Express website and shoved my React code inside `GET /` method to see it in a browser, like so:

```javascript
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

```

But that gave me errors that Node couldn't find a bunch of modules like `fs`. This is because Webpack assumes you're running in the browser, not in Node/SSR. So, I updated my Webpack config with `target: "node"` and the errors went away. Now, running `yarn webpack && node bundle.js` shows `Example app listening on port 3000!` in my console and navigating to http://localhost:3000 shows `hello world` in my browser!

You can see the repository [at this point in time on GitHub](https://github.com/markhuot/interplanetary/tree/c50e1e5bcb08b8cf04e2b110ab4fbeb6f08a50d4).

## Simplifying

I'm still not using JSX or any of the ES6 things that can shorten down my code and make this a bit easier to maintain so, it was time to bring in Babel. Babel was a `yarn add` away. But I also need the compilers for JSX and some of the ES6 niceties as well as the Webpack loader, so my final add was `yarn add babel-core babel-preset-env babel-plugin-transform-react-jsx babel-loader`. Then I'll need to adjust my `webpack.config.js` to use Babel by adding the following `module.rules`,

```javascript
{
  "test": /\.jsx?$/,
  "exclude": /(node_modules|bower_components)/,
  "use": {
    "loader": 'babel-loader',
    "options": {
      "presets": ["env"],
      "plugins": ["transform-react-jsx"]
    }
  }
}
```

At this point since I have Babel now I can move my `Page` out of `index.js` into its own `components/Home.jsx` file. This file got a lot shorter and prettier during the move,

```jsx
import React from 'react';

export default class Home extends React.Component {
  render() {
    return <div>Hello World</div>;
  }
}
```

Lastly, I could update my `index.js` with some ES6 `import` statments, including my new `Home` class like so,

```javascript
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
```

JSX was weird for me at first, but once I accepted that I wasn't separating things vertically into HTML, CSS, and Javascript, but instead into unique (self contained) modules, things got easier for me.

With all this out of the way I could re-run `yarn webpack && node bundle.js` and see the same `Hello World` in my browser.

You can see the repository [at this point in time on GitHub]().

## First components

