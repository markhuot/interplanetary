import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ContactInfo from '../ContactInfo/ContactInfo.jsx';
import ContactForm from '../ContactForm/ContactForm.jsx';
import s from './styles.css';

class Footer extends React.Component {
  render() {
    return <div className={s.footer}>
      <ContactInfo />
      <ContactForm />
    </div>;
  }
}

export default withStyles(s)(Footer);
