const mealsAPI = 'https://www.themealdb.com/api/json/v1/1/';
const allMealsAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const allMealsCategoriesAPI = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const mealsByCategoryAPI = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const detailsIdFood = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

export const fetchDetailsFood = async (id) => {
  const res = await fetch(`${detailsIdFood}${id}`)
    .then((data) => data.json())
    .catch((error) => error);
  return res;
};

export const fetchAllMeals = async () => {
  const result = fetch(allMealsAPI)
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);
  return result;
};

export const fetchCategoryMeals = async () => {
  const result = fetch(allMealsCategoriesAPI)
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);
  return result;
};

export const fetchSearchMeals = async (filter, text) => {
  const URL = `${mealsAPI}${filter === 'i' ? 'filter' : 'search'}.php?${filter}=${text}`;
  const search = fetch(URL)
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);
  return search;
};

export const fetchMealsByCategory = async (strCategory) => {
  const URL = `${mealsByCategoryAPI}${strCategory}`;
  console.log(URL);
  const search = await fetch(URL)
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);
  return search;
};

export const fetchListAllIngredientsFoods = async () => {
  const ingredientes = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const response = await ingredientes.json();
  return response;
};
