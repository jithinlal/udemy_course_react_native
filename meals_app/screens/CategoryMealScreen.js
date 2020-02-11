import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

	if (displayedMeals.length === 0) {
		return (
			<View style={styles.content}>
				<Text>No favorites!</Text>
			</View>
		);
	}
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

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default CategoryMealScreen;
