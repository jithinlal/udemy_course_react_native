import { AsyncStorage } from 'react-native';
import { AUTH_KEY } from '../../config';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_OUT = 'LOG_OUT';

let timer;

export const authenticate = (userId, token, expiryTime) => {
	return dispatch => {
		dispatch(setLogoutTimer(expiryTime));
		dispatch({
			type: AUTHENTICATE,
			userId,
			token,
		});
	};
};

export const signup = (email, password) => {
	return async dispatch => {
		try {
			const response = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${AUTH_KEY}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email,
						password,
						returnSecureToken: true,
					}),
				}
			);

			if (!response.ok) {
				const errorResponseData = await response.json();
				const errorId = errorResponseData.error.message;
				let message = 'Something went wrong';

				if (errorId === 'EMAIL_EXISTS') {
					message = 'This email already exists';
				}
				throw new Error(message);
			}

			const resData = await response.json();

			dispatch(
				authenticate(
					resData.localId,
					resData.idToken,
					parseInt(resData.expiresIn) * 1000
				)
			);
			const expirationDate = new Date(
				new Date().getTime() + parseInt(resData.expiresIn) * 1000
			).toISOString();
			saveDataToStorage(resData.idToken, resData.localId, expirationDate);
		} catch (error) {
			throw error;
		}
	};
};

export const login = (email, password) => {
	return async dispatch => {
		try {
			const response = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${AUTH_KEY}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email,
						password,
						returnSecureToken: true,
					}),
				}
			);

			if (!response.ok) {
				const errorResponseData = await response.json();
				const errorId = errorResponseData.error.message;
				let message = 'Something went wrong';

				if (errorId === 'EMAIL_NOT_FOUND' || errorId === 'INVALID_PASSWORD') {
					message = 'This email/password is wrong';
				}
				throw new Error(message);
			}

			const resData = await response.json();

			dispatch(
				authenticate(
					resData.localId,
					resData.idToken,
					parseInt(resData.expiresIn) * 1000
				)
			);

			const expirationDate = new Date(
				new Date().getTime() + parseInt(resData.expiresIn) * 1000
			).toISOString();
			saveDataToStorage(resData.idToken, resData.localId, expirationDate);
		} catch (error) {
			throw error;
		}
	};
};

export const logout = () => {
	clearLogoutTimer();
	AsyncStorage.removeItem('userData');
	return {
		type: LOG_OUT,
	};
};

const clearLogoutTimer = () => {
	if (timer) {
		clearTimeout(timer);
	}
};

const setLogoutTimer = expirationTime => {
	return dispatch => {
		timer = setTimeout(() => {
			dispatch(logout());
		}, expirationTime);
	};
};

const saveDataToStorage = (token, userId, expiryDate) => {
	AsyncStorage.setItem(
		'userData',
		JSON.stringify({
			token,
			userId,
			expiryDate,
		})
	);
};
