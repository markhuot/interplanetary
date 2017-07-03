var path = require('path');

module.exports = {
  "entry": "./index.js",
  "target": "node",
  "output": {
    "filename": "bundle.js"
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
        use: [ 'isomorphic-style-loader', 'css-loader' ]
      }
    ]
  }
};
