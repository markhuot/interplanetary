import React from 'react';

export default class Button extends React.Component {
  render() {
    return <a href="#">
      {this.props.children}
    </a>;
  }
}
