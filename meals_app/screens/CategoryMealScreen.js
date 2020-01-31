import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';

import { CATEGORIES, MEALS } from '../data/dummy-data';

const CategoryMealScreen = props => {
	const renderMealItem = itemData => {
		return (
			<View>
				<Text>{itemData.item.title}</Text>
			</View>
		);
	};
	const categoryId = props.navigation.getParam('categoryId');
	const displayedMeals = MEALS.filter(meal =>
		meal.categoryIds.includes(categoryId)
	);
	return (
		<View style={styles.screen}>
			<FlatList
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
			backgroundColor: selectedCategory.color,
		},
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default CategoryMealScreen;
