import React from 'react';
import {
	FlatList,
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	Platform,
} from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import Colors from '../Constants/Colors';

const CategoriesScreen = props => {
	const renderGridItem = itemData => {
		return (
			<TouchableOpacity
				style={styles.gridItem}
				onPress={() => {
					props.navigation.navigate({
						routeName: 'CategoryMeals',
						params: { categoryId: itemData.item.id },
					});
				}}
			>
				<View>
					<Text>{itemData.item.title}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<FlatList numColumns={2} data={CATEGORIES} renderItem={renderGridItem} />
	);
};

CategoriesScreen.navigationOptions = {
	headerTitle: 'Meal Categories',
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white',
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
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
