import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { fetchRecipeDetails } from '../../services/api';
import { DrinksRecomendations, YoutubePlayer } from '../../components';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';

function MealsDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const getData = async () => setData(await fetchRecipeDetails(id, true));
    getData();
  }, [id]);

  const ingredients = Object.keys(data).filter((el) => el.includes('strIngredient'));
  const measures = Object.keys(data).filter((el) => el.includes('strMeasure'));
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = data;

  if (shouldRedirect) return <Redirect to={ `/comidas/${id}/in-progress` } />;

  return (
    <section className="recipe-details">
      <img data-testid="recipe-photo" src={ strMealThumb } alt="recipe" />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favorite icon" />
      </button>
      <p data-testid="recipe-category">{ strCategory }</p>
      { ingredients.map((ingredient, index) => (
        <p data-testid={ `${index}-ingredient-name-and-measure` } key={ ingredient }>
          { `${data[ingredient]} ${data[measures[index]]}` }
        </p>)) }
      <p data-testid="instructions">{strInstructions}</p>
      <YoutubePlayer url={ strYoutube } title={ strMeal } />
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="btn-initial"
        onClick={ () => setShouldRedirect(true) }
      >
        Iniciar Receita
      </button>
      <DrinksRecomendations />
    </section>
  );
}

export default MealsDetails;
