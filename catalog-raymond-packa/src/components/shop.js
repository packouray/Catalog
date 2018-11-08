import React, { Component } from 'react';
import Category from './category.js';
import Cart from './cart.js';
import TextField from '@beqom/alto-ui/Form/TextField';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productsActions.js';
import { initCart } from '../actions/cartActions.js';
import { fetchCategories, isCategoryEmpty } from '../actions/categoriesActions.js';

class Shop extends Component {

  componentDidMount() {
    this.props.dispatch(initCart());
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchProducts());
  }

  render() {
    return (
      <div className="App">
        <div className="Main">
          <h2 className="Title">Products</h2>
          <TextField id="search" label="Search" className="Search" />
          {!this.props.loading &&
            this.props.categories.map(
              (category, index) => {
                if (isCategoryEmpty(category.id, this.props.products))
                  return <Category key={index} id={category.id} name={category.name} />
              }
            )
          }
        </div>
        {!this.props.loading && this.props.cart && this.props.cart.length ? <Cart cartContent={this.props.cart} cartTotal={this.props.cartTotal} /> : null}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    err: state.error,
    loading: state.isLoading,
    categories: state.allCategories,
    products: state.allProducts,
    cart: state.currentCart,
    cartTotal: state.cartTotal
  };
};

export default connect(mapStateToProps)(Shop);
