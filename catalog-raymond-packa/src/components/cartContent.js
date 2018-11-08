import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeProduct, updateCurrentCart, updateQuantity } from '../actions/cartActions.js';
import TextField from '@beqom/alto-ui/Form/TextField';
import IconTrash from '@beqom/alto-ui/Icons/Trash';

class CartContent extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.cart !== nextProps.cart) {
      console.log(nextProps.cart);
      this.props.dispatch(updateCurrentCart(nextProps.cart, this.props.products));
    }
  }

  handleTextChange(event, index, cart, products) {
    this.props.dispatch(updateQuantity(event.target.value, index, cart, products));
  }

  render() {
    return (
      <tbody>
      {
          this.props.cart.map(
            (item, index) => {
              if (index < this.props.cart.length)
                return (
                  <tr>
                    <td key={index} className="Cart__item-cell Cart__item-cell--name">{item.name}</td>
                    <td className="Cart__item-cell">
                      {console.log('item quantity', item.quantity)}
                      {console.log('item index', index)}
                      <TextField
                        id="Cart-item-thing-quantity--thing"
                        type="number"
                        label="Quantity"
                        hideLabel
                        value={item.quantity}
                        small
                        onChange={event =>
                          this.handleTextChange(event, item.productId, this.props.cart, this.props.products)
                        }
                      />
                    </td>
                    <td className="Cart__item-cell">${item.price}</td>
                    <td className="Cart__item-cell">${item.etp}</td>
                    <td className="Cart__item-cell Cart__item-cell--action">
                      <IconTrash
                        className="Cart__item-remove"
                        outline
                        onClick={(event) => {
                          this.props.dispatch(removeProduct(index));
                          }
                        }
                      />
                    </td>
                  </tr>
                )
            }
          )
        }
      </tbody>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.allProducts,
    cart: state.currentCart
  };
};

export default connect(mapStateToProps)(CartContent);
