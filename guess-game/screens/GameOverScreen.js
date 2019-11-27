import React from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';

import DefaultStyle from '../constants/DefaultStyle';
import Color from '../constants/Color';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
	return (
		<View style={styles.screen}>
			<Text style={DefaultStyle.titleText}>The game is over!</Text>
			<View style={styles.imageContainer}>
				<Image
					fadeDuration={1000}
					// source={require('../assets/success.png')}
					source={{
						uri:
							'https://cdn.britannica.com/74/114874-050-6E04C88C/North-Face-Mount-Everest-Tibet-Autonomous-Region.jpg',
					}}
					style={styles.image}
					resizeMode='cover'
				/>
			</View>
			<View style={styles.resultContainer}>
				<Text style={[DefaultStyle.bodyText, styles.resultText]}>
					Your phone needed
					<Text style={styles.highlight}> {props.roundsNumber}</Text> rounds to
					guess the number <Text>{props.userNumber}</Text>
				</Text>
			</View>
			<MainButton onPress={props.onRestart}>New Game</MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	imageContainer: {
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden',
		marginVertical: 30,
	},
	highlight: {
		color: Color.primary,
		fontFamily: 'open-sans-bold',
	},
	resultText: {
		textAlign: 'center',
	},
	resultContainer: {
		marginHorizontal: 30,
		marginVertical: 15,
	},
});

export default GameOverScreen;
