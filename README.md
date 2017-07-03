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

You can see the repository [at this point in time on GitHub](https://github.com/markhuot/interplanetary/tree/9b24cbe92f7aa0ec615d0dba6292d950cc192022).

## First components

Things are _sort of_ working at this point. So, diving right in to the page I decied to work on the `components/Hero.jsx` component. This would be the space shuttle text. It's mostly just HTML and looks like this,

```jsx
import React from 'react';

export default class Hero extends React.Component {
  render() {
    return <div>
      <h1>When this world just isn&rsquo;t enough.</h1>
      <h2>Take your adventures interplanetary</h2>
      <p><a href="#">Reserve your spot</a></p>
    </div>;
  }
}
```

This file/class then gets called into our `Home.jsx` like so,

```jsx
import React from 'react';
import Hero from './Hero.jsx';

export default class Home extends React.Component {
  render() {
    return <div>
      <Hero />
    </div>;
  }
}
```

This gave me the exact HTML I needed, so I expanded this out to all of the components on the page. At the end I had the following,

```shell
$ ls components/
ContactForm.jsx		Footer.jsx		Home.jsx		LocationCarousel.jsx	PriceTable.jsx
ContactInfo.jsx		Hero.jsx		ListBox.jsx		Navigation.jsx
```

My `Home.jsx` also looked like this,

```jsx
import React from 'react';
import Hero from './Hero.jsx';
import LocationCarousel from './LocationCarousel.jsx';
import ListBox from './ListBox.jsx';
import PriceTable from './PriceTable.jsx';
import Footer from './Footer.jsx';

export default class Home extends React.Component {
  render() {
    return <div>
      <Hero />
      <LocationCarousel />
      <ListBox />
      <PriceTable />
      <Footer />
    </div>;
  }
}
```

You can see the repository [at this point in time on GitHub](https://github.com/markhuot/interplanetary/tree/b453e7c4346b920417bd42a1ae362c3548b6267f).

## Styling

Next up was writing some CSS for the styling of this thing. I wanted to start with the hero first, but the logic would have been the same regardless of the component. Personally, I'm a big fan of the abstraction that CSS Modules provide. I understand the downsides of it and how it removes the power of CSS's cascade, however, I'll gladly trade the global cascade for a more maintainable local cascade, per-module. To dive in I started by requiring the basic implementation of CSS Modules inside `css-loader` with `yarn add css-loader isomorphic-style-loader` (Note: I needed `isomorphic-style-loader` because the default `style-loader` does not work for server side rendering).

I then needed to update my `webpack.config.js` with this additional rule,

```javascript
{
  test: /\.css$/,
  use: [ 'isomorphic-style-loader', 'css-loader' ]
}
```

With that, I could create `Hero.css` and import that into the corresponding `.jsx` file, like so:

```javascript
import React from 'react';
import s from './Hero.css';

export default class Hero extends React.Component {
  render() {
    // ...
  }
}
```

Again, running `yarn webpack && node bundle.js` worked great and showed me the HTML, but no styles yet. That's because the the CSS is actually imported into the `s` variable, above, but never pass anywhere. One of a few things needs to happen at this point:

1. We need to render the CSS as inline styles, yay for network performance, boo for dom parsing/layout
2. We need to extract the CSS from the javascript and generate a static CSS file. This'll work but seems a bit dated to me.
3. Ideally, we could pass the CSS from each module _up_ the tree and fill in a `style` tag with only the necessary styles.

I chose to try the third approach. At the component level this is easy to implement. The idea is that whenver your component triggers the `componentWillMount` event, pass the necessary CSS up the tree to some parent to render. And whenever your component triggers `componentWillUnmount` you remove the CSS from that parent. At a basic level it would look like this,

```jsx
import s from './Hero.css';

class Hero extends React.Component {
  componentWillMount() {
    this.removeCss = this.context.insertCss(s);
  }

  componentWillUnmount() {
    setTimeout(this.removeCss, 0);
  }

  // ...
```

The trick is "the parent" part of it. Luckily React handles this for us quite nicely with the `context` variable. Anything on `context` will travel down to any child compoents from the component it is first defined on. So, to manage this we need some parent component to define an `insertCss` `context` method that all our children can interact with. We can use our `Home.jsx` component to define this. I'll do it like so, for now,

```jsx
class Home extends React.Component {
  getChildContext() {
    return {
      insertCss: this.props.insertCss
    };
  }

  render() {
    return <div>
      <Hero />
      <LocationCarousel />
      <ListBox />
      <PriceTable />
      <Footer />
    </div>;
  }
}

Home.childContextTypes = {
  "insertCss": PropTypes.func,
};

export default Home;
```

What this allows me to do is pass `insertCss` _in to_ my home Component so that my styles can be managed entirley outside the React system. This would happen in `index.js`, like so:

```jsx
app.get('/', function (req, res) {
  let css = new Set();

  function insertCss(...styles) {
    styles.forEach(function (style) {
      css.add(style._getCss());
    });
  }

  let body = ReactDomServer.renderToStaticMarkup(<Home insertCss={insertCss} />);
  let html = `
    <style>${[...css].join('')}</style>
    ${body}
  `;

  res.send(html);
});
```

And this works! It's magical that now my CSS is now tightly tied to the HTML it requires. If one changes it's easy to audit the other and make any necessary adjustments. What I like most about this approach is that it allows me to write vanilla CSS the way it is supposed to be written with `@media` queries and all.
