import React from 'react';
import { StyleSheet, View, Button, Text, Platform } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import Colors from '../Constants/Colors';

const CategoryMealScreen = props => {
	const categoryId = props.navigation.getParam('categoryId');
	const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);
	return (
		<View style={styles.screen}>
			<Text>The category meals screen</Text>
			<Button
				title='Go to details'
				onPress={() => {
					props.navigation.navigate({
						routeName: 'MealDetail',
					});
				}}
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
				Platform.OS === 'android' ? Colors.primaryColor : 'white',
		},
		headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
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
