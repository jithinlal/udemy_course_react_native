import { MEALS } from '../../data/dummy-data';

// take it from server
const initialState = {
	meals: MEALS,
	filteredMeals: MEALS,
	favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
	return state;
};

export default mealsReducer;
