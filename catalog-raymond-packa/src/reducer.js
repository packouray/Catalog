import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_TO_CART
} from './actions/productsActions.js';
import {
  FETCH_CART_BEGIN,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  UPDATE_CART_TOTAL,
  REMOVE_FROM_CART,
  UPDATE_PRODUCT_QUANTITY
} from './actions/cartActions.js';
import {
  FETCH_CATEGORIES_BEGIN,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE
} from './actions/categoriesActions.js';

const initialState = {
  error: null,
  isLoading: false,
  allCategories: [],
  allProducts: [],
  currentCart: [],
  cartTotal: 0
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_PRODUCTS_BEGIN: return {
      ...state,
      isLoading: true,
      error: null
    };
    case FETCH_PRODUCTS_SUCCESS: return {
      ...state,
      isLoading: false,
      allProducts: action.payload.products
    };
    case FETCH_PRODUCTS_FAILURE: return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        allProducts: []
    };
    case FETCH_CART_BEGIN: return {
      ...state,
      isLoading: true,
      error: null
    };
    case FETCH_CART_SUCCESS: return {
      ...state,
      isLoading: false,
      currentCart: action.payload.cart
    };
    case FETCH_CART_FAILURE: return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        currentCart: []
    };
    case UPDATE_CART_TOTAL: return {
        ...state,
        cartTotal: action.payload.newTotal
    };
    case REMOVE_FROM_CART: return {
        ...state,
        currentCart: state.currentCart.filter((obj, index) => {
          return action.payload.id !== index
        })
    };
    case ADD_TO_CART: return {
      ...state,
      currentCart: [...state.currentCart, action.payload.product]
    }
    case UPDATE_PRODUCT_QUANTITY: return {
      ...state,
      isLoading: false,
      currentCart: action.payload.newCart
    };
    case FETCH_CATEGORIES_BEGIN: return {
      ...state,
      isLoading: true,
      error: null
    };
    case FETCH_CATEGORIES_SUCCESS: return {
      ...state,
      isLoading: false,
      allCategories: action.payload.categories
    };
    case FETCH_CATEGORIES_FAILURE: return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        allCategories: []
    };
    default:
      return state;
  }
};

export default reducer;
