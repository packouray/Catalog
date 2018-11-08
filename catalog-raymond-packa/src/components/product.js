import React, { Fragment, Component } from 'react';
import List from '@beqom/alto-ui/List';
import Button from '@beqom/alto-ui/Button';
import { addToCart, isProductInCart } from '../actions/productsActions.js';
import { updateCurrentCart } from '../actions/cartActions.js';
import { connect } from 'react-redux';

class Product extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.cart !== nextProps.cart) {
      this.props.dispatch(updateCurrentCart(nextProps.cart, this.props.products));
    }
  }

  render() {
    return (
      <div>
          <List
            className="Products"
            items={this.props.products.filter(item => !isProductInCart(item.id, this.props.cart) && item.categoryId === this.props.categoryId)}
          >
            {item => (
              <Fragment>
                <div className="Product__name">{item.name}</div>
                {typeof(item.discount) != "undefined" ? (<div className="Product__discount">-{item.discount * 100}%</div>) : null}
                {typeof(item.discount) != "undefined" ? (<div className="Product__price Product__price--old">${(item.price).toFixed(2)}</div>) : null}
                {typeof(item.discount) != "undefined" ? <div className="Product__price">${(item.price - ((item.price * (item.discount * 100)) / 100)).toFixed(2)}</div> : <div className="Product__price">${(item.price).toFixed(2)}</div>}
                <Button outline small onClick={() => this.props.dispatch(addToCart(item.id, this.props.products))}>
                  add to cart
                </Button>
              </Fragment>
            )}
          </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.allProducts,
    cart: state.currentCart
  };
};

export default connect(mapStateToProps)(Product);
