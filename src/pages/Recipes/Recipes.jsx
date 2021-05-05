import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';
import {
  fetchFilteredByCategory,
  fetchMealCategory,
  fetchMealNameAPI,
} from '../../services/fetchMealAPI';
import { saveMeals } from '../../actions/userActions';
import RenderRecipeCards from '../../common/components/RenderRecipeCards';
import GenericCategoryButton from '../../common/components/buttons/GenericCategoryButton';

const Recipes = (props) => {
  const { meals, history } = props;
  const [mealCategoryList, setMealCategoryList] = useState();
  const [filteredByCategoryArray, setfilteredByCategoryArray] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { dispatchMeals } = props;
  const cinco = 5;
  useEffect(() => {
    async function fetchData() {
      // const { dispatchMeals } = props;
      await fetchMealNameAPI('').then((response) => dispatchMeals(response));
      await fetchMealCategory().then((r) => setMealCategoryList(r));
      setLoading(false);
    }
    fetchData();
  }, [dispatchMeals]); // aqui tinha como dependencia "props" que estava ocasionando um loop

  function filterByCategory(category) {
    fetchFilteredByCategory(category).then(setfilteredByCategoryArray);
  }

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  if (meals.length === 1) {
    history.push(`/comidas/${meals[0].idMeal}`, meals[0]);
    return null;
  }

  return (
    <>
      <Header title="Comidas" value="comidas" history={ history } isSearchEnable />
      {
        mealCategoryList && mealCategoryList.meals
          .slice(0, cinco)
          .map((meal, index) => (
            <GenericCategoryButton
              key={ index }
              buttonLabel={ meal.strCategory }
              action={ filterByCategory }
            />
          ))
      }
      {
        filteredByCategoryArray
          ? (
            <RenderRecipeCards
              array={ filteredByCategoryArray }
              kindOfFood="meals"
              cardsLimit="12"
            />
          )
          : <RenderRecipeCards list={ meals } kindOfFood="meals" cardsLimit="12" />
      }
      <Footer />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchMeals: (meals) => dispatch(saveMeals(meals)),
});

const mapStateToProps = (state) => ({
  meals: state.searchReducer.meals,
});

Recipes.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchMeals: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
