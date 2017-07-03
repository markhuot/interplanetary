import React from 'react';
import Hero from './Hero.jsx';
import LocationCarousel from './LocationCarousel.jsx';
import ListBox from './ListBox.jsx';
import PriceTable from './PriceTable.jsx';
import Footer from './Footer.jsx';

export default class Home extends React.Component {
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
