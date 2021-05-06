import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import getFoodsAndDrinks from '../services/servicesAPI';
import { filterFoodByArea, listMeals } from '../actions';

import Footer from '../components/footer';
import Header from '../components/header';
import CardContainer from '../components/cardContainer';

export default function ExploreFoodByOrigin() {
  const [areas, setAreas] = useState([]);
  const [areaSelected, setAreaSelected] = useState('All');
  const [recipes, setRecipes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (areas.length === 0) {
      const fetchDispatch = async () => {
        const fetch = await getFoodsAndDrinks('meals', 'getOrigin');
        const fetchMeals = await getFoodsAndDrinks('meals', 'getAll');

        dispatch(filterFoodByArea(fetch));
        dispatch(listMeals(fetchMeals));
      };
      fetchDispatch();
    }
  }, [areas.length, dispatch]);

  const areaData = useSelector((state) => state.recipesReducer.filterByArea);

  useEffect(() => {
    if (areaData.length > 0) {
      setAreas(areaData);
    }
  }, [areaData]);

  const changeFilter = async (value) => {
    setAreaSelected(value);
    let fetch = [];

    if (value !== 'All') {
      fetch = await getFoodsAndDrinks('meals', 'filterByArea', value);
    } else {
      fetch = await getFoodsAndDrinks('meals', 'getAll');
    }

    dispatch(listMeals(fetch));
  };

  const filterAreaData = useSelector((state) => state.recipesReducer.meals);

  useEffect(() => {
    setRecipes(filterAreaData);
  }, [filterAreaData]);

  return (
    <>
      <Header
        page="Explorar Origem"
        search={ { searchBtn: true, searchFor: 'meals' } }
      />
      <div className="explorerArea-wrapper">
        <select
          className="dropdown-toggle"
          data-testid="explore-by-area-dropdown"
          onChange={ (event) => changeFilter(event.target.value) }
          title={ (areaSelected)
            ? `Origem selecionada: ${areaSelected}`
            : 'Carregando...' }
        >
          <option value="All" data-testid="All-option">All</option>
          {areas.length > 0 && areas.map(({ strArea }, index) => (
            <option
              key={ `dropdown-${index}` }
              value={ strArea }
              data-testid={ `${strArea}-option` }
            >
              {strArea}
            </option>
          ))}
        </select>
        <CardContainer recipes={ recipes } path="/comidas" cardType="recipes" />
      </div>
      <Footer />
    </>
  );
}
