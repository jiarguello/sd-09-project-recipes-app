const recipeType = (meals = false) => (meals ? 'meals' : 'drinks');
const apiUrl = (meals = false) => (meals ? 'https://www.themealdb.com/api/json/v1/1' : 'https://www.thecocktaildb.com/api/json/v1/1');

const fetchData = (url) => fetch(url).then((res) => res.json())
  .catch((error) => console.log(error));

export function getRecipesByIngredient(ingredient, meals = false) {
  const url = `${apiUrl(meals)}/filter.php?i=${ingredient}`;
  return fetchData(url).then((res) => res[recipeType(meals)]);
}

export function getRecipesByName(name, meals = false) {
  const url = `${apiUrl(meals)}/search.php?s=${name}`;
  return fetchData(url).then((res) => res[recipeType(meals)]);
}

export function getRecipesByFirstLetter(letter, meals = false) {
  const url = `${apiUrl(meals)}/search.php?f=${letter}`;
  return fetchData(url).then((res) => res[recipeType(meals)]);
}

export function getCategories(meals = false) {
  const url = `${apiUrl(meals)}/list.php?c=list`;
  return fetchData(url).then((res) => res[recipeType(meals)]);
}

export function getRecipesByCategory(category, meals) {
  const url = `${apiUrl(meals)}/filter.php?c=${category}`;
  return fetchData(url).then((res) => res[recipeType(meals)]);
}

export function getRecipesById(id, meals) {
  const url = `${apiUrl(meals)}/lookup.php?i=${id}`;
  return fetchData(url).then((res) => res[recipeType(meals)]);
}

export async function randomMeal() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const results = await (response.json());
  return (results.meals[0].idMeal);
}

export async function randomDrink() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const results = await (response.json());
  return (results.drinks[0].idDrink);
}
