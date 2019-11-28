import React from 'react';
import {
	View,
	Dimensions,
	Text,
	StyleSheet,
	Image,
	ScrollView,
} from 'react-native';

import DefaultStyle from '../constants/DefaultStyle';
import Color from '../constants/Color';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
	return (
		<ScrollView>
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
						<Text style={styles.highlight}> {props.roundsNumber}</Text> rounds
						to guess the number <Text>{props.userNumber}</Text>
					</Text>
				</View>
				<MainButton onPress={props.onRestart}>New Game</MainButton>
			</View>
		</ScrollView>
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
		width: Dimensions.get('window').width * 0.7,
		height: Dimensions.get('window').height * 0.7,
		borderRadius: (Dimensions.get('window').height * 0.7) / 2,
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden',
		marginVertical: Dimensions.get('window').height / 30,
	},
	highlight: {
		color: Color.primary,
		fontFamily: 'open-sans-bold',
	},
	resultText: {
		textAlign: 'center',
		fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
	},
	resultContainer: {
		marginHorizontal: 30,
		marginVertical: Dimensions.get('window').height / 60,
	},
});

export default GameOverScreen;
