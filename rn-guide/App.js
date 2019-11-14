import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
	const [courseGoals, setCourseGoals] = useState([]);
	const [isAddMode, setIsAddMode] = useState(false);

	const addGoalHandler = goalTitle => {
		setCourseGoals(currentGoals => [
			...currentGoals,
			{ id: Math.random().toString(), value: goalTitle },
		]);
		setIsAddMode(false);
	};

	const removeGoalHandler = goalId => {
		setCourseGoals(currentGoals => {
			return currentGoals.filter(goal => goal.id !== goalId);
		});
	};

	const cancelGoalAdditionHandler = () => {
		setIsAddMode(false);
	};

	return (
		<View style={styles.screen}>
			<View>
				<View style={styles.headingContainer}>
					<Text style={styles.heading}>Goals App</Text>
				</View>
				<Button title='+' onPress={() => setIsAddMode(true)} />
			</View>
			<GoalInput
				visible={isAddMode}
				onAddGoal={addGoalHandler}
				onCancel={cancelGoalAdditionHandler}
			/>
			<FlatList
				keyExtractor={(item, index) => item.id}
				data={courseGoals}
				renderItem={itemData => (
					<GoalItem
						id={itemData.item.id}
						onDelete={removeGoalHandler}
						title={itemData.item.value}
					/>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		padding: 50,
		backgroundColor: '#1e152a',
		height: '100%',
	},
	headingContainer: {
		alignItems: 'center',
		paddingBottom: 15,
	},
	heading: {
		fontSize: 30,
		fontWeight: 'bold',
		color: 'yellow',
	},
});
