import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

const CategoryMealScreen = props => {
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

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default CategoryMealScreen;
