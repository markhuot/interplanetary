import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles.css';
import Button from '../Button/Button.jsx';

class PriceTable extends React.Component {
  render() {
    return <div>
      <table className={s.table}>
        <thead>
          <tr>
            <td>&nbsp;</td>
            <th>
              <p>Basic</p>
              <p><small>$100K/month</small></p>
              <p><Button>Try it free</Button></p>
            </th>
            <th>
              <p>Pro</p>
              <p><small>$300K/month</small></p>
              <p><Button>Try it free</Button></p>
            </th>
            <th>
              <p>Teams</p>
              <p><small>$4MM/month</small></p>
              <p><Button>Try it free</Button></p>
            </th>
            <th>
              <p>Corporate</p>
              <p><small>Contact Us</small></p>
              <p><Button>Contact Us</Button></p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Personalized recommendations</th>
            <td>√</td>
            <td>√</td>
            <td>√</td>
            <td>√</td>
          </tr>
          <tr>
            <th>Online and phone support</th>
            <td>√</td>
            <td>√</td>
            <td>√</td>
            <td>√</td>
          </tr>
          <tr>
            <th>Live streaming of family events</th>
            <td>√</td>
            <td>√</td>
            <td>√</td>
            <td>√</td>
          </tr>
          <tr>
            <th>Meal discounts</th>
            <td>√</td>
            <td>√</td>
            <td>√</td>
            <td>√</td>
          </tr>
          <tr>
            <th>Self-registration</th>
            <td>√</td>
            <td>√</td>
            <td>√</td>
            <td>√</td>
          </tr>
          <tr>
            <th>Direct billion options</th>
            <td>√</td>
            <td>√</td>
            <td>√</td>
            <td>√</td>
          </tr>
          <tr>
            <th>Galaxial tour guides</th>
            <td>Coming Soon</td>
            <td>√</td>
            <td>√</td>
            <td>√</td>
          </tr>
          <tr>
            <th>Unlimited calls to Earth</th>
            <td>&nbsp;</td>
            <td>Coming Soon</td>
            <td>√</td>
            <td>√</td>
          </tr>
          <tr>
            <th>Unlimited storage space</th>
            <td>&nbsp;</td>
            <td>Coming Soon</td>
            <td>√</td>
            <td>√</td>
          </tr>
          <tr>
            <th>Temporary body swapping</th>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>√</td>
            <td>√</td>
          </tr>
          <tr>
            <th>Cryogenic suspension services</th>
            <td>&nbsp;</td>
            <td>√</td>
            <td>&nbsp;</td>
            <td>√</td>
          </tr>
          <tr>
            <th>Inter-spacecraft teleportation</th>
            <td>&nbsp;</td>
            <td>Coming Soon</td>
            <td>&nbsp;</td>
            <td>√</td>
          </tr>
        </tbody>
      </table>
    </div>;
  }
}

export default withStyles(s)(PriceTable);
