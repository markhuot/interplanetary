import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Navigation from 'Component/Navigation';
import Hero from 'Component/Hero';
import LocationCarousel from 'Component/LocationCarousel';
import ListBox from 'Component/ListBox';
import PriceTable from 'Component/PriceTable';
import Footer from 'Component/Footer';

import s from './Home.css';

class Home extends React.Component {
  render() {
    return <div className={s.home}>
      <Navigation />
      <Hero />
      <LocationCarousel bleeds={true} />
      <ListBox bleeds={true} />
      <PriceTable />
      <Footer />
    </div>;
  }
}

export default withStyles(s)(Home);
