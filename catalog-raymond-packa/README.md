# beqom Frontend Test

## About the boilerplate

The UI has been already developed. This project uses:

- [React](https://reactjs.org/)
- [Sass](http://sass-lang.com/)
- [Redux](https://redux.js.org/)
- [Redux-thunk](https://github.com/reduxjs/redux-thunk): Redux functional action
- [Alto-ui](https://beqom.github.io/alto/storybook): beqom's React UI library

Feel free to adapt those choices to your needs and add or remove dependencies. You are also free to change the project structure, split, refactor or delete the existing code as you like.

The project uses [Parcel](https://parceljs.org/) to compile and serve the assets. In order to start the project just use `yarn start` or `npm start`. If you encounter any refreshing issues or an error seems to persist, do not hesitate to refresh manually or to restart the script.

You can edit this README as much as you like: check items done, add extra items or comments, etc.

## TO DO

The following items are prioritized. It is not mandatory to finish everything so do not stay blocked on a specific point.

- [ ] **Feed content with real data:**
  - [ ] Fetch the products
  - [ ] Fetch the product categories
  - [ ] Display products (name & price) by categories
  - [ ] Fetch the cart
  - [ ] Display the cart
- [ ] **As a user, I should be able to:**
  - [ ] Add a product to the cart
  - [ ] Remove product from the cart
  - [ ] Adjust quantity of the product in the cart
- [ ] **Be sure to follow those rules:**
  - [ ] Cart product total price (ETP) should take into account the quantity
  - [ ] Cart total should stay up-to-date
  - [ ] Prices should be display with USD currency ($) and with two decimal precision

## Bonus

- [ ] If a product is added to the cart, it is not displayed anymore in the product list
- [ ] Filter product by searching on product name (Searching should accept uppercase or lowercase)
- [ ] Display in product list old price and discount if it exists
- [ ] Cart product unit price (UP) should take discount into account
- [ ] If a category does not have anymore products ( all added to the cart or no products with this category) it should not be displayed
- [ ] Add Checkout (POST the new cart to checkout url)
- [ ] Don't show cart nothing has been added to it

## Extra Bonus

**Only if you have time and absolutely nothing else to do.**

- [ ] A11y
- [ ] Responsive
- [ ] Unit test
- [ ] Create an IOS and Android native app
- [ ] Allow user to pay with Bitcoin
- [ ] AI that use machine learning to predict user choices
- [ ] Improve search to reach Google accuracy
- [ ] Replace Amazon your new app

## API

- base URL: https://wt-88ed533d03ba6afba8c24a8590aa01b7-0.sandbox.auth0-extend.com/frontend-test
- GET Products: [/products](https://wt-88ed533d03ba6afba8c24a8590aa01b7-0.sandbox.auth0-extend.com/frontend-test/products)
- GET Categories: [/categories](https://wt-88ed533d03ba6afba8c24a8590aa01b7-0.sandbox.auth0-extend.com/frontend-test/categories)
- GET Cart: [/cart](https://wt-88ed533d03ba6afba8c24a8590aa01b7-0.sandbox.auth0-extend.com/frontend-test/cart)
- POST Checkout: [/checkout](https://wt-88ed533d03ba6afba8c24a8590aa01b7-0.sandbox.auth0-extend.com/frontend-test/checkout)

  - Body to send:

    ```json
    {
        "cart": [
            { "productId": 1, "quantity" 1 }
        ]
    }
    ```
