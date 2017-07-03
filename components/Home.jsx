import React from 'react';
import Hero from './Hero.jsx';
import LocationCarousel from './LocationCarousel.jsx';
import ListBox from './ListBox.jsx';
import PriceTable from './PriceTable.jsx';
import Footer from './Footer.jsx';
import PropTypes from 'prop-types';

class Home extends React.Component {
  getChildContext() {
    return {
      insertCss: this.props.insertCss
    };
  }

  render() {
    return <div>
      <Hero />
      <LocationCarousel />
      <ListBox />
      <PriceTable />
      <Footer />
    </div>;
  }
}

Home.childContextTypes = {
  "insertCss": PropTypes.func,
};

export default Home;
