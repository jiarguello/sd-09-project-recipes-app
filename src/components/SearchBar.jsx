import React, { useState } from 'react';

function SearchBar(path, setSearchResult) {
  const [filter, setFilter] = useState(null);
  const [searchText, setSearchText] = useState('');

  const filterFood = async () => {
    const foodSearchURL = `https://www.themealdb.com/api/json/v1/1/${filter === 'i' ? 'filter' : 'search'}.php?`;
    const drinkSearchURL = `https://www.thecocktaildb.com/api/json/v1/1/${filter === 'i' ? 'filter' : 'search'}.php?`;
    if (!filter || !searchText) return;
    if (filter === 'f' && searchText.length > 1) {
      return window.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const searchURL = path.includes('comida') ? `${foodSearchURL}${filter}=${searchText}`
      : `${drinkSearchURL}${filter}=${searchText}`;
    const fetchSearch = await fetch(searchURL);
    const search = await fetchSearch.json();
    setSearchResult(search);
  };

  return (
    <div className="search-bar silver-shadow">
      <input
        value={ searchText }
        className="full-width search-bar"
        placeholder="Buscar Receita"
        data-testid="search-input"
        onChange={ ({ target: { value } }) => setSearchText(value) }
      />
      <div>
        <label htmlFor="i">
          <input
            type="radio"
            name="type"
            id="i"
            data-testid="ingredient-search-radio"
            onClick={ ({ target: { id } }) => setFilter(id) }
          />
          Ingrediente
        </label>
        <label htmlFor="s">
          <input
            type="radio"
            name="type"
            id="s"
            data-testid="name-search-radio"
            onClick={ ({ target: { id } }) => setFilter(id) }
          />
          Nome
        </label>
        <label htmlFor="f">
          <input
            type="radio"
            name="type"
            id="f"
            data-testid="first-letter-search-radio"
            onClick={ ({ target: { id } }) => setFilter(id) }
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        size="sm"
        data-testid="exec-search-btn"
        onClick={ () => filterFood() }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
