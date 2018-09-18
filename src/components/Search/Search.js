import React from 'react';
import './Search.css';

const Search = ({ search, onInputChange, onButtonClick }) => {
  return (
    <form className="search-form">
      <input
        type="text"
        name="search"
        value={search}
        onChange={e => { onInputChange(e.target.value) }}
      />
      <button
        onClick={e => {
          e.preventDefault();
          onButtonClick()
        }}
      >
        Search
      </button>
    </form>
  )
};

export default Search;