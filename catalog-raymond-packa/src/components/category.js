import React from 'react';
import Product from './product.js'

const category = ( props ) => {
    return (
      <div>
        <h3 className="Title Title--category">{props.name}</h3>
        <Product categoryId={props.id} />
      </div>
    )
};

export default category;
