import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Hero.css';
import spacing from './Spacing.css';

class Hero extends React.Component {
  render() {
    return <div className={s.container}>
      <div className={s.hero}>
        <div className={s.text}>
          <h1 className={s.line1}>When this world just isn&rsquo;t enough.</h1>
          <h2 className={s.line2}>Take your adventures interplanetary</h2>
        </div>
        <p><a className={s.cta} href="#">Reserve your spot</a></p>
      </div>
    </div>;
  }
}

export default withStyles(s)(Hero);
