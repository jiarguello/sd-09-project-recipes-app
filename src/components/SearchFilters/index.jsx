import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Filters from './styled';

const initialState = {
  searchTerm: '',
  option: '',
};

export default function SearchFilters({ setFilter }) {
  const [options, setOptions] = useState(initialState);

  const handleNewFilterOption = ({ target: { value: option } }) => {
    setOptions((prevState) => ({ ...prevState, option }));
  };

  const handleNewFilterSearchTerm = ({ target: { value: searchTerm } }) => {
    setOptions((prevState) => ({ ...prevState, searchTerm }));
  };

  return (
    <Filters>
      <label htmlFor="name">
        Termo
        <input
          type="text"
          data-testid="search-input"
          value={ options.searchTerm }
          onChange={ handleNewFilterSearchTerm }
        />
      </label>
      <br />
      <label htmlFor="ingredient">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          checked={ options.option === 'ingredient' }
          onChange={ handleNewFilterOption }
          value="ingredient"
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          data-testid="name-search-radio"
          checked={ options.option === 'name' }
          onChange={ handleNewFilterOption }
          value="name"
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          checked={ options.option === 'letters' }
          onChange={ handleNewFilterOption }
          value="letters"
        />
        Primeira Letra
      </label>
      <br />
      <button
        onClick={ () => setFilter({ ...options }) }
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </Filters>
  );
}

SearchFilters.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
