import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import getIngredients from '../services/ingredientsAPI';
import Loading from '../components/Loading';
import '../styles/ExplorarIngredientes.css';
import useRecipes from '../hooks/useRecipes';
import { RecipesContext } from '../context';

function ExplorarIngredientes() {
  const [ingredientsList, setIngredientsList] = useState();
  const { pathname } = useLocation();
  const type = pathname.includes('comidas')
    ? ['comidas', 'strIngredient']
    : ['bebidas', 'strIngredient1'];
  const imgURL = 'https://www.themealdb.com/images/ingredients/';
  const [loading, setLoading] = useState(true);
  const MAX_PG = 12;
  const history = useHistory();
  const { getRecipes } = useRecipes();
  const { actions: { setRecipesResult } } = useContext(RecipesContext);

  useEffect(() => {
    async function loadIngredients() {
      getIngredients(type[0])
        .then(
          (resp) => setIngredientsList(resp),
          (error) => console.log(error.message),
        )
        .finally(() => setLoading(false));
    }
    loadIngredients();
  });

  const handleClick = async (searchIng) => {
    const recipes = await getRecipes(type[0], searchIng, 'ingredient');
    if (!recipes) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (!Array.isArray(recipes)) {
      alert(recipes.message);
    } else {
      setRecipesResult(recipes);
    }
    history.push('/comidas');
  };

  function renderCardIngredients() {
    return ingredientsList
      .filter((_, index) => index < MAX_PG)
      .map((ing, index) => (
        <section
          key={ ing[type[1]] }
          data-testid={ `${index}-ingredient-card` }
          className="recipe-card"
          onClick={ () => handleClick(ing[type[1]]) }
          role="link"
          aria-hidden="true"
        >
          <img
            src={ `${imgURL}${ing[type[1]]}.png` }
            alt={ `imagem de ${ing}` }
            data-testid={ `${index}-card-img` }
            className=".card__image"
          />
          <p data-testid={ `${index}-card-name` }>
            {ing[type[1]]}
          </p>

        </section>
      ));
  }

  return !loading ? (
    <>
      <Header />
      { renderCardIngredients() }
      <Footer />
    </>
  ) : <Loading />;
}

export default ExplorarIngredientes;
