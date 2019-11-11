import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

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
		backgroundColor: '#f7287b',
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerTitle: {
		color: 'black',
		fontSize: 18
	}
});

export default Header;
