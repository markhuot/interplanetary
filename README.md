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

You can see the repository [at this point in time on GitHub](https://github.com/markhuot/interplanetary/tree/1e9615ae4df8c3c11fea1a0de3fcb435f6ddc366).

## Easier styles

Of course, there's always a better way. And `isomorphic-style-loader`, which we're already using, provides it. React has, what they refer to as "Higher Order Components" (HOC) which take an existing component and "wrap" it with additional functionality. Using the `withStyles` HOC, I can wrap my `Hero` class and remove the event listners, because they're handled for me in the HOC (out of sight). Now my `Hero.jsx` file looks like this,

```jsx
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Hero.css';

class Hero extends React.Component {
  render() {
    return <div>
      <h1>When this world just isn&rsquo;t enough.</h1>
      <h2>Take your adventures interplanetary</h2>
      <p><a href="#">Reserve your spot</a></p>
    </div>;
  }
}

export default withStyles(s)(Hero);
```

The magic there is that `withStyles` has its own listeners that call `insertCss` for you. It's some magic convention, for sure, but I've found that most of React is magic convention so I'm becoming okay with it.

Things are looking much better now. Next up I want to clean up all that `context` mucking I did in `index.js` and `Home.jsx`. To do so we can create our own HOC to handle all the CSS styling I had shoved in to `Home.jsx`. I created a new component called `Styled.jsx` that does this for me,

```jsx
import React from 'react';
import PropTypes from 'prop-types';

class Styled extends React.Component {
  getChildContext() {
    return {
      insertCss: this.props.insertCss
    };
  }

  render() {
    return this.props.children;
  }
}

Styled.childContextTypes = {
  "insertCss": PropTypes.func,
};

export default Styled;
```

With this, my `Home.jsx `returns to the shorter,

```jsx
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

Now, I've got a framework to render out CSS so I'm ready to start styling some of these components.

You can see the repository [at this point in time on GitHub](https://github.com/markhuot/interplanetary/tree/fc6e664e97767b77706dfbbc10d7330533399238).

## Fleshing it out

First up I needed a way to reload Webpack without stopping and starting the server every time. There are a bunch of ways to do this but I find the easiest way is to use `yarn webpack -- --watch`. Couple that with `yarn nodemon bundle.js` and you've got a basic "hot module" system (without some of the added complexity). I abstracted this out into a `yarn dev` script for my own sanity.

Next, I cut out the background image of the space shuttle. Now, I could place this in the `components` folder, right next to everything else, but by now my `components` folder is getting a bit heavy so I refactored everything into their own folders. My Hero is now in its own folder and my background image ended up in `./components/Hero/background.png`. This makes each module it's own little reusable folder of assets. The HTML, CSS, Javascript, and images are all co-located within a single folder. If I need to use a Hero on two projects I can just drag and drop the entire folder over and I'm done. In the future I could even put each of these folders on NPM for myself to simply `import` into future projects. I won't worry about that today, but it's nice to know it's an option.

One oddity to take note of when using Webpack's `file-loader` to bring in images. When the image is referenced in the CSS, `file-loader` can take it and move it somewhere else. This is helpful, because it can move it into a `public` folder that Express now handles. I chose to take this route and wired up `file-loader` like so,

```js
{
  test: /\.png$/,
  use: {
    "loader": "file-loader",
    "query": {
      "name": "./public/images/[hash].[ext]",
      "publicPath": (url) => url.replace('./public', ''),
    }
  }
}
```

Waht this is doing is moving any referenced image into `./public/images/` and then rewriting the URL in the browser to be root-relative at `/images`. With all this in place I now have a directory structure like this,

```
components
-- Hero
---- Hero.jsx
---- Hero.css
---- background.png
```

And in my CSS I have,

```css
.hero {
  background: url('./background.png') no-repeat center center;
  background-size: cover;
}
```

Again, this is all about portability. The CSS only cares where the image is in reference to itself. You can later require this file, move this file, it doesn't matter because it's your buildstep that is responsible for making the image servable.

You can see the repository [at this point in time on GitHub](https://github.com/markhuot/interplanetary/tree/3c0b971e85c9ef59e50ce87574d63e32a838bd4e).

## The actual work...

Next I went through and styled many of the components. This took the most time, but was relatively straightforward CSS work. Nothing _too_ tricky here. There's definitely a lot more I can do, too. Animations, better responsive styling, and image optimization are all still on the list.

You can see the repository [at this point in time on GitHub](https://github.com/markhuot/interplanetary/tree/5f7e5505c7c1fe643aa034bdaf01ad838731edc1).

## Cleaner component names

With the current setup whenever I refer to a module I have to path directly to it through a mess of `../../` directories. It's gross, and could probably be cleaner. For example, if I'm working on `components/Hero/Hero.jsx` and I want to refer to a `Button` I need to path with `../Button/Button.jsx` and that's just _too_ much typing. So, I usually like to fix this with Webpack by adding an `alias` for my `components/` folder. This looks like this,

```javascript
"resolve": {
  "alias": {
    "Component": path.resolve(__dirname, 'components'),
  }
}
```

With that in place I can refer to my components from anywhere, regardless of how deep they are. My import statement now looks like this,

```javascript
import Button from 'Component/Button/Button.jsx'
```

But even that could be cleaned up. There's no need to have to specify `Button.jsx`. What if I stop using `.jsx` and want to write Vanilla JS… So, if I add a `package.json` to my `Button` component I can specify a `main` file. That is the file that will be loaded when someone tries to require the component's parent directory. It looks like this,

```javascript
{
  "name": "Container",
  "version": "1.0.0",
  "main": "Container.jsx",
  "license": "MIT"
}
```

With that in place I can now call the following from anywhere,

```javascript
import Button from 'Component/Button'
```

Best of all, I'm only a few steps away from pushing this component to a package manager and requiring it directly out of my `node_modules` folder.

You can see the repository [at this point in time on GitHub](https://github.com/markhuot/interplanetary/tree/89026258fc92b0b90e4c8c069f8ad4fe78f27bb1).

## Taking it further

Up next I'd like to,

1. Load in some of the data via GraphQL
2. Wire up the contact form to use front-end React, in tandem with the back-end React I'm already writing
