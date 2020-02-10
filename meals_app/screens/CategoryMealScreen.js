import React from 'react';
import { Platform } from 'react-native';
import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../Components/MealList';

const CategoryMealScreen = props => {
	const categoryId = props.navigation.getParam('categoryId');
	const displayedMeals = MEALS.filter(meal =>
		meal.categoryIds.includes(categoryId)
	);
	return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealScreen.navigationOptions = navigationData => {
	const categoryId = navigationData.navigation.getParam('categoryId');
	const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);

	return {
		headerTitle: selectedCategory.title,
		headerStyle: {
			backgroundColor:
				Platform.OS === 'android' ? selectedCategory.colorr : 'white',
		},
		headerTintColor:
			Platform.OS === 'android' ? 'white' : selectedCategory.color,
	};
};

export default CategoryMealScreen;
