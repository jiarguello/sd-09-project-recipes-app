const MEAL_DB_BASE = 'https://www.themealdb.com/api/json/v1/1/';

const getMealsByName = async (name) => {
  try {
    const mealDBReqByName = await fetch(`${MEAL_DB_BASE}search.php?s=${name}`);
    const respByNameJson = await mealDBReqByName.json();
    // console.log('fetch', respByNameJson.meals);
    return respByNameJson.meals;
  } catch (error) {
    console.log('Meal By name...', error);
  }
};

const getMeals = async () => {
  const limit = 6;
  try {
    const mealDBReq = await fetch(`${MEAL_DB_BASE}search.php?s=`);
    const respJson = await mealDBReq.json();
    // console.log('fetch', respByNameJson.meals);
    return respJson.meals.splice(0, limit);
  } catch (error) {
    console.log('Meals... ', error);
  }
};

const getMealByFirstLetter = async (letter) => {
  try {
    const mealDBReqByLetter = await fetch(`${MEAL_DB_BASE}search.php?f=${letter}`);
    const respByLetterJson = await mealDBReqByLetter.json();
    return respByLetterJson.meals;
  } catch (error) {
    console.log('Meal By letter...', error);
  }
};

const getMealsIngredients = async () => {
  try {
    const mealIngredients = await fetch(`${MEAL_DB_BASE}list.php?i=list`);
    const respMealIngredients = await mealIngredients.json();
    return respMealIngredients.meals;
  } catch (error) {
    console.log('Get meal ingredinents...', error);
  }
};

const getMealByIngredients = async (ingredient) => {
  try {
    const mealDBByIngredient = await fetch(`${MEAL_DB_BASE}filter.php?i=${ingredient}`);
    const respByIngredientJson = await mealDBByIngredient.json();
    return respByIngredientJson.meals;
  } catch (error) {
    console.log('Meal By ingredient...', error);
  }
};

const getMealCategorys = async () => {
  try {
    const mealCategorys = await fetch(`${MEAL_DB_BASE}list.php?c=list`);
    const respCategorysJson = await mealCategorys.json();
    // console.log(respByCategoryJson.meals);
    return respCategorysJson.meals;
  } catch (error) {
    console.log('Meal By category...', error);
  }
};

const getMealsByCategory = async (category) => {
  try {
    const mealByCategory = await fetch(`${MEAL_DB_BASE}filter.php?c=${category}`);
    const respByCategoryJson = await mealByCategory.json();
    // console.log(respByCategoryJson.meals);
    return respByCategoryJson.meals;
  } catch (error) {
    console.log('Meal By category...', error);
  }
};

const getMealsRandom = async () => {
  try {
    const mealDBReqRandom = await fetch(`${MEAL_DB_BASE}random.php`);
    const respRandomJson = await mealDBReqRandom.json();
    return respRandomJson.meals;
  } catch (error) {
    console.log('Meal Random...', error);
  }
};

const getAreaList = async () => {
  try {
    const requestAreaList = await fetch(`${MEAL_DB_BASE}list.php?a=list`);
    const responseArealist = await requestAreaList.json();
    return responseArealist.meals;
  } catch (error) {
    console.log('Area list...', error);
  }
};

const getByArea = async (area) => {
  try {
    const requestByArea = await fetch(`${MEAL_DB_BASE}filter.php?a=${area}`);
    const responseByArea = await requestByArea.json();
    return responseByArea.meals;
  } catch (error) {
    console.log('By area list...', error);
  }
};

const getById = async (id) => {
  try {
    const requestById = await fetch(`${MEAL_DB_BASE}lookup.php?i=${id}`);
    const responseById = await requestById.json();
    return responseById.meals;
  } catch (error) {
    console.log('By id...', error);
  }
};

const getMealById = async (id) => {
  try {
    const mealDBReqId = await fetch(`${MEAL_DB_BASE}lookup.php?i=${id}`);
    const respIdJson = await mealDBReqId.json();
    return respIdJson.meals[0];
  } catch (error) {
    console.log('Meal by Id... ', error);
  }
};

export {
  getMeals,
  getMealsByName,
  getMealsRandom,
  getMealByFirstLetter,
  getMealsIngredients,
  getMealByIngredients,
  getMealCategorys,
  getMealsByCategory,
  getAreaList,
  getByArea,
  getById,
  getMealById,
};
