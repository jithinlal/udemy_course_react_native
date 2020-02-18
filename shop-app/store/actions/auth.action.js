import { AUTH_KEY } from '../../config';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

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

			dispatch({
				type: SIGNUP,
				token: resData.idToken,
				userId: resData.localId,
			});
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

			dispatch({
				type: LOGIN,
				token: resData.idToken,
				userId: resData.localId,
			});
		} catch (error) {
			throw error;
		}
	};
};
