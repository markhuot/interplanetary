import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles.css';

class ListBox extends React.Component {
  render() {
    let attr = [s.container];
    if (this.props.bleeds) {
      attr.push(s.bleeds);
    }

    return <div className={attr.join(' ')}>
      <h3 className={s.title}>FAQs</h3>
      <ul className={s.list}>
        <li><a href="#">Is interplanetary travel safe for pregnant women?</a></li>
        <li><a href="#">Can I arrange a payment plan?</a></li>
        <li><a href="#">Will I encounter other life forms on my travels?</a></li>
      </ul>
    </div>;
  }
}

export default withStyles(s)(ListBox);
