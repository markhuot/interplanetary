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
