import { createStackNvigator } from 'react-navigation';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

const MealsNavigator = createStackNvigator({
	Categories: CategoriesScreen,
	CategoryMeals: {
		screen: CategoryMealScreen,
	},
	MealDetail: MealDetailScreen,
});

export default MealsNavigator;
