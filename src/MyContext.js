import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { searchByCategory, fetchToMainScreen } from './services/fetchAPI';
import { saveAsFavorite } from './services/details';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [showBar, setShowBar] = useState(false);
  const [resultAPI, setResultAPI] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorieSelected, setCategorieSelected] = useState('');
  const [toggle, setToggle] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  function getKeysIngredints() {
    const keysData = Object.keys(data);
    const allIngredients = keysData.filter((key) => key.includes('Ingredient'));
    const ingredintsWithValue = allIngredients.filter((newKey) => data[newKey]);
    const ingredients = ingredintsWithValue.map((ingredient) => data[ingredient]);

    const allMeasure = keysData.filter((key) => key.includes('Measure'));
    const measuresWithValue = allMeasure.filter((newKey) => data[newKey]);
    const measures = measuresWithValue.map((ingredient) => data[ingredient]);

    const myObjResult = {
      ingredients,
      measures,
    };
    return myObjResult;
  }

  const filterByCategory = ({ value }, typeFood) => {
    if (toggle && categorieSelected === value) {
      fetchToMainScreen(typeFood).then((result) => {
        setData(result);
        setToggle(false);
        setCategorieSelected(value);
      });
    } else {
      searchByCategory(value, typeFood)
        .then((result) => {
          setData(result);
          setToggle(true);
          setCategorieSelected(value);
        });
    }
  };

  const clickShowBar = () => {
    if (showBar) {
      setShowBar(false);
    } else {
      setShowBar(true);
    }
  };

  function filterIngredients(recipe) {
    const recipeIngredients = Object
      .entries(recipe).filter((key) => (
        key[0].includes('Ingredient') && key[1] !== '' && key[1] !== null
      ));
    const recipeIngredientsMeasures = Object
      .entries(recipe).filter((key) => (
        key[0].includes('Measure') && key[1] !== '' && key[1] !== null
      ));
    const recipeIngredientsAndMeasures = [];
    recipeIngredients.forEach((ingr, index) => {
      recipeIngredientsAndMeasures
        .push(`${ingr[1]}: ${recipeIngredientsMeasures[index][1]}`);
    });
    return recipeIngredientsAndMeasures;
  }
  // Source of the algorithm https://github.com/tryber/sd-09-project-recipes-app/pull/483/files /

  const saveFavorite = (recipeId, pathname) => {
    setIsFavorite(!isFavorite);
    saveAsFavorite(recipeId, data, pathname);
  };

  function addLocalStorage(id, target, ingredients) {
    const inprogresLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inprogresLocal === null) {
      // Se o localStorage não tiver inProgressRecipes, eu crio aqui
      const inProgressRecipes = {
        meals: {
          [id]: [ingredients[target.id]],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } else if (inprogresLocal.meals !== id) {
      // Se tiver coisa no inProgressRecipes mas eu queira adicionar um id diferente;
      const inProgressRecipes = {
        meals: {
          ...inprogresLocal.meals,
          [id]: [ingredients[target.id]],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } else {
      const { meals } = inprogresLocal;
      console.log(meals);
    }

    // Se ja tiver a chave com id eu apenas adiciono o ingrediente
    // const inProgressRecipes = {
    //   meals: {
    //     [id]: [...meals[id], ingredients[target.id]],
    //   },
    // };
    // localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }

  function removeLocalStorage() {
    console.log('removi');
  }

  function checkDone(id, target) {
    if (target.checked) {
      addLocalStorage(id, target);
    } else {
      removeLocalStorage();
    }
  }

  const context = {
    data,
    categories,
    showBar,
    resultAPI,
    isLoading,
    recommendations,
    isFavorite,
    checkDone,
    clickShowBar,
    setResultAPI,
    setIsLoading,
    setData,
    setCategories,
    setShowBar,
    filterByCategory,
    filterIngredients,
    setRecommendations,
    getKeysIngredints,
    saveFavorite,
    setIsFavorite,
  };
  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
};

MyContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MyContext, MyContextProvider };
