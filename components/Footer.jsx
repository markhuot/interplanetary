import React from 'react';
import ContactInfo from './ContactInfo.jsx';
import ContactForm from './ContactForm.jsx';

export default class Footer extends React.Component {
  render() {
    return <div>
      <ContactInfo />
      <ContactForm />
    </div>;
  }
}
