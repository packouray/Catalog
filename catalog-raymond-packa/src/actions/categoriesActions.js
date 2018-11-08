export const FETCH_CATEGORIES_BEGIN   = 'FETCH_CATEGORIES_BEGIN';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const fetchCategoriesBegin = () => ({
  type: FETCH_CATEGORIES_BEGIN
});

export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: { categories }
});

export const fetchCategoriesError = error => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: { error }
});

export function isCategoryEmpty(id, products) {
  let found = false;

  for (let a = 0, len = products.length; a < len; a++) {
    if (id === products[a].categoryId) {
        found = true;
        break;
    }
  }
  return found;
}

export function fetchCategories() {
  return dispatch => {
    dispatch(fetchCategoriesBegin());
    return fetch('https://wt-88ed533d03ba6afba8c24a8590aa01b7-0.sandbox.auth0-extend.com/frontend-test/categories')
    .then(handleErrors)
    .then(results => results.json())
    .then(data => {
        dispatch(fetchCategoriesSuccess(data.categories));
        return data.categories;
      })
      .catch(error => dispatch(fetchCategoriesError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
