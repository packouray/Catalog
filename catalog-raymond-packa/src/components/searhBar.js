import React, { Component } from 'react';
import TextField from '@beqom/alto-ui/Form/TextField';

class SearchBar extends Component {
  render() {
    return (
      <TextField id="search" label="Search" className="Search" />
    );
  }
}

export default SearchBar;
