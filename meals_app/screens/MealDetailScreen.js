import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MealDetailScreen = props => {
	return (
		<View style={styles.screen}>
			<Text>The meal detail screen</Text>
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

export default MealDetailScreen;
