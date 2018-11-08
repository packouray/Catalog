export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const ADD_TO_CART = 'ADD_TO_CART';

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const fetchProductsError = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});

export const addProductToCart = product => ({
  type: ADD_TO_CART,
  payload: { product }
});

export function isProductInCart(id, cart) {
  let found = false;

  for (let a = 0, len = cart.length; a < len; a++) {
    if (id === cart[a].productId) {
        found = true;
        break;
    }
  }

  return found;
}

export function addToCart(index, products) {
  return dispatch => {
    let tempArray;

    for (let a = 0, len = products.length; a < len; a++) {
      if (index === products[a].id) {
        if (typeof(products[a].discount) != "undefined"){
          let _productPrice = 1 * (products[a].price - ((products[a].price * (products[a].discount * 100)) / 100));
          let discountPrice = (products[a].price - ((products[a].price * (products[a].discount * 100)) / 100));
          tempArray = {productId: index, quantity: 1, name: products[a].name, price: discountPrice.toFixed(2), etp: _productPrice.toFixed(2)};
        }
        else {
          let _productPrice = 1 * products[a].price;
          tempArray = {productId: index, quantity: 1, name: products[a].name, price: (1 * products[a].price).toFixed(2), etp: _productPrice.toFixed(2)};
        }
      }
    }
    dispatch(addProductToCart(tempArray));
  }
}

/* RETRIEVE ALL PRODUCTS */
export function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return fetch('https://wt-88ed533d03ba6afba8c24a8590aa01b7-0.sandbox.auth0-extend.com/frontend-test/products')
    .then(handleErrors)
    .then(results => results.json())
    .then(data => {
        dispatch(fetchProductsSuccess(data.products));
        return data.products;
      })
      .catch(error => dispatch(fetchProductsError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
