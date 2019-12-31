import React from 'react';
import { FlatList, StyleSheet, View, Button, Text } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';

const renderGridItem = itemData => {
	return (
		<View style={styles.gridItem}>
			<Text>{itemData.item.title}</Text>
		</View>
	);
};

const CategoriesScreen = props => {
	return (
		<FlatList numColumns={2} data={CATEGORIES} renderItem={renderGridItem} />
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	gridItem: {
		flex: 1,
		margin: 15,
		height: 150,
	},
});

export default CategoriesScreen;
