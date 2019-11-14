import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

const GoalInput = props => {
	const [enteredGoal, setEnteredGoal] = useState('');

	const goalInputHandler = enteredText => {
		setEnteredGoal(enteredText);
	};

	const addGoalHandler = () => {
		props.onAddGoal(enteredGoal);
		setEnteredGoal('');
	};

	return (
		<View>
			<Modal visible={props.visible} animationType='slide'>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder='What do you want to achieve?'
						style={styles.input}
						onChangeText={goalInputHandler}
						value={enteredGoal}
					/>
					<View style={styles.buttonContainer}>
						<View style={styles.button}>
							<Button title='CANCEL' color='#f78571' onPress={props.onCancel} />
						</View>
						<View style={styles.button}>
							<Button title='ADD' color='#a5c882' onPress={addGoalHandler} />
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		backgroundColor: '#1e152a',
	},
	inputContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1e152a',
	},
	input: {
		width: '80%',
		padding: 10,
		marginBottom: 10,
		borderBottomColor: '#a5c882',
		borderBottomWidth: 2,
		color: 'white',
		// underlineColorAndroid: '#a5c882',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '80%',
	},
	button: {
		width: '50%',
	},
});

export default GoalInput;
