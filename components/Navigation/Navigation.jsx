import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles.css';
import logoImage from './logo.png';

class Navigation extends React.Component {
  render() {
    return <div className={s.container}>
      <img className={s.logo} src={logoImage} />
      <ul className={s.links}>
        <li><a href="#"><small>01</small> Locations</a></li>
        <li><a href="#"><small>02</small> FAQs</a></li>
        <li><a href="#"><small>03</small> Pricing</a></li>
        <li><a href="#"><small>04</small> Contact</a></li>
      </ul>
    </div>;
  }
}

export default withStyles(s)(Navigation);
