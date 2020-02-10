import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MealItem from './MealItem';
const MealList = props => {
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

	return (
		<View style={styles.list}>
			<FlatList
				style={{ width: '100%' }}
				data={props.listData}
				keyExtractor={(item, index) => item.id}
				renderItem={renderMealItem}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	list: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15,
	},
});

export default MealList;
