import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
	return async dispatch => {
		try {
			const response = await fetch(
				'https://udemy-react-native-ea174.firebaseio.com/products.json'
			);

			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			const resData = await response.json();
			const loadedProducts = [];

			for (const key in resData) {
				loadedProducts.push(
					new Product(
						key,
						'u1',
						resData[key].title,
						resData[key].imageUrl,
						resData[key].description,
						resData[key].price
					)
				);
			}

			dispatch({
				type: SET_PRODUCTS,
				products: loadedProducts,
			});
		} catch (error) {
			throw error;
		}
	};
};

export const deleteProduct = productId => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;

		await fetch(
			`https://udemy-react-native-ea174.firebaseio.com/products/${productId}.json?auth=${token}`,
			{
				method: 'DELETE',
			}
		);
		dispatch({ type: DELETE_PRODUCT, pid: productId });
	};
};

export const createProduct = (title, description, imageUrl, price) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;

		try {
			// any async functions goes here
			const response = await fetch(
				`https://udemy-react-native-ea174.firebaseio.com/products.json?auth=${token}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						title,
						description,
						imageUrl,
						price,
					}),
				}
			);

			const resData = await response.json();

			dispatch({
				type: CREATE_PRODUCT,
				productData: {
					id: resData.name,
					title,
					description,
					imageUrl,
					price,
				},
			});
		} catch (error) {
			throw new Error('Could not create a new product');
		}
	};
};

export const updateProduct = (id, title, description, imageUrl) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		try {
			await fetch(
				`https://udemy-react-native-ea174.firebaseio.com/products/${id}.json?auth=${token}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						title,
						description,
						imageUrl,
					}),
				}
			);

			dispatch({
				type: UPDATE_PRODUCT,
				productId: id,
				productData: {
					title,
					description,
					imageUrl,
				},
			});
		} catch (error) {
			throw new Error('Could not update the product');
		}
	};
};
