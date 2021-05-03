import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import fetchRecipes from '../services/api';

function Drinks() {
  const { showSearchBar, setDataFromApi, dataFromApi } = useContext(RecipesContext);
  const history = useHistory();
  const { pathname } = history.location;

  const getRecipes = async () => {
    const route = pathname.substr(1);
    setDataFromApi({ ...dataFromApi, loading: true });
    const { drinks } = await fetchRecipes(route);
    setDataFromApi({ ...dataFromApi, recipes: drinks, loading: false });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      { pathname === '/bebidas' ? (
        <Header
          showSearchButton
          title="Bebidas"
        />
      ) : null }
      { showSearchBar && <SearchBar /> }
      <Cards route={ pathname } />
      {pathname === '/bebidas' ? <Footer /> : null}
    </div>
  );
}

export default Drinks;
