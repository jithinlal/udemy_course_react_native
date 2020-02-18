import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const PlaceDetailScreen = props => {
	return (
		<View>
			<Text> textInComponent </Text>
		</View>
	);
};

PlaceDetailScreen.navigationOptions = navData => {
	return {
		headerTitle: navData.navigation.getParam('placeTitle'),
	};
};

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
