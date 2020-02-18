import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
	ScrollView,
	StyleSheet,
	View,
	KeyboardAvoidingView,
	Button,
	ActivityIndicator,
	Alert,
} from 'react-native';

import { useDispatch } from 'react-redux';

import { LinearGradient } from 'expo-linear-gradient';

import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth.action';

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

const AuthScreen = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [isSignup, setIsSignup] = useState(false);
	const dispatch = useDispatch();

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: '',
			password: '',
		},
		inputValidities: {
			email: false,
			password: false,
		},
		formIsValid: false,
	});

	useEffect(() => {
		if (error) {
			Alert.alert('An error occured', error, [{ text: 'Ok' }]);
		}
	}, [error]);

	const authHandler = async () => {
		setIsLoading(true);
		setError(null);
		try {
			if (isSignup) {
				await dispatch(
					authActions.signup(
						formState.inputValues.email,
						formState.inputValues.password
					)
				);
			} else {
				await dispatch(
					authActions.login(
						formState.inputValues.email,
						formState.inputValues.password
					)
				);
			}

			props.navigation.navigate('Shop');
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	};

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

	return (
		<KeyboardAvoidingView
			behavior='padding'
			keyboardVerticalOffset={50}
			style={styles.screen}
		>
			<LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
				<Card style={styles.authContainer}>
					<ScrollView>
						<Input
							id='email'
							label='E-Mail'
							keyboardType='email-address'
							required
							email
							autoCapitalize='none'
							errorText='Please enter a valid email address'
							onInputChange={inputChangeHandler}
							initialValue=''
						/>
						<Input
							id='password'
							label='Password'
							keyboardType='default'
							secureTextEntry
							required
							minLength={5}
							autoCapitalize='none'
							errorText='Please enter a valid password'
							onInputChange={inputChangeHandler}
							initialValue=''
						/>
						<View style={styles.buttonContainer}>
							{isLoading ? (
								<ActivityIndicator
									size='small'
									color={Colors.primary}
								></ActivityIndicator>
							) : (
								<Button
									title={isSignup ? 'Signup' : 'Login'}
									color={Colors.primary}
									onPress={authHandler}
								></Button>
							)}
						</View>
						<View style={styles.buttonContainer}>
							<Button
								title={`Switch to ${isSignup ? 'Login' : 'Signup'}`}
								color={Colors.accent}
								onPress={() => {
									setIsSignup(prevState => !prevState);
								}}
							></Button>
						</View>
					</ScrollView>
				</Card>
			</LinearGradient>
		</KeyboardAvoidingView>
	);
};

AuthScreen.navigationOptions = {
	headerTitle: 'Authenticate',
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	authContainer: {
		width: '80%',
		maxWidth: 400,
		maxHeight: 400,
		padding: 20,
	},
	gradient: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonContainer: {
		marginTop: 10,
	},
});

export default AuthScreen;
