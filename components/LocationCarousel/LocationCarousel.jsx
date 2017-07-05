import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Container from 'Component/Container';

import s from './styles.css';

import hoagImage from './hoag.png';
import demiosImage from './demios.png';
import cassiniImage from './cassini.png';
import ringImage from './ring.png';
import enceladusImage from './enceladus.png';

class LocationCarousel extends React.Component {
  render() {
    let attr = [s.container];
    if (this.props.bleeds) {
      attr.push(s.bleeds);
    }

    return <div className={attr.join(' ')}>
      <Container>
        <div className={s.heading}>
          <h3 className={s.title}>Featured Locations</h3>
          <p><a className={s.cta} href="#">See all locations</a></p>
        </div>
        <ul className={s.cards}>
          <li className={s.card} style={{backgroundImage: `url(${hoagImage})`}}>
            <p className={s.content}><small className={s.small}>Hoag's Object</small> BOXX-3W Condos</p>
          </li>
          <li className={s.card} style={{backgroundImage: `url(${demiosImage})`}}>
            <p className={s.content}><small className={s.small}>Demios, Mars</small> Kasai</p>
          </li>
          <li className={s.card} style={{backgroundImage: `url(${cassiniImage})`}}>
            <p className={s.content}><small className={s.small}>Cassini, Jupiter</small> The Dustbowl</p>
          </li>
          <li className={s.card} style={{backgroundImage: `url(${ringImage})`}}>
            <p className={s.content}><small className={s.small}>Outer Ring</small> Ptavvs</p>
          </li>
          <li className={s.card} style={{backgroundImage: `url(${enceladusImage})`}}>
            <p className={s.content}><small className={s.small}>Enceladus</small> Ganymede</p>
          </li>
        </ul>
      </Container>
    </div>;
  }
}

export default withStyles(s)(LocationCarousel);
