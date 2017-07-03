import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Navigation from '../Navigation/Navigation.jsx';
import Hero from '../Hero/Hero.jsx';
import LocationCarousel from '../LocationCarousel/LocationCarousel.jsx';
import ListBox from '../ListBox/ListBox.jsx';
import PriceTable from '../PriceTable/PriceTable.jsx';
import Footer from '../Footer/Footer.jsx';
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
