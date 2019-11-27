import React, { useState, useRef, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	FlatList,
	Alert,
	Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyle from '../constants/DefaultStyle';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

// const renderListItem = (value, numOfRound) => (
// 	<View key={value} style={styles.listItem}>
// 		<Text style={DefaultStyle.bodyText}>#{numOfRound}</Text>
// 		<Text style={DefaultStyle.bodyText}>{value}</Text>
// 	</View>
// );

const renderListItem = (listLength, itemData) => (
	<View style={styles.listItem}>
		<Text style={DefaultStyle.bodyText}>#{listLength - itemData.index}</Text>
		<Text style={DefaultStyle.bodyText}>{itemData.item}</Text>
	</View>
);

const GameScreen = props => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	// const [pastGuesses, setPastGuesses] = useState([initialGuess]);
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;
	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = direction => {
		if (
			(direction === 'lower' && currentGuess < props.userChoice) ||
			(direction === 'greater' && currentGuess > props.userChoice)
		) {
			Alert.alert('Do not lie', 'Do not cheat', [
				{ text: 'Sorry', style: 'cancel' },
			]);
			return;
		}

		if (direction === 'lower') {
			currentHigh.current = currentGuess - 1;
		} else {
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		// setRounds(curRounds => curRounds + 1);
		// setPastGuesses(currentPastGuesses => [nextNumber, ...currentPastGuesses]);
		setPastGuesses(currentPastGuesses => [
			nextNumber.toString(),
			...currentPastGuesses,
		]);
	};

	return (
		<View style={styles.screen}>
			<Text style={DefaultStyle.bodyText}>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton onPress={() => nextGuessHandler('lower')}>
					<Ionicons name='md-remove' size={24} color='white' />
				</MainButton>
				<MainButton onPress={() => nextGuessHandler('greater')}>
					<Ionicons name='md-add' size={24} color='white' />
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
				{/* <ScrollView contentContainerStyle={styles.listContent}>
					{pastGuesses.map((guess, index) =>
						renderListItem(guess, pastGuesses.length - index)
					)}
				</ScrollView> */}
				<FlatList
					contentContainerStyle={styles.listContent}
					keyExtractor={item => item}
					data={pastGuesses}
					renderItem={renderListItem.bind(this, pastGuesses.length)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
		width: 300,
		maxWidth: '80%',
		marginTop: 20,
		width: 400,
		maxWidth: '90%',
	},
	listItem: {
		borderColor: '#ccc',
		width: '100%',
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	listContainer: {
		flex: 1,
		width: '60%',
	},
	listContent: {
		flexGrow: 1,
		// alignItems: 'center',
		justifyContent: 'flex-end',
	},
});

export default GameScreen;
