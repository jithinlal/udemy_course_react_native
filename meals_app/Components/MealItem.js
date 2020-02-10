import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';

const MealItem = props => {
	return (
		<TouchableOpacity onPress={props.onSelectMeal}>
			<View style={styles.mealItem}>
				<View style={{ ...styles.mealRow, ...styles.mealHeader }}>
					<ImageBackground
						source={{ uri: props.data.imageUrl }}
						style={styles.bgImage}
					>
						<View style={styles.titleContainer}>
							<Text style={styles.title} numberOfLines={1}>
								{props.data.title}
							</Text>
						</View>
					</ImageBackground>
				</View>
				<View style={{ ...styles.mealRow, ...styles.mealDetail }}>
					<Text>{props.data.duration} m</Text>
					<Text>{props.data.complexity.toUpperCase()}</Text>
					<Text>{props.data.affordability.toUpperCase()}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	mealItem: {
		height: 200,
		width: '100%',
		backgroundColor: '#f5f5f5',
		borderRadius: 10,
		overflow: 'hidden',
		marginVertical: 10,
	},
	mealRow: { flexDirection: 'row' },
	mealHeader: { height: '85%' },
	mealDetail: {
		paddingHorizontal: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '15%',
	},
	bgImage: { width: '100%', height: '100%', justifyContent: 'flex-end' },
	titleContainer: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		paddingVertical: 5,
		paddingHorizontal: 12,
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 20,
		color: 'white',

		textAlign: 'center',
	},
});

export default MealItem;
