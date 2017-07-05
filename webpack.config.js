var path = require('path');

module.exports = {
  "entry": "./index.js",
  "target": "node",
  "output": {
    "filename": "bundle.js"
  },
  "resolve": {
    "alias": {
      "Component": path.resolve(__dirname, 'components'),
    }
  },
  "module": {
    "rules": [
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
      },
      {
        test: /\.css$/,
        use: [ 'isomorphic-style-loader', 'css-loader?modules' ]
      },
      {
        test: /\.png$/,
        use: {
          "loader": "file-loader",
          "query": {
            "name": "./public/images/[hash].[ext]",
            "publicPath": (url) => url.replace('./public', ''),
          }
        }
      },
    ]
  }
};
