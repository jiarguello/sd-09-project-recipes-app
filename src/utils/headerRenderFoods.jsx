import React from 'react';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';
import BottomMenu from '../components/BottomMenu';
import RecipeCard from '../components/RecepiCard';
import filterAllFoodButton from './filterAllFoodButton';
import categoryFoodButton from './categoryFoodButton';

function headerRenderFoods({
  meal,
  render,
  handleClickButtonName,
  twelve,
  handleFetchFoodClick,
  recipesData,
  setListItemByCategory,
  setRecipesData,
  renderRecipesByIngredients,
}) {
  const renderFood = (recipesData.meals && (recipesData.meals
    .map(({ idMeal, strMealThumb, strMeal }, index) => (
      index < twelve && (
        <RecipeCard
          key={ idMeal }
          image={ strMealThumb }
          name={ strMeal }
          recipeCArdId={ `${index}-recipe-card` }
          cardImageId={ `${index}-card-img` }
          cardNameId={ `${index}-card-name` }
          type="comidas"
          codeId={ idMeal }
        />
      )
    ))));

  return (
    <>
      <HeaderFoods hassearchbar>
        <h1 data-testid="page-title">Comidas</h1>
      </HeaderFoods>
      <SearchBar>
        <button
          onClick={ () => { handleFetchFoodClick(); } }
          data-testid="exec-search-btn"
          type="button"
        >
          Buscar
        </button>
      </SearchBar>
      { filterAllFoodButton(setListItemByCategory, setRecipesData) }
      { categoryFoodButton(handleClickButtonName, meal) }
      {recipesData.meals ? renderFood : render}
      {renderRecipesByIngredients}
      <BottomMenu />
    </>
  );
}

export default headerRenderFoods;
