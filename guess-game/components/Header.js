import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import Colors from '../constants/Color';

const Header = props => {
	return (
		<View style={styles.headers}>
			<Text style={styles.headerTitle}>{props.title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	headers: {
		width: '100%',
		height: 90,
		paddingTop: 36,
		backgroundColor: Colors.primary,
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerTitle: {
		color: 'black',
		fontSize: 18
	}
});

export default Header;
