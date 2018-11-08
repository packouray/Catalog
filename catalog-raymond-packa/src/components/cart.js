import React, { Component }from 'react';
import CartContent from './cartContent.js'
import Button from '@beqom/alto-ui/Button';
import { connect } from 'react-redux';

class Cart extends Component {
  render() {
    return (
      <div>
        <aside className="Cart">
        <h2 className="Title">Cart</h2>
        <table className="Cart__items">
          <thead>
            <tr>
              <th className="Cart__items-header Cart__items-header--name">Products</th>
              <th className="Cart__items-header Cart__items-header--quantity">QY</th>
              <th className="Cart__items-header Cart__items-header--unit-price">U/P</th>
              <th className="Cart__items-header Cart__items-header--evaluated-total-price">
                ETP
              </th>
              <th className="Cart__items-header Cart__items-header--action" />
            </tr>
          </thead>
          <CartContent />
        </table>
        <div className="Total">
          <div className="Total__title">TOTAL:</div>
          <div className="Total__amount">${this.props.cartTotal}</div>
        </div>
        <div className="Checkout-button">
          <Button>Checkout</Button>
        </div>
      </aside>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartTotal: state.cartTotal
  };
};

export default connect(mapStateToProps)(Cart);
