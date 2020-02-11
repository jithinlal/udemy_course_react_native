import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

// take it from server
const initialState = {
	meals: MEALS,
	filteredMeals: MEALS,
	favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_FAVORITE:
			const existingIndex = state.favoriteMeals.findIndex(
				meal => meal.id === action.mealId
			);
			if (existingIndex >= 0) {
				const updatedMeals = [...state.favoriteMeals];
				updatedMeals.splice(existingIndex, 1);
				return { ...state, favoriteMeals: updatedMeals };
			} else {
				const meal = state.meals.find(meal => meal.id === action.mealId);
				return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
			}
			break;
		case SET_FILTERS:
			const appliedFilters = action.filters;
			const updatedFilteredMeals = state.meals.filter(meal => {
				if (appliedFilters.glutenFree && !meal.isGlutenFree) {
					return false;
				}
				if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
					return false;
				}
				if (appliedFilters.vegan && !meal.isVegan) {
					return false;
				}
				if (appliedFilters.isVegetarian && !meal.isVegetarian) {
					return false;
				}

				return true;
			});

			return { ...state, filteredMeals: updatedFilteredMeals };
			break;
		default:
			return state;
			break;
	}
};

export default mealsReducer;
