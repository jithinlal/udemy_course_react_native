import React from 'react';
import { useSelector } from 'react-redux';
import { Platform } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealScreen = props => {
	const categoryId = props.navigation.getParam('categoryId');
	const availableMeals = useSelector(state => state.meals.filteredMeals);
	const displayedMeals = availableMeals.filter(
		meal => meal.categoryIds.indexOf(categoryId) >= 0
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
				Platform.OS === 'android' ? selectedCategory.color : 'white',
		},
		headerTintColor:
			Platform.OS === 'android' ? 'white' : selectedCategory.color,
	};
};

export default CategoryMealScreen;
