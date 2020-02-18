import React, { useState } from 'react';
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TextInput,
	Button,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as placesAction from '../store/actions/places.action';
import ImgPicker from '../components/ImagePicker';

const NewPlaceScreen = props => {
	const [titleValue, setTitleValue] = useState('');
	const [selectedImage, setSelectedImage] = useState();
	const dispatch = useDispatch();

	const titleChangeHandler = text => {
		setTitleValue(text);
	};

	const imageTakenHandler = imagePath => {
		setSelectedImage(imagePath);
	};

	const savePlaceHandler = () => {
		dispatch(placesAction.addPlace(titleValue, selectedImage));
		props.navigation.goBack();
	};

	return (
		<ScrollView>
			<View style={styles.form}>
				<Text style={styles.label}>Title</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={titleChangeHandler}
					value={titleValue}
				/>
				<ImgPicker onImageTaken={imageTakenHandler} />
				<Button
					title='Save Place'
					color={Colors.primary}
					onPress={savePlaceHandler}
				/>
			</View>
		</ScrollView>
	);
};

NewPlaceScreen.navigationOptions = {
	headerTitle: 'Add Place',
};

const styles = StyleSheet.create({
	form: { margin: 30 },
	label: {
		fontSize: 18,
		marginBottom: 15,
	},
	textInput: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		marginBottom: 15,
		paddingVertical: 4,
		paddingHorizontal: 2,
	},
});

export default NewPlaceScreen;
