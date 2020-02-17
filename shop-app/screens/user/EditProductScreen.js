import React, { useState, useCallback, useEffect, useReducer } from 'react';
import {
	View,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Alert,
	ActivityIndicator,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/ui/HeaderButton';
import Input from '../../components/ui/Input';
import * as productsAction from '../../store/actions/products.action';
import Colors from '../../constants/Colors';

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
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

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

	useEffect(() => {
		if (error) {
			Alert.alert('An error occured', error, [{ text: 'OK' }]);
		}
	}, [error]);

	const submitHandler = useCallback(async () => {
		if (!formState.formIsValid) {
			Alert.alert('Wrong input!', 'Please check  the errors in the form', [
				{ text: 'Okay' },
			]);
			return;
		}

		setError(null);
		setIsLoading(true);
		try {
			if (editedProduct) {
				await dispatch(
					productsAction.updateProduct(
						productId,
						formState.inputValues.title,
						formState.inputValues.description,
						formState.inputValues.imageUrl
					)
				);
			} else {
				await dispatch(
					productsAction.createProduct(
						formState.inputValues.title,
						formState.inputValues.description,
						formState.inputValues.imageUrl,
						+formState.inputValues.price
					)
				);
			}

			props.navigation.goBack();
		} catch (error) {
			setError(error.message);
		}

		setIsLoading(false);
	}, [dispatch, productId, formState]);

	useEffect(() => {
		props.navigation.setParams({ submit: submitHandler });
	}, [submitHandler]);

	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: FORM_INPUT_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier,
			});
		},
		[dispatchFormState]
	);

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator
					size='large'
					color={Colors.primary}
				></ActivityIndicator>
			</View>
		);
	}

	return (
		<KeyboardAvoidingView
			behavior='padding'
			keyboardVerticalOffset={100}
			style={{ flex: 1 }}
		>
			<ScrollView>
				<View style={styles.form}>
					<Input
						id='title'
						label='Title'
						errorText='Please enter a valid title!'
						autoCapitalize='sentences'
						autoCorrect
						returnKeyType='next'
						onInputChange={inputChangeHandler}
						initialValue={editedProduct ? editedProduct.title : ''}
						initiallyValid={!!editedProduct}
						required
					/>
					<Input
						id='imageUrl'
						label='Image Url'
						errorText='Please enter a valid image url!'
						returnKeyType='next'
						onInputChange={inputChangeHandler}
						initialValue={editedProduct ? editedProduct.imageUrl : ''}
						initiallyValid={!!editedProduct}
						required
					/>
					{editedProduct ? null : (
						<Input
							id='price'
							label='Price'
							errorText='Please enter a valid price!'
							returnKeyType='next'
							onInputChange={inputChangeHandler}
							keyboardType='decimal-pad'
							required
							min={0.1}
						/>
					)}
					<Input
						id='description'
						label='Description'
						errorText='Please enter a valid description!'
						autoCapitalize='sentences'
						onInputChange={inputChangeHandler}
						autoCorrect
						multiline
						numberOfLines={3}
						initialValue={editedProduct ? editedProduct.description : ''}
						initiallyValid={!!editedProduct}
						required
						min={5}
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	form: {
		margin: 20,
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
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
