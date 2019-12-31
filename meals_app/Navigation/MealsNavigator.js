import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

const MealsNavigator = createStackNavigator({
	Categories: {
		screen: CategoriesScreen,
		navigationOptions: {
			title: 'Categories',
			// header: null,
		},
	},
	CategoryMeals: {
		screen: CategoryMealScreen,
	},
	MealDetail: MealDetailScreen,
});

export default createAppContainer(MealsNavigator);
