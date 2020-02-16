import React, { useCallback, useEffect, useReducer } from 'react';
import {
	View,
	Text,
	TextInput,
	Platform,
	ScrollView,
	StyleSheet,
	Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/ui/HeaderButton';
import * as productsAction from '../../store/actions/products.action';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value,
		};
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid,
		};
		let updatedFormIsValid = true;
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
		}

		return {
			...state,
			inputValues: updatedValues,
			inputValidities: updatedValidities,
			formIsValid: updatedFormIsValid,
		};
	}
	return state;
};

const EditProductScreen = props => {
	const productId = props.navigation.getParam('productId');
	const editedProduct = useSelector(state =>
		state.products.userProducts.find(prod => prod.id === productId)
	);
	const dispatch = useDispatch();

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			title: editedProduct ? editedProduct.title : '',
			imageUrl: editedProduct ? editedProduct.imageUrl : '',
			description: editedProduct ? editedProduct.description : '',
			price: '',
		},
		inputValidities: {
			title: editedProduct ? true : false,
			imageUrl: editedProduct ? true : false,
			description: editedProduct ? true : false,
			price: editedProduct ? true : false,
		},
		formIsValid: editedProduct ? true : false,
	});

	const submitHandler = useCallback(() => {
		if (!formState.formIsValid) {
			Alert.alert('Wrong input!', 'Please check  the errors in the form', [
				{ text: 'Okay' },
			]);
			return;
		}

		if (editedProduct) {
			dispatch(
				productsAction.updateProduct(
					productId,
					formState.inputValues.title,
					formState.inputValues.description,
					formState.inputValues.imageUrl
				)
			);
		} else {
			dispatch(
				productsAction.createProduct(
					formState.inputValues.title,
					formState.inputValues.description,
					formState.inputValues.imageUrl,
					+formState.inputValues.price
				)
			);
		}

		props.navigation.goBack();
	}, [dispatch, productId, formState]);

	useEffect(() => {
		props.navigation.setParams({ submit: submitHandler });
	}, [submitHandler]);

	const textChangeHandler = (inputIdentifier, text) => {
		let isValid = false;
		if (text.trim().length > 0) {
			isValid = true;
		}

		dispatchFormState({
			type: FORM_INPUT_UPDATE,
			value: text,
			isValid,
			input: inputIdentifier,
		});
	};

	return (
		<ScrollView>
			<View style={styles.form}>
				<View style={styles.formControl}>
					<Text style={styles.label}>Title</Text>
					<TextInput
						style={styles.input}
						value={formState.inputValues.title}
						onChangeText={text => {
							textChangeHandler('title', text);
						}}
						autoCapitalize='sentences'
						autoCorrect
						returnKeyType='next'
					/>
					{!formState.inputValidities.title && (
						<Text>Please enter a valid title!</Text>
					)}
				</View>
				<View style={styles.formControl}>
					<Text style={styles.label}>Image Url</Text>
					<TextInput
						style={styles.input}
						value={formState.inputValues.imageUrl}
						onChangeText={text => {
							textChangeHandler('imageUrl', text);
						}}
					/>
				</View>
				{editedProduct ? null : (
					<View style={styles.formControl}>
						<Text style={styles.label}>Price</Text>
						<TextInput
							style={styles.input}
							value={formState.inputValues.price}
							onChangeText={text => {
								textChangeHandler('price', text);
							}}
							keyboardType='decimal-pad'
						/>
					</View>
				)}
				<View style={styles.formControl}>
					<Text style={styles.label}>Description</Text>
					<TextInput
						style={styles.input}
						value={formState.inputValues.description}
						onChangeText={text => {
							textChangeHandler('description', text);
						}}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	form: {
		margin: 20,
	},
	formControl: {
		width: '100%',
	},
	label: { fontFamily: 'open-sans-bold', marginVertical: 8 },
	input: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
});

EditProductScreen.navigationOptions = navData => {
	const submitFun = navData.navigation.getParam('submit');
	return {
		headerTitle: navData.navigation.getParam('productId')
			? 'Edit Product'
			: 'Add Product',
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Save'
					iconName={
						Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
					}
					onPress={submitFun}
				/>
			</HeaderButtons>
		),
	};
};

export default EditProductScreen;
