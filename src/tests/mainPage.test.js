import React from 'react';
import * as redux from 'react-redux';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import getFoodsAndDrinks from '../services/servicesAPI';

// Pages
import MainPage from '../pages/mainPage';

// Actions
import {
  listDrinks,
  listMeals,
  categoriesMeals,
  categoriesDrinks,
} from '../actions';

// Data Meals
import mealsData from './mocks/meals';
import drinksData from './mocks/drinks';
import {
  categoriesMealsData,
  categoriesDrinksData,
} from './mocks/categories';

// Constantes
const MAX_FETCH = 25;
const MAX_CATEGORIES_MEALS = 14;
const MAX_CATEGORIES_DRINKS = 11;
const QUANTITY_CARDS = 12;

const fetchData = (value) => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(value),
  }));
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('Página Principal do App', () => {
  beforeEach(() => jest.clearAllMocks());
  afterEach(cleanup);

  let initialState = {
    userReducer: {
      user: { email: '' },
      favorites: [],
      doingRecipes: [],
      doneRecipes: [],
    },
    recipesReducer: {
      meals: [],
      categoriesMeals: [],
      drinks: [],
      categoriesDrinks: [],
    },
  };

  it('Requisição para a API pegando as Comidas e Bebidas', async () => {
    fetchData({ meals: [...mealsData] });
    const fetchMeals = await getFoodsAndDrinks('meals', 'getAll');

    expect(fetchMeals).toHaveLength(MAX_FETCH);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');

    fetchData({ drinks: [...drinksData] });
    const fetchDrinks = await getFoodsAndDrinks('drinks', 'getAll');

    expect(fetchDrinks).toHaveLength(MAX_FETCH);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });

  it('Requisição para a API pegando as Categorias de Comidas e Bebidas', async () => {
    fetchData({ meals: [...categoriesMealsData] });
    const fetchMeals = await getFoodsAndDrinks('meals', 'getByCategory');

    expect(fetchMeals).toHaveLength(MAX_CATEGORIES_MEALS);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

    fetchData({ drinks: [...categoriesDrinksData] });
    const fetchDrinks = await getFoodsAndDrinks('drinks', 'getByCategory');

    expect(fetchDrinks).toHaveLength(MAX_CATEGORIES_DRINKS);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  });

  it('Verifica se o STORE contém as informações das API de Comida', async () => {
    fetchData({ meals: [...mealsData] });
    const fetchMeals = await getFoodsAndDrinks('meals', 'getAll');
    const { dispatch, getState } = renderWithRouter(<MainPage />, { route: '/comidas' });

    dispatch(listMeals(fetchMeals));
    dispatch(categoriesMeals(categoriesMealsData));

    expect(getState().recipesReducer.meals).toHaveLength(MAX_FETCH);
    expect(getState().recipesReducer.categoriesMeals).toHaveLength(MAX_CATEGORIES_MEALS);
  });

  it('Verifica se o STORE contém as informações das API de Bebida', async () => {
    fetchData({ drinks: [...drinksData] });
    const fetchDrinks = await getFoodsAndDrinks('', '');
    const { dispatch, getState } = renderWithRouter(<MainPage />, { route: '/bebidas' });

    dispatch(listDrinks(fetchDrinks));
    dispatch(categoriesDrinks(categoriesDrinksData));

    expect(getState().recipesReducer.drinks).toHaveLength(MAX_FETCH);
    expect(getState().recipesReducer.categoriesDrinks)
      .toHaveLength(MAX_CATEGORIES_DRINKS);
  });

  it('Verifica se as 12 primeiras Comidas aparecem em Cards', () => {
    fetchData({ meals: [...mealsData] });

    initialState = {
      ...initialState,
      recipesReducer: {
        ...initialState.recipesReducer,
        meals: mealsData,
      },
    };

    redux.useSelector.mockImplementation((callback) => callback(initialState));

    const component = renderWithRouter(<MainPage />, { route: '/comidas' });

    for (let index = 0; index < QUANTITY_CARDS; index += 1) {
      const card = screen.getByTestId(`${index}-recipe-card`);
      expect(card).toBeInTheDocument();
    }

    expect(component.container).toMatchSnapshot();
  });

  it('Verifica se as 12 primeiras Bebidas aparecem em Cards', () => {
    fetchData({ drinks: [...drinksData] });

    initialState = {
      ...initialState,
      recipesReducer: {
        ...initialState.recipesReducer,
        drinks: drinksData,
      },
    };

    redux.useSelector.mockImplementation((callback) => callback(initialState));

    const component = renderWithRouter(<MainPage />, { route: '/bebidas' });

    for (let index = 0; index < QUANTITY_CARDS; index += 1) {
      const card = screen.getByTestId(`${index}-recipe-card`);
      expect(card).toBeInTheDocument();
    }

    expect(component.container).toMatchSnapshot();
  });
});
