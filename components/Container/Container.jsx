import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles.css';

class Container extends React.Component {
  render() {
    return <div className={s.container}>
      {this.props.children}
    </div>;
  }
}

export default withStyles(s)(Container);
