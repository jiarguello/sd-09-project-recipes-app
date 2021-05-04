import React from 'react';
import { number, shape } from 'prop-types';
import './cardRecipeDrinkRecommended.css';
import { Link } from 'react-router-dom';

function CardRecipeMeal({ recipe, index }) {
  return (
    <Link to={ { pathname: `/bebidas/${recipe.idDrink}`, pageType: 'bebidas' } }>
      <div
        className="card-recipe-container"
        data-testid={ `${index}-recomendation-card` }
      >
        <img
          src={ recipe.strDrinkThumb }
          alt={ `imagen de ${recipe.strDrink}` }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-recomendation-title` }>
          { recipe.strDrink }
        </p>
      </div>
    </Link>
  );
}

CardRecipeMeal.propTypes = {
  recipe: shape().isRequired,
  index: number.isRequired,
};

export default CardRecipeMeal;
