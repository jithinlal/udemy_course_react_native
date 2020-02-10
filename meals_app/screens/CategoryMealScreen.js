import React from 'react';
import { StyleSheet, View, FlatList, Platform } from 'react-native';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealItem from '../Components/MealItem';
const CategoryMealScreen = props => {
	const renderMealItem = itemData => {
		return (
			<MealItem
				data={itemData.item}
				onSelectMeal={() => {
					props.navigation.navigate({
						routeName: 'MealDetail',
						params: {
							mealId: itemData.item.id,
						},
					});
				}}
			/>
		);
	};
	const categoryId = props.navigation.getParam('categoryId');
	const displayedMeals = MEALS.filter(meal =>
		meal.categoryIds.includes(categoryId)
	);
	return (
		<View style={styles.screen}>
			<FlatList
				style={{ width: '100%' }}
				data={displayedMeals}
				keyExtractor={(item, index) => item.id}
				renderItem={renderMealItem}
			/>
		</View>
	);
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

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15,
	},
});

export default CategoryMealScreen;
