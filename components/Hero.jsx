import React from 'react';
import PropTypes from 'prop-types';
import s from './Hero.css';

class Hero extends React.Component {
  componentWillMount() {
    this.removeCss = this.context.insertCss(s);
  }

  componentWillUnmount() {
    setTimeout(this.removeCss, 0);
  }

  render() {
    return <div>
      <h1>When this world just isn&rsquo;t enough.</h1>
      <h2>Take your adventures interplanetary</h2>
      <p><a href="#">Reserve your spot</a></p>
    </div>;
  }
}

Hero.contextTypes = {
  insertCss: PropTypes.func,
};

export default Hero;
