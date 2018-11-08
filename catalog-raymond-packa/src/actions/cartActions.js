import update from 'immutability-helper';

export const FETCH_CART_BEGIN   = 'FETCH_CART_BEGIN';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';
export const UPDATE_CART_TOTAL = 'UPDATE_CART_TOTAL';
export const UPDATE_CART_CONTENT = 'UPDATE_CART_CONTENT';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_PRODUCT_QUANTITY = 'UPDATE_PRODUCT_QUANTITY';

export const fetchCartBegin = () => ({
  type: FETCH_CART_BEGIN
});

export const fetchCartSuccess = cart => ({
  type: FETCH_CART_SUCCESS,
  payload: { cart }
});

export const fetchCartError = error => ({
  type: FETCH_CART_FAILURE,
  payload: { error }
});

export const updateCartTotal = newTotal => ({
  type: UPDATE_CART_TOTAL,
  payload: { newTotal }
});

export const removeFromCart = id => ({
  type: REMOVE_FROM_CART,
  payload: { id }
});

export const updateProductQuantity = newCart => ({
  type: UPDATE_PRODUCT_QUANTITY,
  payload: { newCart }
});

export function updateQuantity(quantity, id, cart, products) {
  return dispatch => {
    if (quantity >= 0) {
      let updatedCart = [...cart];

      console.log('cart', updatedCart);

      for (let b = 0, len2 = updatedCart.length; b < len2; b++) {
        if (updatedCart[b].productId === id) {
          for (let a = 0, len = products.length; a < len; a++) {
            if (updatedCart[b].productId === products[a].id) {
              if (typeof(products[a].discount) != "undefined") {
                let newPrice = quantity * (products[a].price - ((products[a].price * (products[a].discount * 100)) / 100));
                let discountPrice = (products[a].price - ((products[a].price * (products[a].discount * 100)) / 100));
                updatedCart = update(updatedCart, {
                  [b]: {
                    price: {$set: discountPrice.toFixed(2)},
                    quantity: {$set: quantity},
                    etp: {$set: newPrice.toFixed(2)}
                  }
                });
              }
              else {
                let newPrice = quantity * products[a].price;
                updatedCart = update(updatedCart, {
                  [b]: {
                    price: {$set: (products[a].price).toFixed(2)},
                    quantity: {$set: quantity},
                    etp: {$set: newPrice.toFixed(2)}
                  }
                });
              }
            }
          }
        }
      }
      dispatch(updateProductQuantity(updatedCart));
    }
  }
}

/* REMOVE PRODUCT FROM CART */
export function removeProduct(index) {
  return dispatch => {
    dispatch(removeFromCart(index));
  }
}

/* Init the cart  */
export function initCart() {
  return dispatch => {
    dispatch(fetchCartBegin());

    return fetch('https://wt-88ed533d03ba6afba8c24a8590aa01b7-0.sandbox.auth0-extend.com/frontend-test/products')
    .then(handleErrors)
    .then(results => results.json())
    .then(data => {
      let products = data.products;
      dispatch(fetchCart()).then(cart => {
        let _totalPrice = 0;

        for (let a = 0, len = cart.length; a < len; a++) {
          for (let b = 0, len2 = products.length; b < len2; b++) {
            if (cart[a].productId === products[b].id) {
              if (typeof(products[b].discount) != "undefined"){
                _totalPrice += cart[a].quantity * (products[b].price - ((products[b].price * (products[b].discount * 100)) / 100));
                let _productPrice = cart[a].quantity * (products[b].price - ((products[b].price * (products[b].discount * 100)) / 100));
                let discountPrice = (products[b].price - ((products[b].price * (products[b].discount * 100)) / 100));
                cart = update(cart, {
                  [a]: {$merge: {name: products[b].name, price: discountPrice.toFixed(2), etp: _productPrice.toFixed(2)}}
                });
              }
              else {
                _totalPrice += cart[a].quantity * products[b].price;
                let _productPrice = cart[a].quantity * products[b].price;
                cart = update(cart, {
                  [a]: {$merge: {name: products[b].name, price: (products[b].price).toFixed(2), etp: _productPrice.toFixed(2)}}
                });
              }
            }
          }
        }
        dispatch(fetchCartSuccess(cart));
        dispatch(updateCartTotal(_totalPrice.toFixed(2)));
      });
    })
    .catch(error => dispatch(fetchCartError(error)));
  }
}

/* UPDATE CART TOTAL */
export function updateCurrentCart(cart, products) {
    return dispatch => {
      console.log("cart changed");
      if (cart && cart.length) {
        let _totalPrice = 0;

        for (let a = 0, len = cart.length; a < len; a++) {
          for (let b = 0, len2 = products.length; b < len2; b++) {
            if (cart[a].productId === products[b].id) {
              if (typeof(products[b].discount) != "undefined"){
                _totalPrice += cart[a].quantity * (products[b].price - ((products[b].price * (products[b].discount * 100)) / 100));
              }
              else {
                _totalPrice += cart[a].quantity * products[b].price;
              }
            }
          }
        }
        dispatch(updateCartTotal(_totalPrice.toFixed(2)));
      }
      else {
        dispatch(updateCartTotal(0.00));
      }
    }
}

/* FETCH CART */
export function fetchCart() {
    return dispatch => {
      return fetch('https://wt-88ed533d03ba6afba8c24a8590aa01b7-0.sandbox.auth0-extend.com/frontend-test/cart')
      .then(handleErrors)
      .then(results => results.json())
      .then(data => {
          return data.cart;
        })
        .catch(error => dispatch(fetchCartError(error)));
    };
}

function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
}
