import React from 'react';
import ContactInfo from '../ContactInfo/ContactInfo.jsx';
import ContactForm from '../ContactForm/ContactForm.jsx';

export default class Footer extends React.Component {
  render() {
    return <div>
      <ContactInfo />
      <ContactForm />
    </div>;
  }
}
